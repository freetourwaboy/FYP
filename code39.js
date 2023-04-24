function Code39binary(code) {
  switch (code) {
    case "0":
      return "101001101101";
    case "1":
      return "110100101011";
    case "2":
      return "101100101011";
    case "3":
      return "110110010101";
    case "4":
      return "101001101011";
    case "5":
      return "110100110101";
    case "6":
      return "101100110101";
    case "7":
      return "101001011011";
    case "8":
      return "110100101101";
    case "9":
      return "101100101101";
    case "A":
      return "110101001011";
    case "B":
      return "101101001011";
    case "C":
      return "110110100101";
    case "D":
      return "101011001011";
    case "E":
      return "110101100101";
    case "F":
      return "101101100101";
    case "G":
      return "101010011011";
    case "H":
      return "110101001101";
    case "I":
      return "101101001101";
    case "J":
      return "101011001101";
    case "K":
      return "110101010011";
    case "L":
      return "101101010011";
    case "M":
      return "110110101001";
    case "N":
      return "101011010011";
    case "O":
      return "110101101001";
    case "P":
      return "101101101001";
    case "Q":
      return "101010110011";
    case "R":
      return "110101011001";
    case "S":
      return "101101011001";
    case "T":
      return "101011011001";
    case "U":
      return "110010101011";
    case "V":
      return "100110101011";
    case "W":
      return "110011010101";
    case "X":
      return "100101101011";
    case "Y":
      return "110010110101";
    case "Z":
      return "100110110101";
    case "-":
      return "100101011011";
    case ".":
      return "110010101101";
    case " ":
      return "100110101101";
    case "$":
      return "100100100101";
    case "/":
      return "100100101001";
    case "+":
      return "100101001001";
    case "%":
      return "101001001001";
    case "*":
      return "100101101101";
    default:
      throw new Error("Invalid character in data.");
  }
}

  

function generateCode39(code) {
  checkerrorCode39(code);
  let barcode = "1001011011010"; // Add the inter-character gap after the start character
  for (let i = 0; i < code.length; i++) {
    barcode += Code39binary(code[i]);
    barcode += "0"; // Add the inter-character gap
  }
  barcode += "100101101101";
  console.log(barcode);
  return barcode;
  //return {barcode, fullcode};
}


//check error
//ensure there is less than 15 characters and no invalid input.
function checkerrorCode39(code){
  for (let i=0;i<code.length;i++)
  {
    //uppercase letters (A-Z), numbers (0-9), and a limited set of special characters (-, ., $, /, +, %, and space).
    if (!((code[i]>='0' && code[i]<='9') || (code[i]>='A' && code[i]<='Z') || code[i]=='-' || code[i]=='.'|| code[i]=='$'|| code[i]=='/'|| code[i]=='+'|| code[i]=='%'|| code[i]==' '))
    {
      alert('invalid input');
      throw new Error('invalid input');
    }
  }

  if (code.length > 15) {
    alert('The code must no more than 15 characters long.');
    throw new Error('The code must no more than 15 characters long.');
  }
}
