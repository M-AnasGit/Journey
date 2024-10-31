import React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Button from '../components/Button'
import Intro from '../components/Intro'

const Landing = () => {
    const navigation = useNavigation()
    return (
        <View className={'flex h-full justify-between bg-palette-primary'}>
            <View className={'mt-16'}></View>
            <Intro text={'Learning is a journey. Make it fun!'} />
            <View className={'mb-16 flex flex-col items-center space-y-4'}>
                <View className={'w-full'}>
                    <Button
                        text={'Get started'}
                        type={1}
                        press={() => navigation.navigate('create')}
                    />
                </View>

                <View className={'w-full'}>
                    <Button
                        text={'Have an account?'}
                        type={0}
                        press={() => navigation.navigate('login')}
                    />
                </View>
            </View>
        </View>
    )
}

export default Landing
