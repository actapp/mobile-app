let steps = null

/**
 * TODO - this could be downloaded from Firebase
 */
export default class StepsService {
    static getSteps = async () => {
        if (steps == null) {
            steps = require('./steps.json')
        }

        return steps
    }
}