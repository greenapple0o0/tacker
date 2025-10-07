const { execSync } = require("child_process");

execSync("npx vite build", { stdio: "inherit" });
