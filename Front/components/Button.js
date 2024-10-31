import React, { useState } from 'react'
import { Text, Pressable, View, Animated } from 'react-native'

const Button = (props) => {
    const [translateAnimation] = useState(new Animated.Value(0))

    const handlePress = () => {
        if (props.press) {
            Animated.sequence([
                Animated.timing(translateAnimation, {
                    toValue: 8,
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
        <View className={'relative m-auto w-3/4'}>
            <View
                className={`absolute left-0 top-2 ${
                    props.type === 1
                        ? 'bg-palette-accentShadow'
                        : 'bg-palette-whiteShadow'
                } h-full w-full rounded-lg`}
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
                        props.type === 1 ? 'bg-palette-accent' : 'bg-white'
                    } w-full rounded-lg py-4`}
                >
                    <Text
                        className={`text-center font-nunitoBlack text-2xl ${
                            props.type === 1
                                ? 'text-white'
                                : 'text-palette-accent'
                        }`}
                    >
                        {props.text}
                    </Text>
                </Pressable>
            </Animated.View>
        </View>
    )
}

export default Button
