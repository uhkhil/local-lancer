import {StyleSheet} from 'react-native';
import {Colors} from '../../theme/Theme';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
  },
  cardItemTop: {borderTopLeftRadius: 10, borderTopRightRadius: 10},
  cardItemBottom: {borderBottomLeftRadius: 10, borderBottomRightRadius: 10},
  title: {
    color: Colors.primaryColor,
    fontWeight: '900',
    // fontSize: 33,
    // lineHeight: 38,
  },
});
