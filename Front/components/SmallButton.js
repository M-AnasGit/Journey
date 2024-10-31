import React, { useState } from 'react'
import { Text, Pressable, View, Animated } from 'react-native'

const SmallButton = (props) => {
    const [translateAnimation] = useState(new Animated.Value(0))

    const handlePress = () => {
        if (props.press) {
            Animated.sequence([
                Animated.timing(translateAnimation, {
                    toValue: 4,
                    duration: 100,
                    useNativeDriver: true
                }),
                Animated.timing(translateAnimation, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                })
            ]).start()

            props.press()
        }
    }

    return (
        <View className={'relative w-full'}>
            <View
                className={`absolute left-0 top-1 h-full w-full rounded-lg ${props.colors ? 'bg-palette-whiteShadow' : 'bg-palette-accentShadow'}`}
            ></View>
            <Animated.View
                style={{
                    transform: [
                        {
                            translateY: translateAnimation
                        }
                    ]
                }}
            >
                <Pressable
                    onPress={handlePress}
                    className={`${
                        props.type ? 'rounded-lg' : 'rounded-b-lg'
                    } w-full rounded-b-lg py-1 ${props.colors ? 'bg-white' : 'bg-palette-accent'}`}
                >
                    <Text
                        className={`text-center font-nunitoBlack text-xl ${props.colors ? 'text-palette-accent' : 'text-white'}`}
                    >
                        {props.text}
                    </Text>
                </Pressable>
            </Animated.View>
        </View>
    )
}

export default SmallButton
