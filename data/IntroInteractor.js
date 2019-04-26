import store from 'react-native-simple-store';

export const videos = [
    '331795562',
    '331807648',
    '331807942',
    '331808269'
]

export function setVideosSeen() {
    store.save('videos_seen', true)
        .then(() => {
            console.log("Videos seen")
        })
}