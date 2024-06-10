import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SIZES } from '../../../constant/theme'
import { FlatList } from 'react-native-gesture-handler'
import { Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import storageService from '../../../api/storageService'
import { getFirestore } from '@react-native-firebase/firestore'
import AntDesign from "react-native-vector-icons/AntDesign"

interface ChatSchema { _id: number; text: string; createdAt: Date; sendBy :Number; sendTo: Number; user: { _id: number; name: string; avatar: string; }; }
interface User {
    userId: number,
    userName: number
}
const ChatHomeScreen = () => {
    const [chatUser, setChatUser] = useState([1])
    const navigate = useNavigation()
    const firestore = getFirestore();
    const [userId, setUserId] = useState(-1)
    const [messages, setMessages] = useState([] as ChatSchema[]);
    storageService.getId().then(s => {
        setUserId(Number.parseInt(s?s:'' as string))
    })
  
    const [userName, SetUserName] = useState([] as User[]);
    useEffect(() => {
       
        const subcriber = firestore.collection("chats").doc(""+userId)
        .collection("messages").orderBy("createdAt", "desc").onSnapshot((snap) => {
            // const allMessage= snap.map(item => {
            //     return{...item.data(), }
            // }) 
            var message= snap.docs.map(item => {
                return{...item.data(), } as ChatSchema
            }) 
            var indexSendToId = [] as Number[]
            var distincArray = [] as ChatSchema[]
            message.forEach(element => {
                if(indexSendToId.includes(element.sendTo)){
                }
                else{
                    indexSendToId.push(element.sendTo);
                    distincArray.push(element)
                }
            });
            setMessages(distincArray)
        })
        return () => subcriber as never
    }, [userId])
    useEffect(() => {
        const subcriber = firestore.collection("users").onSnapshot((snap) => {
            var users= snap.docs.map(item => {
                return{...item.data(), } as User
            }) 
            SetUserName(users)
        })
        return () => subcriber as never
    }, [userId])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                onPress={()=> navigate.goBack()}
                style={{marginLeft:"1%"}}>
                <AntDesign name='arrowleft' size={35}></AntDesign>
                </TouchableOpacity>
                <Text style={styles.title}>Chat</Text>
            </View>
            <FlatList
                data={messages}
                renderItem={({ item, index }) => {
                    return (
                        <>
                        <TouchableOpacity
                        onPress={() =>  navigate.navigate({name: "ChatBox",
                            params: {
                                chatInput :{
                                    userId : userId,
                                    chatId: item.sendTo,
                                    username : userName.find(s=>s.userId == item.sendTo)?.userName
                                },
                            }} as never)}>
                            <View style={styles.chatItem}>
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: "https://picsum.photos/200/300?random=11",
                                    }}
                                />
                                <View style={styles.textcontainer}>
                                    <Text style={styles.name}>{userName.find(s=>s.userId == item.sendTo)?.userName}</Text>
                                    <Text style={styles.subtext}>{item.text}</Text>
                                </View>
                                <View style={styles.timecontainer}>
                                    <Text style={styles.time}>06/08</Text>
                                </View>    

                            </View>
                        </TouchableOpacity>
                        </>
                    )
                }}
            />
        </View>
    )
}

export default ChatHomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    },
    header: {
        width: "100%",
        elevation: 5,
        height: SIZES.height / 15,
        justifyContent: "flex-start",
        alignItems: "center",
        borderTopColor: "grey",
        flexDirection:"row"
    },
    title: {
        color: "black",
        fontSize: 30,
        fontWeight: '300',
        marginLeft: "35%"
    },
    chatItem: {
        width: SIZES.width * 0.9,
        alignSelf: "center",
        alignItems: "center",
        marginTop: 20,
        flexDirection: 'row',
        height: 60,
        borderWidth: 0.5,
        borderRadius: 10,
    },
    image: {
        height: 40,
        width: 40,
        marginLeft: 10, 
        borderRadius: 40,
    },
    name: {
        color:"black",
        fontSize: 15,
        fontWeight:"500",
    },
    subtext:{

    },
    textcontainer : {
        marginLeft:10,
    },
    timecontainer : {
        right : 0,
        flexDirection: 'row',
        width: "auto",
        marginLeft: "auto",
        marginRight: 10,
    },
    time : {
        right : 0,
        marginLeft: "auto"
    }
})