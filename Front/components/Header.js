import React from 'react'
import { Text, View, Image } from 'react-native'

const Header = (props) => {
    return (
        <View className={'relative'}>
            <View
                className={
                    'absolute left-0 top-2 flex h-full w-screen items-center justify-center bg-palette-secondaryShadow'
                }
            ></View>
            <View
                className={
                    'flex min-h-[80px] w-screen items-center justify-center bg-palette-secondary'
                }
            >
                {props.children}
            </View>
        </View>
    )
}

export default Header
