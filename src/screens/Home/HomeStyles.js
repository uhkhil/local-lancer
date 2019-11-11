import {StyleSheet} from 'react-native';
import {Colors} from '../../theme/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
  },
  profileBtn: {
    alignSelf: 'center',
    marginLeft: 20,
  },
  profileIcon: {
    color: Colors.white,
  },
  dmBtn: {
    marginRight: 20,
  },
  dmIcon: {fontSize: 35, color: Colors.white},
  dmBadge: {position: 'absolute', left: 40},
  deckContainer: {
    // padding: 40
  },
  card: {},
  loading: {
    marginTop: 100,
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default styles;
