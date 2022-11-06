#!/usr/bin/env node
import path from 'path'
import { rm } from 'fs/promises'
import chalk from 'chalk'
import { fileExists } from '../helpers/fileExists'
import { executePromise, spawnExecutePromise } from '../helpers/execute'

const projectName = process.argv[2]
const currentPath = process.cwd()
const projectPath = path.join(currentPath, projectName === '.' ? '' : !projectName ? 'mitm-starter' : projectName)

// to change with github api
const git_repo = 'https://github.com/Anissemm/testing-template.git' // just for testing purposes

try {
    fileExists(projectName, projectPath)
    console.log('Creating MITM starter project in', chalk.blue(`${projectPath}.\n`))

    console.log(chalk.bold('Using yarn.\n'))
    await executePromise(`git clone --depth 1 ${git_repo} ${projectPath}`)

    process.chdir(projectPath)

    await executePromise(`npx rimraf ./.git`)

    console.log('Installing dependencies:')
    console.log('-', chalk.greenBright('react'))
    console.log('-', chalk.greenBright('react-dom'))
    console.log('-', chalk.greenBright('next'))
    console.log('-', chalk.greenBright('styled-components'))
    console.log('-', chalk.greenBright('storybook\n'))

    await spawnExecutePromise(/^win/.test(process.platform) ? 'yarn.cmd' : 'yarn', [], 'Installing dependencies')
    await executePromise(`git init`)
    await executePromise('git add .')
    await executePromise('git commit -m "build: initial commit"', 'Initialized a git repository.\n')

    console.log(chalk.greenBright(`Success!`), `Created MITM starter project at ${projectPath}.`)
    process.exit(0)
} catch (error) {
    console.log(error)
    process.exit(1)
}
