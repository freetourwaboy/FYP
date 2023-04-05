//find the first type
function check_start_type(code)
{
    check_start_error(code);

    if (code.length==1)
    return "A";

    for (let i=0;i<2;i++)
    {
        if (isNaN(code[i]))
        return 'A';
    }
    return 'C';
}
//check error
function check_start_error(code)
{//let error = document.getElementById('error');
    for (let i=0;i<code.length;i++)
    {
        if (code[i]<" " || code[i]>"_")
        {//error.textContent = "invalid input.";
        throw new Error('invalid input');}
    }
}
//find whether it change type or not
function check_change(code,type,position)
{

        if (!isNaN(code[position+1])&& !isNaN(code[position]))
        {
            console.log(position,position+1,"C")
            return 'C';
        }
        else 
        console.log(position,position+1,"A")
            return 'A';
 
}

console.log(generateCode128("23B056C"));

function generateCode128(code) {
    let total = 0;
    let total_pos = 1;
    var i=0;
    var barcode='';
    //first time
    if (check_start_type(code)=='A')
    {   
        total += (total_pos*getCode128_AValuedec(code[0])+103);
        barcode += "11010000100";
        barcode += getCode128_AValuebin(code[0]);
        console.log(i);
        i+=1;
        
        // console.log("ok");
    }else if (check_start_type(code)=='C')
    {
        total += (total_pos*getCode128_CValuedec(code[0]+code[1])+105);
        barcode += "11010011100";
        barcode += getCode128_CValuebin(code[0]+code[1]);
        console.log(i);
        i+=2;
    }
    total_pos++;
    var type=check_start_type(code);
    while (i<code.length)
    {
        //changed code
        if (type!=check_change(code,type,i))
        {
            if (check_change(code,type,i)=="C")
            {
                barcode += getCode128_AValuebin("CodeC");
                total += total_pos*getCode128_AValuedec("CodeC");
                total_pos++;
            }
            else if (check_change(code,type,i)=="A")
            {
                //console.log(code[i]);
                barcode += getCode128_CValuebin("CodeA");
                total += total_pos*getCode128_CValuedec("CodeA");
                total_pos++;
            }
        }
        type=check_change(code,type,i);
        if (type=="A")
        {
            total += total_pos*getCode128_AValuedec(code[i]);
            barcode += getCode128_AValuebin(code[i]);
            i+=1;
            total_pos++;
        } else if (type=="C")
        {
            console.log(code[i]+code[i+1]);
            total += total_pos*getCode128_CValuedec(code[i]+code[i+1]);
            barcode += getCode128_CValuebin(code[i]+code[i+1]);
            console.log(i);
            i+=2;
            total_pos++;
        }
    }

    var checksum=total%103;
    barcode += getCode128_CValuebin(getCode128_CChar(checksum));
    barcode +="1100011101011";
    return barcode;
}


function getCode128_CChar(number) {
    switch (number) {
      case 0:
        return '00';
      case 1:
        return '01';
      case 2:
        return '02';
      case 3:
        return '03';
      case 4:
        return '04';
      case 5:
        return '05';
      case 6:
        return '06';
      case 7:
        return '07';
      case 8:
        return '08';
      case 9:
        return '09';
      case 10:
        return '10';
      case 11:
        return '11';
      case 12:
        return '12';
      case 13:
        return '13';
      case 14:
        return '14';
      case 15:
        return '15';
      case 16:
        return '16';
      case 17:
        return '17';
      case 18:
        return '18';
      case 19:
        return '19';
      case 20:
        return '20';
      case 21:
        return '21';
      case 22:
        return '22';
      case 23:
        return '23';
      case 24:
        return '24';
      case 25:
        return '25';
      case 26:
        return '26';
      case 27:
        return '27';
      case 28:
        return '28';
      case 29:
        return '29';
      case 30:
        return '30';
      case 31:
        return '31';
      case 32:
        return '32';
      case 33:
        return '33';
      case 34:
        return '34';
      case 35:
        return '35';
      case 36:
        return '36';
      case 37:
        return '37';
      case 38:
        return '38';
      case 39:
        return '39';
      case 40:
        return '40';
      case 41:
        return '41';
      case 42:
        return '42';
      case 43:
        return '43';
      case 44:
        return '44';
      case 45:
        return '45';
      case 46:
        return '46';
      case 47:
        return '47';
      case 48:
        return '48';
      case 49:
        return '49';
      case 50:
        return '50';
      case 51:
        return '51';
      case 52:
        return '52';
      case 53:
        return '53';
      case 54:
        return '54';
      case 55:
        return '55';
      case 56:
        return '56';
      case 57:
        return '57';
      case 58:
        return '58';
      case 59:
        return '59';
      case 60:
        return '60';
      case 61:
        return '61';
      case 62:
        return '62';
      case 63:
        return '63';
      case 64:
        return '64';
      case 65:
        return '65';
      case 66:
        return '66';
      case 67:
        return '67';
      case 68:
        return '68';
      case 69:
        return '69';
      case 70:
        return '70';
        case 71:
          return '71';
        case 72:
          return '72';
        case 73:
          return '73';
        case 74:
          return '74';
        case 75:
          return '75';
        case 76:
          return '76';
        case 77:
          return '77';
        case 78:
          return '78';
        case 79:
          return '79';
        case 80:
          return '80';
        case 81:
          return '81';
        case 82:
          return '82';
        case 83:
          return '83';
        case 84:
          return '84';
        case 85:
          return '85';
        case 86:
          return '86';
        case 87:
          return '87';
        case 88:
          return '88';
        case 89:
          return '89';
        case 90:
          return '90';
        case 91:
          return '91';
        case 92:
          return '92';
        case 93:
          return '93';
        case 94:
          return '94';
        case 95:
          return '95';
        case 96:
          return '96';
        case 97:
          return '97';
        case 98:
          return '98';
        case 99:
          return '99';
          case 100:
            return 'CODEB';
            case 101:
            return 'CODEA';
            case 100:
            return 'FNC1';
        default:
          return ''; // if input is not a valid number for Code 128 type C
    }}      
  
  
    function getCode128_AChar(number) {
      switch (number) {
        case 0: return " ";
        case 1: return "!";
        case 2: return "\"";
        case 3: return "#";
        case 4: return "$";
        case 5: return "%";
        case 6: return "&";
        case 7: return "'";
        case 8: return "(";
        case 9: return ")";
        case 10: return "*";
        case 11: return "+";
        case 12: return ",";
        case 13: return "-";
        case 14: return ".";
        case 15: return "/";
        case 16: return "0";
        case 17: return "1";
        case 18: return "2";
        case 19: return "3";
        case 20: return "4";
        case 21: return "5";
        case 22: return "6";
        case 23: return "7";
        case 24: return "8";
        case 25: return "9";
        case 26: return ":";
        case 27: return ";";
        case 28: return "<";
        case 29: return "=";
        case 30: return ">";
        case 31: return "?";
        case 32: return "@";
        case 33: return "A";
        case 34: return "B";
        case 35: return "C";
        case 36: return "D";
        case 37: return "E";
        case 38: return "F";
        case 39: return "G";
        case 40: return "H";
        case 41: return "I";
        case 42: return "J";
        case 43: return "K";
        case 44: return "L";
        case 45: return "M";
        case 46: return "N";
        case 47: return "O";
        case 48: return "P";
        case 49: return "Q";
        case 50: return "R";
        case 51: return "S";
        case 52: return "T";
        case 53: return "U";
        case 54: return "V";
        case 55: return "W";
        case 56: return "X";
        case 57: return "Y";
        case 58: return "Z";
        case 59: return "[";
        case 60: return "\\";
        case 61: return "]";
        case 62: return "^";
        case 63: return "_";
        case 64: return "NUL";
        case 65: return "SOH";
        case 66: return "STX";
        case 67: return "ETX";
        case 68: return "EOT";
        case 69: return "ENQ";
        case 70: return "ACK";
        case 71: return "BEL";
        case 72: return "BS";
        case 73: return "HT";
        case 74: return "LF";
        case 75: return "VT";
        case 76: return "FF";
        case 77: return "CR";
        case 78: return "SO";
        case 79: return "SI";
        case 80: return "DLE";
        case 81: return "DC1";
        case 82: return "DC2";
        case 83: return "DC3";
        case 84: return "DC4";
        case 85: return "NAK";
        case 86: return "SYN";
        case 87: return "ETB";
        case 88: return "CAN";
        case 89: return "EM";
        case 90: return "SUB";
        case 91: return "ESC";
        case 92: return "FS";
        case 93: return "GS";
        case 94: return "RS";
        case 95: return "US";
        case 96: return "FNC3";
        case 97: return "FNC2";
        case 98: return "ShiftB";
        case 99: return "CodeC";
        case 100: return "CodeB";
        case 101: return "FNC4";
        case 102: return "FNC1";
        default: return "Invalid value";
        }
        }
    
  
  function getCode128_CValuedec(char) {
    switch (char) {
      case '00':
        return 0;
      case '01':
        return 1;
      case '02':
        return 2;
      case '03':
        return 3;
      case '04':
        return 4;
      case '05':
        return 5;
      case '06':
        return 6;
      case '07':
        return 7;
      case '08':
        return 8;
      case '09':
        return 9;
      case '10':
        return 10;
      case '11':
        return 11;
      case '12':
        return 12;
      case '13':
        return 13;
      case '14':
        return 14;
      case '15':
        return 15;
      case '16':
        return 16;
      case '17':
        return 17;
      case '18':
        return 18;
      case '19':
        return 19;
      case '20':
        return 20;
      case '21':
        return 21;
      case '22':
        return 22;
      case '23':
        return 23;
      case '24':
        return 24;
      case '25':
        return 25;
      case '26':
        return 26;
      case '27':
        return 27;
      case '28':
        return 28;
      case '29':
        return 29;
      case '30':
        return 30;
      case '31':
        return 31;
      case '32':
        return 32;
      case '33':
        return 33;
      case '34':
        return 34;
      case '35':
        return 35;
      case '36':
        return 36;
      case '37':
        return 37;
      case '38':
        return 38;
      case '39':
        return 39;
      case '40':
        return 40;
      case '41':
        return 41;
      case '42':
        return 42;
      case '43':
        return 43;
      case '44':
        return 44;
      case '45':
        return 45;
      case '46':
        return 46;
      case '47':
        return 47;
      case '48':
        return 48;
      case '49':
        return 49;
      case '50':
        return 50;
      case '51':
        return 51;
      case '52':
        return 52;
      case '53':
        return 53;
      case '54':
        return 54;
      case '55':
        return 55;
      case '56':
        return 56;
      case '57':
        return 57;
      case '58':
        return 58;
      case '59':
        return 59;
      case '60':
        return 60;
      case '61':
        return 61;
      case '62':
        return 62;
      case '63':
        return 63;
      case '64':
        return 64;
      case '65':
        return 65;
      case '66':
        return 66;
      case '67':
        return 67;
      case '68':
        return 68;
      case '69':
        return 69;
      case '70':
        return 70;
      case '71':
        return 71;
        case '72':
        return 72;
        case '73':
        return 73;
        case '74':
        return 74;
        case '75':
        return 75;
        case '76':
        return 76;
        case '77':
        return 77;
        case '78':
        return 78;
        case '79':
        return 79;
        case '80':
        return 80;
        case '81':
        return 81;
        case '82':
        return 82;
        case '83':
        return 83;
        case '84':
        return 84;
        case '85':
        return 85;
        case '86':
        return 86;
        case '87':
        return 87;
        case '88':
        return 88;
        case '89':
        return 89;
        case '90':
        return 90;
        case '91':
        return 91;
        case '92':
        return 92;
        case '93':
        return 93;
        case '94':
        return 94;
        case '95':
        return 95;
        case '96':
        return 96;
        case '97':
        return 97;
        case '98':
        return 98;
        case '99':
        return 99;
        case 'CodeB':
        return 100;
        case 'CodeA':
        return 101;
        case 'FNC1':
        return 102;
        default:
        return ''; // if input is not a valid character for Code 128 type C
        }
        }
  
        function getCode128_AValuedec(char) {
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
            case 'NUL': return 64; // NUL
            case 'SOH': return 65; // SOH
            case 'STX': return 66; // STX
            case 'ETX': return 67; // ETX
            case 'EOT': return 68; // EOT
            case 'ENQ': return 69; // ENQ
            case 'ACK': return 70; // ACK
            case 'BEL': return 71; // BEL
            case 'BS': return 72; // BS
            case 'HT': return 73; // HT
            case 'LF': return 74; // LF
            case 'VT': return 75; // VT
            case 'FF': return 76; // FF
            case 'CR': return 77; // CR
            case 'SO': return 78; // SO
            case 'SI': return 79; // SI
            case 'DLE': return 80; // DLE
            case 'DC1': return 81; // DC1
            case 'DC2': return 82; // DC2
            case 'DC3': return 83; // DC3
            case 'DC4': return 84; // DC4
            case 'NAK': return 85; // NAK
            case 'SYN': return 86; // SYN
            case 'ETB': return 87; // ETB
            case 'CAN': return 88; // CAN
            case 'EM': return 89; // EM
            case 'SUB': return 90; // SUB
            case 'ESC': return 91; // ESC
            case 'FS': return 92; // FS
            case 'GS': return 93; 
            case 'RS': return 94; 
            case 'US': return 95; 
            case 'FNC3': return 96;
            case 'FNC2': return 97;
            case 'ShiftB': return 98;
            case 'CodeC': return 99;
            case 'CodeB': return 100;
            case 'FNC4': return 101;
            case 'FNC1': return 102;
            default: throw new Error('Invalid character for Code 128A');
          }
        }
  
  function getCode128_AValuebin(char) {
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
      case '0': return '10011101100';
      case '1': return '10011100110';
      case '2': return '11001110010';
      case '3': return '11001011100';
      case '4': return '11001001110';
      case '5': return '11011100100';
      case '6': return '11001110100';
      case '7': return '11101101110';
      case '8': return '11101001100';
      case '9': return '11100101100';
      case ':': return '11100100110';
      case ';': return '11101100100';
      case '<': return '11100110100';
      case '=': return '11100110010';
      case '>': return '11011011000';
      case '?': return '11011000110';
      case '@': return '11000110110';
      case 'A': return '10100011000';
      case 'B': return '10001011000';
      case 'C': return '10001000110';
      case 'D': return '10110001000';
      case 'E': return '10001101000';
      case 'F': return '10001100010';
      case 'G': return '11010001000';
      case 'H': return '11000101000';
      case 'I': return '11000100010';
      case 'J': return '10110111000';
      case 'K': return '10110001110';
      case 'L': return '10001101110';
      case 'M': return '10111011000';
      case 'N': return '10111000110';
      case 'O': return '10001110110';
      case 'P': return '11101110110';
      case 'Q': return '11010001110';
      case 'R': return '11000101110';
      case 'S': return '11011101000';
      case 'T': return '11011100010';
      case 'U': return '11011101110';
      case 'V': return '11101011000';
      case 'W': return '11101000110';
      case 'X': return '11100010110';
      case 'Y': return '11101101000';
      case 'Z': return '11101100010';
      case '[': return '11100011010';
      case '\\': return '11101111010';
      case ']': return '11001000010';
      case '^': return '11110001010';
      case '_': return '10100110000';
      case 'NUL': return '10100001100';
      case 'SOH': return '10010110000';
      case 'STX': return '10010000110';
      case 'ETX': return '10000101100';
      case 'EOT': return '10000100110';
      case 'ENQ': return '10110010000';
      case 'ACK': return '10110000100';
      case 'BEL': return '10011010000';
      case 'BS': return '10011000010';
      case 'HT': return '10000110100';
      case 'LF': return '10000110010';
      case 'VT': return '11000010010';
      case 'FF': return '11001010000';
      case 'CR': return '11110111010';
      case 'SO': return '11000010100';
      case 'SI': return '10001111010';
      case 'DLE': return '10100111100';
      case 'DC1': return '10010111100';
      case 'DC2': return '10010011110';
      case 'DC3': return '10111100100';
      case 'DC4': return '10011110100';
      case 'NAK': return '10011110010';
      case 'SYN': return '11110100100';
      case 'ETB': return '11110010100';
      case 'CAN': return '11110010010';
      case 'EM': return '11011011110';
      case 'SUB': return '11011110110';
      case 'ESC': return '11110110110';
      case 'FS': return '10101111000';
      case 'GS': return '10100011110';
      case 'RS': return '10001011110';
      case 'US': return '10111101000';
      case 'FNC3': return '10111100010';
      case 'FNC2': return '11110101000';
      case 'ShiftB': return '11110100010';
      case 'CodeC': return '10111011110';
      case 'CodeB': return '10111101110';
      case 'FNC4': return '11101011110';
      case 'FNC1': return '11110101110';
      // case 'Start Code A': return '11010000100';
      // case 'Start Code B': return '11010010000';
      // case 'Start Code C': return '11010011100';
      // case 'Stop': return '11000111010';
      // case 'Reverse Stop': return '11010111000';
      // case 'Stop pattern': return '1100011101011';
      default: return '';
    }
  }
  function getCode128_CValuebin(char) {
      switch(char) {
        case '00':
          return "11011001100";
        case '01':
          return "11001101100";
        case '02':
          return "11001100110";
        case '03':
          return "10010011000";
        case '04':
          return "10010001100";
        case '05':
          return "10001001100";
        case '06':
          return "10011001000";
        case '07':
          return "10011000100";
        case '08':
          return "10001100100";
        case '09':
          return "11001001000";
        case '10':
          return "11001000100";
        case '11':
          return "11000100100";
        case '12':
          return "10110011100";
        case '13':
          return "10011011100";
        case '14':
          return "10011001110";
        case '15':
          return "10111001100";
        case '16':
          return "10011101100";
        case '17':
          return "10011100110";
        case '18':
          return "11001110010";
        case '19':
          return "11001011100";
        case '20':
          return "11001001110";
        case '21':
          return "11011100100";
        case '22':
          return "11001110100";
        case '23':
          return "11101101110";
        case '24':
          return "11101001100";
        case '25':
          return "11100101100";
        case '26':
          return "11100100110";
        case '27':
          return "11101100100";
        case '28':
          return "11100110100";
        case '29':
          return "11100110010";
        case '30':
          return "11011011000";
        case '31':
          return "11011000110";
        case '32':
          return "11000110110";
        case '33':
          return "10100011000";
        case '34':
          return "10001011000";
        case '35':
          return "10001000110";
        case '36':
          return "10110001000";
        case '37':
          return "10001101000";
        case '38':
          return "10001100010";
        case '39':
          return "11010001000";
        case '40':
          return "11000101000";
        case '41':
          return "11000100010";
        case '42':
          return "10110111000";
        case '43':
          return "10110001110";
        case '44':
          return "10001101110";
        case '45':
          return "10111011000";
        case '46':
          return "10111000110";
        case '47':
          return "10001110110";
        case '48':
          return "11101110110";
        case '49':
          return "11010001110";
        case '50':
          return "11000101110";
        case '51':
          return "11011101000";
        case '52':
          return "11011100010";
        case '53':
          return "11011101110";
        case '54':
          return "11101011000";
        case '55':
          return "11101000110";
        case '56':
          return "11100010110";
          case '57':
            return "11101101000";
          case '58':
            return "11101100010";
          case '59':
            return "11100011010";
          case '60':
            return "11101111010";
          case '61':
            return "11001000010";
          case '62':
            return "11110001010";
          case '63':
            return "10100110000";
          case '64':
            return "10100001100";
          case '65':
            return "10010110000";
          case '66':
            return "10010000110";
          case '67':
            return "10000101100";
          case '68':
            return "10000100110";
          case '69':
            return "10110010000";
          case '70':
            return "10110000100";
          case '71':
            return "10011010000";
          case '72':
            return "10011000010";
          case '73':
            return "10000110100";
          case '74':
            return "10000110010";
          case '75':
            return "11000010010";
          case '76':
            return "11001010000";
          case '77':
            return "11110111010";
          case '78':
            return "11000010100";
          case '79':
            return "10001111010";
          case '80':
            return "10100111100";
          case '81':
            return "10010111100";
          case '82':
            return "10010011110";
          case '83':
            return "10111100100";
          case '84':
            return "10011110100";
          case '85':
            return "10011110010";
          case '86':
            return "11110100100";
          case '87':
            return "11110010100";
          case '88':
            return "11110010010";
          case '89':
            return "11011011110";
          case '90':
            return "11011110110";
          case '91':
            return "11110110110";
          case '92':
            return "10101111000";
          case '93':
            return "10100011110";
          case '94':
            return "10001011110";
          case '95':
            return "10111101000";
          case '96':
            return "10111100010";
          case '97':
            return "11110101000";
          case '98':
            return "11110100010";
          case '99':
            return "10111011110";
          case 'CodeA':
            return "11101011110";
          case 'CodeB':
            return "10111101110";
          case 'FNC1':
            return "11110101110";
          default:
            return "";
          
      }
    }