const { execSync } = require('child_process')
const chalk = require('chalk')
const readline = require('readline')

const promptConsole = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const askToAbort = () => {
    promptConsole.question('\n Would you like to abort operation? [Y/N] ', (answer) => {
        if (answer.toLowerCase() !== 'n') {
            execSync(`git rebase --abort`)
        }
        promptConsole.close();
    })
}

try {
    execSync(`git rebase master development`)
} catch(err) {
    console.log('\nrun "git rebase master development"\n')
    console.log('\n', err.output[1].toString())
    console.log(chalk.bgRed.white('\n !!!  WATCH OUT  !!! \n'))
    console.log(chalk.red('\n You are  \n'))
    console.log(chalk.bgRed.white(err.output[2].toString()))

    if (err.output[2].toString().search('CONFLICT') > -1) {
        askToAbort()
    }

    process.exit(0)
}
