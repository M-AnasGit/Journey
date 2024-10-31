import React, { memo, useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    Modal,
    ScrollView,
    Pressable,
    FlatList,
    TouchableOpacity
} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import { sendVerificationCode, editProfile } from '../handlers/profile'

import { useUpdated } from '../Context'
import Header from '../components/Header'
import SmallButton from '../components/SmallButton'
import Input from '../components/Input'

import countries from '../assets/codes.json'

const profileModal = ({ visible, handleVisible }) => {
    const { user, token, setUser } = useUpdated()
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState('')
    const [error, setError] = useState('')
    const [code, setCode] = useState('')

    const [password, setPassword] = useState('')

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [dob, setDob] = useState('')

    const [isCountryPickerVisible, setCountryPickerVisibility] = useState(false)
    const [country, setCountry] = useState('')

    const handleVerify = async () => {
        try {
            const result = await sendVerificationCode(
                token,
                email.toLowerCase()
            )
            if (!result) {
                setSent('')
                setError('An error occurred! Please try again later.')
            } else {
                setError('')
                setSent('A verification code has been sent to your email')
            }
        } catch (error) {
            setSent('')
            setError('An error occurred! Please try again later.')
            console.log(error)
        }
    }

    const handleDatePicking = (state) => {
        setDatePickerVisibility(state)
    }

    const handleCountryPicking = (state) => {
        setCountryPickerVisibility(state)
    }

    const handleConfirmDate = (date) => {
        setDob(formatDate(date))
        console.log(dob)
        handleDatePicking(false)
    }

    const handleConfirmCountry = (country) => {
        setCountry(country)
        handleCountryPicking(false)
    }

    const handleEdit = async () => {
        if (!email || !code || !password || !dob || !country) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
            if (!regex.test(password)) {
                setSent('')
                setError(
                    'Password must contain at least 1 uppercase and lowercase letter, 1 number and be at least 8 characters long'
                )
                return
            }
            setSent('')
            setError('Please fill all fields')
            return
        }

        try {
            const result = await editProfile(
                token,
                email.toLocaleLowerCase(),
                password,
                dob,
                country,
                code
            )
            if (!result) {
                setSent('')
                setError('An error occurred! Please try again later.')
            } else {
                setUser(result)
                handleVisible()
            }
        } catch (error) {
            setSent('')
            setError('An error occurred! Please try again later.')
        }
    }

    useEffect(() => {
        return () => {
            setEmail('')
            setSent('')
            setError('')
            setCode('')
            setPassword('')
            setDob('')
            setCountry('')
        }
    }, [])
    return (
        <Modal visible={visible} animationType="slide">
            <View className={'h-full bg-palette-primary'}>
                <View className={'pb-4'}>
                    <Header
                        children={
                            <View
                                className={
                                    'flex w-full flex-row items-center justify-center space-x-8'
                                }
                            >
                                <Image
                                    source={{
                                        uri:
                                            process.env
                                                .EXPO_PUBLIC_SERVER_ADDRESS +
                                            '/upload/avatar(' +
                                            user.avatar +
                                            ').png'
                                    }}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        alignSelf: 'center'
                                    }}
                                />
                                <View>
                                    <Text
                                        className={
                                            'font-nunitoBlack text-lg text-white'
                                        }
                                    >
                                        {user.name}
                                    </Text>
                                    <Text
                                        className={
                                            'font-nunitoRegular text-white'
                                        }
                                    >
                                        Joined on{' '}
                                        {transformDate(user.created_at)}
                                    </Text>
                                </View>
                            </View>
                        }
                    />
                </View>
                <Header
                    children={
                        <Text
                            className={'font-nunitoBlack text-2xl text-white'}
                        >
                            Complete your profile
                        </Text>
                    }
                />
                <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
                    <View className={'mx-auto mt-4 w-5/6'}>
                        <SmallButton
                            text={'Exit profile'}
                            press={handleVisible}
                            type={1}
                        />
                    </View>
                    <View className={'mt-4'}>
                        <Input
                            placeholder={'Email'}
                            value={email}
                            onChangeText={(e) => setEmail(e)}
                        />
                    </View>
                    <View className={'mx-auto mt-4 w-5/6'}>
                        <SmallButton
                            text={'Send verification code'}
                            press={handleVerify}
                            type={1}
                        />
                    </View>
                    {sent && (
                        <View className={'mx-auto mt-4 w-5/6 pl-1'}>
                            <Text
                                className={
                                    ' font-nunitoBlack text-lg text-palette-secondary'
                                }
                            >
                                {sent}
                            </Text>
                        </View>
                    )}
                    {error && (
                        <View className={'mx-auto mt-4 w-5/6 pl-1'}>
                            <Text
                                className={
                                    ' font-nunitoBlack text-lg text-palette-secondary'
                                }
                            >
                                {error}
                            </Text>
                        </View>
                    )}
                    <View className={'mt-4'}>
                        <Input
                            placeholder={'Verification code'}
                            value={code}
                            onChangeText={(e) => setCode(e)}
                        />
                    </View>
                    <View className={'mx-auto mt-4 w-5/6 pl-1'}>
                        <Text
                            className={
                                ' font-nunitoBlack text-lg text-palette-secondary'
                            }
                        >
                            Your password must include at least:
                        </Text>
                        <Text
                            className={
                                ' font-nunitoBlack text-lg text-palette-secondary'
                            }
                        >
                            1 Uppercase & Lowercase letter
                        </Text>
                        <Text
                            className={
                                ' font-nunitoBlack text-lg text-palette-secondary'
                            }
                        >
                            1 Number
                        </Text>
                        <Text
                            className={
                                ' font-nunitoBlack text-lg text-palette-secondary'
                            }
                        >
                            8 characters long
                        </Text>
                    </View>
                    <View className={'mt-4'}>
                        <Input
                            placeholder={'Password'}
                            value={password}
                            onChangeText={(e) => setPassword(e)}
                            isPassword
                        />
                    </View>
                    <View
                        className={
                            'mx-auto mt-4 flex w-5/6 flex-row justify-between'
                        }
                    >
                        <Pressable
                            onPress={() => handleDatePicking(true)}
                            style={{ flex: 1, marginRight: 8 }}
                        >
                            <View
                                className={
                                    'rounded-lg border-2 border-[#9A9A9A] bg-[#ECEFF1] p-5'
                                }
                            >
                                <Text
                                    className={`font-nunitoBold text-xl ${dob ? 'text-palette-primary' : 'text-[#9A9A9A]'}`}
                                    numberOfLines={1}
                                >
                                    {dob ? dob : 'Date of birth'}
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => handleCountryPicking(true)}
                            style={{ flex: 1, marginLeft: 8 }}
                        >
                            <View
                                className={
                                    'rounded-lg border-2 border-[#9A9A9A] bg-[#ECEFF1] p-5'
                                }
                            >
                                <Text
                                    className={`font-nunitoBold text-xl ${country ? 'text-palette-primary' : 'text-[#9A9A9A]'}`}
                                    numberOfLines={1}
                                >
                                    {country ? country.name : 'Country'}
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={() => handleDatePicking(false)}
                    />
                    <CountryPicker
                        visible={isCountryPickerVisible}
                        onConfirm={handleConfirmCountry}
                        onCancel={() => handleCountryPicking(false)}
                    />
                    <View className={'mx-auto mt-4 w-5/6'}>
                        <SmallButton
                            text={'Confirm details'}
                            press={handleEdit}
                            type={1}
                        />
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

const CountryPicker = (props) => {
    return (
        <Modal visible={props.visible} animationType="fade" transparent>
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                activeOpacity={1}
                onPress={props.onCancel}
            >
                <View className={'m-auto h-1/2 w-2/3 rounded-lg bg-white'}>
                    <FlatList
                        data={countries}
                        keyExtractor={(item) => item.code}
                        renderItem={({ item }) => (
                            <Country item={item} onConfirm={props.onConfirm} />
                        )}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

const Country = memo(({ item, onConfirm }) => {
    return (
        <Pressable onPress={() => onConfirm(item)}>
            <View className={'flex flex-row items-center space-x-4 p-2'}>
                <Image
                    source={{
                        uri: `https://flagcdn.com/h120/${item.code}.png`
                    }}
                    height={25}
                    width={35}
                />
                <Text className={'font-semibold text-palette-primary'}>
                    {item.name}
                </Text>
            </View>
        </Pressable>
    )
})

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

function formatDate(date) {
    const d = new Date(date)
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const year = d.getFullYear()
    return `${year}-${month}-${day}`
}

export default profileModal
