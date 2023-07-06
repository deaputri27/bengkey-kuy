import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as TalkRn from '@talkjs/expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStore from '../store/store';

const ChatScreen = (props) => {
    const [id, setId] = useState("")
    const partnerId = useStore(state =>
        state.partnerId
    )
    
    // const userId = async () =>{
    //     id = await AsyncStorage.getItem('userId')
    //     console.log(id);
    // }
    useEffect(() => {
        (async ()=>{
            const userId = await AsyncStorage.getItem("userId")
            setId(userId)
        })()
    },[])
    const me = {
        id: '987654321'+id,
        name: 'Tama',
        email: 'Sebastian@example.com',
        photoUrl: 'https://talkjs.com/images/avatar-5.jpg',
        welcomeMessage: 'Hey, how can I help? https://google.com',
        role: 'default',
    };
    const other = {
        id: '123456789'+partnerId,
        name: 'Alice',
        email: 'alice@example.com',
        photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
        welcomeMessage: 'Ada yang bisa kami bantu ?',
        role: 'default',
    };
    const conversationBuilder = TalkRn.getConversationBuilder(
        TalkRn.oneOnOneId(me, other)
    );
    conversationBuilder.setParticipant(me);
    conversationBuilder.setParticipant(other);

    console.log(id,"<<<<< ini ID");
    return (
        <TalkRn.Session appId='tJ02Bp0w' me={me} ><TalkRn.Chatbox conversationBuilder={conversationBuilder} /></TalkRn.Session>
    )
}

export default ChatScreen