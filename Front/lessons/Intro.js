import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'

import { fetchCourseDetails } from '../handlers/lessons'

export default IntroLesson = (course_id) => {
    const [courseDetails, setCourseDetails] = useState()
    const [fetching, setFetching] = useState(true)
    useEffect(() => {
        // const fetchCourse = async () => {
        //     try {
        //         const details = await fetchCourseDetails()
        //         setCourseDetails(details)
        //     } catch (error) {
        //         console.log(error)
        //         setCourseDetails(undefined)
        //     } finally {
        //         setFetching(false)
        //     }
        // }
        // fetchCourse()
    }, [])

    return fetching ? (
        <View className={'flex h-full items-center justify-center'}>
            <Text className={'text-white'}>Fetching...</Text>
        </View>
    ) : courseDetails ? (
        <View className={'flex h-full items-center justify-center'}>
            <Text className={'text-white'}>{courseDetails}</Text>
        </View>
    ) : (
        <View className={'flex h-full items-center justify-center'}>
            <Text className={'text-white'}>Course not found...</Text>
        </View>
    )
}
