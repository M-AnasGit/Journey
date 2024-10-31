import React from 'react'
import { View, Text, Image } from 'react-native'
import LoadingBar from './LoadingBar'

const AccountHeader = (props) => {
    const convertThousands = (num) => {
        if (num < 1000) return num
        if (num < 1000000) return (num / 1000).toFixed(1) + 'K'
        if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M'
    }

    return (
        <View className={'flex items-center space-x-4 pb-2 pt-12'}>
            <LoadingBar progress={props.progress} />
            <View className={'flex flex-row space-x-8 pt-2'}>
                <View className={'flex flex-row items-center space-x-2'}>
                    <Image
                        source={require('../assets/vectors/fire.png')}
                        style={{
                            width: 20,
                            height: 20
                        }}
                    />
                    <Text className={'font-nunitoBlack text-lg text-white'}>
                        {props.streak}
                    </Text>
                </View>
                <View className={'flex flex-row items-center space-x-2'}>
                    <Image
                        source={require('../assets/vectors/dollar.png')}
                        style={{
                            width: 20,
                            height: 20
                        }}
                    />
                    <Text className={'font-nunitoBlack text-lg text-white'}>
                        {convertThousands(props.balance)}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default AccountHeader
