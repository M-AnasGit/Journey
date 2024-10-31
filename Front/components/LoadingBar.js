import React from 'react'
import { View, Text } from 'react-native'

const LoadingBar = (props) => {
    return (
        <View
            className={`flex w-full flex-row items-center justify-start ${
                props.type ? 'space-x-2' : 'space-x-4'
            }`}
        >
            <View
                className={`w-10/12 rounded-[20px] bg-white p-1 ${
                    props.type ? 'h-4' : 'h-6'
                }`}
            >
                <View
                    className={`h-full rounded-[20px] bg-palette-primary/[50%]`}
                    style={{ width: `${props.progress}%` }}
                />
            </View>
            <Text
                className={`font-nunitoBlack text-white ${
                    !props.type && 'hidden'
                }`}
            >
                {props.progress} %
            </Text>
        </View>
    )
}

export default LoadingBar
