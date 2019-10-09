import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, List, ListItem, Left, Thumbnail, Body, Right, Button, Badge } from 'native-base';
import styles from './ChatListStyles';

const chatList = [
    {
        userId: 0,
        name: 'Akhil Kumar',
        profilePic: 'https://lorempixel.com/400/400/people/1',
        lastMsg: 'Lorem ipsum dolor sit amet consectetur.',
        unreadCount: 2
    },
    {
        userId: 1,
        name: 'Akhil Kumar',
        profilePic: 'https://lorempixel.com/400/400/people/2',
        lastMsg: 'Lorem ipsum dolor sit amet consectetur.',
        unreadCount: 0
    },
    {
        userId: 2,
        name: 'Akhil Kumar',
        profilePic: 'https://lorempixel.com/400/400/people/3',
        lastMsg: 'Lorem ipsum dolor sit amet consectetur.',
        unreadCount: 3
    },
    {
        userId: 3,
        name: 'Akhil Kumar',
        profilePic: 'https://lorempixel.com/400/400/people/5',
        lastMsg: 'Lorem ipsum dolor sit amet consectetur.',
        unreadCount: 0
    },
    {
        userId: 4,
        name: 'Akhil Kumar',
        profilePic: 'https://lorempixel.com/400/400/people/4',
        lastMsg: 'Lorem ipsum dolor sit amet consectetur.',
        unreadCount: 0
    },
    {
        userId: 5,
        name: 'Akhil Kumar',
        profilePic: 'https://lorempixel.com/400/400/people/6',
        lastMsg: 'Lorem ipsum dolor sit amet consectetur.',
        unreadCount: 0
    },
    {
        userId: 6,
        name: 'Akhil Kumar',
        profilePic: 'https://lorempixel.com/400/400/people/7',
        lastMsg: 'Lorem ipsum dolor sit amet consectetur.',
        unreadCount: 0
    },
    {
        userId: 7,
        name: 'Akhil Kumar',
        profilePic: 'https://lorempixel.com/400/400/people/8',
        lastMsg: 'Lorem ipsum dolor sit amet consectetur.',
        unreadCount: 0
    },
]

export default class ChatListScreen extends React.Component {

    openChatWindow = (chat) => {
        this.props.navigation.navigate('ChatWindow');
    }


    renderList = (chatList) => {
        return (
            <List>
                {chatList.map(chat => this.renderListItem(chat))}
            </List>
        );
    };

    renderListItem = (chat) => {
        return <ListItem onPress={() => this.openChatWindow(chat)} thumbnail>
            <Left>
                <Thumbnail source={{ uri: chat.profilePic }} />
            </Left>
            <Body>
                <Text>{chat.name}</Text>
                <Text note numberOfLines={1}>{chat.lastMsg}</Text>
            </Body>
            <Right>
                <Text style={styles.time} note>08:14 pm</Text>
                {
                    chat.unreadCount ?
                        <Badge style={styles.badge} success>
                            <Text style={styles.badgeText}>{chat.unreadCount}</Text>
                        </Badge>
                        : null
                }
            </Right>
        </ListItem>
    }

    render() {
        return (
            <ScrollView>
                <Text style={styles.header}>Messages</Text>
                {this.renderList(chatList)}
            </ScrollView>
        )
    }
}
