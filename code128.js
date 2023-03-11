function checkAorC(code)
{
    if (code.length<=1)
    return 'A';
    for (let i=0;i<code.length;i++)
    {
        if (isNaN(code[i]))
        return 'A';
    }
    return 'C';
}
console.log(String.fromCharCode(1));
console.log(generateCode128('UST'));
function generateCode128(code)
{
    if (checkAorC(code)=='A')
    {
       let total=103;
       for (let i=0;i<code.length;i++)
       {
        total+=((i+1)*getCode128Valuedec(code[i]));
       }
       let checksum = total % 103;
       let barcode = '11010000100';
       for (let i=0;i<code.length;i++)
       {
        barcode += getCode128Valuebin(code[i]);
       }
       return String.fromCharCode(checksum);
       barcode += getCode128Valuebin(String.fromCharCode(checksum));
       barcode += '1100011101011';
       return barcode;
    }
}
function getCode128Valuedec(char) {
    switch (char) {
      case ' ': return 0;
      case '!': return 1;
      case '"': return 2;
      case '#': return 3;
      case '$': return 4;
      case '%': return 5;
      case '&': return 6;
      case "'": return 7;
      case '(': return 8;
      case ')': return 9;
      case '*': return 10;
      case '+': return 11;
      case ',': return 12;
      case '-': return 13;
      case '.': return 14;
      case '/': return 15;
      case '0': return 16;
      case '1': return 17;
      case '2': return 18;
      case '3': return 19;
      case '4': return 20;
      case '5': return 21;
      case '6': return 22;
      case '7': return 23;
      case '8': return 24;
      case '9': return 25;
      case ':': return 26;
      case ';': return 27;
      case '<': return 28;
      case '=': return 29;
      case '>': return 30;
      case '?': return 31;
      case '@': return 32;
      case 'A': return 33;
      case 'B': return 34;
      case 'C': return 35;
      case 'D': return 36;
      case 'E': return 37;
      case 'F': return 38;
      case 'G': return 39;
      case 'H': return 40;
      case 'I': return 41;
      case 'J': return 42;
      case 'K': return 43;
      case 'L': return 44;
      case 'M': return 45;
      case 'N': return 46;
      case 'O': return 47;
      case 'P': return 48;
      case 'Q': return 49;
      case 'R': return 50;
      case 'S': return 51;
      case 'T': return 52;
      case 'U': return 53;
      case 'V': return 54;
      case 'W': return 55;
      case 'X': return 56;
      case 'Y': return 57;
      case 'Z': return 58;
      case '[': return 59;
      case '\\': return 60;
      case ']': return 61;
      case '^': return 62;
      case '_': return 63;
      case '`': return 64;
      case 'a': return 65;
      case 'b': return 66;
      case 'c': return 67;
      case 'd': return 68;
      case 'e': return 69;
      case 'f': return 70;
      case 'g': return 71;
      case 'h': return 72;
      case 'i': return 73;
      case 'j': return 74;
      case 'k': return 75;
      case 'l': return 76;
      case 'm': return 77;
      case 'n': return 78;
      case 'o': return 79;
      case 'p': return 80;
    case 'q': return 81;
    case 'r': return 82;
    case 's': return 83;
    case 's': return 83;
    case 't': return 84;
    case 'u': return 85;
    case 'v': return 86;
    case 'w': return 87;
    case 'x': return 88;
    case 'y': return 89;
    case 'z': return 90;
    case '{': return 91;
    case '|': return 92;
    case '}': return 93;
    case '~': return 94;
    default: return -1; // invalid character
    }
}


function getCode128Valuebin(char) {
    switch (char) {
      case ' ': return '11011001100';
      case '!': return '11001101100';
      case '"': return '11001100110';
      case '#': return '10010011000';
      case '$': return '10010001100';
      case '%': return '10001001100';
      case '&': return '10011001000';
      case "'": return '10011000100';
      case '(': return '10001100100';
      case ')': return '11001001000';
      case '*': return '11001000100';
      case '+': return '11000100100';
      case ',': return '10110011100';
      case '-': return '10011011100';
      case '.': return '10011001110';
      case '/': return '10111001100';
      case '0': return '10001101100';
      case '1': return '10001100110';
      case '2': return '11001100100';
      case '3': return '11001000110';
      case '4': return '11000110010';
      case '5': return '11000100110';
      case '6': return '10110010000';
      case '7': return '10110001100';
      case '8': return '10011010000';
      case '9': return '10011000010';
      case ':': return '10000101100';
      case ';': return '10000100110';
      case '<': return '10110011000';
      case '=': return '10001110100';
      case '>': return '10001110010';
      case '?': return '11010000100';
      case '@': return '11010010000';
      case 'A': return '11010011100';
      case 'B': return '11000111010';
      case 'C': return '11000111010';
      case 'D': return '11000111100';
      case 'E': return '11011100100';
      case 'F': return '11011110000';
      case 'G': return '11011110100';
      case 'H': return '11101101110';
      case 'I': return '11101001100';
      case 'J': return '11100101100';
      case 'K': return '11100100110';
      case 'L': return '11101100100';
      case 'M': return '11100110100';
      case 'N': return '11100110010';
      case 'O': return '11011011000';
      case 'P': return '11011000110';
      case 'Q': return '11000110110';
      case 'R': return '10100011000';
      case 'S': return '10001011000';
      case 'T': return '10001000110';
      case 'U': return '10110001000';
      case 'V': return '10001101000';
      case 'W': return '10001100010';
      case 'X': return '11010001000';
      case 'Y': return '11000101000';
      case 'Z': return '11000100010';
      case '[': return '10110111000';
      case '\\': return '10110001110';
      case ']': return '10001101110';
      case '^': return '10111011000';
      case '_': return '10100110000';
      case '`': return '10111000110';
case 'a': return '10111010000';
case 'b': return '10111010000';
case 'c': return '10110110000';
case 'd': return '10111001100';
case 'e': return '10111000100';
case 'f': return '11110100000';
case 'g': return '11110100000';
case 'h': return '10101111000';
case 'i': return '10100011110';
case 'j': return '10001011110';
case 'k': return '10111101000';
case 'l': return '10111100010';
case 'm': return '11110101000';
case 'n': return '11110100010';
case 'o': return '10100001110';
case 'p': return '10110001110';
case 'q': return '10010101100';
case 'r': return '10010100110';
case 's': return '10010010110';
case 't': return '10010000110';
case 'u': return '10100100100';
case 'v': return '10100010010';
case 'w': return '10010001100';
case 'x': return '10010110010';
case 'y': return '11101010000';
case 'z': return '11101000100';
case '{': return '11100010100';
case '|': return '11100010010';
case '}': return '11110111010';
case '~': return '11000010110';
default: return '';
}
}
// function drawcode128(input){
//     const binaryCode = generateCode128(input); // example binary code
//     const canvas = document.getElementById("barcode-canvas");
//     const context = canvas.getContext("2d");
//     const barWidth = 4; // width of each barcode segment
//     const barHeight = canvas.height - 20; // height of the barcode
//     const padding = 10; // padding on the left and right of the barcode
//     const numBars = binaryCode.length; // number of barcode segments
//     const totalWidth = numBars * barWidth + padding * 2; // total width of the barcode
  
//     canvas.width = totalWidth; // set the canvas width to the total barcode width
  
//     // draw the barcode segments
//     for (let i = 0; i < numBars; i++) {
//       const x = padding + i * barWidth; // x-coordinate of the barcode segment
//       const value = binaryCode.charAt(i); // get the binary value at this position
//       const color = value == "1" ? "black" : "white"; // set the color based on the binary value
//       context.fillStyle = color;
//       context.fillRect(x, 10, barWidth, barHeight);
//     }
//   }