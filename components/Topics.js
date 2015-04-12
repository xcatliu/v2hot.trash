'use strict';

var React = require('react-native');

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

var Topics = React.createClass({
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
    this.props.navigator.push({ id: 'Topics' });
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
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  },
  renderTopic: function(topic) {
    return (
      <TouchableHighlight
        activeOpacity={0.9}
        onPress={this.handleTopicPress}
      >
        <View style={styles.container}>
          <Image
            source={{uri: 'https:' + topic.member.avatar_large}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{topic.title}</Text>
            <Text style={styles.replies}>{topic.replies}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },
});

module.exports = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.wrapper}
        initialRoute={{
          component: Topics,
          title: 'V2HOT'
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  thumbnail: {
    width: 73,
    height: 73,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  replies: {
    textAlign: 'center',
  },
  listView: {
    backgroundColor: '#fff',
  },
});
