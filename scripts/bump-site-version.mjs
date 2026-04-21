#!/usr/bin/env node
/**
 * prebuild：每次构建递增 buildSerial，并写入 buildId、builtAt（上海时区）。
 * origin* 保留 JSON 中已有值。
 * semver：形如 x.y.z 时，仅在 SXZZ_DEPLOY=1（Wrangler 部署构建）时自动将补丁位 +1；否则保留（可手工改 major/minor）。
 */
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "app/src/lib/site-version.json");

/** 仅匹配严格三段数字版本，便于自动补丁递增；带 prerelease 的字符串保持不动 */
function bumpPatchSemver(semver) {
  if (typeof semver !== "string") return semver;
  const s = semver.trim();
  const m = s.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!m) return semver;
  const patch = parseInt(m[3], 10) + 1;
  return `${m[1]}.${m[2]}.${patch}`;
}

function shanghaiStamp(date = new Date()) {
  const s = date.toLocaleString("sv-SE", { timeZone: "Asia/Shanghai" });
  const [datePart, timePart] = s.split(" ");
  const [y, mo, da] = datePart.split("-");
  const [h, mi, se] = timePart.split(":");
  const buildId = `${y}${mo}${da}${h}${mi}${se}`;
  const builtAt = `${y}-${mo}-${da}T${h}:${mi}:${se}+08:00`;
  return { buildId, builtAt };
}

function bump() {
  const raw = JSON.parse(readFileSync(jsonPath, "utf8"));
  const fromCi = process.env.GITHUB_RUN_NUMBER;
  const nextSerial =
    fromCi !== undefined && fromCi !== ""
      ? parseInt(fromCi, 10)
      : Number(raw.buildSerial ?? 0) + 1;
  const { buildId, builtAt } = shanghaiStamp();
  const deployBump = process.env.SXZZ_DEPLOY === "1";
  const semverNext = deployBump ? bumpPatchSemver(raw.semver) : raw.semver;
  const next = {
    ...raw,
    semver: semverNext,
    buildSerial: nextSerial,
    buildId,
    builtAt,
  };
  writeFileSync(jsonPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  const verLabel = next.semver ?? "";
  const bumpNote =
    deployBump && semverNext !== raw.semver
      ? `（semver ${raw.semver} → ${semverNext}）`
      : "";
  console.log(
    `[bump-site-version] 部署记录 ${verLabel} · #${nextSerial} · ${buildId}${bumpNote}`,
  );
}

bump();
