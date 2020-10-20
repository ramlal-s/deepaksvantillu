const orders = {
    details: {
      name: 'Rithik S',
      address: 'nellore,nellore,nellore,,India',
      email: 'sanirithikprasad17087@it.ssn.edu.in',
      phone: '07013826393'
    },
    bill: '60',
    cart: {
      '0': {
        name: 'MANGO PICKLE',
        costperitem: '60',
        weight: '0.5 kg',
        quantity: '1'
      },
      '1': {
        name: 'MANGO PICKLE333333333',
        costperitem: '60',
        weight: '0.5 kg',
        quantity: '1'
      }
    }
  };
  const fs = require("fs");
  const PDFDocument = require("pdfkit");

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
      .text(`Invoice Number: ${invoice.details.name}`, 50, 180)
      .text(`Invoice Number: ${invoice.details.email}`, 50, 195)
      .text(`Invoice Number: ${invoice.details.phone}`, 50, 210)
      .text(`Invoice Date: ${new Date()}`, 50, 225)
      .text(`Bill: ${invoice.bill}`, 50, 240)
      .text(invoice.address, 300, 255)
      .moveDown();
      generateHr(doc,260)
  }
  
  function generateTableRow(doc, y, c1, c2, c3, c4) {
    doc
      .fontSize(10)
      .text(c1, 50, y,{width:200})
      .text(c2, 370, y)
      .text(c3, 450, y)
      .text(c4, 500, y)
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
      const position = invoiceTableTop + (parseInt(i) + 1) * 40;
      generateTableRow(
        doc,
        position,
        invoice.cart[i].name,
        invoice.cart[i].costperitem,
        invoice.cart[i].quantity,
        invoice.cart[i].weight
      );
      generateHr(doc,position+10);
    }
  }

createInvoice(orders, 'output.pdf');