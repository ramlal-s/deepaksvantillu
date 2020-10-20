

(function($){
    var cart_total = 0;
    

    $('.featured__item__pic__hover li i').on('click',function(){
        var name = $(this).data('name');
        var cost = $(this).data('cost');

        var j =  "{'name':"+name + ",'value':"+cost+"}";
        cart.push(j);
        cart_total+=parseInt(cost);
        document.getElementById('cart_c').textContent = String(cart.length);
        document.getElementById('cart_total').textContent = String(cart_total);
    });

    

    
    $('#pri-btn').on('click',function(){
      var q = document.getElementById("noqu").value;
      var n = document.getElementById("item_name").innerHTML;
      var c = document.getElementById("product__details__priceid").innerHTML;
      var w = document.getElementById("stockid").textContent;
      var u = "/addtocart/"+String(n)+"/"+String(c)+"/"+String(w)+"/"+String(q);
      // alert(u);
      document.getElementById("form2").action = u;
      document.getElementById("form2").submit();
    });

    $('.loginButton').on('click',function(){

      var name = document.getElementById("firstNameBilling").value + " "+ document.getElementById("lastNameBilling").value;
      var country_list = document.getElementById("country");
      var country = country_list.options[country_list.selectedIndex].text;
      var address =  document.getElementById("addr").value+","+document.getElementById("city").value+","+document.getElementById("zip").value+","+document.getElementById("stat").value+","+country;

      var email = document.getElementById("email").value;
      var phone = document.getElementById("phone").value;
      var fil = parseInt(document.getElementById("extra_charge").innerHTML);
      var details = {};
      details["name"] = name;
      details["address"] = address;
      details["email"] = email;
      details["phone"] = phone;
      details["bil"] = fil;
      console.log(details);
      
      // var details='{"name":"'+name+'","address":"'+address+'","email":"'+email+'","phone":"'+phone+'","bil":"'+fil+'"}';
      

      document.getElementById("frm4").action = "/payment/"+JSON.stringify(details);
      document.getElementById("frm4").submit();
  });

  var firebaseConfig = {
    apiKey: "AIzaSyAtiXMJM7G2aRBKgURrpBlq5ygKUKeUcqE",
    authDomain: "deepakvantillu-83167.firebaseapp.com",
    databaseURL: "https://deepakvantillu-83167.firebaseio.com",
    projectId: "deepakvantillu-83167",
    storageBucket: "deepakvantillu-83167.appspot.com",
    messagingSenderId: "614876636986",
    appId: "1:614876636986:web:7fe1296d2723bcd76a9203",
    measurementId: "G-3281M6SZQE"
  };
  firebase.initializeApp(firebaseConfig);

  auth = firebase.auth();

  $("#loginbtn").on('click',function(){
    var e = document.getElementById("username").value;
    var p = document.getElementById("pass").value;
    auth.signInWithEmailAndPassword(e, p).then(function(result){
      window.location = 'admindash.html';
    }).catch(function(e){
      alert(e.message);
      window.location = 'adminlogin.html';
    })
  });

  $('.logout').on('click',function(){
    auth.signOut();
    window.location = 'adminlogin.html'
  });
  



})(jQuery)