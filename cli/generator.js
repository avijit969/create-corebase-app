import fs from "fs-extra";
import { fileURLToPath } from "url";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import chalk from "chalk";
import { spinner, cancel } from "@clack/prompts";

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateProject(projectName, answers) {
    const s = spinner();
    const targetPath = path.resolve(projectName);
    const templatePath = path.resolve(
        __dirname,
        "../templates",
        answers.template
    );

    if (fs.existsSync(targetPath)) {
        cancel(chalk.red(`❌ Folder ${projectName} already exists`));
        process.exit(1);
    }

    s.start("Copying template files...");
    await fs.copy(templatePath, targetPath);
    s.stop("Template files copied successfully!");

    if (answers.corebaseKey) {
        s.start("Injecting environment variables...");
        const envPath = path.join(targetPath, ".env");
        const envExamplePath = path.join(targetPath, ".env.example");

        if (fs.existsSync(envExamplePath)) {
            let env = await fs.readFile(envExamplePath, "utf-8");
            env = env
                .replace("{{COREBASE_URL}}", "https://corebase-api.trivyaa.in")
                .replace("{{COREBASE_KEY}}", answers.corebaseKey);

            await fs.writeFile(envPath, env);
            await fs.remove(envExamplePath);
            s.stop("Environment variables injected successfully!");
        } else {
            s.stop("No .env.example found, skipping variable injection.");
        }
    }

    s.start("Installing dependencies...");
    try {
        await execAsync("npm install", { cwd: targetPath });
        s.stop("Dependencies installed successfully!");
    } catch (e) {
        s.stop(chalk.red("Failed to install dependencies (you can run npm install manually inside the folder)."));
    }
}
