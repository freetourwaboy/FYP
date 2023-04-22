const wrapper = document.querySelector(".wrapper"),
bcInput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector(".form button"),
bcImg = wrapper.querySelector(".barcode img");
let preValue; let preType;let checkedValue;var scwidth = 200;var scheight = 200;var rtdegree = 0;
var mycanvas = document.createElement("canvas");let color;let textcolor;

generateBtn.addEventListener("click", () => {
    let bcValue = bcInput.value.trim();     //Taking Input
    if(!bcValue) return; //Return when input is empty
    preValue = bcValue;
    generateBtn.innerText = "Generating Barcode...";
    let type = document.getElementById('barcode');
    checkedValue = document.querySelector('input[name="degree"]:checked');
    
    var width = document.getElementById('sc_width').value;
    var height = document.getElementById('sc_height').value;

    var color_input = document.getElementById('color_pk').value.substring(1);   //Coloring
    color = color_input;
    var textcolor_input = document.getElementById('textcolor_pk').value.substring(1);
    textcolor = textcolor_input;

    var sentence = document.getElementById('download_sentence');
    var png_link = document.getElementById('download-png');
    var span1 = document.getElementById('download_span1');
    var jpeg_link = document.getElementById('download-jpeg');
        
    preType = type;

    document.getElementById("color_pk").onchange = function() {
        color_input = this.value;
        color = color_input;
        //console.log(color_input); //debug
      }

    document.getElementById("textcolor_pk").onchange = function() {
        textcolor_input = this.value;
        textcolor = textcolor_input;
        //console.log(textcolor_input);
      }

    switch (preType.value) {    //Barcode Generation
        case 'qrcode':
            //bcImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bcValue}&color=${color_input}&bgcolor=${textcolor_input}`;
            bcImg.src = generateqrcode(bcValue, color_input);
            break;
        case 'code128':
            bcImg.src = generate(preType.value, bcValue, color_input, textcolor_input);
            break;
        case 'code39':
            bcImg.src = generate(preType.value, bcValue, color_input, textcolor_input);
            break;
        case 'ean13':
            bcImg.src = generate(preType.value, bcValue, color_input, textcolor_input);
            break;
        case 'upc':
            bcImg.src = generate(preType.value, bcValue, color_input, textcolor_input);
            break;
    }

    scwidth = (width === '') ? 200 : width;     // Scaling
    scheight = (height === '') ? 200 : height;

    bcImg.style.width = scwidth + 'px';     // Scaling
    bcImg.style.height = scheight + 'px';

    if (checkedValue.value !== null) {  // Rotation
        rtdegree = checkedValue;
        document.querySelector(".barcode img").style.transform = `rotate(${checkedValue.value}deg)`;
    }

    bcImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate Barcode";

        sentence.style.display = 'inline-block';
        png_link.style.display = 'inline-block';
        span1.style.display = 'inline-block';
        jpeg_link.style.display = 'inline-block';
        document.getElementById('download-png').addEventListener('click', downloadpngBarcode);
        document.getElementById('download-jpeg').addEventListener('click',downloadjpegBarcode);
    });
});

bcInput.addEventListener("keyup", () => {
    if(!bcInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";preType = "";checkedValue = "";
        scwidth = 200; scheight = 200; rtdegree = 0;
    }
});

// function generatecode128 (value) {
//     var canvas = document.createElement("canvas");
//     JsBarcode(canvas, value, {
//         format: 'code128',
//         displayValue: true,
//     });
//     return canvas.toDataURL("image/png");
// }
// function generatecode128 (value) {
//     var canvas = document.createElement("canvas");
//     JsBarcode(canvas, value, {
//         format: 'code128',
//         displayValue: true,
//     });
//     return canvas.toDataURL("image/png");
// }
// function generatecode39 (value) {
//     var canvas = document.createElement("canvas");
//     JsBarcode(canvas, value, {
//         format: 'code39',
//         displayValue: true,
//     });
//     return canvas.toDataURL("image/png");
// }
// function generateeatn13 (value) {
//     var canvas = document.createElement("canvas");
//     JsBarcode(canvas, value, {
//         format: 'ean13',});
//     return canvas.toDataURL("image/png");
// }
// function generateupc (value) {
//     var canvas = document.createElement("canvas");
//     JsBarcode(canvas, value, {format: "UPC"});
//     return canvas.toDataURL("image/png");
// }

function downloadpngBarcode() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set desired dimensions for the image
    const newWidth = scwidth;
    const newHeight = scheight;

    // Set the canvas dimensions to the desired dimensions
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Apply rotation to the canvas context
    ctx.translate(newWidth / 2, newHeight / 2);
    ctx.rotate(rtdegree.value * Math.PI / 180);
    ctx.translate(-newWidth / 2, -newHeight / 2);

    // Draw the resized image onto the canvas
    ctx.drawImage(bcImg, 0, 0, newWidth, newHeight);

    // Convert canvas element to data URL
    const dataURL = canvas.toDataURL("image/png");
    
    // Create download links with the data URL
    var pngLink = document.getElementById('download-png');
    pngLink.href = dataURL;
    pngLink.download = 'barcode.png';
}

function downloadjpegBarcode() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set desired dimensions for the image
    const newWidth = scwidth;
    const newHeight = scheight;

    // Set the canvas dimensions to the desired dimensions
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Apply rotation to the canvas context
    ctx.translate(newWidth / 2, newHeight / 2);
    ctx.rotate(rtdegree.value * Math.PI / 180);
    ctx.translate(-newWidth / 2, -newHeight / 2);

    // Draw the resized image onto the canvas
    ctx.drawImage(bcImg, 0, 0, newWidth, newHeight);

    // Convert canvas element to data URL
    const dataURL = canvas.toDataURL("image/jpeg");

    var jpegLink = document.getElementById('download-jpeg');
    jpegLink.href = dataURL;
    jpegLink.download = 'barcode.jpg';
}
  
function generate(type, value, color, tcolor) {
    var selected = type;  //Barcode type
    const code = value; // input content
    var binary='';
    var fullcode=code;
    const obj = {
        type: 'EAN13',
        barWidth: 2,
        barHeight: 80,
        textColor: '#f00',
        fontSize: 18,
        fontFamily: 'Verdana',
        padding: 50,
        paddingTop: 50,
    };
    if (selected=='ean13')
    {
      obj.type = "ean13";
      var ean = generateEAN13(code);
      binary = ean.barcode;
      fullcode = ean.fullcode;
    }
    else if (selected=='upc')
    {
      obj.type = "upc";
      var upc = generateUPC(code);
      binary = upc.barcode;
      fullcode = upc.fullcode;
    }
    else if (selected=='code39')
    {
      obj.type = "code39";
      binary= generateCode39(code);
    }
    else if (selected=='code128')
    {
      obj.type = "code128";
      binary= generateCode128(code);
    }
    var color_input = '#' + color;

    var tcolor_input = '#' + tcolor;
    obj.textColor = tcolor_input;

    mycanvas = drawBarcode(binary, fullcode, obj, color_input);
    //console.log(mycanvas);
    return mycanvas.toDataURL("image/png");
}

function generateqrcode(value, color) {
    mycanvas = QRCode.generatePNG(value, color);

    return mycanvas.toDataURL("image/png");
}

function formplaceholder(){
    var type = document.getElementById('barcode').value;
    var form_textplace = document.getElementById('form_text');

    switch (type) {
        case 'qrcode':
            form_textplace.placeholder = 'Enter text or url';
            break;
        case 'code128':
            form_textplace.placeholder = 'Enter digit, capital letters content';
            break;
        case 'code39':
            form_textplace.placeholder = 'Enter digit, capital letters content';
            break;
        case 'ean13':
            form_textplace.placeholder = 'Please enter 12 digit content';
            break;
        case 'upc':
            form_textplace.placeholder = 'Please enter 11 digit content';
            break;
    }
}
  