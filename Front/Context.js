import { createContext, useContext, useState } from 'react'

const UseContext = createContext()

export const UseProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [globalLoad, setGlobalLoad] = useState(true)

    const [user, setUser] = useState({})
    const [courses, setCourses] = useState([])
    const [forums, setForums] = useState([])
    const [leaderboard, setLeaderboard] = useState([])

    return (
        <UseContext.Provider
            value={{
                token,
                setToken,
                globalLoad,
                setGlobalLoad,
                user,
                setUser,
                courses,
                setCourses,
                forums,
                setForums,
                leaderboard,
                setLeaderboard
            }}
        >
            {children}
        </UseContext.Provider>
    )
}

export const useUpdated = () => useContext(UseContext)
