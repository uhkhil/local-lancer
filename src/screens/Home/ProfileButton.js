import React from 'react';
import {Button, Thumbnail} from 'native-base';
import {Wrapper} from '../../hocs/Wrapper';

class ProfileButtonComponent extends React.PureComponent {
  render() {
    const {style, viewProfile, userContext} = this.props;
    const {image} = userContext.user;

    return (
      <Button rounded transparent style={style} onPress={viewProfile}>
        <Thumbnail source={{uri: image}} />
      </Button>
    );
  }
}

export default Wrapper(ProfileButtonComponent);
