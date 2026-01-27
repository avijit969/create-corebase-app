import fs from "fs-extra";
import { fileURLToPath } from "url";
import path from "path";
import { execSync } from "child_process";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateProject(projectName, answers) {
    const targetPath = path.resolve(projectName);
    const templatePath = path.resolve(
        __dirname,
        "../templates",
        answers.template
    );

    if (fs.existsSync(targetPath)) {
        console.log(chalk.red("❌ Folder already exists"));
        process.exit(1);
    }

    console.log("📂 Copying template...");
    await fs.copy(templatePath, targetPath);

    console.log("🔐 Injecting environment variables...");
    const envPath = path.join(targetPath, ".env");
    const envExamplePath = path.join(targetPath, ".env.example");

    let env = await fs.readFile(envExamplePath, "utf-8");
    env = env
        .replace("{{COREBASE_URL}}", "https://corebase.avijit.site")
        .replace("{{COREBASE_KEY}}", answers.corebaseKey);

    await fs.writeFile(envPath, env);
    await fs.remove(envExamplePath);

    console.log("📦 Installing dependencies...");
    execSync("npm install", {
        cwd: targetPath,
        stdio: "inherit"
    });
}
