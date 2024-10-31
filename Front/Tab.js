//@React native
import React from 'react'
import { View, Image, StatusBar } from 'react-native'
//@Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//@Screens
import Home from './pages/Home'
import Forums from './pages/Forums'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'

import { useUpdated } from './Context'

const Bottom = createBottomTabNavigator()

const Tab = () => {
    const { user } = useUpdated()

    return (
        <>
            <StatusBar style="light" backgroundColor="#37464D" />
            <Bottom.Navigator
                backBehavior="history"
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#202F36',
                        height: 70,
                        borderTopWidth: 3,
                        borderTopColor: '#37464D'
                    }
                }}
            >
                <Bottom.Screen
                    name="Home Stack"
                    component={Home}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={
                                    focused && {
                                        backgroundColor:
                                            'rgba(215, 50, 57, 0.08)',
                                        borderRadius: 10,
                                        padding: 6,
                                        borderColor: '#D83232',
                                        borderWidth: 1
                                    }
                                }
                            >
                                <Image
                                    source={require('./assets/tabs/home.png')}
                                    style={{
                                        height: 35,
                                        width: 35,
                                        resizeMode: 'contain'
                                    }}
                                />
                            </View>
                        ),
                        tabBarShowLabel: false
                    }}
                />
                <Bottom.Screen
                    name="Forums Stack"
                    component={Forums}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={
                                    focused && {
                                        backgroundColor:
                                            'rgba(215, 50, 57, 0.08)',
                                        borderRadius: 10,
                                        padding: 6,
                                        borderColor: '#D83232',
                                        borderWidth: 1
                                    }
                                }
                            >
                                <Image
                                    source={require('./assets/tabs/chat.png')}
                                    style={{
                                        height: 35,
                                        width: 35,
                                        resizeMode: 'contain'
                                    }}
                                />
                            </View>
                        ),
                        tabBarShowLabel: false
                    }}
                />
                <Bottom.Screen
                    name="Leaderboard Stack"
                    component={Leaderboard}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={
                                    focused && {
                                        backgroundColor:
                                            'rgba(215, 50, 57, 0.08)',
                                        borderRadius: 10,
                                        padding: 6,
                                        borderColor: '#D83232',
                                        borderWidth: 1
                                    }
                                }
                            >
                                <Image
                                    source={require('./assets/tabs/trophy.png')}
                                    style={{
                                        height: 35,
                                        width: 35,
                                        resizeMode: 'contain'
                                    }}
                                />
                            </View>
                        ),
                        tabBarShowLabel: false
                    }}
                />
                <Bottom.Screen
                    name="Profile Stack"
                    component={Profile}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={
                                    focused && {
                                        backgroundColor:
                                            'rgba(215, 50, 57, 0.08)',
                                        borderRadius: 10,
                                        padding: 6,
                                        borderColor: '#D83232',
                                        borderWidth: 1
                                    }
                                }
                            >
                                <Image
                                    source={{
                                        uri: `${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/upload/avatar(${0}).png`
                                    }}
                                    style={{
                                        height: 35,
                                        width: 35,
                                        resizeMode: 'contain'
                                    }}
                                />
                            </View>
                        ),
                        tabBarShowLabel: false
                    }}
                />
            </Bottom.Navigator>
        </>
    )
}

export default Tab
