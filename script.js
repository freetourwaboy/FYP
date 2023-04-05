const wrapper = document.querySelector(".wrapper"),
bcInput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector(".form button"),
bcImg = wrapper.querySelector(".barcode img");
let preValue; let preType;let checkedValue;let scwidth = 200;let scheight = 200;
var mycanvas = document.createElement("canvas");let color;let bgcolor;

generateBtn.addEventListener("click", () => {
    let bcValue = bcInput.value.trim();     //Taking Input
    if(!bcValue) return; //Return when input is empty
    preValue = bcValue;
    generateBtn.innerText = "Generating Barcode...";
    let type = document.getElementById('barcode');
    checkedValue = document.querySelector('input[name="degree"]:checked');
    
    var width = document.getElementById('sc_width').value;
    var height = document.getElementById('sc_height').value;

    var color_input = document.getElementById('color_pk').value.substring(1);   //coloring
    color = color_input;
    var bgcolor_input = document.getElementById('bgcolor_pk').value.substring(1);
    bgcolor = bgcolor_input;

    var sentence = document.getElementById('download_sentence');
    var png_link = document.getElementById('download-png');
    var span1 = document.getElementById('download_span1');
    var jpeg_link = document.getElementById('download-jpeg');
        
    preType = type;

    document.getElementById("color_pk").onchange = function() {
        color_input = this.value.substring(1);
        color = color_input;
        //console.log(color_input); //debug
      }

    document.getElementById("bgcolor_pk").onchange = function() {
        bgcolor_input = this.value.substring(1);
        bgcolor = bgcolor_input;
        //console.log(color_input);
      }

    switch (preType.value) {    //Barcode Generation
        case 'qrcode':
            bcImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bcValue}&color=${color_input}&bgcolor=${bgcolor_input}`;
            break;
        case 'code128':
            bcImg.src = generate(preType.value, bcValue);
            break;
        case 'code39':
            bcImg.src = generate(preType.value, bcValue);
            break;
        case 'ean13':
            bcImg.src = generate(preType.value, bcValue);
            break;
        case 'upc':
            bcImg.src = generate(preType.value, bcValue);
            break;
    }

    scwidth = (width === '') ? 200 : width;     // Scaling
    scheight = (height === '') ? 200 : height;

    bcImg.style.width = scwidth + 'px';     // Scaling
    bcImg.style.height = scheight + 'px';

    if (checkedValue.value !== null) {  // Rotation
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
        scwidth = 200; scheight = 200;
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
    // Convert the barcode div contents to a data URL
    var dataURL = bcImg.src;
    
    // Create download links with the data URL
    var pngLink = document.getElementById('download-png');
    pngLink.href = dataURL;
    pngLink.download = 'barcode.png';
}

function downloadjpegBarcode() {
    var dataURL;
    if (preType.value == 'qrcode'){
        dataURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${preValue}&color=${color}&bgcolor=${bgcolor}&format=jpeg`;
    } else {
        dataURL = mycanvas.toDataURL("image/jpeg");
    }

    var jpegLink = document.getElementById('download-jpeg');
    jpegLink.href = dataURL;
    jpegLink.download = 'barcode.jpg';
}
  
function generate(type, value) {
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
        padding: 10,
        paddingTop: 0.2,
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
    mycanvas = drawBarcode(binary, fullcode, obj);
    //console.log(mycanvas);
    return mycanvas.toDataURL("image/png");
}  
  