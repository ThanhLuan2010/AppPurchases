import { StyleSheet, Text, View, ImageBackground, ActivityIndicator, TouchableOpacity, Alert, Modal, Linking } from 'react-native'
import React, { useState } from 'react'
const axios = require('axios').default;
const url = 'https://nguyennhattruong.herokuapp.com'
export default function LauchScreen({ navigation }) {
    const [loading, setloading] = useState(false)
    const [visible, setVisible] = useState(false)
    const request = async () => {
        setloading(true)
        const res = await axios.post('https://nguyennhattruong.herokuapp.com/users/request')
        const { code, message, data } = res.data
        if (code === 200) {
            Linking.openURL(data)
        }
        else {
            Alert.alert('Thông báo', message)
        }
        setloading(false)
    }
    return (
        <>
            <ImageBackground
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                source={require('./assets/background.jpg')}>

                <TouchableOpacity
                    onPress={() => navigation.navigate('mediaScreen')}
                    style={{ elevation:20, alignItems: 'center', width: 200, borderRadius: 8, backgroundColor: 'white', paddingVertical: 10, marginBottom: 70, justifyContent: 'center' }}>
                    <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>Phát nhạc</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={request} style={{ elevation:20,alignItems: 'center', width: 200, borderRadius: 8, backgroundColor: 'white', paddingVertical: 10, marginBottom: 70, justifyContent: 'center' }}>
                    <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>Trang chủ</Text>
                </TouchableOpacity>

            </ImageBackground>

            <Modal animationType='slide' transparent={true} statusBarTranslucent={true} visible={visible}>
                <View onTouchEnd={() => setVisible(false)} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', marginHorizontal: 20, paddingHorizontal: 15, paddingVertical: 20, borderRadius: 15 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>This is a music app for relax. We hope you can have good time here. Thank you</Text>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({})