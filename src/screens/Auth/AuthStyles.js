import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    height: 90,
    width: 90,
    borderRadius: 15,
    marginVertical: 25,
    elevation: 2,
  },
  title: {
    flexDirection: 'row',
  },
  titleText1: {
    fontSize: 35,
    fontWeight: 'normal',
    color: '#44d0af',
  },
  titleText2: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#44d0af',
  },
  subtitleText: {
    fontSize: 15,
    color: 'lightgray',
  },
  ctas: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 50,
  },
  buttonSignin: {
    width: 150,
    justifyContent: 'center',
    backgroundColor: '#44d0af',
  },
  buttonSigninText: {
    color: 'white',
    borderColor: '#44d0af',
  },
});

export default styles;
