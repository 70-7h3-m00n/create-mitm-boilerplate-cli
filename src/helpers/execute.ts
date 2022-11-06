import ora, { Ora } from 'ora'
import { exec } from 'child_process'
import { promisify } from 'util'

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
