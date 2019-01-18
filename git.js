const { execSync } = require('child_process')
const readline = require('readline')
const promptConsole = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

try {
    execSync(`git rebase master development`)
} catch(err) {
    console.log('>>', err.output[1].toString())
    console.log('>>', err.output[2].toString())

    promptConsole.question('Would you like to abort rebase? [Y/N] ', (answer) => {
        if (answer.toLowerCase() === 'y') {
            execSync(`git rebase --abort`)
        }

        promptConsole.close();
    });
}
