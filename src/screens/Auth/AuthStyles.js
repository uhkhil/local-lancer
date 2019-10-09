import { StyleSheet } from 'react-native';

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
  },
  titleText2: {
    fontSize: 35,
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
  buttonSignUp: {
    width: 150,
    justifyContent: 'center',
    backgroundColor: '#44d0af',
  },
  buttonSignin: {
    width: 150,
    justifyContent: 'center',
  },
  buttonSigninText: {
    color: 'black',
    borderColor: '#44d0af',
  },
  buttonGoogle: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#44d0af',
  },
  buttonFacebook: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#44d0af',
  },
  others: {
    flexDirection: 'row',
    width: 125,
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
});

export default styles;
