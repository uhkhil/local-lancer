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
    height: 23,
    width: 23,
    padding: 0,
    marginTop: 7,
  },
  badgeText: {
    fontSize: 12,
  },
});

export default styles;
