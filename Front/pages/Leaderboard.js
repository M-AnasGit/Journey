import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'

import { useUpdated } from '../Context'
import Header from '../components/Header'
import AccountHeader from '../components/AccountHeader'

const Leaderboard = () => {
    const { user, leaderboard } = useUpdated()

    return (
        <View
            className={'h-full items-center justify-center bg-palette-primary'}
        >
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
                                className={
                                    'font-nunitoBlack text-2xl text-white'
                                }
                            >
                                The current learners ranking
                            </Text>
                        }
                    />
                </View>
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: 25,
                        paddingTop: 32
                    }}
                >
                    <View className={'flex items-center justify-center'}>
                        <Image
                            source={{
                                uri:
                                    process.env.EXPO_PUBLIC_SERVER_ADDRESS +
                                    `/upload/avatar(${leaderboard[0].avatar}).png`
                            }}
                            style={{
                                height: 75,
                                width: 75,
                                resizeMode: 'contain'
                            }}
                        />
                        <View className={'flex flex-row items-center pt-2'}>
                            <Image
                                source={require('../assets/vectors/medal1.png')}
                                style={{
                                    height: 30,
                                    width: 30,
                                    resizeMode: 'contain'
                                }}
                            />
                            <View>
                                <Text className={'font-nunitoBlack text-white'}>
                                    {leaderboard[0].name}
                                </Text>
                                <Text
                                    className={
                                        'font-nunitoSemiBold text-xs text-palette-secondary'
                                    }
                                >
                                    {leaderboard[0].experience} XP
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className={'mx-8 mt-4 flex flex-row justify-between'}>
                        <View className={'flex items-center justify-center'}>
                            <Image
                                source={{
                                    uri:
                                        process.env.EXPO_PUBLIC_SERVER_ADDRESS +
                                        `/upload/avatar(${leaderboard[1].avatar}).png`
                                }}
                                style={{
                                    height: 50,
                                    width: 50,
                                    resizeMode: 'contain'
                                }}
                            />
                            <View className={'flex flex-row items-center pt-2'}>
                                <Image
                                    source={require('../assets/vectors/medal2.png')}
                                    style={{
                                        height: 25,
                                        width: 25,
                                        resizeMode: 'contain'
                                    }}
                                />
                                <View>
                                    <Text
                                        className={
                                            'font-nunitoBlack text-xs text-white'
                                        }
                                    >
                                        {leaderboard[1].name}
                                    </Text>
                                    <Text
                                        className={
                                            'font-nunitoSemiBold text-[10px] text-palette-secondary'
                                        }
                                    >
                                        {leaderboard[1].experience} XP
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View className={'flex items-center justify-center'}>
                            <Image
                                source={{
                                    uri:
                                        process.env.EXPO_PUBLIC_SERVER_ADDRESS +
                                        `/upload/avatar(${leaderboard[2].avatar}).png`
                                }}
                                style={{
                                    height: 50,
                                    width: 50,
                                    resizeMode: 'contain'
                                }}
                            />
                            <View className={'flex flex-row items-center pt-2'}>
                                <Image
                                    source={require('../assets/vectors/medal3.png')}
                                    style={{
                                        height: 25,
                                        width: 25,
                                        resizeMode: 'contain'
                                    }}
                                />
                                <View>
                                    <Text
                                        className={
                                            'font-nunitoBlack text-xs text-white'
                                        }
                                    >
                                        {leaderboard[2].name}
                                    </Text>
                                    <Text
                                        className={
                                            'font-nunitoSemiBold text-[10px] text-palette-secondary'
                                        }
                                    >
                                        {leaderboard[2].experience} XP
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text
                        className={
                            'mt-4 text-center font-nunitoBlack text-xl text-white'
                        }
                    >
                        Your ranking
                    </Text>
                    <Ranking
                        children={
                            <View
                                className={
                                    'flex h-12 flex-row items-center rounded-lg bg-palette-secondary p-2'
                                }
                            >
                                <Text
                                    className={
                                        'w-1/6 text-center font-nunitoBlack text-white'
                                    }
                                >
                                    {leaderboard.findIndex(
                                        (l) => l.id === user.id
                                    ) + 1}
                                </Text>
                                <View className={'h-full w-[2px] bg-white'} />
                                <View
                                    className={
                                        'flex w-9/12 flex-row justify-between'
                                    }
                                >
                                    <View
                                        className={
                                            'flex flex-row items-center space-x-2 pl-4'
                                        }
                                    >
                                        <Image
                                            source={{
                                                uri:
                                                    process.env
                                                        .EXPO_PUBLIC_SERVER_ADDRESS +
                                                    `/upload/avatar(${
                                                        leaderboard.find(
                                                            (l) =>
                                                                l.id === user.id
                                                        ).avatar
                                                    }).png`
                                            }}
                                            style={{
                                                height: 30,
                                                width: 30,
                                                resizeMode: 'contain'
                                            }}
                                        />
                                        <Text
                                            className={
                                                'font-nunitoBlack text-white'
                                            }
                                        >
                                            {
                                                leaderboard.find(
                                                    (l) => l.id === user.id
                                                ).name
                                            }
                                        </Text>
                                    </View>
                                    <Text
                                        className={
                                            'self-center pt-1 font-nunitoBlack text-xs text-white'
                                        }
                                    >
                                        {
                                            leaderboard.find(
                                                (l) => l.id === user.id
                                            ).experience
                                        }{' '}
                                        XP
                                    </Text>
                                </View>
                            </View>
                        }
                    />
                    <Ranking
                        children={
                            <View
                                className={
                                    'flex rounded-lg bg-palette-secondary'
                                }
                            >
                                {leaderboard.slice(3).map((l, i) => (
                                    <View
                                        className={
                                            'flex h-12 flex-row items-center p-2'
                                        }
                                        key={i}
                                    >
                                        <Text
                                            className={
                                                'w-1/6 text-center font-nunitoBlack text-white'
                                            }
                                        >
                                            {i + 4}
                                        </Text>
                                        <View
                                            className={
                                                'h-full w-[2px] bg-white'
                                            }
                                        />
                                        <View
                                            className={
                                                'flex w-9/12 flex-row justify-between'
                                            }
                                        >
                                            <View
                                                className={
                                                    'flex flex-row items-center space-x-2 pl-4'
                                                }
                                            >
                                                <Image
                                                    source={{
                                                        uri: l.img
                                                    }}
                                                    style={{
                                                        height: 30,
                                                        width: 30,
                                                        resizeMode: 'contain'
                                                    }}
                                                />
                                                <Text
                                                    className={
                                                        'font-nunitoBlack text-white'
                                                    }
                                                >
                                                    {l.username}
                                                </Text>
                                            </View>
                                            <Text
                                                className={
                                                    'self-center pt-1 font-nunitoBlack text-xs text-white'
                                                }
                                            >
                                                {
                                                    leaderboard.find(
                                                        (l) => l.id === user.id
                                                    ).experience
                                                }{' '}
                                                XP
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        }
                    />
                </ScrollView>
            </View>
        </View>
    )
}

const Ranking = ({ children }) => {
    return (
        <View className={'relative mx-8 mt-4'}>
            <View
                className={
                    'absolute mt-[6px] flex h-full w-full rounded-lg bg-palette-secondaryShadow'
                }
            ></View>
            {children}
        </View>
    )
}

export default Leaderboard
