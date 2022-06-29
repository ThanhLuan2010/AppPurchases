import { StyleSheet, Text, View, ImageBackground, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import React,{useState} from 'react'
const axios = require('axios').default;
const url ='https://nguyennhattruong.herokuapp.com'
export default function LauchScreen({navigation}) {
    const [loading, setloading] = useState(false)
    const request = async()=>{
        setloading(true)
       const res = await axios.post('https://nguyennhattruong.herokuapp.com/users/request')
       const {code, message} = res.data
       if(code === 200){
        navigation.navigate('App')
       }
       else{
        Alert.alert('Thông báo', message)
       }
       setloading(false)
    }
    return (
        <>
          <ImageBackground
            style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}
            source={require('./assets/background.jpg')}>
                <TouchableOpacity onPress={request} style={{backgroundColor:'green', borderRadius:15, paddingHorizontal:40, paddingVertical:10, marginBottom:70, justifyContent:'center'}}>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Upgrade</Text>
                   {loading && <ActivityIndicator color={'white'} style={{position:'absolute', right:10}}/>} 
                </TouchableOpacity>
        </ImageBackground>
        </>
      
    )
}

const styles = StyleSheet.create({})