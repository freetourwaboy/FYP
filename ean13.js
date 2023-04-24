function generateEAN13(code) {
  checkerrorEAN13(code);
    // Calculate the check digit
    const digits = code.split('').map(Number);
    let odd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8] + digits[10];
    let even = digits[1] + digits[3] + digits[5] + digits[7] + digits[9] + digits[11];
    const sum = even * 3  + odd;
    const remainder = sum % 10;
    if (remainder==0)
    var checkdigit = 0;
    else 
    var checkdigit=10-remainder;


    // Add the check digit to the end of the code
    const fullcode = code + checkdigit.toString();
  
    // Get the left-hand and right-hand parts of the code
    const leftHand = fullcode.substring(0, 7);
    const rightHand = fullcode.substring(7, 13);
    // Generate the barcode
    const barcode = generateBarcode13(leftHand, rightHand);
    return {barcode, fullcode};
  }

  function checkleftoddoreven(leftHand)
  {
    var oddeven=[];
    switch(leftHand[0])
{
    case "0":
    return oddeven = [1,1,1,1,1,1];
    case "1":
        return oddeven = [1,1,0,1,0,0];
    case "2":
        return oddeven = [1,1,0,0,1,0];
    case "3":
        return oddeven = [1,1,0,0,0,1];
    case "4":
        return oddeven = [1,0,1,1,0,0];
    case "5":
        return oddeven = [1,0,0,1,1,0];
    case "6":
        return oddeven = [1,0,0,0,1,1];
    case "7":
        return oddeven = [1,0,1,0,1,0];
    case "8":
        return oddeven = [1,0,1,0,0,1];
    case "9":
        return oddeven = [1,0,0,1,0,1];
}
return oddeven;
  }

  function generateBarcode13(leftHand, rightHand) {
    var oddeven = checkleftoddoreven(leftHand);
    // Start the barcode with the guard bars
    let barcode = '101';
  
    // Add the left-hand digits to the barcode
    for (let i = 1; i < leftHand.length; i++) {
      barcode += getLeftHandEncoding(oddeven[i-1],leftHand[i]);
      
    }
    // Add the middle guard bars
    barcode += '01010';
  
    // Add the right-hand digits to the barcode
    for (let i = 0; i < rightHand.length; i++) {
        barcode += getRightHandEncoding(rightHand[i]);
      }
  
    // Add the right guard bars and stop character
    barcode += '101';
    console.log(barcode);
    return barcode;
  }

  function getRightHandEncoding(digit) {
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

  function getLeftHandEncoding(oddoreven,digit) {
    if (oddoreven==1){
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
else if (oddoreven==0){
    switch (digit) {
      case "0":
        return "0100111";
      case "1":
        return "0110011";
      case "2":
        return "0011011";
      case "3":
        return "0100001";
      case "4":
        return "0011101";
      case "5":
        return "0111001";
      case "6":
        return "0000101";
      case "7":
        return "0010001";
      case "8":
        return "0001001";
      case "9":
        return "0010111";
      default:
        throw new Error("Invalid digit: " + digit);
    }
  }}
  function checkerrorEAN13(code){
    // Ensure that the code is 12 digits long and all digits.

    for (let i=0;i<code.length;i++)
    {
      if ((code[i]>'9' || code[i]<'0')&&code.length!=12)
      {
       alert('The input must be digits and 12 digits long.');
        throw new Error('The input must be digits and 12 digits long.');
      }
      else if ((code[i]>'9' || code[i]<'0'))
      {
        
        alert('The input must be digits.');
        throw new Error('The input must be digits.');
      }
    }
      if (code.length != 12) {
        alert('The code must be 12 digits long.');
       throw new Error('The code must be 12 digits long.');
     }
       
   }
