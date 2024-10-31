export const sendVerificationCode = async (token, email) => {
    try {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_IP_ADDRESS}/send-verification-code`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
                body: JSON.stringify({ email })
            }
        )

        return response.ok
    } catch (error) {
        console.error(error)
    }
}

export const editProfile = async (
    token,
    email,
    password,
    dob,
    country,
    code
) => {
    try {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_IP_ADDRESS}/edit-profile`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
                body: JSON.stringify({ email, password, dob, country, code })
            }
        )

        if (response.ok) {
            const data = await response.json()
            return data.user
        } else {
            console.log(response.status)
        }
    } catch (error) {
        console.error(error)
    }
}

export const editAvatar = async (token, avatar) => {
    try {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_IP_ADDRESS}/edit-avatar`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
                body: JSON.stringify({ avatar })
            }
        )

        if (response.ok) {
            const data = await response.json()
            return data.user
        } else {
            console.log(response.status)
        }
    } catch (error) {
        console.error(error)
    }
}
