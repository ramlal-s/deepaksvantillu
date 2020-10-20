const express = require('express');
const app = express();
app.listen(4000,() => console.log("Listening at 4000"));
const path = require('path');
const fs = require("fs");
const PDFDocument = require("pdfkit");
var firebase = require("firebase-admin");
var nodemailer = require('nodemailer');
var formidable = require('formidable');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'deepakvantillu@gmail.com',
    pass: 'deepak@18'
  }
});

const __dirnamee = path.join(__dirname,'/views');
app.use(express.static('views'));
var bodyParser = require('body-parser');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirnamee);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());




// Invoice creation

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  // generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
  doc
    .image("./abhi.png", 50, 50, { width: 100, height: 45 })
      .fillColor("#444444")
      .fontSize(20)
      .fontSize(10)
      .text("Balaji Nagar", 200, 65, { align: "right" })
      .text("Nellore, Nellore(Dist), Andhra Pradesh, India , 524004", 200, 80, { align: "right" })
      .moveDown();
      generateHr(doc,150)
}

function generateCustomerInformation(doc, invoice) {
  doc
    .text(`Name:    ${invoice.details.name}`, 50, 180)
    .text(`Email: ${invoice.details.email}`, 50, 195)
    .text(`Phone Number: ${invoice.details.phone}`, 50, 210)
    .text(`Invoice Date: ${new Date()}`, 50, 225)
    .text(`Bill: ${invoice.bill}`, 50, 240)
    .text(invoice.address, 300, 255)
    .moveDown();
    generateHr(doc,260)
}

function generateTableRow(doc, y, c1, c2, c3, c4) {
  doc
    .fontSize(10)
    .text(c1, 50, y,{width:100})
    .text(c2, 200, y)
    .text(c3, 280, y, { width: 90, align: "right" })
    .text(c4, 370, y, { width: 90, align: "right" })
}

function generateInvoiceTable(doc, invoice) {
  let j,
    invoiceTableTop = 280;
    generateTableRow(
      doc,
      270,
      "Item Name",
      "Cost per Item",
      "Quantity",
      "Weight"
    );
    generateHr(doc,280)
  for (i in invoice.cart){
    const position = invoiceTableTop + (parseInt(i) + 1) * 30;
    generateTableRow(
      doc,
      position,
      invoice.cart[i].name,
      invoice.cart[i].costperitem,
      invoice.cart[i].quantity,
      invoice.cart[i].weight
    );
    
  }
}

//Invoice creation end

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

var serviceAccount = require("./serviceAccountkey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://deepakvantillu-83167.firebaseio.com"
});

var database = firebase.database();
// const items = require("./itemsid.json");

var fref = firebase.database().ref('orders/');
var frefp = firebase.database().ref('products/');
// frefp.set(items)


app.get('/home', (req,res)=>{
  var items=[];
  var keys = [];
  frefp.on('value',function(snap){
    snap.forEach(function(snap1){
      keys.push(snap1.key);
      items.push(JSON.stringify(snap1.val()));
    });
  });
  res.render('index.html',{items:items});
});

app.get('/shop',(req,res)=>{
  var items=[];
  var keys = [];
  frefp.on('value',function(snap){
    snap.forEach(function(snap1){
      keys.push(snap1.key);
      items.push(JSON.stringify(snap1.val()));
    });
  });
  global.well = "Hello";
  res.render('shop-grid.html',{items:items});
});

app.get('/getitem/:id',(req,res)=>{  
  res.render('shop-details.html',{id:req.params.id});
});

const sessionstorage = require('sessionstorage');
const cons = require('consolidate');
const { json } = require('body-parser');
const { E2BIG } = require('constants');
var cart = [];


app.get('/addtocart/:n/:c/:w/:q',(req,res)=>{
  var j = '{"name":"'+req.params.n+'","costperitem":"'+req.params.c+'","weight":"'+req.params.w+'","quantity":"'+req.params.q+'"}';
  cart.push(j)
 
  res.redirect('/cart');
});

app.get('/cart',(req,res)=>{
  res.render('shoping-cart.html',{cart:cart});
});

var bill;
var weight;
app.get('/checkout/:cost/:weight',(req,res)=>{
  bill = req.params.cost;
  weight = req.params.weight;
  res.render('checkout.html',{"weight":weight,"cost":bill});
});

app.get('/payment/:details',(req,res)=>{
  var k ={};
  for(i=0;i<cart.length;i++){
    k[i] = JSON.parse(cart[i]);
  }
  var tem = JSON.parse(req.params.details);
 
  bill = parseFloat(bill)+JSON.parse(req.params.details).bil;
  
  var orders = {
    "details": tem,
    "bill": bill,
    "cart":k
  }
  

  ke = fref.push(orders).key;
  fi = "./invoices/invoice"+ke+".pdf";
  createInvoice(orders,fi);
 
  cart = [];
  
  transporter.sendMail({
    from: 'deepakvantillu@gmail.com',
    to: orders.details.email,
    subject: 'Recent Order Bill',
    text: 'Check out this attached invoice for Your recent purchase',
    attachments: [{
      path: fi,
      contentType: 'application/pdf'
    }],
    function(err, info) {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        
        res.send(info);
      }
    }
  });

  var fil = "Order Details: \n Name:"+orders.details.name+"\nEmail:"+orders.details.email+"\nPhone: "+orders.details.phone+"\nAddress:"+orders.details.address+"\n";

  transporter.sendMail({
    from: 'deepakvantillu@gmail.com',
    to: 'deepakvantillu@gmail.com',
    subject: 'Order @ '+Date.now(),
    text: fil,
    attachments: [{
      path: fi,
      contentType: 'application/pdf'
    }],
    function(err, info) {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        
        res.send(info);
      }
    }
  });


  res.render('thankyou.html');
});

app.get('/admin', (req, res) => {
  res.render('adminlogin.html');
});



// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const auth = firebase.auth();

app.post('/login', (req, res) => {
  
  //('loggedin');
});

app.get('/admindash', (req, res) => {
  var orders = [];
  fref.on('value', function (snap) {
    orders.push(JSON.stringify(snap.val()));
  })
  res.render("admindash.html", { orders: orders });
});
//wmic path softwareLicensingService get OA3xOriginalProductKey


app.get('/remove', (req, res) => {
  var items1 = [];
  var keys = [];
  firebase.database().ref('products/').on('value', function (snap) {
    snap.forEach(function (snap1) {
      keys.push(snap1.key);
      items1.push(JSON.stringify(snap1.val()));
    });
  });
  res.render('removeitem.html', { items1: items1, keys: keys });
});

app.get('/removeitem/:id', (req, res) => {
  firebase.database().ref('products/' + req.params.id).remove();
  res.redirect('/remove');
});

app.get('/adminadd/:a/:b/:c/:d/:e1/:e2/:e3',(req,res)=>{
  var arr = [];
  var k = [];
  var count=0;
  arr.push("https://drive.google.com/uc?id="+req.params.d);
  frefp.once('value',function(snap){
    snap.forEach(function(snap1){
      count+=1;
    });
  }).then(function(){
    k.push(count);
    frefp.child(String(k[0])).set({
      name:req.params.a,
      descripton:req.params.b,
      type:req.params.c,
      src:arr,
      cost:{
        250:req.params.e1,
        500:req.params.e2,
        1000:req.params.e3
      }
    }).then(function(){
      res.redirect("/admindash");
    });
  });
});