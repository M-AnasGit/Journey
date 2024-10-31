import React, { useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import * as SecureStore from 'expo-secure-store'

import { editAvatar } from '../handlers/profile'

import { useUpdated } from '../Context'
import Header from '../components/Header'
import AccountHeader from '../components/AccountHeader'
import SmallButton from '../components/SmallButton'

import avatarModal from '../modals/avatarModal'
import profileModal from '../modals/profileModal'

const Profile = () => {
    const { user, setToken, setUser, token } = useUpdated()
    const [visible, setVisible] = useState(false)
    const [avatarVisible, setAvatarVisible] = useState(false)
    const handleVisible = () => {
        setVisible(!visible)
    }

    const handleAvatarVisible = async () => {
        setAvatarVisible(!avatarVisible)
    }

    const onConfirmAvatar = async (avatar) => {
        try {
            const user = await editAvatar(token, avatar)
            setUser(user)
        } catch (error) {
            console.log(error)
        } finally {
            setAvatarVisible(false)
        }
    }

    const handleLogout = () => {
        setToken(null)
        SecureStore.deleteItemAsync('token')
    }
    return (
        <View
            className={'h-full items-center justify-center bg-palette-primary'}
        >
            <View className={'h-full bg-palette-primary'}>
                <Header
                    children={
                        <AccountHeader
                            progress={user.progress}
                            balance={user.balance}
                            streak={user.streak}
                        />
                    }
                />
                <View className={'mt-4'}>
                    <Header
                        children={
                            <Text
                                className={
                                    'font-nunitoBlack text-2xl text-white'
                                }
                            >
                                Your user profile
                            </Text>
                        }
                    />
                </View>
                <ScrollView
                    contentContainerStyle={{
                        paddingVertical: 35
                    }}
                >
                    <TouchableOpacity onPress={handleAvatarVisible}>
                        <Image
                            source={{
                                uri:
                                    process.env.EXPO_PUBLIC_SERVER_ADDRESS +
                                    '/upload/avatar(' +
                                    user.avatar +
                                    ').png'
                            }}
                            style={{
                                width: 150,
                                height: 150,
                                alignSelf: 'center'
                            }}
                        />
                    </TouchableOpacity>
                    <View
                        className={
                            'mx-4 mt-8 flex flex-row items-center justify-between'
                        }
                    >
                        <View>
                            <Text
                                className={
                                    'font-nunitoBlack text-lg text-white'
                                }
                            >
                                {user.name}
                            </Text>
                            <Text className={'font-nunitoRegular text-white'}>
                                Joined on {transformDate(user.created_at)}
                            </Text>
                        </View>
                        {user.country && (
                            <Image
                                source={{
                                    uri: `https://flagcdn.com/h120/${user.country}.png`
                                }}
                                height={25}
                                width={35}
                                style={{
                                    borderRadius: 2
                                }}
                            />
                        )}
                    </View>
                    <View
                        className={
                            'mb-8 mt-2 flex w-full flex-row justify-between px-4'
                        }
                    >
                        <Text
                            className={'font-nunitoBold text-palette-secondary'}
                        >
                            {user.completed_courses} Courses completed
                        </Text>
                        <Text
                            className={'font-nunitoBold text-palette-secondary'}
                        >
                            {user.ongoing_courses} Courses ongoing
                        </Text>
                    </View>
                    <View className={'mx-4 mb-8'}>
                        <SmallButton
                            text={'Edit profile'}
                            press={handleVisible}
                            type={true}
                        />
                    </View>
                    <View className={'border-b-4 border-b-palette-secondary'} />
                    <View className={'mb-8'}>
                        <Text
                            className={
                                'px-4 pb-4 pt-8 font-nunitoBlack text-lg text-white'
                            }
                        >
                            Achievements
                        </Text>
                        <View
                            className={
                                'mx-4 flex h-24 flex-row rounded-lg border-2 border-palette-secondary'
                            }
                        >
                            <Stat
                                number={user.streak}
                                stat={'Day streak'}
                                img={require('../assets/vectors/fire.png')}
                                border
                            />

                            <Stat
                                number={user.experience}
                                stat={'Total XP'}
                                img={require('../assets/vectors/experience.png')}
                                border
                            />
                            <Stat
                                number={user.balance}
                                stat={'Total gold'}
                                img={require('../assets/vectors/dollar.png')}
                            />
                        </View>
                    </View>
                    <View className={'mx-4'}>
                        <SmallButton
                            text={'Log out'}
                            press={handleLogout}
                            type={true}
                            colors={1}
                        />
                    </View>
                </ScrollView>
                {profileModal({ visible, handleVisible })}
                {avatarModal({
                    visible: avatarVisible,
                    handleVisible: handleAvatarVisible,
                    onConfirmAvatar
                })}
            </View>
        </View>
    )
}

const Stat = (props) => {
    return (
        <View
            className={`flex h-full w-1/3 items-center justify-center space-y-2 ${props.border && ' border-r-2 border-palette-secondary'}`}
        >
            <Image source={props.img} style={{ width: 30, height: 30 }} />
            <View className={'items-center'}>
                <Text className={'font-nunitoBlack text-white'}>
                    {props.number}
                </Text>
                <Text className={'font-nunitoRegular text-palette-secondary'}>
                    {props.stat}
                </Text>
            </View>
        </View>
    )
}

function transformDate(inputDate) {
    const date = new Date(inputDate)

    // // Extract the day, month, and year components
    const day = date.getDate()
    const month = date.getMonth() // getMonth() returns month index starting from 0
    const year = date.getFullYear()

    // Function to get the correct suffix for a given day
    function getDaySuffix(day) {
        const j = day % 10
        const k = day % 100
        if (j == 1 && k != 11) {
            return day + 'st'
        }
        if (j == 2 && k != 12) {
            return day + 'nd'
        }
        if (j == 3 && k != 13) {
            return day + 'rd'
        }
        return day + 'th'
    }

    // Array of month names
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    // Get the day with the correct suffix
    const dayWithSuffix = getDaySuffix(day)

    // Get the month name
    const monthName = months[month]

    // Construct the final transformed date
    const transformedDate = `${dayWithSuffix} of ${monthName} ${year}`

    return transformedDate
}

export default Profile
