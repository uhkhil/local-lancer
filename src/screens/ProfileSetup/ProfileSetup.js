import React from 'react';
import {
    View, ScrollView, Dimensions, TextInput, KeyboardAvoidingView, TouchableOpacity,
    Alert, Image, AsyncStorage
} from 'react-native';
import { Text, Button, Picker, Item } from 'native-base';
import styles from './ProfileSetupStyles';
import { AppRole } from '../../enums/AppRole';
import { Colors } from '../../theme/Theme';
import { Api } from '../../services/Api';

const { width, height } = Dimensions.get('window');

// TODO: Fetch dynamically
const allDomains = [
    {
        "_id": "5d66d94bb2ee51fe82d5c6ce",
        "name": "Web designer"
    },
    {
        "_id": "5d66d94bb2ee51fe82d5c6cf",
        "name": "Content writer"
    },
    {
        "_id": "5d66d94bb2ee51fe82d5c6d0",
        "name": "Graphic designer"
    },
    {
        "_id": "5d66d94bb2ee51fe82d5c6d1",
        "name": "Logo creator"
    },
    {
        "_id": "5d66d94bb2ee51fe82d5c6d2",
        "name": "Mobile developer"
    }
];

class ProfileSetupScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            role: null,
            pageIndex: 0,
            selectedDomain: undefined,
            selectedDomains: [],
        }
        this.userId = '';
    }

    async componentDidMount() {
        setTimeout(() => {
            // this.refs._scrollView.scrollTo({ x: width, y: 0 });
            this.next();
        }, 1000);

        const userId = await AsyncStorage.getItem('_id');
        this.userId = userId;
        console.log('TCL: ProfileSetup -> componentDidMount -> userId', userId);

        // const user = await AsyncStorage.getAllKeys();
        // console.log('TCL: ProfileSetup -> componentDidMount -> user', user);
        // const userObj = user._user;
        // console.log('TCL: HomeScreen -> componentDidMount -> userObj', userObj);
    }


    selectRole = (role) => {
        switch (role) {
            case AppRole.freelancer:
                this.setState({ role });
                this.next();
                break;
            case AppRole.recruiter:
                // TODO: Call API to store profile
                this.setState({ role });
                this.submitProfile(role);
                break;
            default:
                console.log("TCL: ProfileSetup -> selectRole -> role", role);
                console.log('Wrong role selected');
        }
    }

    selectedFreelancer = () => {
        this.setState({ role: AppRole.freelancer });
    }

    selectedRecruiter = () => {
        // send to server
        this.setState({ role: AppRole.recruiter });
    }

    nextPage = (pageName) => {
        switch (pageName) {
            case 'name':
                if (this.state.firstName === '' || this.state.lastName === '') {
                    Alert.alert('Excuse me, sir', 'Your full name is required');
                } else {
                    this.next();
                }
                break;
            case 'domain':
                // check domains
                if (!this.state.selectedDomains.length) {
                    Alert.alert('Excuse me, sir', 'Please add at least 1 domain');
                } else {
                    this.submitProfile(AppRole.freelancer);
                }
                break;
            case 'skill':
                if (!this.state.selectedSkills.length) {
                    Alert.alert('Excuse me, sir', 'Please add at least 1 skill')
                } else {
                    this.submitProfile(AppRole.freelancer);
                }
                break;
        }
    }

    submitProfile = (role) => {
        console.log('will submit profile');
        console.log("TCL: ProfileSetup -> submitProfile -> role", role);
        let body = {};
        if (role === AppRole.recruiter) {
            body = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                role,
            };
            Api.createRecruiterProfile(this.userId, body)
                .then(res => {
                    console.log('TCL: ProfileSetup -> submitProfile -> res', res);
                    this.props.navigation.navigate('Home')
                })
                .catch(err => {
                    console.log('TCL: ProfileSetup -> submitProfile -> err', err);
                })
        } else {
            body = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                domains: this.state.selectedDomains,
            };
            Api.createFreelancerProfile(this.userId, body)
                .then(res => {
                    console.log('TCL: ProfileSetup -> submitProfile -> res', res);
                    this.props.navigation.navigate('Home');
                })
                .catch(err => {
                    console.log('TCL: ProfileSetup -> submitProfile -> err', err);
                })
        }
        // this.props.navigation.navigate('Home');
    }

    next = () => {
        console.log("TCL: ProfileSetup -> next -> width", width)
        const newWidth = width * (this.state.pageIndex + 1);
        console.log("TCL: ProfileSetup -> next -> newWidth", newWidth)
        this.refs._scrollView.scrollTo({ x: newWidth, y: 0 });
        // TODO: This should be handled on scroll end
        this.setState({ pageIndex: this.state.pageIndex + 1 });
    }

    renderWelcome = () => {
        return (<View style={styles.singlePage}>
            <View style={styles.bigTextContainer}>
                <Text style={styles.bigText}>Let's get you started.</Text>
            </View>
        </View>);
    }

    renderName = () => {
        return <View style={styles.singlePage}>
            {/* <KeyboardAvoidingView> */}
            <View style={styles.mainSection}>
                <Text style={styles.bigText}>Let's start with your name</Text>
                <View style={styles.nameContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='First'
                        autoCapitalize="none"
                        placeholderTextColor='gray'
                        onChangeText={val => this.setState({ firstName: val })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Last'
                        autoCapitalize="none"
                        placeholderTextColor='gray'
                        onChangeText={val => this.setState({ lastName: val })}
                    />
                </View>
            </View>
            <View style={styles.buttonSection}>
                <View style={styles.buttonContainer}>
                    <Button style={styles.button} onPress={() => this.nextPage('name')}>
                        <Text style={styles.buttonText}>Next</Text>
                    </Button>
                </View>
            </View>
        </View>
    }

    addDomain = (value) => {
        const selectedDomains = this.state.selectedDomains;
        const already = selectedDomains.find(dom => dom._id === value);
        if (already) {
            return;
        }
        console.log("TCL: ProfileSetup -> addDomain -> value", value);
        const theOne = allDomains.find(dom => dom._id === value);
        console.log("TCL: ProfileSetup -> addDomain -> theOne", theOne);
        selectedDomains.push(theOne);
        this.setState({
            selectedDomains,
            selectedDomain: value,
        });
        console.log("TCL: ProfileSetup -> addDomain -> selectedDomains", selectedDomains);
    }

    removeDomain = value => {
        console.log("TCL: ProfileSetup -> value", value);
        const selectedDomains = this.state.selectedDomains;
        const newSelectedDomains = selectedDomains.filter(dom => dom._id !== value);
        this.setState({ selectedDomains: newSelectedDomains });
    }

    renderDomainPickerItems = () => {
        return allDomains.map(dom => {
            return <Picker.Item key={dom._id} label={dom.name} value={dom._id} />
        })
    }

    renderSelectedDomains = (doms) => (
        doms.map(dom => (
            <View key={dom._id} style={styles.chip}>
                <TouchableOpacity onPress={() => this.removeDomain(dom._id)}>
                    <Text style={styles.chipText}>{dom.name}</Text>
                </TouchableOpacity>
            </View>
        ))
    )

    render() {
        return (
            <ScrollView
                ref='_scrollView'
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
            >
                {
                    this.renderWelcome()
                }
                {
                    this.renderName()
                }
                {/* </KeyboardAvoidingView> */}
                <View style={styles.singlePage}>
                    <View style={styles.twoButtonContainer}>
                        <Button style={styles.twoButton} onPress={() => this.selectRole(AppRole.freelancer)}>
                            <Text style={styles.twoButtonText}>I am a Freelancer</Text>
                        </Button>
                        <Button style={styles.twoButton} onPress={() => this.selectRole(AppRole.recruiter)}>
                            <Text style={styles.twoButtonText}>I am a Recruiter</Text>
                        </Button>
                    </View>
                </View>
                {
                    this.state.role === AppRole.freelancer ?
                        <View style={styles.singlePage}>
                            <View style={styles.pickerSection}>
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        style={{ width: undefined }}
                                        placeholder="Select Domain"
                                        placeholderStyle={{ color: Colors.white }}
                                        placeholderIconColor={Colors.white}
                                        textStyle={{ color: Colors.white, textAlign: 'center' }}
                                        itemStyle={{
                                            backgroundColor: "#d3d3d3",
                                            marginLeft: 0,
                                            paddingLeft: 10
                                        }}
                                        itemTextStyle={{ color: '#788ad2' }}
                                        selectedValue={this.state.selectedDomain}
                                        onValueChange={(event) => {
                                            this.addDomain(event);
                                        }}
                                    >
                                        {
                                            this.renderDomainPickerItems()
                                        }
                                    </Picker>
                                </Item>
                                <View style={styles.chipsContainer}>
                                    {this.renderSelectedDomains(this.state.selectedDomains)}
                                </View>
                            </View>
                            <View style={styles.buttonSection}>
                                <View style={styles.buttonContainer}>
                                    <Button style={styles.button} onPress={() => this.nextPage('domain')}>
                                        <Text style={styles.buttonText}>Next</Text>
                                    </Button>
                                </View>
                            </View>
                        </View> : null
                }
                <View style={styles.singlePage}>
                    <View style={styles.bigTextContainer}>
                        <Image style={{ height: 100, width: 100, alignSelf: 'center', marginTop: -100 }} source={require('../../assets/icons/check-mark.png')} />
                        <View style={{ marginTop: 40 }}>
                            <Text style={styles.bigText}>Great!</Text>
                            <Text style={styles.bigText}>You're all set!</Text>
                        </View>
                    </View>
                </View>
            </ScrollView >
        );
    }
}

export default ProfileSetupScreen;