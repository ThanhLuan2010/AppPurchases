import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, Slider, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import TrackPlayer, { State } from 'react-native-track-player';

const { width, height } = Dimensions.get('window')

export default function mediaScreen() {
    let myInterval = null;
    const [duration, setDuration] = useState(0);
    const [isPlay, setIsPlay] = useState(false);

    useEffect(() => {
        TrackPlayer.getState().then(res => {
            if (res === 2) {
                setIsPlay(false)
            }
            if (res === 3) {
                setIsPlay(true)
                getDuration()
            }
        })
    }, [isPlay])

    const startInterval = () => {
        myInterval = setInterval(async () => {
            getDuration()
        }, 1000);
    }

    const getDuration = async () => {
        TrackPlayer.getPosition().then(res => {
            setDuration(res)
            clearInterval(myInterval)
            if (res >= 269.94) {
                Alert.alert('hihi')
                TrackPlayer.destroy()
            } else {
                startInterval()
            }
        })


    }

    const destroy = async () => {
        await TrackPlayer.destroy()
        setIsPlay(false)

    }

    const pause = async () => {
        setIsPlay(false)
        await TrackPlayer.pause()
    }

    const start = async () => {
        setIsPlay(true)
        // Set up the player
        await TrackPlayer.setupPlayer();
        TrackPlayer.getDuration(res => {
            console.log('-----getDuration----', res)
        })
        TrackPlayer.updateOptions({
            stopWithApp: true,
            // maxArtworkSize: 600,
            // capabilities: [
            //   TrackPlayer.CAPABILITY_PLAY,
            //   TrackPlayer.CAPABILITY_PAUSE,
            //   TrackPlayer.CAPABILITY_JUMP_FORWARD,
            //   TrackPlayer.CAPABILITY_JUMP_BACKWARD,
            //   TrackPlayer.CAPABILITY_STOP,
            //   TrackPlayer.CAPABILITY_SEEK_TO,
            // ],
            // compactCapabilities: [
            //   TrackPlayer.CAPABILITY_PLAY,
            //   TrackPlayer.CAPABILITY_PAUSE,
            //   TrackPlayer.CAPABILITY_JUMP_FORWARD,
            //   TrackPlayer.CAPABILITY_JUMP_BACKWARD,
            //   TrackPlayer.CAPABILITY_SEEK_TO,
            // ],
          })
        // Add a track to the queue
        await TrackPlayer.add({
            id: 'trackId',
            url: require('./assets/mv.mp3'),
            title: 'Vì mẹ anh bắt chia tay',
            artist: 'Track Artist',
            artwork: require('./assets/backgroundMúic.jpg')
        });

        // Start playing it
        await TrackPlayer.play();
        startInterval()
    };


    return (
        <ImageBackground
            source={require('./assets/backgroundMúic.jpg')}
            style={{ flex: 1,justifyContent:'flex-end' }}
            resizeMode='stretch'
        >
            {/* <Image
                source={require('./assets/imageDvd.png')}
                style={{ width: width - 40, height: width - 40, alignSelf: 'center', resizeMode: 'contain', marginVertical: 30 }}
            /> */}

            <Slider
                value={duration}
                disabled={true}
                maximumValue={174.935}
                thumbTintColor={'red'}
                maximumTrackTintColor={'red'}
                onResponderEnd={() => {
                    Alert.alert('hihi')
                    clearInterval(myInterval)
                    TrackPlayer.destroy()
                }}
            />

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom:50}}>
                <TouchableOpacity
                    onPress={isPlay ? pause : start}
                    style={{ alignSelf: 'center' }}
                // onPress={()=>clearInterval(myInterval)}
                >
                    <Image
                        source={isPlay ? require('./assets/ic_pause.png') : require('./assets/ic_play.png')}
                        style={{ width: 30, height: 30, resizeMode: 'contain', tintColor:'red' }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={destroy}
                    style={{ alignSelf: 'center', marginLeft:20 }}
                // onPress={()=>clearInterval(myInterval)}
                >
                    <Image
                        source={require('./assets/ic_stop.png')}
                        style={{ width: 30, height: 30, resizeMode: 'contain',tintColor:'red' }}
                    />
                </TouchableOpacity>

            </View>






        </ImageBackground>
    )
}

const styles = StyleSheet.create({})