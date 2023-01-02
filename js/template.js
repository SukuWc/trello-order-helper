/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

TrelloPowerUp.initialize({
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
        text: "Generate Summary",
        callback: function (t) {
          // Trello will call this if the user clicks on this action
          // we could for example open a new popover...
          console.log("Version 1.4")
          console.log(list) 
        
          return Promise.all([
            t.get('board', 'shared', 'productList', '[PO16, BU16, PBF4, EN16, EF44, KNOT]'),
            t.cards("all")
          ])
          .then(function(result){
            console.log("result[0]: "+result[0])
            let productArray = JSON.parse(result[0]);

            // initialize count array
            let countArray = new Array(productArray.length).fill(0);
            

            console.log("Products: ", productArray);


            console.log("result[1]: "+result[1])
            let cards = result[1]

            let msg = "" 


            productArray.forEach((productName, index) => {

              console.log("Product " + index +" is " + productName)

              cards.forEach(element => {

                if (element.idList === list.id){

          

                  let string = element.name;
                  let regexp = new RegExp(`[0-9]*x${productName}`, "gi");
                  let match = regexp.exec(string);
                  if (match) {
                    let number = parseInt(match);
                    console.log(`The number is ${productName} ${number}`);
                    countArray[index]++;
                  }

                }
              
              });


              msg+= `${productName}:  ${countArray[index]}\n` 

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
  }
});
