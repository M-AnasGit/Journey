export const getToken = async (credential, password) => {
    try {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_IP_ADDRESS}/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ credential, password })
            }
        )

        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getUser = async (token) => {
    try {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_IP_ADDRESS}/user`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                }
            }
        )

        if (response.ok) {
            const data = await response.json()
            return data.user
        }
    } catch (error) {
        console.error(error)
    }
}

export const getForums = async (token) => {
    try {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_IP_ADDRESS}/forums`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                }
            }
        )

        if (response.ok) {
            const data = await response.json()
            return data.forums
        }
    } catch (error) {
        console.error(error)
    }
}

export const getCourses = async (token) => {
    try {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_IP_ADDRESS}/courses`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                }
            }
        )

        if (response.ok) {
            const data = await response.json()
            return data.courses
        }
    } catch (error) {
        console.error(error)
    }
}

export const getLeaderboard = async (token) => {
    try {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_IP_ADDRESS}/leaderboard`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                }
            }
        )

        if (response.ok) {
            const data = await response.json()
            return data.leaderboard
        }
    } catch (error) {
        console.error(error)
    }
}

export const checkUniqueUsername = async (username) => {
    try {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_IP_ADDRESS}/unique-username`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            }
        )

        if (response.ok) {
            return true
        } else {
            if (response.status === 400) {
                return { error: 'Username already exists' }
            } else {
                return { error: 'An error occurred! Please try again later!' }
            }
        }
    } catch (error) {
        console.error(error)
    }
}

export const registerUser = async (name, password) => {
    try {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_IP_ADDRESS}/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, password })
            }
        )

        if (response.ok) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error(error)
    }
}

export const forgotPassword = async (credential) => {
    try {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_IP_ADDRESS}/forgot-password`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ credential })
            }
        )

        if (response.ok) {
            return true
        } else {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.error(error)
    }
}
