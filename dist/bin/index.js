#!/usr/bin/env node
import path from 'path';
import chalk from 'chalk';
import { fileExists } from "../helpers/fileExists.js";
import { executePromise, spawnExecutePromise } from "../helpers/execute.js";
const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName === '.' ? '' : !projectName ? 'mitm-boilerplate' : projectName);
// to change with github api
const git_repo = 'https://github.com/Anissemm/testing-template.git'; // just temporary
try {
    fileExists(projectName, projectPath);
    console.log('Creating MITM starter project in', chalk.blue(`${projectPath}.\n`));
    console.log(chalk.bold('Using yarn.\n'));
    await executePromise(`git clone --depth 1 ${git_repo} ${projectPath}`);
    process.chdir(projectPath);
    console.log('Installing dependencies:');
    console.log('-', chalk.greenBright('react'));
    console.log('-', chalk.greenBright('react-dom'));
    console.log('-', chalk.greenBright('next'));
    console.log('-', chalk.greenBright('styled-components'));
    console.log('-', chalk.greenBright('storybook\n'));
    await spawnExecutePromise(/^win/.test(process.platform) ? 'yarn.cmd' : 'yarn', [], 'Installing dependencies', /husky/gi);
    await executePromise(`npx rimraf ./.git`);
    await executePromise(`git init`, 'Initialized a git repository');
    await executePromise('yarn husky install', 'Installing git-hooks');
    console.log('\n');
    process.chdir('..');
    console.log(chalk.greenBright(`Success!`), `Created MITM starter project at ${projectPath}.`);
    process.exit(0);
}
catch (error) {
    console.log(error);
    process.exit(1);
}
