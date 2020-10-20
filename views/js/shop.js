(function ($) {

  var fref =  firebase.database().ref('/orders');
  fref.on('value',function(snap){
    snap.forEach(function(snap1){
    //   "<div id='order '><div class='order-id'></div><div class='order-name'></div><div class='order-address'></div><table><tr><th>Item</th><th>Weight</th><th>Quantity</th></tr></table></div>"
      
    });
  });
})(jQuery)