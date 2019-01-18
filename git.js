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
        promptConsole.close()
        process.exit(0)
    })
}

try {
    console.log(execSync(`git rebase master development`).toString().trim())
} catch(err) {
    const firstOutput = err.output[1].toString()
    const secondOutput = err.output[2].toString()

    console.log('\nrun "git rebase master development"\n')

    console.log('\n', firstOutput)
    console.log(chalk.bgRed.white('\n !!!  WATCH OUT  !!! '))
    console.log('\n You are trying to rebase master onto development \n')
    console.log(chalk.bgRed.white(secondOutput))

    if (firstOutput.search('CONFLICT') > -1) {
        console.log(chalk.red('\n Some CONFLICTS was found \n'))
        askToAbort()
    } else {
        process.exit(0)
    }
}
