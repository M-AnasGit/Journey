import React from 'react'
import { Text, View, Image, ActivityIndicator } from 'react-native'
import icon from '../assets/icons/logo.png'

export default Loading = () => {
    return (
        <View
            className={
                'h-full items-center justify-center space-y-8 bg-palette-primary'
            }
        >
            <Image source={icon} className={'h-36 w-56'} />
            <ActivityIndicator size={'large'} color={'#fff'} />
        </View>
    )
}
