import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Intro from '../../components/Intro'
import Button from '../../components/Button'
import Input from '../../components/Input'

import { forgotPassword } from '../../handlers/auth'

const Forgot = () => {
    const navigation = useNavigation()
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [credential, setCredential] = useState('')

    const onNameChange = (text) => {
        setCredential(text)
    }

    const onForgot = async () => {
        try {
            const response = await forgotPassword(credential)
            if (response.error) {
                setSuccess('')
                setError(response.error)
            } else {
                setError('')
                setSuccess('Password reset link sent to your email')
            }
        } catch (error) {
            setSuccess('')
            setError('An error occurred! Please try again later!')
            console.log(error)
        }
    }

    return (
        <View className={'flex h-full justify-between bg-palette-primary'}>
            <View className={'mt-16'}></View>
            <Intro
                text={
                    'Enter the username or the email you used to create your account'
                }
            />

            <View
                className={'mb-16 flex w-full flex-col items-center space-y-4'}
            >
                <View className={'w-full pb-4 pt-2'}>
                    {error && !success && (
                        <Text
                            className={
                                'pb-2 text-center font-nunitoBlack text-lg text-palette-accent'
                            }
                        >
                            {error}
                        </Text>
                    )}
                    {success && !error && (
                        <Text
                            className={
                                'pb-2 text-center font-nunitoBlack text-lg text-green-500'
                            }
                        >
                            {success}
                        </Text>
                    )}

                    <Input
                        placeholder={'Username/Email'}
                        value={credential}
                        onChangeText={onNameChange}
                    />
                </View>

                <View className={'w-full'}>
                    <Button text={'Reset password'} type={1} press={onForgot} />
                </View>

                <View className={'w-full'}>
                    <Button
                        text={'Go back'}
                        type={0}
                        press={() => navigation.navigate('Landing')}
                    />
                </View>
            </View>
        </View>
    )
}

export default Forgot
