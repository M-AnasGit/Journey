import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Modal,
    Image,
    ActivityIndicator,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { io } from 'socket.io-client'

import { useUpdated } from '../Context'
import Header from '../components/Header'
import SmallButton from '../components/SmallButton'
import Chat from '../components/Chat'

import { getForumMessages, sendMessageinForum } from '../handlers/chat'

const chatModal = ({ id, visible, handleVisible }) => {
    const { user, forums, token } = useUpdated()
    const [messages, setMessages] = useState(null)
    const [input, setInput] = useState('')
    const [socket, setSocket] = useState(null)
    const handleTextChange = (t) => {
        setInput(t)
    }

    const getMessages = async () => {
        try {
            const data = await getForumMessages(token, id)
            setMessages(data)
            let temp_socket = io(process.env.EXPO_PUBLIC_IP_ADDRESS)
            setSocket(temp_socket)
        } catch (error) {
            console.log(error)
        }
    }

    const sendMessage = async () => {
        if (!input) return
        try {
            const result = await sendMessageinForum(token, id, input)
            if (result) {
                setInput('')
                setMessages(result)
                socket && socket.emit('sendMessage', id, result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const exitChat = () => {
        socket && socket.emit('leaveForum', id)
        socket && socket.disconnect()
        handleVisible()
    }

    useEffect(() => {
        if (visible) {
            getMessages()
        }

        return () => {
            setMessages([])
        }
    }, [visible])

    useEffect(() => {
        if (socket) {
            socket.emit('setId', user.id, id)
            socket.on('receiveMessage', (forum_id, data) => {
                if (forum_id === id) setMessages(data)
            })
        }
    }, [socket])

    return (
        id && (
            <Modal visible={visible} animationType="slide">
                <View className={'h-full bg-palette-primary'}>
                    <View className={'pb-4'}>
                        <Header
                            children={
                                <View
                                    className={
                                        'flex w-4/5 flex-row items-center space-x-4'
                                    }
                                >
                                    <Image
                                        source={{
                                            uri: forums.find(
                                                (forum) => forum.id === id
                                            ).img
                                        }}
                                        style={{
                                            width: 60,
                                            height: 60
                                        }}
                                    />
                                    <Text
                                        className={
                                            'font-nunitoBlack text-2xl text-white'
                                        }
                                    >
                                        {
                                            forums.find(
                                                (forum) => forum.id === id
                                            ).title
                                        }
                                    </Text>
                                </View>
                            }
                        />
                    </View>
                    <Header
                        children={
                            <Text
                                className={
                                    'font-nunitoBlack text-2xl text-white'
                                }
                            >
                                Online participants:{' '}
                                {handleBigNumbers(
                                    forums.find((f) => f.id === id).participants
                                )}
                            </Text>
                        }
                    />
                    <View className={'mx-auto mt-4 w-5/6'}>
                        <SmallButton
                            text={'Exit chat'}
                            press={exitChat}
                            type={1}
                        />
                    </View>
                    {!messages ? (
                        <View className={'mt-32'}>
                            <ActivityIndicator size="large" color="#fff" />
                        </View>
                    ) : (
                        <View className={'mt-4 h-[60%]'}>
                            {messages?.length > 0 ? (
                                <Chat user={user} messages={messages} />
                            ) : (
                                <Text
                                    className={
                                        'text-center font-nunitoBlack text-white'
                                    }
                                >
                                    No messages yet
                                </Text>
                            )}
                        </View>
                    )}
                    <View
                        className={
                            'absolute bottom-0 flex w-full flex-row items-center justify-center space-x-2 bg-palette-primary'
                        }
                    >
                        <TextInput
                            className={
                                'relative mb-4 w-[70%] rounded-lg border-2 border-palette-secondary bg-palette-secondary/[25%] px-4 py-2 font-nunitoSemiBold text-sm text-white'
                            }
                            value={input}
                            onChangeText={(t) => handleTextChange(t)}
                            placeholder={'Type a message...'}
                            placeholderTextColor={'#9A9A9A'}
                            onSubmitEditing={sendMessage}
                        />
                        <TouchableOpacity onPress={sendMessage}>
                            <Image
                                source={require('../assets/vectors/send.png')}
                                style={{
                                    width: 45,
                                    height: 45,
                                    transform: [{ rotate: '45deg' }],
                                    marginBottom: 16
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    )
}

function handleBigNumbers(data) {
    if (data > 100) {
        return '99+'
    }
    return data
}

export default chatModal
