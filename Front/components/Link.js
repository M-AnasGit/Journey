import React, { useState } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'

const Link = (props) => {
    return (
        <Pressable onPress={props.press}>
            <Text className={'font-nunitoExtraLight text-white underline'}>
                {props.text}
            </Text>
        </Pressable>
    )
}

export default Link
