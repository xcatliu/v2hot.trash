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
  TouchableHighlight,
  AsyncStorage
} = React;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      topics: []
    };
  },
  componentWillMount: function() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.topicsMap = {};
  },
  componentDidMount: function() {
    AsyncStorage.getItem('topics')
      .then((topics) => {
        if (topics === null) {
          topics = [];
        } else {
          topics = JSON.parse(topics);
        }
        this.setState({topics: topics}, () => {
          this.createTopicsMap();
          this.fetchTopics();
        });
      })
      .done();
  },
  createTopicsMap: function() {
    this.state.topics.forEach((topic, index) => {
      this.topicsMap[topic.id] = topic;
    });
  },
  fetchTopics: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.mergeTopics(responseData);
      })
      .done();
  },
  mergeTopics: function(newTopics: Array) {
    newTopics.reverse().forEach((topic) => {
      if (!this.topicsMap[topic.id]) {
        Object.assign(topic, {
          index: this.state.topics.length,
          viewed: false,
          new_replies: true
        });
        this.state.topics.push(topic);
        this.topicsMap[topic.id] = topic;
        return;
      }
      Object.assign(this.topicsMap[topic.id], {
        new_replies: this.topicsMap[topic.id].replies < topic.replies
      }, ...topic);
    });
    AsyncStorage.setItem('topics', JSON.stringify(this.state.topics))
      .then(() => {
        this.setState({topics: this.state.topics}, () => {
          this.setState({loaded: true});
        });
      })
      .done();
  },
  handleTopicPress: function(topic: Object) {
    this.props.navigator.push({
      title: '/t/' + topic.id,
      component: Topic,
      passProps: {topic}
    });
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.topics.reverse())}
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
        onPress={() => this.handleTopicPress(topic)}
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
