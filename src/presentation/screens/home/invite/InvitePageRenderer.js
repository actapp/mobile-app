import React from 'react'

import { View, Text } from 'react-native'

export default function renderContent({
    ministryId,
    ministryName
}) {
    const inviteMessage = 'Invite others to join ' + ministryName + ' on MySharePal.'

    return (
        <View style={{ flexGrow: 1, height: '100%', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={{ color: 'white', marginBottom: 20, fontSize: 24, fontWeight: '200', textAlign: 'center' }}>
                {inviteMessage}
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
                {ministryId}
            </Text>
        </View>
    )
}