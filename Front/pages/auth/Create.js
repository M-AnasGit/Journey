import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Intro from '../../components/Intro'
import Button from '../../components/Button'
import Input from '../../components/Input'

import { checkUniqueUsername, registerUser } from '../../handlers/auth'

const Create = () => {
    const navigation = useNavigation()
    const [error, setError] = useState(false)
    const [step, setStep] = useState(1)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const onNameChange = (text) => {
        setName(text)
    }

    const onPasswordChange = (text) => {
        setPassword(text)
    }

    const onContinue = async () => {
        if (step === 1) {
            try {
                const response = await checkUniqueUsername(name)
                if (response) {
                    setStep(2)
                } else {
                    setError(response.error)
                }
            } catch (error) {
                console.log(error)
            }
        } else if (step === 2) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
            if (!regex.test(password)) {
                setError(
                    'Password must contain at least 1 uppercase and lowercase letter, 1 number and be at least 8 characters long'
                )
                return
            }
            try {
                const response = await registerUser(
                    name.toLocaleLowerCase(),
                    password
                )
                if (response) {
                    navigation.navigate('login', {
                        created:
                            'Account created successfully! You can now log in!'
                    })
                } else {
                    setError('An error occurred! Please try again later!')
                }
            } catch (error) {
                setError('An error occurred! Please try again later!')
                console.log(error)
            }
        }
    }

    return (
        <View className={'flex h-full justify-between bg-palette-primary'}>
            <View className={'mt-16'}></View>
            <Intro
                text={
                    step === 1
                        ? 'What name do you want us to call you ?'
                        : 'Enter a password for your account'
                }
            />
            <View
                className={'mb-16 flex w-full flex-col items-center space-y-4'}
            >
                <View className={'w-full pb-4 pt-2'}>
                    {error && (
                        <Text
                            className={
                                'pb-2 text-center font-nunitoBlack text-lg text-palette-accent'
                            }
                        >
                            {error}
                        </Text>
                    )}
                    {step === 1 ? (
                        <Input
                            placeholder={'Username'}
                            value={name}
                            onChangeText={onNameChange}
                        />
                    ) : (
                        <Input
                            placeholder={'Password'}
                            isPassword={true}
                            value={password}
                            onChangeText={onPasswordChange}
                        />
                    )}
                </View>

                <View className={'w-full'}>
                    <Button text={'Continue'} type={1} press={onContinue} />
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

export default Create
