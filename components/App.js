'use strict';

var React = require('react-native');

var {
  TabBarIOS
} = React;

var Hot = require('./Hot');
var Settings = require('./Settings');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'Hot'      
    };
  },
  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title='Hot'
          icon={require('image!hot')}
          selected={this.state.selectedTab === 'Hot'}
          onPress={() => {
            this.setState({selectedTab: 'Hot'});
          }}>
          <Hot/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Settings'
          icon={require('image!settings')}
          selected={this.state.selectedTab === 'Settings'}
          onPress={() => {
            this.setState({selectedTab: 'Settings'});
          }}>
          <Settings/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

