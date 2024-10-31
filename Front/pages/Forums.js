import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'

import { useUpdated } from '../Context'
import Header from '../components/Header'
import Forum from '../components/Forum'
import AccountHeader from '../components/AccountHeader'

import chatModal from '../modals/chatModal'

const Forums = () => {
    const { user, forums } = useUpdated()
    const [chatVisible, setChatVisible] = useState(false)
    const [selected, setSelected] = useState(null)

    const handleOpenChat = (id) => {
        setSelected(id)
        handleChatVisible(true)
    }

    const handleChatVisible = (state) => {
        setChatVisible(state)
    }

    return (
        <View className={'h-full bg-palette-primary'}>
            <Header
                children={
                    <AccountHeader
                        progress={user.progress}
                        balance={user.balance}
                        streak={user.streak}
                    />
                }
            />
            <View className={'mt-4'}>
                <Header
                    children={
                        <Text
                            className={'font-nunitoBlack text-2xl text-white'}
                        >
                            Select a topic to discuss
                        </Text>
                    }
                />
            </View>
            <ScrollView
                className={'mt-4 flex flex-col'}
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 32
                }}
            >
                {forums.map((forum, index) => (
                    <View key={index} className={'py-4'}>
                        <Forum
                            title={forum.title}
                            img={forum.img}
                            participants={handleBigNumbers(
                                forum.participants,
                                1
                            )}
                            messages={handleBigNumbers(forum.messages, 1)}
                            press={() => handleOpenChat(forum.id)}
                        />
                    </View>
                ))}
                {chatModal({
                    id: selected,
                    visible: chatVisible,
                    handleVisible: () => handleChatVisible(false)
                })}
            </ScrollView>
        </View>
    )
}

function handleBigNumbers(data, type) {
    if (type === 1) {
        if (data > 100) {
            return '99+'
        }
        return data
    } else {
        if (data > 1000) {
            return '999+'
        }
        return data
    }
}

export default Forums
