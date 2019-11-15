import {StyleSheet} from 'react-native';
import {Colors, Common} from '../../theme/Theme';

const styles = StyleSheet.create({
  ...Common,
  container: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
  },
  time: {
    fontSize: 10,
  },
  badge: {
    padding: 0,
    marginTop: 7,
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    alignSelf: 'center',
  },
});

export default styles;
