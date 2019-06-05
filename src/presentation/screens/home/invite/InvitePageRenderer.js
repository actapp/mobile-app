import React from 'react'

import { View, Text } from 'react-native'

export default function renderContent(ministry) {
    const inviteMessageContent = createInviteMessageContent(ministry)

    return (
        <View style={{ flexGrow: 1, height: '100%', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            {inviteMessageContent}
        </View >
    )
}

function createInviteMessageContent(ministry) {
    if (ministry.data) {
        return (
            <>
                <Text style={{ color: 'white', marginBottom: 20, fontSize: 24, fontWeight: '200', textAlign: 'center' }}>
                    Invite others to join {ministry.data.name} on MySharePal
                </Text>


                <Text style={{ color: 'white', marginBottom: 30, fontSize: 24, fontWeight: '200', textAlign: 'center' }}>
                    Share the code below, or click the button to send it to others it now.
                </Text>


                <Text
                    selectable={true}
                    style={
                        {
                            fontSize: 30,
                            color: 'white',
                            textDecorationLine: 'underline',
                            textDecorationColor: 'white',
                            textDecorationStyle: 'solid',
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }
                    }>
                    {ministry.data.id}
                </Text>
            </>
        )
    }

    return (
        <>
            <Text style={{ color: 'white', marginBottom: 20, fontSize: 24, fontWeight: '200', textAlign: 'center' }}>
                Invite others to join you in sharing the Gospel via MySharePal
            </Text >
            <Text style={{ color: 'white', marginBottom: 30, fontSize: 24, fontWeight: '200', textAlign: 'center' }}>
                Click the button below to invite a friend now
            </Text>
        </>
    )
}

function contentText(text) {

}