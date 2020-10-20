function filter_cat(c,v){
    var k = document.getElementsByClassName("col-lg-3 col-md-4 col-sm-20 mix");
    if(c == "all"){
        show(k);
    }
    else{
        hide(k);
        var j = document.getElementsByClassName("col-lg-3 col-md-4 col-sm-20 mix "+c);
        show(j);
    }
    document.getElementsByClassName("hero__categories__selected")[0].innerHTML = v ;
}

function hide(k){
    for(i=0;i<k.length;i++){
        k[i].style.display = "none";
    }
}
function show(k){
    for(i=0;i<k.length;i++){
        k[i].style.display = "block";
    }
}