import store from 'react-native-simple-store';

export async function getContacts() {
    try {
        const contacts = await store.get('contacts');

        console.log('got: ' + JSON.stringify(contacts));

        let keyedContacts = [];
        const keys = Object.keys(contacts);
        for (let i = 0; i < keys.length; i++) {
            keyedContacts.push({ ...contacts[keys[i]], key: contacts[keys[i]].id });
        }

        return keyedContacts;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export async function hasContacts() {
    try {
        const contacts = await getContacts()
        return contacts != null && contacts.length > 0
    } catch (error) {
        throw error
    }
}