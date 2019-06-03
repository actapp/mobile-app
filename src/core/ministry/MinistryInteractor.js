import MinistryService from './MinistryService'
import validateMinistryId from './MinistryIdValidator'

const MINIMUM_NAME_LENGTH = 3

// Only allow alphanumeric and space
const MINISTRY_NAME_REGEX = /^[A-Za-z0-9 ]+$/

// Since ministry ID follow AB001, if we are at AB999 we have to throw an error to preserve ID convention of 5 char length
const MAX_COLLIDED_PREFIXES = 999

const SUFFIX_LENGTH = 3

export async function createMinistry(name) {
    validateMinistryName(name)

    const newMinistry = await createNewMinistryModel(name)

    return await MinistryService.addMinistry(newMinistry)
}

export async function getMinistry(mid) {
    return await MinistryService.getMinistry(mid)
}

export async function updateMinistry(mid, ministry) {
    return await MinistryService.updateMinistry(mid, ministry)
}

function validateMinistryName(name) {
    if (!name || !name.length || name.length < MINIMUM_NAME_LENGTH) {
        throw new Error('Invalid name. Please enter at least 3 letters for your ministry name.')
    }

    if (!MINISTRY_NAME_REGEX.test(name)) {
        throw new Error('You entered an invalid ministry name. Please remove any special characters.')
    }
}

async function createNewMinistryModel(name) {
    const newId = await generateMinistryId(name)

    try {
        validateMinistryId(newId)
    } catch (error) {
        // For some reason, our code for generating ministry ID didn't match the validator
        // Throw a more generic error but still give enough context to investigate when reported
        // (Otherwise, user will think they entered their ministry *name* incorrectly)
        throw new Error('Failed to create ministry: Unable to generate ministry code ' + newId + '. This error has been reported and will be investigated.')
    }

    return {
        name,
        id: newId
    }
}

async function generateMinistryId(name) {
    const existingMinistryIds = await MinistryService.listMinistryIds()

    console.log('Obtained existing ministry IDs: ' + existingMinistryIds)

    return generateMinistryIdFromName(name, existingMinistryIds)
}
/**
 * Given the ministry name, generate a unique ministry ID.
 * 
 * Takes the first 2 letters of the ministry, capitalizes, then adds an incremental "index".
 * 
 * I.E. YWAM would be YW001 -- if more YWAM-related ministries (or ministries starting with YW) come on, it would increment each time.
 * 
 * @param {Name of the ministry} name 
 * @param {Existing ministry IDs to avoid} existingIds 
 */
function generateMinistryIdFromName(name, existingIds) {
    const capitalizeName = name.toUpperCase()
    const prefix = capitalizeName.substring(0, 2)
    const suffixInt = getFirstAvailableSuffixInt(prefix, existingIds)
    const suffix = padIntToString(SUFFIX_LENGTH, suffixInt)
    const mid = prefix + suffix

    console.log('Generated ministry ID: ' + mid)

    return mid
}

function getFirstAvailableSuffixInt(prefix, existingIds) {
    if (!existingIds || existingIds.length < 1) {
        return 0
    }

    const collidingIds = existingIds.filter(id => id.startsWith(prefix))

    if (!collidingIds || !collidingIds.length || collidingIds.length < 1) {
        return 0
    }

    const sortedCollidingIdSuffixes = idsToIntSuffixes(collidingIds)

    const highestSuffix = sortedCollidingIdSuffixes[0]

    if (highestSuffix >= MAX_COLLIDED_PREFIXES) {
        throw new Error('No more available ministry IDs for prefix: ' + prefix)
    }

    return highestSuffix + 1
}

function idsToIntSuffixes(ids) {
    return ids
        .map(id => id.substring(2))
        .map(id => parseInt(id))
        .sort((idA, idB) => idB - idA)
}

function padIntToString(toStringLength, integer) {
    const intString = `${integer}`

    for (let i = 1; i <= toStringLength; i++) {
        if (integer < (10 * i)) {
            let zeroString = ''
            const diff = toStringLength - intString.length

            while(zeroString.length < diff) {
                zeroString += '0'
            }

            return zeroString + intString
        }
    }
}