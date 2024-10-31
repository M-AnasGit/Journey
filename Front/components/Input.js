import React, { useState } from 'react'
import { View, TextInput, Image, Pressable } from 'react-native'
import eye from '../assets/vectors/eye.png'
import eyeClosed from '../assets/vectors/eyeclosed.png'

const Input = (props) => {
    const [visible, setVisible] = useState(false)

    return (
        <View
            className={
                'relative m-auto w-5/6 rounded-lg border-2 border-[#9A9A9A] bg-[#ECEFF1] p-5'
            }
        >
            <TextInput
                placeholder={props.placeholder}
                secureTextEntry={props.isPassword && !visible}
                value={props.value}
                onChangeText={props.onChangeText}
                placeholderTextColor={'#9A9A9A'}
                className={'font-nunitoBold text-xl text-palette-primary'}
            />
            <Pressable
                className={`absolute right-5 top-[80%] translate-y-[-50%] ${
                    !props.isPassword && 'hidden'
                } `}
                onPress={() => setVisible(!visible)}
            >
                {visible ? (
                    <Image source={eyeClosed} className={'h-6 w-6'} />
                ) : (
                    <Image source={eye} className={'h-6 w-6'} />
                )}
            </Pressable>
        </View>
    )
}

export default Input
