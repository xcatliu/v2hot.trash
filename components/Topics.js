'use strict';

var React = require('react-native');
var fetch = require('fetch');

var Topic = require('./Topic');

var REQUEST_URL = 'https://www.v2ex.com/api/topics/hot.json';

var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight
} = React;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  },
  handleTopicPress: function() {
    this.props.navigator.push({
      title: 'Topic',
      component: Topic
    });
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTopic}
        style={styles.listView}
      />
    );
  },
  renderLoadingView: function() {
    return (
      <View>
        <Text>
          Loading...
        </Text>
      </View>
    );
  },
  renderTopic: function(topic) {
    return (
      <TouchableHighlight
        onPress={this.handleTopicPress}
      >
        <View style={styles.item}>
          <Image
            source={{uri: 'https:' + topic.member.avatar_large}}
            style={styles.avatar}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{topic.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },
});

var styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 4,
    marginRight: 12,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    lineHeight: 18,
  },
  listView: {
    backgroundColor: '#fff',
  },
});
