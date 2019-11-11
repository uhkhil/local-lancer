import React from 'react';
import {ScrollView} from 'react-native';
import {
  Text,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Badge,
} from 'native-base';
import firestore from '@react-native-firebase/firestore';

import {Wrapper} from '../../hocs/Wrapper';
import styles from './ChatListStyles';
import {FIRESTORE} from '../../constants';
import {AppRole} from '../../enums/AppRole';

class ChatListScreen extends React.Component {
  state = {
    chats: [],
  };

  constructor(props) {
    super(props);
    this.fetchChats();
  }

  fetchChats = () => {
    const user = this.props.userContext.user;
    const userMode = this.props.userContext.userMode;
    console.log('TCL: ChatListScreen -> fetchChats -> userMode', userMode);
    let channelsRef;
    switch (userMode) {
      case AppRole.freelancer:
        channelsRef = firestore()
          .collection(FIRESTORE.COLLECTIONS.CHANNELS)
          .where('freelancerId', '==', user._id);
        break;
      case AppRole.recruiter:
        channelsRef = firestore()
          .collection(FIRESTORE.COLLECTIONS.CHANNELS)
          .where('recruiterId', '==', user._id);
        break;
    }

    channelsRef.onSnapshot(
      snap => {
        const docs = snap.docs;
        const chats = [];
        docs.forEach(doc => {
          const data = doc.data();
          const otherGuy = data.users.find(u => {
            return u._id !== user._id;
          });
          const channelObj = {
            channelId: doc.id,
            ...data,
            name: `${data.projectName} : ${otherGuy.firstName} ${
              otherGuy.lastName
            }`,
            profilePic: 'https://lorempixel.com/400/400/people/1',
          };
          chats.push(channelObj);
        });
        console.log('TCL: ChatListScreen -> fetchChats -> chats', chats);
        this.setState({
          chats,
        });
      },
      error => {
        console.warn(error);
      },
    );
  };

  openChatWindow = chat => {
    this.props.navigation.navigate('ChatWindow', chat);
  };

  renderList = () => {
    return (
      <List>{this.state.chats.map(chat => this.renderListItem(chat))}</List>
    );
  };

  renderListItem = chat => {
    return (
      <ListItem onPress={() => this.openChatWindow(chat)} thumbnail>
        <Left>
          <Thumbnail source={{uri: chat.profilePic}} />
        </Left>
        <Body>
          <Text>{chat.name}</Text>
          <Text note numberOfLines={1}>
            {chat.lastMessage}
          </Text>
        </Body>
        <Right>
          <Text style={styles.time} note>
            8:10 pm
            {/* {chat.lastMessageOn} */}
          </Text>
          {chat.unreadCount ? (
            <Badge style={styles.badge} success>
              <Text style={styles.badgeText}>{chat.unreadCount}</Text>
            </Badge>
          ) : null}
        </Right>
      </ListItem>
    );
  };

  render() {
    return (
      <ScrollView>
        <Text style={styles.header}>Messages</Text>
        {this.renderList(this.state.chats)}
      </ScrollView>
    );
  }
}

export default Wrapper(ChatListScreen);
