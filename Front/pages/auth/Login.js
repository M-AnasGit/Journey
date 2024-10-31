import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'

import Intro from '../../components/Intro'
import Link from '../../components/Link'
import Button from '../../components/Button'
import Input from '../../components/Input'

import { useUpdated } from '../../Context'
import { getToken } from '../../handlers/auth'

const Login = () => {
    const { setToken, setGlobalLoad } = useUpdated()
    const navigation = useNavigation()
    const route = useRoute()
    const { created } = route.params || {}
    const [error, setError] = useState(false)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const onNameChange = (text) => {
        setName(text)
    }

    const onPasswordChange = (text) => {
        setPassword(text)
    }

    const onLogin = async () => {
        try {
            const response = await getToken(name.toLocaleLowerCase(), password)
            if (response.error) {
                setError(response.error)
            } else {
                setGlobalLoad(true)
                setToken(response.token)
                SecureStore.setItemAsync('token', response.token)
            }
        } catch (error) {
            setError('An error occurred! Please try again later!')
            console.log(error)
        }
    }

    return (
        <View className={'flex h-full justify-between bg-palette-primary'}>
            <View className={'mt-16'}></View>
            <Intro text={'Fill the form below to log in to your account'} />
            <View className={'mb-16 flex w-full flex-col items-center'}>
                <View
                    className={
                        'relative flex w-full flex-col space-y-4 pb-8 pt-2'
                    }
                >
                    {error && (
                        <Text
                            className={
                                'px-4 text-center font-nunitoBlack text-lg text-palette-accent'
                            }
                        >
                            {error}
                        </Text>
                    )}
                    {created && (
                        <Text
                            className={`px-4 text-center font-nunitoBlack text-lg text-green-400 ${error && 'hidden'}`}
                        >
                            {created}
                        </Text>
                    )}
                    <View>
                        <Input
                            placeholder={'Username/Email'}
                            value={name}
                            onChangeText={onNameChange}
                        />
                    </View>
                    <View>
                        <Input
                            placeholder={'Password'}
                            isPassword={true}
                            value={password}
                            onChangeText={onPasswordChange}
                        />
                    </View>
                    <View className={'absolute bottom-3 left-8'}>
                        <Link
                            text={'Forgot password?'}
                            press={() => navigation.navigate('forgot')}
                        />
                    </View>
                </View>

                <View className={'w-full'}>
                    <Button text={'Log in'} type={1} press={onLogin} />
                </View>
            </View>
        </View>
    )
}

export default Login
