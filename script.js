const wrapper = document.querySelector(".wrapper"),
bcInput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector(".form button"),
bcImg = wrapper.querySelector(".barcode img");
let preValue; let preType;let checkedValue;let scwidth = 200;let scheight = 200;

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
    var bgcolor_input = document.getElementById('bgcolor_pk').value.substring(1);

    var sentence = document.getElementById('download_sentence');
    var png_link = document.getElementById('download-png');
    var span1 = document.getElementById('download_span1');
    var jpeg_link = document.getElementById('download-jpeg');
        
    preType = type;

    document.getElementById("color_pk").onchange = function() {
        color_input = this.value.substring(1);
        //console.log(color_input); //debug
      }

    document.getElementById("bgcolor_pk").onchange = function() {
        bgcolor_input = this.value.substring(1);
        //console.log(color_input);
      }

    switch (preType.value) {    //Barcode Generation
        case 'qrcode':
            bcImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bcValue}&color=${color_input}&bgcolor=${bgcolor_input}`;
            break;
        case 'code128':
            bcImg.src = generatecode128(bcValue);
            break;
        case 'code39':
            bcImg.src = generatecode39(bcValue);
            break;
        case 'ean13':
            bcImg.src = generateean13(bcValue);
            break;
        case 'upc':
            bcImg.src = generateupc(bcValue);
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

function generatecode128 (value) {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, value, {
        format: 'code128',
        displayValue: true,
    });
    return canvas.toDataURL("image/png");
}
function generatecode39 (value) {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, value, {
        format: 'code39',
        displayValue: true,
    });
    return canvas.toDataURL("image/png");
}
function generateean13 (value) {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, value, {
        format: 'ean13',});
    return canvas.toDataURL("image/png");
}
function generateupc (value) {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, value, {format: "UPC"});
    return canvas.toDataURL("image/png");
}

function downloadpngBarcode() {
    // Convert the barcode div contents to a data URL
    var dataURL = bcImg.src;
    
    // Create download links with the data URL
    var pngLink = document.getElementById('download-png');
    pngLink.href = dataURL;
    pngLink.download = 'barcode.png';
}

function downloadjpegBarcode() {
    // Create an image element
        var img = new Image();
    
    // Set the crossOrigin attribute to "anonymous"
        img.crossOrigin = "anonymous";
    
    // Set the image source
        img.src = bcImg.src;
    
    // Wait for the image to load
        img.onload = function() {
      // Create a canvas element
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
    
      // Set the canvas dimensions to match the image dimensions
      canvas.width = img.width;
      canvas.height = img.height;
    
      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);
    
      // Convert the canvas contents to a Blob
        canvas.toBlob(function(blob) {
    
        // Create a download link with the Blob URL
        var link = document.getElementById('download-jpeg');
    
        var dataURL = URL.createObjectURL(blob);
        link.href = dataURL;
        link.download = "barcode.jpg";
      }, "image/jpeg", 0.8);
    };
}
  
  
  