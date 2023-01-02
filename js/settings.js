/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var productListSelector = document.getElementById('productList');

t.render(function(){
  return Promise.all([
    t.get('board', 'shared', 'productList', ''),
  ])
  .spread(function(savedProductList){
    productListSelector.value = savedProductList;
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  })
});

document.getElementById('save').addEventListener('click', function(){

  return Promise.all([
    t.set('board', 'shared', 'productList', productListSelector.value)
  ]).then(function(){
    t.closePopup();
  })
})