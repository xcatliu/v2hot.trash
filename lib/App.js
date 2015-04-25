'use strict';

var React = require('react-native');

var {
  TabBarIOS,
  AsyncStorage
} = React;

var Hot = require('./Hot');
var Settings = require('./Settings');

var REQUEST_URL = 'https://www.v2ex.com/api/topics/hot.json';

var reverse = require('./util/reverse')

module.exports = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'Hot',
      topics: []
    };
  },
  componentWillMount() {
    this.topicsMap = {};
  },
  componentDidMount() {
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
  createTopicsMap() {
    this.state.topics.forEach((topic, index) => {
      this.topicsMap[topic.id] = topic;
    });
  },
  fetchTopics(callback: Function) {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => this.updateTopics(responseData))
      .done(callback);
  },
  updateTopics(newTopics: Array) {
    reverse(newTopics).forEach((topic) => {
      if (!this.topicsMap[topic.id]) {
        Object.assign(topic, {
          index: this.state.topics.length,
          viewed: false,
          have_new_replies: true
        });
        this.state.topics.push(topic);
        this.topicsMap[topic.id] = topic;
        return;
      }
      Object.assign(this.topicsMap[topic.id], {
        have_new_replies: this.topicsMap[topic.id].have_new_replies || this.topicsMap[topic.id].replies < topic.replies
      }, topic);
    });
    this.handleSyncStorage();
  },
  handleSyncStorage(callback: Function) {
    AsyncStorage.setItem('topics', JSON.stringify(this.state.topics))
      .then(() => this.setState({topics: this.state.topics}))
      .done(callback);
  },
  handleClearTopics() {
    this.topicsMap = {};
    this.state.topics = [];
    this.handleSyncStorage();
  },
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title='Hot'
          icon={require('image!hot')}
          selected={this.state.selectedTab === 'Hot'}
          onPress={() => this.setState({selectedTab: 'Hot'})}>
          <Hot {...this.state} onSyncStorage={this.handleSyncStorage} onFetchTopics={this.fetchTopics}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Settings'
          icon={require('image!settings')}
          selected={this.state.selectedTab === 'Settings'}
          onPress={() => this.setState({selectedTab: 'Settings'})}>
          <Settings onClearTopics={this.handleClearTopics}/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

