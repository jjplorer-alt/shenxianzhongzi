import sodium from "libsodium-wrappers";

const REPO = "jjplorer-alt/shenxianzhongzi";
const SECRETS = {
  VERCEL_ORG_ID: "team_mLfv5zqMFqFC8NNA8w2pSeJw",
  VERCEL_PROJECT_ID: "prj_iHWEixSLnSRIdaGyKlbouVhKotZd",
  // VERCEL_TOKEN - user must add manually after creating at vercel.com/account/tokens
};

async function main() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) {
    console.error("ERROR: GITHUB_TOKEN or GH_TOKEN must be set.");
    console.error("Run: $env:GITHUB_TOKEN=\"your_token\"; node scripts/add-github-secrets.mjs");
    console.error("Or use: gh auth login (if GitHub CLI is installed)");
    process.exit(1);
  }

  await sodium.ready;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const base = `https://api.github.com/repos/${REPO}/actions/secrets`;
  const res = await fetch(`${base}/public-key`, { headers });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to get public key: ${res.status} ${err}`);
  }
  const { key_id, key } = await res.json();

  for (const [name, value] of Object.entries(SECRETS)) {
    const pubKey = Buffer.from(key, "base64");
    const msg = Buffer.from(value, "utf8");
    const encrypted = sodium.crypto_box_seal(msg, pubKey);
    const encrypted_value = Buffer.from(encrypted).toString("base64");

    const putRes = await fetch(`${base}/${name}`, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ encrypted_value, key_id }),
    });
    if (!putRes.ok) {
      const err = await putRes.text();
      throw new Error(`Failed to set ${name}: ${putRes.status} ${err}`);
    }
    console.log(`Set secret: ${name}`);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
