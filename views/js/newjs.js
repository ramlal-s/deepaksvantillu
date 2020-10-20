function decide(sel){
    c= sel.value;
    var w = document.getElementById("weight").value;
    w = parseFloat(w)
    var nneed = "";
    var i = "An extra amount of Rs. ";
    var j = "   as Courier and Packaging charges are added.";
    var res;
    if(c=="USA"){
        if(w>=5 && w<=6){
            res = i+ "4450" +j;
            document.getElementById("extra_charge").innerHTML = "4450";
        }
        else if(w>6 && w<=7){
            res = i+ "5055" +j;
            document.getElementById("extra_charge").innerHTML = "5055";
        }
        else if(w>7 && w<=8){
            res = i+ "5445" +j;
            document.getElementById("extra_charge").innerHTML = "5445";
        }
        else if(w>8 && w<=9){
            res = i+ "5905" +j;
            document.getElementById("extra_charge").innerHTML = "5905";
        }
        else if(w>9 && w<=10){
            res = i+ "6205" +j;
            document.getElementById("extra_charge").innerHTML = "6205";
        }
        else if(w>10 && w<=12){
            res = i+ "6400" +j;
            document.getElementById("extra_charge").innerHTML = "6400";
        }
        else if(w>12 && w<=14){
            res = i+ "8140" +j;
            document.getElementById("extra_charge").innerHTML = "8140";
        }
        else if(w>14 && w<=15){
            res = i+ "9650" +j;
            document.getElementById("extra_charge").innerHTML = "9650";
        }
        else if(w>15 && w<=16){
            res = i+ "9700" +j;
            document.getElementById("extra_charge").innerHTML = "9700";
        }
        else if(w>16 && w<=17){
            res = i+ "10745" +j;
            document.getElementById("extra_charge").innerHTML = "10745";
        }
        else if(w>17 && w<=18){
            res = i+ "11250" +j;
            document.getElementById("extra_charge").innerHTML = "11250";
        }
        else if(w>18 && w<=19){
            res = i+ "11640" +j;
            document.getElementById("extra_charge").innerHTML = "11640";
        }
        else if(w>19 && w<20){
            res = i+ "12595" +j;
            document.getElementById("extra_charge").innerHTML = "12595";
        }
        else if(w>=20){
            var k = w * 725;
            res = i+ k +j;
            document.getElementById("extra_charge").innerHTML = k;
        }
        document.getElementById("small-holder1").style.display = "inline";
        document.getElementById("small_details1").style.display = "inline";
        document.getElementById("small_details").innerHTML = res;
    }
    if(c=="India"){
        document.getElementById("small-holder1").style.display = "none";
        document.getElementById("small_details1").style.display = "none";
        document.getElementById("small_details").innerHTML = nneed;
    }
}