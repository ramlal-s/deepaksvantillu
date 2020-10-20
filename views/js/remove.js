    function remov(i) {
      document.getElementById(i).remove();
      document.getElementById("fakeform4").action = "/removeitem/" + i;
      document.getElementById("fakeform4").submit();
    }
function displayi(p,keys){
    for (i = 0; i < p.length; i++) {
        var pe = JSON.parse(p[i]);
        // var k = "<div class='grid-item' id='"+i+"'><div class='grid-item-wrapper'><div class='grid-item-container'><div class='grid-image-top'><img src='" + pe.src[0] + "' style='overflow:hidden;background-position: center center;' width='280px' height='250px'></div><div class='grid-item-content'><span class='item-title'>" + String(pe.name).toUpperCase() + "</span><span class='item-category'>" + pe.type + "</span><br><span class='item-excerpt'><button type='button' class='btn btn-danger' style='font-weight:600;width:200px' onclick='remov(" +keys[i] + ")'>Remove</button></span></div></div></div></div>"
        var k = "<div id='"+keys[i]+"' class='card "+keys[i]+"'><div class='card_image'> <img src='"+pe.src[0]+"' /></div><div class='card_title'><p>"+pe.name+"</p><button type='button' class='btn btn-danger' style='font-weight:600;width:200px' onclick='remov(" +keys[i] + ")'>Remove</button></div></div>";
        $(".grid-row").append(k);
      }
}