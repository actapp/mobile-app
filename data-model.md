# Object models
## Account

`/documents/users/{userId}`

```
    {
        id: ${ Auth'd user ID - string },
        role: ${ Chosen or assigned role - string - one of LEADER, SHARER },
        ministryId: ${ Entered ministry ID upon account creation - string },
        data: {
            contacts: [
                {
                    id: ${ UUID, generated when contact was added - string },
                    mdn: ${ 10-digit phone number (no country code), entered when contact was added - string },
                    currentStepIndex: ${ Index of last step of share session, updated after each step is completed - number },
                    currentStepDesc: ${ Short desc. of last step of share session, updated after each step is completed - string }
                },
                ...
            ]
        }
    }
```