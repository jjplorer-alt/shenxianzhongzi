#!/usr/bin/env node
/**
 * Namecheap DNS 自动化配置 - 将 shenxianzhongzi.me 指向 Vercel
 *
 * 注意: setHosts 会覆盖所有现有 DNS 记录，若有邮箱(MX)等请先备份
 *
 * 使用前准备：
 * 1. Namecheap: Profile → Tools → API Access → Enable
 * 2. 将当前公网 IP 加入白名单
 * 3. 设置环境变量后运行
 *
 * 运行: node scripts/setup-namecheap-dns.js
 */

const DOMAIN = "shenxianzhongzi.me";
const SLD = "shenxianzhongzi";
const TLD = "me";
const VERCEL_IP = "76.76.21.21";
const VERCEL_CNAME = "cname.vercel-dns.com";

async function namecheapApi(command, extraParams = {}) {
  const apiUser = process.env.NC_API_USER;
  const apiKey = process.env.NC_API_KEY;
  const username = process.env.NC_USERNAME;
  const clientIp = process.env.NC_CLIENT_IP;

  if (!apiUser || !apiKey || !username || !clientIp) {
    throw new Error(
      "缺少环境变量: NC_API_USER, NC_API_KEY, NC_USERNAME, NC_CLIENT_IP"
    );
  }

  const params = new URLSearchParams({
    ApiUser: apiUser,
    ApiKey: apiKey,
    UserName: username,
    Command: command,
    ClientIp: clientIp,
    SLD,
    TLD,
    ...extraParams,
  });

  const url = `https://api.namecheap.com/xml.response?${params}`;
  const res = await fetch(url);
  return res.text();
}

async function getHosts() {
  return namecheapApi("namecheap.domains.dns.getHosts");
}

async function setHosts(records) {
  const params = {};
  records.forEach((r, i) => {
    const n = i + 1;
    params[`HostName${n}`] = r.host;
    params[`RecordType${n}`] = r.type;
    params[`Address${n}`] = r.address;
    params[`TTL${n}`] = r.ttl || "1800";
    if (r.type === "MX" && r.mxPref != null) {
      params[`MXPref${n}`] = r.mxPref;
    }
  });
  return namecheapApi("namecheap.domains.dns.setHosts", params);
}

function parseGetHostsResponse(xml) {
  const records = [];
  const hostRegex = /<host[^>]*HostId="\d+"[^>]*Name="([^"]*)"[^>]*Type="([^"]*)"[^>]*Address="([^"]*)"[^>]*TTL="(\d+)"[^>]*(?:MXPref="(\d+)")?/g;
  let m;
  while ((m = hostRegex.exec(xml))) {
    let host = m[1];
    if (host === DOMAIN || host === "") host = "@";
    else host = host.replace(`.${DOMAIN}`, "");
    if (host === "www" && m[2] === "CNAME") continue;
    if (host === "@" && m[2] === "A") continue;
    if (m[2] === "URL" || m[2] === "URL301" || host.includes("parking")) continue;
    records.push({
      host: host || "@",
      type: m[2],
      address: m[3],
      ttl: m[4],
      mxPref: m[5],
    });
  }
  return records;
}

async function main() {
  console.log(`配置 ${DOMAIN} → Vercel\n`);

  const existingXml = await getHosts();
  const existing = parseGetHostsResponse(existingXml);

  const vercelRecords = [
    { host: "@", type: "A", address: VERCEL_IP, ttl: "1800" },
    { host: "www", type: "CNAME", address: VERCEL_CNAME, ttl: "1800" },
  ];

  const kept = existing.filter(
    (r) =>
      !(r.host === "@" && r.type === "A") &&
      !(r.host === "www" && r.type === "CNAME") &&
      r.type !== "URL" &&
      r.type !== "URL301" &&
      !r.host.startsWith("parking")
  );

  const allRecords = [...vercelRecords, ...kept];
  console.log("将设置以下记录:");
  allRecords.forEach((r) =>
    console.log(`  ${r.host.padEnd(6)} ${r.type.padEnd(6)} ${r.address}`)
  );

  const result = await setHosts(allRecords);
  if (result.includes('Status="OK"') || result.includes("Status='OK'")) {
    console.log("\n✓ DNS 配置成功，约 5–30 分钟生效");
  } else {
    const err = result.match(/<Error[^>]*>([^<]+)</);
    console.error("\n✗ 失败:", err ? err[1] : result);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
