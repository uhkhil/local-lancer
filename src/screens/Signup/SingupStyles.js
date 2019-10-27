import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 55,
    backgroundColor: 'white',
    margin: 10,
    padding: 8,
    color: 'gray',
    fontSize: 18,
    fontWeight: '400',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upper: {
    flex: 1,
    width: '100%',
    backgroundColor: '#44d0af',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lower: {
    flex: 1.2,
    width: '100%',
    alignItems: 'center',
  },
  signupText: {
    color: 'white',
    fontSize: 40,
  },
  inputs: {
    marginTop: -40,
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: '80%',
    marginHorizontal: 20,
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 10,
  },
  buttonSubmit: {
    width: 150,
    justifyContent: 'center',
    backgroundColor: '#44d0af',
    alignSelf: 'center',
    marginTop: 30,
  },
  buttonSubmitText: {
    fontSize: 20,
    color: 'white',
  },
});

export default styles;
