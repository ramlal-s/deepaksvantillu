var p;
var keys = [];
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


// try {
//   firebase.initializeApp(firebaseConfig);
// } catch (e) {
//   console.log(e);
// }


jQuery(document).ready(function(){
  $.getScript('/js/mixitup.min.js');
});

var pe;

firebase.database().ref('products/').on('value', function (snap) {
  snap.forEach(function (snap1) {
    keys.push(snap1.key);
    pe = snap1.val();
    var k = "<div class='col-lg-3 col-md-4 col-sm-20 mix "+pe.type+"'><div class='featured__item'><div class='featured__item__pic set-bg' data-setbg='' alt='img'><img class='featured__item__pic set-bg' src='"+pe.src[0]+"' style='overflow:hidden;background-position: center center;'><div class='featured__item_pic_overlay'><div class='featured__item__pic_text'><a href='/getitem/"+snap1.key+"'>Shop Now  <i class='fa fa-long-arrow-right'></i></a></div></div></div><div class='featured__item__text'><h6><a href='#''>"+pe.name+"</a></h6></div></div></div></div>";
    $(".row .featured__filter").append(k);
    
  });
});