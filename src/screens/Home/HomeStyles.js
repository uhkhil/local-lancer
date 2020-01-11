import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {},
  carouselWrapper: {height: 450},
  loading: {
    marginTop: 100,
    alignItems: 'center',
    alignContent: 'center',
  },
  empty: {
    marginTop: 100,
    height: 200,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: 'white',
    fontSize: Fonts.h2,
  },
});

export default styles;
