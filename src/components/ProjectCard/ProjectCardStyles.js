import {StyleSheet} from 'react-native';
import {Colors} from '../../theme/Theme';

export const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 30,
    marginTop: 20,
    alignSelf: 'center',
  },
  card: {
    borderRadius: 10,
  },
  cardItemTop: {borderTopLeftRadius: 10, borderTopRightRadius: 10},
  cardItemBottom: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
  },
  title: {
    color: Colors.primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  domainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  domain: {
    margin: 5,
    height: 25,
  },
  domainMore: {
    margin: 5,
  },
  domainText: {
    textTransform: 'capitalize',
  },
  description: {
    color: 'gray',
  },
});
