import React from 'react'
import { Text, View, Image } from 'react-native'
import SmallButton from './SmallButton'
import LoadingBar from './LoadingBar'

const Course = (props) => {
    const getText = () => {
        switch (props.progress) {
            case 0:
                return 'Start course'
            case 100:
                return 'Review course'
            default:
                return 'Continue course'
        }
    }

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
                <View className={'px-4 pb-4'}>
                    <LoadingBar progress={props.progress} type={true} />
                </View>
            </View>
            <SmallButton text={getText()} press={props.press} />
        </View>
    )
}

export default Course
