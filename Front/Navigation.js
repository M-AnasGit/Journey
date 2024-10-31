import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as SecureStore from 'expo-secure-store'

import Loading from './pages/Loading'
import Landing from './pages/Landing'
import Create from './pages/auth/Create'
import Login from './pages/auth/Login'
import Forgot from './pages/auth/Forgot'

import Tab from './Tab'

import { getUser, getForums, getCourses, getLeaderboard } from './handlers/auth'

import { useUpdated } from './Context'

const Stack = createNativeStackNavigator()

const Navigation = () => {
    const {
        globalLoad,
        token,
        setGlobalLoad,
        setToken,
        setUser,
        setForums,
        setCourses,
        setLeaderboard
    } = useUpdated()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await SecureStore.getItemAsync('token')
                setToken(token)
                if (token) {
                    const user = await getUser(token)
                    setUser(user)
                    const forums = await getForums(token)
                    setForums(forums)
                    const courses = await getCourses(token)
                    setCourses(courses)
                    const leaderboard = await getLeaderboard(token)
                    setLeaderboard(leaderboard)
                }
            } catch (error) {
                SecureStore.deleteItemAsync('token')
                console.log(error)
            } finally {
                setGlobalLoad(false)
            }
        }

        fetchData()
    }, [token])

    if (globalLoad) return <Loading />

    return (
        <NavigationContainer>
            {token ? (
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Tab"
                        component={Tab}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator initialRouteName="Landing">
                    <Stack.Screen
                        name="Landing"
                        component={Landing}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="create"
                        component={Create}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="login"
                        component={Login}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="forgot"
                        component={Forgot}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}

export default Navigation
