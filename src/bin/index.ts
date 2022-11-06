#!/usr/bin/env node
import path from 'path'
import { rm } from 'fs/promises'
import chalk from 'chalk'

const projectName = process.argv[2]
const currentPath = process.cwd()
const projectPath = path.join(currentPath, projectName === '.' ? '' : !projectName ? 'mitm-starter' : projectName)

// to change with github api
const git_repo = 'https://github.com/Anissemm/testing-template.git' // just for testing purposes

try {
    console.log('Creating MITM starter project in', chalk.blue(`${projectPath}.\n`))

    console.log(chalk.bold('Using yarn.\n'))

    process.chdir(projectPath)

    await rm('./.git', { recursive: true, force: true })

    console.log('Installing dependencies:')
    console.log('-', chalk.greenBright('react'))
    console.log('-', chalk.greenBright('react-dom'))
    console.log('-', chalk.greenBright('next'))
    console.log('-', chalk.greenBright('styled-components'))
    console.log('-', chalk.greenBright('storybook\n'))

    console.log(chalk.greenBright(`Success!`), `Created MITM starter project at ${projectPath}.`)
    process.exit(0)
} catch (error) {
    console.log(error)
    process.exit(1)
}
