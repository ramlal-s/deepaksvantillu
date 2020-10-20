function cartdisplay(cart) {
  var totall = 0;
  var tot_weight = 0;
  for (i = 0; i <= cart.length; i++) {
    var p = JSON.parse(cart[i]);
    f = (p.weight).split(" ");
    if(f[1]=="kg"){
      tot_weight += parseFloat(f[0])*parseInt(p.quantity);
    }
    else{
      tot_weight += (parseInt(f[0])/1000)*parseInt(p.quantity);
    }
    var subtot = parseInt(p.costperitem) * parseInt(p.quantity);
    totall += subtot;
    var k = "<tr><td class='shoping__cart__item'><h5>"+p.name+"</h5></td><td class='shoping__cart__item'><h5>"+p.weight+"</h5></td><td class='shoping__cart__price'>&#8377;"+p.costperitem+"</td><td class='shoping__cart__quantity'><div class='quantity' style='background:none;font-size:16px;'>"+p.quantity+"</div></td><td class='shoping__cart__total'>&#8377;"+subtot+"</td></tr>";
    $("table tbody").append(k);
    document.getElementById("totalid").innerHTML = totall;
    gsttot = 0.05 * totall;
    document.getElementById("gstlid").innerHTML = gsttot;
    document.getElementById("totalweight").innerHTML = tot_weight;
    document.getElementById("ttotalid").innerHTML = totall+gsttot;
  }
  
}
function checkout() {
  var k = document.getElementById("ttotalid").innerHTML;
  var h = document.getElementById("totalweight").innerHTML;
  var u = "/checkout/" + k+"/"+h;
  document.getElementById("checkform").action = u;
  document.getElementById("checkform").submit();
}
