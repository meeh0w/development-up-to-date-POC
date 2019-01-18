const { execSync } = require('child_process')
const chalk = require('chalk')
const readline = require('readline')
const promptConsole = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

try {
    execSync(`git rebase master development`)
} catch(err) {
    console.log('\n', err.output[1].toString())
    console.log('\n', err.output[2].toString())
    console.log(chalk.red('BIG-ASS RED MESSAGE'))

    promptConsole.question('Would you like to abort rebase? [Y/N] ', (answer) => {
        if (answer.toLowerCase() === 'y') {
            execSync(`git rebase --abort`)
        }

        promptConsole.close();
    });
}
