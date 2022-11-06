import { mkdirSync } from "fs"

export const fileExists = (projectName: string, projectPath: string) => {
    try {
        if (projectName !== '.') {
            mkdirSync(projectPath)
        }

    } catch (err: any) {
        if (err.code === 'EEXIST') {
            console.log(`The file ${projectName} already exist in the current directory, please give it another name.`)
        } else {
            console.log(err);
        }
        process.exit(1);
    }
}