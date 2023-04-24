const obj = {
  type: 'EAN13',
  barWidth: 2,
  barHeight: 80,
  barColor: '#000',
  textColor: '#f00',
  fontSize: 18,
  fontFamily: 'Verdana',
  padding: 10,
  paddingTop: 100,
};

function drawBarcode(barcodeValue, text, obj, barColor) {
  // Get the canvas element and its 2D context
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext('2d');

  // Set the background color to white
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Calculate the available width and height based on the padding
  const availableWidth = ctx.canvas.width - 2 * obj.padding;
  const availableHeight = ctx.canvas.height - 2 * obj.paddingTop;

  // Calculate the width and height of the barcode based on the aspect ratio and the available width and height
  const barcodeWidth = Math.min(availableWidth, availableHeight * obj.barcodeAspectRatio);
  const barcodeHeight = barcodeWidth / obj.barcodeAspectRatio;

  // Calculate the position of the barcode based on the padding and the available width and height
  const x = (ctx.canvas.width - barcodeWidth) / 2;
  const y = (ctx.canvas.height - barcodeHeight) / 2;

  // Set the canvas size to the calculated dimensions
  //canvas.width = canvas.parentElement.clientWidth;
  //canvas.height = canvas.parentElement.clientHeight;

  // Calculate the width of each barcode unit
  const unitWidth = barcodeWidth / barcodeValue.length;

  // Loop through each barcode unit and draw a rectangle for it
  for (let i = 0; i < barcodeValue.length; i++) {
    const unitValue = barcodeValue[i];
    const unitX = x + i * unitWidth;
    const unitY = y;
    const width = unitWidth;
    const height = barcodeHeight;
    const color = unitValue === '1' ? (barColor ||'#000') : '#fff';
    ctx.fillStyle = color;
    ctx.fillRect(unitX, unitY, width, height);
    if(obj.type=="ean13"){
      if(i<=2 || (i>=45 && i<=49) || i>=92){
        ctx.fillRect(unitX, unitY, width, height*1.1);
      }
    }else if(obj.type=="upc"){
      if(i<=9 || (i>=45 && i<=49) || i>=85){
        ctx.fillRect(unitX, unitY, width, height*1.1);
      }
    }
  }

  // Draw the text under the barcode
  const margin = 0;
  const fontSize = Math.min(barcodeHeight / 4, 14);
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillStyle = obj.textColor || '#000';
  if(text){
    if(obj.type=="ean13"){
      let t1 = text.substring(0,1);
      let t2 = text.substring(1, 7);
      let t3 = text.substring(7);
      ctx.fillText(t1, x-unitWidth*3 ,  y + barcodeHeight + margin + fontSize);
      ctx.fillText(t2, x+unitWidth*26 ,  y + barcodeHeight + margin + fontSize);
      ctx.fillText(t3, x+unitWidth*70 ,  y + barcodeHeight + margin + fontSize);
    }else if(obj.type=="upc"){
      let t1 = text.substring(0, 1);
      let t2 = text.substring(1, 6);
      let t3 = text.substring(6, 11);
      let t4 = text.substring(11);
      ctx.fillText(t1, x-unitWidth*3 , y + barcodeHeight + margin + fontSize);
      ctx.fillText(t2, x+unitWidth*29 , y + barcodeHeight + margin + fontSize);
      ctx.fillText(t3, x+unitWidth*65 , y + barcodeHeight + margin + fontSize);
      ctx.fillText(t4, x+unitWidth*98 , y + barcodeHeight + margin + fontSize);
    }else{
      ctx.fillText(text, canvas.width / 2, y + barcodeHeight + margin + fontSize);
    }
  }
  return canvas;
}