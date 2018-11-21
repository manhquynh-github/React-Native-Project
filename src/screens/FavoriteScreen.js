import { Body, Container, Header, Title } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { changeLocation } from '../actions/ExploreActions';
import { addFavorite, removeFavorite } from '../actions/FavoriteActions';
import FavoriteList from '../components/FavoriteList';
import StatusBarOverlay from '../components/StatusBarOverlay';
import Colors from '../constants/Colors';
import { propTypes as LocationProps } from '../model/Location';

class FavoriteScreen extends Component {
  static propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.shape(LocationProps)),
    addFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
    changeLocation: PropTypes.func.isRequired,
  };

  static defaultProps = {
    favorites: [],
  };

  constructor() {
    super();
    this.onRemovePress = this.onRemovePress.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  render() {
    return (
      <Container>
        <StatusBarOverlay />
        <Header style={styles.header} noLeft>
          <Body>
            <Title>Favorites</Title>
          </Body>
        </Header>
        <FavoriteList
          data={this.props.favorites}
          onPress={this.onPress}
          onRemovePress={this.onRemovePress}
        />
      </Container>
    );
  }

  onRemovePress(item) {
    this.props.removeFavorite(item.favoriteID);
  }

  onPress(item) {
    this.props.changeLocation(item);
    this.props.navigation.navigate('MainExplore');
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.statusBarColor,
  },
});

const mapStateToProps = (state) => ({
  favorites: state.favoriteReducer.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (favorite) => dispatch(addFavorite(favorite)),
  removeFavorite: (favoriteID) => dispatch(removeFavorite(favoriteID)),
  changeLocation: (location) => dispatch(changeLocation(location)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteScreen);
