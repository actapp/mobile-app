const { spawn } = require('child_process');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout)

const PRODUCTION = "P"
const STAGING = "S"
const ANDROID = "A"
const IOS = "I"
const BOTH = "B"

const codepushBaseCommand = "appcenter codepush release-react -a "
const codepushAndroidApp = "mysharepal/ACT-Mobile"
const codepushIOSApp = "mysharepal/ACT-Mobile-iOS"

let platform = BOTH
let deployment = null

rl.question('Which platforms?\n\n - A (Android)\n\n - I (iOS)\n\n - B (Both)\n\nPlease enter A, I, or B:\n\n', answer => {
    const appNames = getAppNames(answer)

    process.stdout.write('\n')
    rl.question("Which deployment?\n\n - S (Staging)\n\n - P (Production)\n\nPlease enter S or P:\n\n", answer => {
        const deployment = getDeployment(answer)

        if(deployment == 'Production') {
            process.stdout.write('\n')
            rl.question('Are you sure you want to deploy to PRODUCTION? Please enter PRODUCTION to confirm: ', (answer) => {
                if (answer == 'PRODUCTION') {
                    deploy(appNames, deployment)
                } else {
                    console.log('Aborting...')
                    process.exit(0)
                }
            })
        } else {
            deploy(appNames, deployment)
        }
    })
})

function deploy(apps, codePushDeployment) {
    logDeploy(apps, codePushDeployment)

    for (let i = 0; i < apps.length; i++) {
        const command = codepushBaseCommand + apps[i] + " -d " + codePushDeployment
        console.log('Executing: ' + command)
        
        execCommand(command)
    }
}

function execCommand(command) {
    const child = spawn(command)
    child.stdout.on('data', chunk => {
        process.stdout.write(chunk)
    })
    child.stderr.on('data', chunk => {
        process.stderr.write(chunk)
    })

    child.on('close', (code) => {
        console.log(`Deployment exited with code ${code}`);
    });
}

function getAppNames(platform) {
    switch (platform) {
        case ANDROID:
            return [codepushAndroidApp]
        case IOS:
            return [codepushIOSApp]
        case BOTH:
            return [codepushAndroidApp, codepushIOSApp]
        default:
            throw new Error('Invalid platform: ' + platform)
    }
}

function getDeployment(deployment) {
    switch(deployment) {
        case PRODUCTION:
            return "Production";
        case STAGING:
            return "Staging"
        default:
            throw new Error('Invalid deployment: ' + deployment)
    }
}

function logDeploy(appNames, codePushDeployment) {
    console.log('Deploying to: ' + codePushDeployment + '; for platform(s): ' + appNames.join())
}