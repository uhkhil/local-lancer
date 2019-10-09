import React from 'react'
import { GiftedChat, Message, Bubble, InputToolbar } from 'react-native-gifted-chat'
import { Text } from 'native-base';
import { Colors } from '../../theme/Theme';

export default class ChatWindowScreen extends React.Component {
    state = {
        messages: [],
    }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    renderBubble(props) {
        return <Bubble {...props} wrapperStyle={{ right: { backgroundColor: Colors.primaryColor } }} />
    }

    renderInputToolbar(props) {
        return <InputToolbar {...props} />
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                renderBubble={this.renderBubble}
                renderInputToolbar={this.renderInputToolbar}
                user={{
                    _id: 1,
                }}
            />
        )
    }
}