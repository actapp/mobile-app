import { text } from '../../lib/AKCommunications'

export function sendMessage(phoneNumber) {
    text(phoneNumber)
}