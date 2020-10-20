function display() {
    var k = document.getElementById("formitemid").value;
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

    try {
        firebase.initializeApp(firebaseConfig);
    } catch (e) {
        console.log(e);
    }

    var pe;
    var frefp = firebase.database().ref('products/' + k);
    frefp.on('value', function (snap) {
        pe = JSON.stringify(snap.val());
        var l = JSON.parse(pe);
        document.getElementById("item_name").textContent = String(l.name).toUpperCase();
        document.getElementById("item_desc").textContent = String(l.descripton);
        document.getElementById("item_img").src = l.src[0];
        var c = 1;
        for (i in l.cost) {

            if (i == "250" || i == "500" || i == "1000") {
                document.getElementById("d" + String(c)).innerText = i + " grams";
            }
            else {
                document.getElementById("d" + String(c)).innerText = i + " pieces";
            }
            c += 1;
        }document.getElementById("product__details__priceid").innerText = " 250";
        var header = document.getElementById("quant-div");
        var btns = header.getElementsByClassName("quantid");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                var current = document.getElementsByClassName("active-quantid");
                current[0].className = current[0].className.replace(" active-quantid", "");
                this.className += " active-quantid";
                var val = document.getElementsByClassName(this.className)[0].innerHTML;
                var res = val.split(" ");
                console.log(res);
                    document.getElementById("product__details__priceid").innerText =l.cost[res[0]];
                    document.getElementById("stockid").textContent =val;

            });
        }
    });

}