#!/usr/bin/env node
/**
 * prebuild：每次构建递增 buildSerial，并写入 buildId、builtAt（上海时区）。
 * semver、origin* 等保留 JSON 中已有值；发版时请视改动手工调高 app/src/lib/site-version.json 的 semver。
 */
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "app/src/lib/site-version.json");

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
  const next = {
    ...raw,
    buildSerial: nextSerial,
    buildId,
    builtAt,
  };
  writeFileSync(jsonPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  console.log(
    `[bump-site-version] 部署记录 ${next.semver ?? ""} · #${nextSerial} · ${buildId}`,
  );
}

bump();
