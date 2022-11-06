import ora from 'ora';
import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';
const execPromise = promisify(exec);
export const executePromise = async (command, message = null) => {
    let spinner = null;
    if (message) {
        spinner = ora(`${message}...`).start();
    }
    try {
        await execPromise(command);
        spinner && spinner.succeed(`${message}`);
    }
    catch (err) {
        spinner && spinner.fail(`${message}`);
        console.log(err);
    }
};
export const spawnExecutePromise = async (command = '', args = [], message = null, excludeLogs) => {
    const spinner = ora(chalk.blue(`${message}...`)).start();
    return new Promise((resolve, reject) => {
        const executedProcess = spawn(command, args);
        executedProcess.stdout.on('data', (data) => {
            spinner.clear();
            const text = data.toString();
            if (text && !excludeLogs.test(text)) {
                console.log(text);
            }
            spinner.start();
        });
        executedProcess.stderr.on('data', (data) => {
            spinner.clear();
            const text = data.toString();
            if (text && !excludeLogs.test(text)) {
                console.log(chalk.yellow(text));
            }
            spinner.start();
        });
        executedProcess.on('exit', (code) => {
            if (code !== 0) {
                console.log(`child process exited with code ${code}`);
                spinner.fail(`${message}.`);
                reject();
            }
            else {
                spinner.succeed(`${message}.`);
                resolve(true);
            }
        });
        executedProcess.on('error', (err) => {
            spinner.fail(`${message}.`);
            reject(err);
        });
    });
};
