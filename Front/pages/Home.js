import React from 'react'
import { View, Text, ScrollView } from 'react-native'

import { useUpdated } from '../Context'
import Header from '../components/Header'
import Course from '../components/Course'
import AccountHeader from '../components/AccountHeader'

const Home = () => {
    const { user, courses } = useUpdated()

    const getUserProgress = (courseId) => {
        const course = user.course_details.find(
            (course) => course.course_id === courseId
        )
        return course ? course.progress : 0
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
                            Select a course to start
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
                {courses.map((course, index) => (
                    <View key={index} className={'py-4'}>
                        <Course
                            title={course.title}
                            img={course.img}
                            progress={getUserProgress(course.id)}
                            press={() => console.log('Course Pressed')}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default Home
