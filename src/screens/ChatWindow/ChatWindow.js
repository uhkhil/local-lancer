import React from 'react';
import {GiftedChat, Bubble, Time} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {
  Button,
  View,
  Header,
  Left,
  Right,
  Body,
  Icon,
  Title,
} from 'native-base';

import {Wrapper} from '../../hocs/Wrapper';
import {FIRESTORE} from '../../constants';
import {Api} from '../../services/Api';

class ChatWindowScreen extends React.Component {
  state = {
    messages: [],
  };

  constructor(props) {
    super(props);
    this.user = this.props.userContext.user;
  }

  async componentDidMount() {
    this.chat = this.props.navigation.state.params;
    this.channelRef = firestore()
      .collection(FIRESTORE.COLLECTIONS.CHANNELS)
      .doc(this.chat.channelId);
    this.fetchMessages();
    Api.onEnterChat(this.chat.channelId, this.user._id);
  }

  fetchMessages = async () => {
    const messagesRef = firestore()
      .collection(FIRESTORE.COLLECTIONS.MESSAGES)
      .where('channel', '==', this.channelRef)
      .orderBy('createdOn', 'desc');
    messagesRef.onSnapshot(snap => {
      const messages = [];
      snap.forEach(doc => {
        const data = doc.data();
        const messageObj = {
          _id: doc.id,
          ...data,
          createdAt: data.createdOn.toDate(),
          user: {
            _id: data.from ? data.from : 2,
            name: this.chat.name,
            avatar: this.chat.image,
          },
          system: !data.from,
        };
        messages.push(messageObj);
      });
      this.setState({messages});
    });
  };

  async onSend(messages = []) {
    const message = messages[messages.length - 1];
    this.addMessage(message);
  }

  addMessage = async message => {
    const messageObj = {
      channel: this.channelRef,
      text: message.text,
      type: 'TEXT',
      createdOn: new Date(),
      from: this.user._id,
    };
    await firestore()
      .collection(FIRESTORE.COLLECTIONS.MESSAGES)
      .add(messageObj);
    delete messageObj.channel;
    await Api.onMessageAdd(this.chat.channelId, messageObj);
  };

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {backgroundColor: this.props.theme.primary},
          left: {
            backgroundColor: this.props.theme.otherPrimary,
          },
        }}
        textStyle={{left: {color: 'white'}}}
      />
    );
  };

  renderTime(props) {
    return <Time {...props} timeTextStyle={{left: {color: 'white'}}} />;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header style={{backgroundColor: 'white'}}>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" style={this.props.theme.color} />
            </Button>
          </Left>
          <Body>
            <Title style={[this.props.theme.color]}>
              {this.props.navigation.state.params.name}
            </Title>
          </Body>
          <Right />
        </Header>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderBubble={this.renderBubble}
          renderInputToolbar={this.renderInputToolbar}
          renderTime={this.renderTime}
          user={{
            _id: this.user._id,
          }}
        />
      </View>
    );
  }
}

export default Wrapper(ChatWindowScreen);
