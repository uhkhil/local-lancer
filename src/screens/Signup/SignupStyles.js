import {StyleSheet} from 'react-native';
import {Colors, FreelancerTheme} from '../../theme/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlign: 'left',
    width: '100%',
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'normal',
    color: FreelancerTheme.primary,
    textAlign: 'left',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  socials: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  social: {
    marginRight: 10,
  },
  socialIcon: {
    color: FreelancerTheme.primary,
  },
  actionButton: {
    backgroundColor: FreelancerTheme.primary,
    width: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  actionButtonText: {
    textAlign: 'center',
  },
  footerText: {
    fontSize: 20,
    color: FreelancerTheme.primary,
  },
});

export default styles;
