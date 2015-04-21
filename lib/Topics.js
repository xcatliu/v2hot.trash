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

var reverse = require('./util/reverse');

module.exports = React.createClass({
  componentWillMount: function() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  },
  render: function() {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(reverse(this.props.topics))}
        renderRow={this.renderTopic}
        style={styles.listView}
      />
    );
  },
  renderTopic: function(topic: Object) {
    return (
      <View style={topic.viewed ? styles.viewed : {}}>
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
      </View>
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
  viewed: {
    opacity: 0.3
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
