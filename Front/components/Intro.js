import React from 'react'
import { View, Text, Image } from 'react-native'
import logo from '../assets/icons/logo.png'

const Intro = (props) => {
    return (
        <View className={'flex flex-col items-center space-y-4'}>
            <Image source={logo} className={'h-40 w-64'} />
            <View className={'flex flex-col items-center justify-center'}>
                <Text
                    className={
                        'tracking-custom text-center font-nunitoBlack text-3xl capitalize text-white'
                    }
                >
                    {process.env.EXPO_PUBLIC_APP_NAME}
                </Text>
                <Text
                    className={
                        'text-center font-nunitoRegular text-lg text-white'
                    }
                >
                    {props.text}
                </Text>
            </View>
        </View>
    )
}

export default Intro
