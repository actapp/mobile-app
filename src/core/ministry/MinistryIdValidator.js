/**
 * Ensure only capitalized letters for prefix
 */
const MINISTRY_PREFIX_REGEX = /^[A-Z]+$/

/**
 * Ensure only numbers for suffix
 */
const MINISTRY_SUFFIX_REGEX = /^[A-Z0-9]+$/

const MINISTRY_ID_PREFIX_LENGTH = 2
const MINISTRY_ID_SUFFIX_LENGTH = 3
const MINISTRY_ID_LENGTH = MINISTRY_ID_PREFIX_LENGTH + MINISTRY_ID_SUFFIX_LENGTH

/**
 * Ensures that a given ministry ID matches the current ministry ID pattern / convenction.
 * 
 * This is helpful for 2 things:
 * - When creating a new ministry ID
 * - When a sharer enters / associates to a ministry ID, validating the input
 * 
 * @param {ID to validate} ministryId 
 */
export default function validateMinsitryId(ministryId) {
    const invalidReason = checkForInvalidReason(ministryId)

    if (invalidReason != null) {
        throw new Error('Invalid ministry code ' + ministryId + '. ' + reason)
    }
}

function checkForInvalidReason(ministryId) {
    if(!ministryId || !ministryId.length || ministryId.length < 1) {
        return 'Please enter a value'
    }

    if(ministryId.length !== MINISTRY_ID_LENGTH) {
        return 'Please enter a ' + MINISTRY_ID_LENGTH + ' digit value'
    }

    const prefix = ministryId.substring(0, MINISTRY_ID_PREFIX_LENGTH)
    const suffix = ministryId.substring(MINISTRY_ID_PREFIX_LENGTH)

    if(!MINISTRY_PREFIX_REGEX.test(prefix)) {
        return 'Ministry code should start with 2 capital letters'
    }

    if(!MINISTRY_SUFFIX_REGEX.test(suffix)) {
        return 'Ministry code should end with 3 numbers'
    }

    return null
}