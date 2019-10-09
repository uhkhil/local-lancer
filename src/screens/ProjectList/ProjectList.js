import React from 'react';
import { Container, Content, Text, List, ListItem, Button, View, Body, Left, Right } from 'native-base';
import ActionButton from 'react-native-action-button';
import { styles } from './ProjectListStyles';
import { Colors } from '../../theme/Theme';
import { AsyncStorage } from 'react-native';
import { Api } from '../../services/Api';

export class ProjectListScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            projects: []
        }
    }

    async componentDidMount() {
        this.userId = await AsyncStorage.getItem('_id');
        this.fetchProjects();
    }

    fetchProjects = async () => {
        const result = await Api.getProjects(this.userId)
        console.log('TCL: ProjectListScreen -> fetchProjects -> result', result)
        this.setState({
            projects: result.data.data
        })
    }

    addProject = () => {
        // TODO: Notify user first about disabling the old project
        this.props.navigation.navigate('ProjectAdd', { updateList: this.fetchProjects });
    }

    render() {
        return (
            <Container>
                <Text style={styles.header}>My Projects</Text>
                <List>
                    {
                        this.state.projects.map(p => {
                            return <ListItem key={p._id} noBorder style={styles.item}>
                                <Body>
                                    <Text>{p.title}</Text>
                                    <Text note numberOfLines={1}>{p.description}</Text>
                                </Body>
                                <Right>
                                    {/* <Button transparent> */}
                                        <Text>{p.isActive ? 'Active' : 'Inactive'}</Text>
                                    {/* </Button> */}
                                </Right>
                            </ListItem>
                        })
                    }
                </List>
                <ActionButton buttonColor={Colors.primaryColor} onPress={this.addProject}>
                </ActionButton>
            </Container>
        )
    }
}