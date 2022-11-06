import ora, { Ora } from 'ora'
import { exec, spawn } from 'child_process'
import { promisify } from 'util'
import chalk from 'chalk'

const execPromise = promisify(exec)

export const executePromise = async (command: string, message: string | null = null) => {
    let spinner: null | Ora = null
    if (message) {
        spinner = ora(`${message}...`).start()
    }
    try {
        await execPromise(command)
        spinner && spinner.succeed(`${message}`)
    } catch (err) {
        spinner && spinner.fail(`${message}`)
        console.log(err)
    }
}

export const spawnExecutePromise = async (command = '', args = [], message: string | null = null, excludeLogs: RegExp) => {
    const spinner = ora(chalk.blue(`${message}...`)).start()
    return new Promise((resolve, reject) => {
        const executedProcess = spawn(command, args)

        executedProcess.stdout.on('data', (data: Blob) => {
            spinner.clear()
            const text = data.toString()
            if (text && !excludeLogs.test(text)) {
                console.log(text)
            }
            spinner.start()
        })

        executedProcess.stderr.on('data', (data: Blob) => {
            spinner.clear()
            const text = data.toString()
            if (text && !excludeLogs.test(text)) {
                console.log(chalk.yellow(text))
            }
            spinner.start()
        })

        executedProcess.on('exit', (code: number) => {
            if (code !== 0) {
                console.log(`child process exited with code ${code}`)
                spinner.fail(`${message}.`)
                reject()
            } else {
                spinner.succeed(`${message}.`)
                resolve(true)
            }
        })

        executedProcess.on('error', (err: any) => {
            spinner.fail(`${message}.`)
            reject(err)
        })

    })
}