import React from 'react';
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Button,
  View,
  Body,
  Left,
  Right,
} from 'native-base';
import ActionButton from 'react-native-action-button';
import {styles} from './ProjectListStyles';
import {Api} from '../../services/Api';
import {Wrapper} from '../../hocs/Wrapper';
import {NoData} from '../../components/NoData/NoData';

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
    this.user = this.props.userContext.user;
  }

  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects = async () => {
    const result = await Api.getProjects(this.user._id);
    console.log('TCL: ProjectListScreen -> fetchProjects -> result', result);
    this.setState({
      projects: result.data.data,
    });
  };

  addProject = () => {
    // TODO: Notify user first about disabling the old project
    this.props.navigation.navigate('ProjectAdd', {
      updateList: this.fetchProjects,
    });
  };

  renderItem = () => {};

  render() {
    const {projects} = this.state;
    return (
      <Container>
        <Text style={[styles.header, this.props.theme.color]}>My Projects</Text>
        {projects.length ? (
          <List>
            {projects.map(p => {
              return (
                <ListItem key={p._id} noBorder style={styles.item}>
                  <Body>
                    <Text>{p.title}</Text>
                    <Text note numberOfLines={1}>
                      {p.description}
                    </Text>
                  </Body>
                  <Right>
                    {/* <Button transparent> */}
                    <Text>{p.isActive ? 'Active' : 'Inactive'}</Text>
                    {/* </Button> */}
                  </Right>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <NoData text="No projects as of yet" />
        )}
        <ActionButton
          buttonColor={this.props.theme.primary}
          onPress={this.addProject}
        />
      </Container>
    );
  }
}

export const ProjectListScreen = Wrapper(ProjectList);
