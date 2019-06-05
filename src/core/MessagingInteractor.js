import { text } from '../../lib/AKCommunications'

export function sendMessage(phoneNumber) {
    text(phoneNumber)
}

export function sendMessageWithBody(phoneNumber, body) {
    text(phoneNumber, body)
}