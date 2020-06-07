import {StyleSheet, Dimensions} from 'react-native';
import {RecruiterTheme, FreelancerTheme} from '../../theme/Theme';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  slide: {
    width: width,
    height: height,
    justifyContent: 'space-between',
  },
  roleButtons: {
    height: 150,
    justifyContent: 'space-around',
  },
  roleButton: {
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  googleButton: {
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  roleButtonText: {
    textAlign: 'center',
  },
  header: {
    height: 100,
  },
  previousButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previousButtonIcon: {
    color: 'white',
    textAlign: 'center',
  },
  footer: {
    height: 100,
  },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonIcon: {
    textAlign: 'center',
  },
  main: {
    flex: 1,
  },
  jcc: {
    justifyContent: 'center',
  },
  recruiter: {
    backgroundColor: RecruiterTheme.primary,
  },
  freelancer: {
    backgroundColor: FreelancerTheme.primary,
  },
  actionText: {
    fontSize: 25,
    marginBottom: 60,
    color: 'white',
    marginLeft: 20,
  },
  nameEditor: {},
  nameForm: {
    marginRight: 20,
    marginLeft: 10,
  },
  label: {
    color: 'white',
  },
  input: {
    color: 'white',
  },
  hidden: {
    opacity: 0,
  },
  chipsPacket: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chip: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    backgroundColor: 'transparent',
    // width: 200,
    margin: 10,
  },
  chipSelected: {
    backgroundColor: 'white',
  },
  chipText: {
    color: 'white',
  },
  chipTextSelected: {
    color: 'black',
  },
});

export default styles;
