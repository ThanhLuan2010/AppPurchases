import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import App from './App'
import lauchScreen from './lauchScreen';
import mediaScreen from './mediaScreen';
const Stack = createStackNavigator();
export default function Setup() {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <>
                    <Stack.Screen name="lauchScreen" component={lauchScreen} />
                    <Stack.Screen name="App" component={App} />
                    <Stack.Screen name="mediaScreen" component={mediaScreen} />
                    
                </>
            </Stack.Navigator>
        </NavigationContainer>

    )
}

const styles = StyleSheet.create({})