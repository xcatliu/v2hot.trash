'use strict';

var React = require('react-native');

var V2hot = React.createClass({
  render: function() {
    return (
      <Navigator
        initialRoute={{name: 'Topics', index: 0}}
        renderScene={(route, navigator) =>
          <NavigatorIOS
            style={styles.wrapper}
            initialRoute={{
              component: V2hot,
              title: 'V2HOT'
            }}
          />
          <MySceneComponent
            name={route.name}
            onForward={() => {
              var nextIndex = route.index + 1;
              navigator.push({
                name: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }
      />
    );
  }
});


AppRegistry.registerComponent('v2hot', () => V2hot);
