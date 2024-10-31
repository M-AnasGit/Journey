import React from 'react'
import { Text, View, Image } from 'react-native'
import SmallButton from './SmallButton'

const Forum = (props) => {
    return (
        <View className={'relative'}>
            <View
                className={`absolute left-0 h-full w-full rounded-lg bg-palette-secondary`}
            ></View>
            <View className={'w-full rounded-t-lg bg-palette-secondary'}>
                <View className={'flex flex-row items-center space-x-4 p-4'}>
                    <Image
                        source={{
                            uri: props.img
                        }}
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 5
                        }}
                    />
                    <Text
                        className={
                            'text-clip-ellipsis w-3/4 pr-4 font-nunitoBlack text-xl text-white'
                        }
                        numberOfLines={2}
                    >
                        {props.title}
                    </Text>
                </View>
                <View className={'flex flex-row justify-between px-4 pb-2'}>
                    <Text className={'font-nunitoBlack leading-7 text-white'}>
                        Participants: {props.participants}
                    </Text>
                    <Text className={'font-nunitoBlack leading-7 text-white'}>
                        Messages: {props.messages}
                    </Text>
                </View>
            </View>
            <SmallButton text={'Join chat'} press={props.press} />
        </View>
    )
}

export default Forum
