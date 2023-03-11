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

    var color_input = document.getElementById('color_pk').value.substring(1);
    preType = type;

    document.getElementById("color_pk").onchange = function() {
        color_input = this.value.substring(1);
        console.log(color_input);
      }

    switch (preType.value) {    //Barcode Generation
        case 'qrcode':
            bcImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bcValue}&color=${color_input}`;
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

    scwidth = (width === '') ? 200 : width;
    scheight = (height === '') ? 200 : height;

    bcImg.style.width = scwidth + 'px';     // Scaling
    bcImg.style.height = scheight + 'px';

    if (checkedValue.value !== null) {  // Rotation
        //console.log(checkedValue.value);    //For Debug
        document.querySelector(".barcode img").style.transform = `rotate(${checkedValue.value}deg)`;
    }

    bcImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate Barcode";
    });
});

bcInput.addEventListener("keyup", () => {
    if(!bcInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";preType = "";checkedValue = "";
        scwidth = 200; scheight = 200;
        //console.log(preType.value); // Debug
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
  