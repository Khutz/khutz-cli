#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
const program = new Command();
program
    .name("my-cli")
    .description("A CLI for initializing new projects")
    .version("1.0.0");
// Command to initialize a project
program
    .command("init")
    .description("Initialize a new project")
    .option("-n, --name <name>", "Name of the project")
    .option("-t, --template <template>", "Project template (e.g., react, vue, vanilla)")
    .action(async (options) => {
    console.log("Welcome to My CLI! 🚀");
    // Interactive prompts if options are not provided
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your project?",
            when: !options.name, // Only ask if not provided via CLI
        },
        {
            type: "list",
            name: "template",
            message: "Which template would you like to use?",
            choices: ["react", "vue", "vanilla"],
            when: !options.template, // Only ask if not provided via CLI
        },
    ]);
    // Combine options and answers
    const projectName = options.name || answers.name;
    const template = options.template || answers.template;
    // Ensure a name was provided
    if (!projectName) {
        console.error("Error: Project name is required!");
        process.exit(1);
    }
    // Create project directory
    const projectDir = path.resolve(process.cwd(), projectName);
    if (fs.existsSync(projectDir)) {
        console.error(`Error: Directory "${projectName}" already exists.`);
        process.exit(1);
    }
    fs.mkdirSync(projectDir);
    // Simulate generating files
    console.log(`\nCreating project "${projectName}" with template "${template}"...\n`);
    fs.writeFileSync(path.join(projectDir, "README.md"), `# ${projectName}\n\nGenerated with ${template} template.`);
    console.log("Project initialized successfully! 🎉\n");
    console.log(`\nTo get started:\n\n  cd ${projectName}\n  npm install\n  npm start\n`);
});
program.parse();
//# sourceMappingURL=index.js.map