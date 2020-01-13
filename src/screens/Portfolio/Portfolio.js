import React from 'react';

import {Wrapper} from '../../hocs/Wrapper';
import {Api} from '../../services/Api';
import {LLCard} from '../../components/LLCard/LLCard';
import {AppRole} from '../../enums/AppRole';
import {ScrollView} from 'react-native-gesture-handler';

class PortfolioScreen extends React.Component {
  constructor(props) {
    super(props);
    this.fetchUserPortfolio();
  }

  state = {
    loading: true,
    card: {},
  };

  fetchUserPortfolio = async () => {
    const {user} = this.props.userContext;
    const card = await Api.getUserCard(user._id, null);
    this.setState({loading: false, card: card.data.data[0]});
  };

  render() {
    const {card, loading} = this.state;
    const {theme} = this.props;
    return (
      <ScrollView style={theme.background}>
        {!loading ? <LLCard data={card} role={AppRole.freelancer} /> : null}
      </ScrollView>
    );
  }
}

export default Wrapper(PortfolioScreen);
