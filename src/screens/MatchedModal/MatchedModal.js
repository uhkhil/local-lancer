import React from 'react';
import {Text, Button, View, Icon, Thumbnail} from 'native-base';
import {Wrapper} from '../../hocs/Wrapper';

import {StyleSheet} from 'react-native';
import {Colors} from '../../theme/Theme';

class MatchedModalClass extends React.Component {
  render() {
    const {
      firstName,
      secondName,
      firstImage,
      secondImage,
      closeModal,
      openChat,
    } = this.props.navigation.state.params;
    return (
      <View
        style={[styles.container, {backgroundColor: this.props.theme.primary}]}>
        <View style={styles.topPanel}>
          <Button transparent>
            <Icon style={styles.close} name="close" onPress={closeModal} />
          </Button>
        </View>
        <View style={styles.content}>
          <Text style={styles.meetingText}>
            {firstName}, meet {secondName}
          </Text>
          <View style={styles.imagesContainer}>
            <Thumbnail
              style={[styles.image, styles.imageLeft]}
              source={{
                uri: firstImage,
              }}
            />
            <Thumbnail
              style={[styles.image, styles.imageRight]}
              source={{
                uri: secondImage,
              }}
            />
          </View>
          <Button style={styles.button} onPress={openChat}>
            <Text style={{color: this.props.theme.primary}}>
              Send a message
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export const MatchedModal = Wrapper(MatchedModalClass);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  topPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 20,
    height: 70,
  },
  close: {
    color: 'white',
    fontSize: 30,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imagesContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150,
    borderWidth: 5,
    borderColor: 'white',
  },
  imageLeft: {
    zIndex: 1,
    right: -20,
  },
  imageRight: {
    zIndex: 2,
    left: -20,
  },
  meetingText: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white',
  },
});
