import { text, select, cancel, group } from "@clack/prompts";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const registry = require("../registry.json");

export async function askQuestions(initialProjectName) {
    if (!registry.templates || registry.templates.length === 0) {
        cancel("No templates found in registry!");
        process.exit(1);
    }

    const questions = {};

    if (!initialProjectName) {
        questions.projectName = () => text({
            message: "What is your project named?",
            placeholder: "my-corebase-app",
            validate: (value) => {
                if (!value) return "Please enter a project name.";
            }
        });
    }

    questions.template = () => select({
        message: "Choose a template",
        options: registry.templates.map(t => ({
            label: t.name,
            value: t.id
        }))
    });

    questions.corebaseKey = () => text({
        message: "Enter Your Corebase Public API Key from https://corebase.trivyaa.in/platform :",
        placeholder: "cb_pub_...",
        validate: (value) => {
            if (!value) return "Please provide the API key. You can create it in the dashboard.";
        }
    });

    const answers = await group(questions, {
        onCancel: () => {
            cancel("Operation cancelled.");
            process.exit(0);
        },
    });

    if (initialProjectName) {
        answers.projectName = initialProjectName;
    }

    return answers;
}
