/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator
} = React;

var v2hot = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 2', 'row 2', 'row 2']),
    };
  },
  componentDidMount: function() {
    fetch('https://www.v2ex.com/api/topics/hot.json')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          topics: responseData
        });
      })
      .done();
  },
  render: function() {
    return (
      <Navigator
        initialRoute={{name: 'My First Scene', index: 0}}
        renderScene={(route, navigator) =>
          <ListView
            style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>Hello World</Text>}
          />
        }
      />
    );
  }
});
var styles = StyleSheet.create({
  listView: {
    backgroundColor: '#FFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('v2hot', () => v2hot);
