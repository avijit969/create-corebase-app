#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { askQuestions } from "./prompts.js";
import { generateProject } from "./generator.js";

const program = new Command();

program
    .name("create-corebase-app")
    .argument("<project-name>")
    .action(async (projectName) => {
        console.log(chalk.cyan("\n🚀 Create Corebase App\n"));

        const answers = await askQuestions();
        await generateProject(projectName, answers);

        console.log(chalk.green("\n✅ Project created successfully!\n"));
        console.log(`👉 cd ${projectName}`);
        console.log("👉 npm install");
        console.log("👉 npm run dev\n");
    });

program.parse();
