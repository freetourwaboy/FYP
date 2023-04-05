function generateqrcode(code)
{
    var barcode='';
    var Mode_indicator = '0010';
   for (let i=0;i<code.length;i++)
   {
    barcode+=charToBinary(code[i]);
    barcode+=' ';
   }
  
   var Length_indicator= getCharacterCount(code,1)
   


    return barcode;
    
}

function charToBinary(char) {
    return ("00000000" + char.charCodeAt(0).toString(2)).slice(-8);
  }

  function getCharacterCount(inputString, qrCodeVersion) {
    // Convert input string to bytes using UTF-8 encoding
    const encoder = new TextEncoder();
    const inputBytes = encoder.encode(inputString);
  
    // Calculate length in bits
    const bitLength = inputBytes.length * 8;
  
    // Determine character count field size based on QR code version and input length
    let ccFieldSize;
    if (qrCodeVersion <= 9) {
      ccFieldSize = 8;
    } else if (qrCodeVersion <= 26) {
      ccFieldSize = 11;
    } else {
      ccFieldSize = 16;
    }
  
    // Convert character count to binary string
    const ccBits = inputBytes.length.toString(2).padStart(ccFieldSize, '0');
  
    return ccBits;
  }
  
  
  
console.log(getCharacterCount('google',1));
console.log(generateqrcode('google'));
console.log('code'.length);