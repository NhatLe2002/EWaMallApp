import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import storageService from '../../../api/storageService'
import { getFirestore } from '@react-native-firebase/firestore'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from "react-native-vector-icons/AntDesign"
import { COLORS, SIZES } from '../../../constant/theme'
import { Image } from 'react-native-elements'

interface ChatSchema { _id: number; text: string; createdAt: Date; sendBy: Number; sendTo: Number; user: { _id: number; name: string; avatar: string; }; }

const ChatBox = () => {
    const route: any = useRoute().params;
    const navigate = useNavigation();
    const [chatId, setChatId] = useState(route.chatInput.chatId);
    const firestore = getFirestore();
    const [userId, SetUserId] = useState(route.chatInput.userId);
    const [messages, setMessages] = useState([] as ChatSchema[]);
    useEffect(() => {
        var allMessage = [] as ChatSchema[]
        // const subcriber = firestore.collection("chats")
        // .doc(""+userId+chatId)
        // .collection("messages").orderBy("createdAt", "desc").get().then(snap =>{
        //     const message = snap.docs.map(item => {
        //                 return{...item.data(), } as ChatSchema
        //             })   
        //     allMessage=allMessage.concat(message)
        //     setMessages(allMessage);
        //         })
        const moresubribe = firestore.collection("chats").doc("" + userId)
            .collection("messages").orderBy("createdAt", "desc").onSnapshot(snap => {
                const message = snap.docs.map(item => {
                    return { ...item.data(), } as ChatSchema
                })
                //allMessage=allMessage.concat(message)
                setMessages(message.filter(s => s.sendTo == chatId));
            })
        return () => {
            moresubribe;
            //  subcriber as never
        }
    }, [])

    const onSend = useCallback((messages: ChatSchema[]) => {
        const msg = messages[0];
        const firebaseMsgUser = {
            ...msg,
            sendBy: userId,
            sendTo: chatId,
            createdAt: Date.now(),
        }
        const firebaseMsgReceiver = {
            ...msg,
            sendBy: chatId,
            sendTo: userId,
            createdAt: Date.now(),
        }
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
        firestore.collection("chats").doc("" + userId)
            .collection("messages").add(firebaseMsgUser)
        firestore.collection("chats").doc("" + chatId)
            .collection("messages").add(firebaseMsgReceiver)
    }, [])
    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name='angle-double-down' size={22} />
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigate.goBack()}
                    style={{ marginLeft: "3%" }}>
                    <AntDesign name='arrowleft' size={35} color={COLORS.gray_1}></AntDesign>
                </TouchableOpacity>
                <Image
                    style={styles.image}
                    source={{
                        uri: "https://picsum.photos/200/300?random=11",
                    }}
                />
                <Text style={styles.textname}>{route.chatInput.username}</Text>
            </View>
            <GiftedChat
                alwaysShowSend
                messages={messages}
                onSend={messages => onSend(messages as never[])}
                user={{
                    _id: userId,
                    avatar: "https://picsum.photos/200/300?random=11",
                }}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
                renderAvatar={(prop)=>{
                    return(
                        <Image
                    style={styles.image}
                    source={{
                        uri: "https://picsum.photos/200/300?random=11",
                    }}
                />
                    )
                }}
            />
        </View>
    )
}

export default ChatBox

const styles = StyleSheet.create({
    header: {
        width: "100%",
        elevation: 5,
        height: SIZES.height / 15,
        justifyContent: "flex-start",
        alignItems: "center",
        borderTopColor: "grey",
        flexDirection: "row"
    },
    image: {
        height: 40,
        width: 40,
        marginLeft: 10,
        borderRadius: 40,
    },
    textname : {
        marginLeft: "1%",
        fontSize: 20,
        fontWeight: "500"
    }
})