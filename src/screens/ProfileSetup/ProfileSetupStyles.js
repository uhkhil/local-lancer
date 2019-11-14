import {StyleSheet, Dimensions} from 'react-native';
import {Colors, Fonts} from '../../theme/Theme';

const {width, height} = Dimensions.get('window');

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
  singlePage: {
    width: width,
    height: height,
    backgroundColor: Colors.primaryColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'column',
  },
  mainSection: {
    flex: 1.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigTextContainer: {},
  bigText: {
    color: Colors.white,
    fontSize: 32,
    textAlign: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 55,
    // backgroundColor: 'white',
    borderBottomWidth: 2,
    borderColor: Colors.white,
    margin: 10,
    padding: 8,
    color: Colors.white,
    fontSize: 18,
    fontWeight: '400',
  },
  buttonContainer: {
    // marginTop: 40,
  },
  button: {
    backgroundColor: Colors.white,
    width: 150,
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.primaryColor,
    textAlign: 'center',
    fontSize: Fonts.h3,
  },
  twoButtonContainer: {
    width: '100%',
  },
  twoButton: {
    width: '80%',
    backgroundColor: Colors.white,
    margin: 20,
    justifyContent: 'center',
  },
  twoButtonText: {
    color: Colors.primaryColor,
    textAlign: 'center',
    fontSize: Fonts.h3,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  chip: {
    backgroundColor: Colors.white,
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  chipText: {
    color: Colors.primaryColor,
  },
  pickerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});

export default styles;
