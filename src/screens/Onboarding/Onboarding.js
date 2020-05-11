import React from 'react';
import {Icon} from 'native-base';
import Onboarding from 'react-native-onboarding-swiper';
import {Wrapper} from '../../hocs/Wrapper';
import {FreelancerTheme, RecruiterTheme} from '../../theme/Theme';
import styles from './OnboardingStyles';

class OnboardingScreen extends React.Component {
  done = () => {
    // Navigate to Register
    this.props.navigation.navigate('Registration');
  };

  render() {
    const pages = [
      {
        backgroundColor: FreelancerTheme.primary,
        image: <Icon style={styles.icon} name="search" type="FontAwesome" />,
        title: 'Search',
        subtitle: 'Find work in your area.',
      },
      {
        backgroundColor: RecruiterTheme.primary,
        image: (
          <Icon style={styles.icon} name="check-circle" type="FontAwesome" />
        ),
        title: 'Negotiate',
        subtitle: 'Negotiate your own terms.',
      },
      {
        backgroundColor: FreelancerTheme.primary,
        image: <Icon style={styles.icon} name="rupee" type="FontAwesome" />,
        title: 'No Money',
        subtitle: 'No comissions. Direct payment.',
      },
    ];
    return (
      <Onboarding
        pages={pages}
        titleStyles={styles.title}
        subTitleStyles={styles.subTitle}
        onDone={this.done}
        onSkip={this.done}
      />
    );
  }
}

export default Wrapper(OnboardingScreen);
