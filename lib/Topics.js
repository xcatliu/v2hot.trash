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
  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  },
  handleScroll(e) {
    console.log(e.nativeEvent.contentOffset);
  },
  render() {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(reverse(this.props.topics))}
        renderRow={this.renderTopic}
        style={styles.listView}
        onScroll={this.handleScroll}
      />
    );
  },
  renderTopic(topic: Object) {
    return (
      <TouchableHighlight
        onPress={() => this.props.onTopicPress(topic)}>
        <View style={styles.item}>
          <View style={topic.viewed ? styles.viewed : styles.not_viewed}>
            <Image
              source={{uri: 'https:' + topic.member.avatar_large}}
              style={styles.avatar}
            />
            <View style={styles.topic}>
              <Text style={styles.title}>{topic.title}</Text>
            </View>
          </View>
          <View style={topic.have_new_replies ? styles.have_new_replies : styles.replies}>
            <View style={styles.repliesBackground}>
              <Text style={styles.repliesText}>{topic.replies}</Text>
            </View>
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
    borderBottomColor: '#d9d9d9', // Picked from WeChat
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  viewed: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.4
  },
  not_viewed: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 4,
    marginRight: 12,
  },
  topic: {
    flex: 1,
  },
  have_new_replies: {
    marginLeft: 12,
    borderRadius: 8,
    backgroundColor: '#aab0c6'
  },
  replies: {
    marginLeft: 12,
    borderRadius: 8,
    backgroundColor: '#e5e5e5'
  },
  repliesBackground: {
    marginLeft: 10,
    marginRight: 10
  },
  repliesText: {
    paddingTop: 2,
    fontSize: 14,
    lineHeight: 14,
    color: 'white',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 16,
    lineHeight: 18,
  },
  listView: {
    backgroundColor: '#f1f0f5', // Picked from WeChat
  },
});
