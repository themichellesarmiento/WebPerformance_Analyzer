import { analyzeUrl } from "../server/lighthouse/index.js";

const url = process.argv[2];

if (!url) {
  console.error("URL missing");
  process.exit(1);
}

try {
  const result = await analyzeUrl(url);

  console.log(JSON.stringify(result));
} catch (err) {
  console.error(JSON.stringify({ error: err.message }));
  process.exit(1);
}