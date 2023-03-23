function drawcode(input){
    //const binaryCode = generateEAN13(input); // example binary code
    const canvas = document.getElementById("barcode-canvas");
    const context = canvas.getContext("2d");
    const barWidth = 4; // width of each barcode segment
    const barHeight = canvas.height - 100; // height of the barcode
    const padding = 10; // padding on the left and right of the barcode
    const numBars = input.length; // number of barcode segments
    const totalWidth = numBars * barWidth + padding * 2; // total width of the barcode
    const textColor = '#000000'; // custom text color
    // const fontSize = 18; // custom font size
    // const fontFamily = 'Verdana'; // custom font family
    canvas.width = totalWidth; // set the canvas width to the total barcode width
    const paddingTop = 0.2;
    //let y = paddingTop * barHeight;
    
    const textHeight = parseInt(context.font);
    const z = (canvas.height + textHeight) / 2;
    // draw the barcode segments
    for (let i = 0; i < numBars; i++) {
      const x = padding + i * barWidth; // x-coordinate of the barcode segment
      const value = input.charAt(i); // get the binary value at this position
      const color = value == "1" ? "black" : "white"; // set the color based on the binary value
      context.fillStyle = color;
      context.fillRect(x, 10, barWidth, barHeight);
    }
      // Add text
      context.fillStyle = textColor;
      context.font = "18px Verdana";
      
      //inputcontext.fillText(input, 100, 100);
      context.fillText(document.getElementById('input-box').value, canvas.width / 2 - context.measureText(document.getElementById('input-box').value).width / 2, barHeight+30);
      
      document.getElementById('error').textContent='';
  }


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

function drawBarcode(binary, text, obj) {
    const canvas = document.getElementById('barcode-canvas');
    const context = canvas.getContext('2d');
    let x = obj.padding * obj.barWidth;
    const init_x = x;
    let y = obj.paddingTop * obj.barHeight;
    const init_y = y;
    const canvasHeight = context.canvas.height;
    const halfBarHeight = obj.barHeight / 2;
  
    // Set the background color to white
    context.fillStyle = '#fff';
    context.fillRect(0, 0, context.canvas.width, canvasHeight);
  
    // Set default text style
    context.fillStyle = obj.textColor || '#000';
    context.font = `${obj.fontSize || 12}px ${obj.fontFamily || 'Arial'}`;
    context.textAlign = 'center';
  
    for (let i = 0; i < binary.length; i++) {
      const barColor = binary[i] === '1' ? '#000' : '#fff';
      context.fillStyle = barColor;
      context.fillRect(x, y, obj.barWidth, obj.barHeight);
  
      // Draw vertical lines
      /*
      if (i % 4 === 3) {
        context.fillRect(x + barWidth, 0, barWidth, canvasHeight);
      }
      */
      if(obj.type=="ean13"){
        if(i<=2 || (i>=45 && i<=49) || i>=92){
          context.fillRect(x, y, obj.barWidth, obj.barHeight*1.1);
        }
      }
      x += obj.barWidth;
    }
    // Add right padding
    x += obj.padding * obj.barWidth;
  
    // Draw half-height bars
    context.fillStyle = '#000';
    context.fillRect(obj.padding * obj.barWidth, y + halfBarHeight - 1, obj.barWidth, 2);
    context.fillRect(x - obj.padding * obj.barWidth, y + halfBarHeight - 1, obj.barWidth, 2);
  
    if (text){
      if(obj.type=="ean13"){
        st=text.substr(0,1);
        nd = text.substr(1, 6);
        rd = text.substr(7);
        context.fillStyle = obj.textColor || '#000';
        context.font = `${obj.fontSize || 12}px ${obj.fontFamily || 'Arial'}`;
        context.fillText(st, obj.padding * 1.2 , y + obj.barHeight + (obj.fontSize || 12) + 5);
        context.fillText(nd, init_x+obj.barWidth*26 , y + obj.barHeight + (obj.fontSize || 12) + 5);
        context.fillText(rd, init_x+obj.barWidth*70 , y + obj.barHeight + (obj.fontSize || 12) + 5);
      }else{
        context.fillStyle = obj.textColor || '#000';
        context.font = `${obj.fontSize || 12}px ${obj.fontFamily || 'Arial'}`;
        context.fillText(text, obj.padding + (binary.length / 2) * obj.barWidth, y + obj.barHeight + (obj.fontSize || 12) + 5);
      }
    }
  }