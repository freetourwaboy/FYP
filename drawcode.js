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