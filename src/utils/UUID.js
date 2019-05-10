// Minimal hack around unavailability of crypto in RN
const fakeCrypto = {
    getRandomValues: (byteArray) => {
        for (let i = 0; i < byteArray.length; i++) {
            byteArray[i] = Math.floor(256 * Math.random());
        }

        return byteArray
    }
}

export default function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ fakeCrypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}