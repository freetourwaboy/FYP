
function generateUPC(code) {
  checkerrorUPC(code);
    // Ensure that the code is 11 digits long
    if (code.length != 11) {
      throw new Error('The code must be 11 digits long.');
    }
  
    // Calculate the check digit
    const digits = code.split('').map(Number);
    let odd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8] + digits[10];
    let even = digits[1] + digits[3] + digits[5] + digits[7] + digits[9];
    const sum = even + odd*3;
    const remainder = sum % 10;
    if (remainder==0)
    var checkdigit = 0;
    else 
    var checkdigit=10-remainder;
    


    // Add the check digit to the end of the code
    const fullcode = code + checkdigit.toString();
  
    // Get the left-hand and right-hand parts of the code
    const leftHand = fullcode.substring(0, 6);
    const rightHand = fullcode.substring(6, 12);
    // Generate the barcode
    const barcode = generateBarcodeUPC(leftHand, rightHand);
    return {barcode, fullcode};
  }


  function generateBarcodeUPC(leftHand, rightHand) {
    // Start the barcode with the guard bars
    let barcode = '101';
  
    // Add the left-hand digits to the barcode
    for (let i = 0; i < leftHand.length; i++) {
      barcode += getLeftHandEncodingupc(leftHand[i]);
    }
    // Add the middle guard bars
    barcode += '01010';
  
    // Add the right-hand digits to the barcode
    for (let i = 0; i < rightHand.length; i++) {
        barcode += getRightHandEncodingupc(rightHand[i]);
      }
  
    // Add the right guard bars and stop character
    barcode += '101';
  return barcode;

  }

  function getRightHandEncodingupc(digit) {
    switch (digit) {
        case "0":
        return "1110010";
      case "1":
        return "1100110";
      case "2":
        return "1101100";
      case "3":
        return "1000010";
      case "4":
        return "1011100";
      case "5":
        return "1001110";
      case "6":
        return "1010000";
      case "7":
        return "1000100";
      case "8":
        return "1001000";
      case "9":
        return "1110100";
      default:
        throw new Error("Invalid digit: " + digit);
    }
  }

  function getLeftHandEncodingupc(digit) {
    switch (digit) {
        case "0":
        return "0001101";
      case "1":
        return "0011001";
      case "2":
        return "0010011";
      case "3":
        return "0111101";
      case "4":
        return "0100011";
      case "5":
        return "0110001";
      case "6":
        return "0101111";
      case "7":
        return "0111011";
      case "8":
        return "0110111";
      case "9":
        return "0001011";
      default:
        throw new Error("Invalid digit: " + digit);
    }
    }
    function checkerrorUPC(code){
      // Ensure that the code is 11 digits long and all digits.
  
      for (let i=0;i<code.length;i++)
    {

      if ((code[i]>'9' || code[i]<'0')&&code.length!=11)
      {
       alert('The input must be digits and 11 digits long.');
        throw new Error('The input must be digits and 11 digits long.');
      }
      else if ((code[i]>'9' || code[i]<'0'))
      {
        
        alert('The input must be digits.');
        throw new Error('The input must be digits.');
      }
    }  
      if (code.length != 11) {
        alert('The code must be 11 digits long.');
       throw new Error('The code must be 11 digits long.');
     }
      
     }