import React, { useEffect, useState } from 'react'
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native'

import { useUpdated } from '../Context'
import Header from '../components/Header'
import SmallButton from '../components/SmallButton'

const avatarModal = ({ visible, handleVisible, onConfirmAvatar }) => {
    const { user } = useUpdated()
    const [selected, setSelected] = useState(user.avatar)
    const avatars = [0, 1, 2, 3, 4, 5]

    useEffect(() => {
        return () => {
            setSelected(user.avatar)
        }
    }, [])
    return (
        <Modal visible={visible} animationType="slide">
            <View className={'h-full bg-palette-primary'}>
                <View className={'pb-4'}>
                    <Header
                        children={
                            <Text
                                className={
                                    'font-nunitoBlack text-2xl text-white'
                                }
                            >
                                Change your avatar
                            </Text>
                        }
                    />
                </View>
                <View className={'mx-auto mt-4 w-5/6'}>
                    <SmallButton
                        text={'Exit avatar change'}
                        press={handleVisible}
                        type={1}
                    />
                </View>
                <View
                    className={
                        'mx-auto mt-4 flex w-5/6 flex-row flex-wrap justify-between'
                    }
                >
                    {avatars.map((avatar, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    {
                                        paddingHorizontal: 16,
                                        paddingVertical: 12,
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        borderColor: 'transparent'
                                    },
                                    selected == avatar && {
                                        backgroundColor:
                                            'rgba(215, 50, 57, 0.08)',
                                        borderColor: '#D83232'
                                    }
                                ]}
                                onPress={() => {
                                    setSelected(avatar)
                                }}
                            >
                                <Image
                                    source={{
                                        uri:
                                            process.env
                                                .EXPO_PUBLIC_SERVER_ADDRESS +
                                            '/upload/avatar(' +
                                            avatar +
                                            ').png'
                                    }}
                                    style={[
                                        {
                                            width: 125,
                                            height: 125,
                                            borderRadius: 50
                                        }
                                    ]}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View className={'mx-auto mt-4 w-5/6'}>
                    <SmallButton
                        text={'Confirm avatar change'}
                        press={() => onConfirmAvatar(selected)}
                        type={1}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default avatarModal
