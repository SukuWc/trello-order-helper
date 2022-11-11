/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var getIdBadge = function(t){
  return Promise.all([
    t.get('board', 'shared', 'prefix', '#'),
    t.card('idShort').get('idShort')
  ])
  .then(function(result){
    return [{
      title: 'Card Number', // for detail badges only
      text: result[0] + (result[1]*2)
    }];
  })
};

TrelloPowerUp.initialize({
  'card-badges': function(t, options){
    return getIdBadge(t);
  },
  'card-detail-badges': function(t, options) {
    return getIdBadge(t);
  },
  'show-settings': function(t, options){
    return t.popup({
      title: 'Settings',
      url: './settings.html',
      height: 184
    });
  },
  'list-actions': function (t) {
    return t.list('name', 'id')
    .then(function (list) {
      return [{
        text: "Get List Stats",
        callback: function (t) {
          // Trello will call this if the user clicks on this action
          // we could for example open a new popover...
          console.log(list)
          alert(list)       
          
          var t = TrelloPowerUp.iframe();

          // simplest alert requires just a message
          // displays for 5 seconds using the 'info' display
          t.alert({
            message: 'Powering-Up, give us a second...'
          });

          // more complex alert
          t.alert({
            message: 'Powered-Up Successfully 🎉',
            duration: 6,
          });
          
        }
      }];
    });
  }
});
