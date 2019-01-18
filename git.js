const { execSync } = require('child_process')

try {
    execSync(`git rebase master development`)
} catch(err) {
    console.log(err.stderr.toString())
}
