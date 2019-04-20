import { renderStep } from '../share/ShareStep';

const steps = require('../share/content/steps.json')
const stepScreens = {}
for (let i = 0; i < steps.length; i++) {
    let nextStep = null
    if (i < steps.length - 1) {
        nextStep = steps[i + 1]
    }

    stepScreens[steps[i].key] = renderStep(steps[i], nextStep)
}

export { steps, stepScreens } 