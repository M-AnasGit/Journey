export const getForumMessages = async (token, id) => {
    try {
        const result = await fetch(
            `${process.env.EXPO_PUBLIC_IP_ADDRESS}/forum-messages/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                }
            }
        )

        if (result.ok) {
            const data = await result.json()
            return data.messages
        } else {
            return []
        }
    } catch (error) {
        console.log(error)
    }
}

export const sendMessageinForum = async (token, forum_id, message) => {
    try {
        const result = await fetch(
            `${process.env.EXPO_PUBLIC_IP_ADDRESS}/send-message`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
                body: JSON.stringify({
                    message,
                    forum_id
                })
            }
        )

        if (result.ok) {
            const data = await result.json()
            return data.messages
        } else {
            return []
        }
    } catch (error) {
        console.log(error)
    }
}
