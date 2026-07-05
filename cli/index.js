#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { intro, outro } from "@clack/prompts";
import { askQuestions } from "./prompts.js";
import { generateProject } from "./generator.js";

const program = new Command();

program
    .name("create-corebase-app")
    .argument("[project-name]", "Name of the project")
    .action(async (projectNameArg) => {
        console.clear();
        intro(chalk.bgCyan.black(" 🚀 Create Corebase App "));

        const answers = await askQuestions(projectNameArg);

        await generateProject(answers.projectName, answers);

        outro(chalk.green(`✅ Project ${answers.projectName} created successfully!`));

        console.log(`Next steps:`);
        console.log(chalk.cyan(`  cd ${answers.projectName}`));
        console.log(chalk.cyan(`  npm run dev\n`));
    });

program.parse();
