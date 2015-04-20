'use strict';

var React = require('react-native');

var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

module.exports = React.createClass({
  componentWillMount: function() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.props.topics.reverse())}
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
  renderTopic: function(topic: Object) {
    return (
      <TouchableHighlight
        onPress={() => this.props.onTopicPress(topic)}>
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
    borderBottomColor: '#d9d9d9', // Pick from WeChat
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
    backgroundColor: '#f1f0f5', // Pick from WeChat
  },
});
