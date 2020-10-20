(function($){

    $(".form_butt").on('click',function(){
        var a = document.getElementById("pro_name").value;
        var b = document.getElementById("pro_desc").value;
        var k = document.getElementById("pro_img").value;
        var p = k.split("/");
        var d = p[5];
        var c =  document.getElementById("itype").value;
        var e1 = document.getElementById("val250").value;
        var e2 = document.getElementById("val500").value;
        var e3 = document.getElementById("val1000").value;
        var ac = "/adminadd/"+a+"/"+b+"/"+c+"/"+d+"/"+e1+"/"+e2+"/"+e3;
        document.getElementById("formadd").action = ac;
        document.getElementById("formadd").submit();
    });

})(jQuery)