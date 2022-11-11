/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var getIdBadge = function(t){
  return Promise.all([
    t.get('board', 'shared', 'prefix', '#'),
    t.get('board', 'shared', 'firstIssue', '0'),
    t.card('idShort').get('idShort')
  ])
  .then(function(result){
    return [{
      title: 'Card Number', // for detail badges only
      text: result[0] + (result[2]+parseInt(result[1]))
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
        text: "Generate Release Note",
        callback: function (t) {
          // Trello will call this if the user clicks on this action
          // we could for example open a new popover...
          console.log(list) 
        

          return Promise.all([
            t.get('board', 'shared', 'prefix', '#'),
            t.get('board', 'shared', 'firstIssue', '0'),
            t.cards("all")
          ])
          .then(function(result){
            console.log("Prefix = "+result[0])

            let cards = result[2]

            let msg = "" 

            cards.forEach(element => {
              if (element.idList === list.id){
                console.log(element.name)
                console.log(element)

                element.par
                msg+= `[${result[0]}${parseInt(element.idShort) + parseInt(result[1])} ${element.name}](https://trello.com/c/${element.id}) \n`
              }
            });

            console.log(msg)
            
            alert(msg)
            // more complex alert
            t.alert({
              message: 'Powered-Up Successfully 🎉\n' + msg,
              duration: 20,
            });

          });
          
        }
      }];
    });
  },  
  "board-buttons": function (t, opts) {
    return t.cards("all").then(function (cards) {
      console.log(JSON.stringify(cards, null, 2));
    });
  }
});
