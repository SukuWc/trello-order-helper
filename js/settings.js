/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var prefixSelector = document.getElementById('prefix');
var firstIssueSelector = document.getElementById('firstIssue');

t.render(function(){
  return Promise.all([
    t.get('board', 'shared', 'prefix', '#'),
    t.get('board', 'shared', 'firstIssue', '0'),
  ])
  .spread(function(savedPrefix, savedFirstIssue){
    prefixSelector.value = savedPrefix;
    firstIssueSelector.value = savedFirstIssue;
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  })
});

document.getElementById('save').addEventListener('click', function(){

  return Promise.all([
    t.set('board', 'shared', 'prefix', prefixSelector.value),
    t.set('board', 'shared', 'firstIssue', firstIssueSelector.value)
  ]).then(function(){
    t.closePopup();
  })
})