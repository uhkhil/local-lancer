import React from 'react';
import {GiftedChat, Bubble, Time} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

import {Wrapper} from '../../hocs/Wrapper';
import {FIRESTORE} from '../../constants';
import {Api} from '../../services/Api';
import {
  Button,
  Text,
  View,
  Header,
  Left,
  Right,
  Body,
  Icon,
  Title,
} from 'native-base';

class ChatWindowScreen extends React.Component {
  state = {
    messages: [],
  };

  constructor(props) {
    super(props);
    this.user = this.props.userContext.user;
  }

  async componentDidMount() {
    this.channelId = this.props.navigation.state.params.channelId;
    this.channelRef = firestore()
      .collection(FIRESTORE.COLLECTIONS.CHANNELS)
      .doc(this.channelId);
    const response = await Api.onEnterChat(this.channelId, this.user._id);
    this.fetchMessages();
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
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
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
    const result = await firestore()
      .collection(FIRESTORE.COLLECTIONS.MESSAGES)
      .add(messageObj);
    delete messageObj.channel;
    const countResult = await Api.onMessageAdd(this.channelId, messageObj);
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

  renderSend = () => (
    <Button>
      <Text>Send</Text>
    </Button>
  );

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
