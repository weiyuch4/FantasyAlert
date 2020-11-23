import React from 'react';
import { Platform } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';

export default class SearchApp extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Search"
        placeholderTextColor='#F1FAEE'
        platform={ Platform.OS }
        onChangeText={ this.updateSearch }
        value={ search }
        clearIcon = { false }
        cancelButtonProps={{
          color: '#F1FAEE'
        }}
        searchIcon={ 
          <Icon 
            name="menu" 
            size={30} 
            color='#F1FAEE' 
            onPress={() => this.props.navigation.openDrawer()}/> 
        }
        inputStyle={{ backgroundColor: '#457B9D' }}
        containerStyle={{
          backgroundColor: '#457B9D',
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
          left: 14,
          width: 348,
          height: 60,
          borderWidth: 0,
          borderRadius: 10,
          marginTop: 45
        }}
        inputContainerStyle={{
          backgroundColor: '#457B9D'
        }}
        inputStyle={{ color: '#F1FAEE' }}
      />
    );
  }
}
