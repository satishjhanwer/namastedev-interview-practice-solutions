import fs from "node:fs";
import path from "node:path";

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: npm run new:solution <slug>");
  process.exit(1);
}

const root = path.resolve("src", "solutions", slug);
if (fs.existsSync(root)) {
  console.error(`Solution '${slug}' already exists.`);
  process.exit(1);
}
fs.mkdirSync(root, { recursive: true });

const meta = `import type { SolutionMeta } from "@app/registry";
const meta: SolutionMeta = {
  title: "${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}",
  difficulty: "Easy",
  status: "WIP",
  tags: ["react"],
  description: ""
};
export default meta;
`;

const comp = `export default function ${slug
  .replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase())
  .replace(/-/g, "")}() {
  return <div style={{padding:8}}>Hello from <strong>${slug}</strong>!</div>;
}
`;

const readme = `# ${slug}\n\nDescribe the approach, trade-offs, and tests.\n`;

fs.writeFileSync(path.join(root, "meta.ts"), meta);
fs.writeFileSync(path.join(root, "index.tsx"), comp);
fs.writeFileSync(path.join(root, "README.md"), readme);

console.log(`✅ Created src/solutions/${slug}/`);
