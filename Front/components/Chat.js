import React, { useRef, useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'

const getDay = (dateStr) => {
    const date = new Date(dateStr)

    const options = { day: '2-digit', month: 'long', year: 'numeric' }
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)

    return formattedDate
}

const renderDayTitle = (day) => {
    return (
        <Text
            className={
                'rounded-lg bg-palette-primary px-2 py-1 text-center font-nunitoBlack text-sm text-palette-secondary'
            }
        >
            {day}
        </Text>
    )
}

const Chat = (props) => {
    const scrollViewRef = useRef()

    const [day, setDay] = useState(null)

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true })
        }

        return () => {
            setDay(null)
        }
    }, [props.messages])

    return (
        <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{
                marginHorizontal: 32,
                paddingBottom: 16
            }}
        >
            {props.messages.map((message, index) => {
                const messageDay = getDay(message.created_at)
                const previousMessage =
                    index !== 0
                        ? getDay(props.messages[index - 1].created_at)
                        : null

                let daytitle = null

                if (previousMessage !== messageDay) {
                    daytitle = renderDayTitle(messageDay)
                }

                return (
                    <View key={index}>
                        {daytitle}
                        <View
                            style={{
                                paddingVertical: 16,
                                alignSelf:
                                    message.user_id !== props.user.id
                                        ? 'flex-start'
                                        : 'flex-end'
                            }}
                        >
                            <Message
                                user={message.user}
                                message={message.content}
                                time={message.created_at}
                            />
                        </View>
                    </View>
                )
            })}
        </ScrollView>
    )
}

const Message = (props) => {
    return (
        <View
            className={
                'relative w-[250px] rounded-lg border-2 border-palette-secondary bg-palette-secondary/[25%] px-4 py-2'
            }
        >
            <View
                className={'flex flex-row items-end justify-between space-x-2'}
            >
                <View className={'max-w-[85%]'}>
                    <Text
                        className={
                            'font-nunitoBlack capitalize text-palette-secondary'
                        }
                    >
                        {props.user}
                    </Text>
                    <Text className={'font-nunitoSemiBold text-sm text-white'}>
                        {props.message}
                    </Text>
                </View>
                <Text
                    className={
                        'font-nunitoBlack capitalize text-palette-secondary'
                    }
                >
                    {fromatDate(props.time)}
                </Text>
            </View>
        </View>
    )
}

const fromatDate = (date) => {
    const newDate = new Date(date)
    return `${newDate.getHours()}:${newDate.getMinutes() < 10 ? '0' : ''}${newDate.getMinutes()}`
}

export default Chat
