import { useCallback } from 'react'
import { View } from 'react-native'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'

import Navigation from './Navigation'
import { UseProvider } from './Context'

import * as NavigationBar from 'expo-navigation-bar'

import IntroLesson from './lessons/Intro'

SplashScreen.preventAutoHideAsync()

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        'Nunito-Black': require('./assets/fonts/Nunito-Black.ttf'),
        'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
        'Nunito-SemiBold': require('./assets/fonts/Nunito-SemiBold.ttf'),
        'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
        'Nunito-ExtraLight': require('./assets/fonts/Nunito-ExtraLight.ttf')
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await NavigationBar.setBackgroundColorAsync('#202F36')
            await NavigationBar.setButtonStyleAsync('light')
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded, fontError])

    if (!fontsLoaded && !fontError) {
        return null
    }

    return (
        <View
            onLayout={onLayoutRootView}
            className={'h-full bg-palette-primary'}
        >
            <StatusBar style="light" backgroundColor="#202F36" />
            <UseProvider>
                <IntroLesson />
            </UseProvider>
        </View>
    )
}
