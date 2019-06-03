export async function mockDelay() {
    if (AppConfig.MOCK_DELAY > 0) {
        await timeout(AppConfig.MOCK_DELAY)
    }

    return
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}