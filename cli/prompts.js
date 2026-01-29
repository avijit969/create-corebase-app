import inquirer from "inquirer";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const registry = require("../registry.json");

export async function askQuestions() {
    if (!registry.templates || registry.templates.length === 0) {
        console.error("No templates found in registry!");
        process.exit(1);
    }
    return inquirer.prompt([
        {
            type: "list",
            name: "template",
            message: "Choose a template",
            choices: registry.templates.map(t => ({
                name: t.name,
                value: t.id
            }))
        },
        {
            type: "input",
            name: "corebaseKey",
            message: "Enter Your Corebase Public API Key from https://corebase.trivyaa.in/platform : \n 👉"
        }
    ]);
}
