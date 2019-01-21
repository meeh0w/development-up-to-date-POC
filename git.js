const { execSync } = require('child_process')
const chalk = require('chalk')

try {
    const output = execSync(`git rebase master development`).toString()
    console.log(output)
} catch(err) {
    const firstOutput = err.output[1].toString()
    const secondOutput = err.output[2].toString()

    console.log('\nrun: "git rebase master development"\n')

    console.log('\n', firstOutput)
    console.log(chalk.bgRed.white('\n !!!  WATCH OUT  !!! '))
    console.log('\n You are trying to rebase master onto development \n')
    console.log(chalk.bgRed.white(secondOutput))

    if (firstOutput.search('CONFLICT') > -1) {
        console.log(`
            ${chalk.red('\n Some CONFLICTS was found! \n')}
            Please resolve them manually!
        `)
        execSync(`git rebase --abort`)
    }
}
