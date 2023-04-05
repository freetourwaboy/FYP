const obj = {
  type: 'EAN13',
  barWidth: 2,
  barHeight: 80,
  barColor: '#000',
  textColor: '#f00',
  fontSize: 18,
  fontFamily: 'Verdana',
  padding: 10,
  paddingTop: 0.2,
};

function drawBarcode(binary, text, obj) {
  const canvas = document.createElement("canvas");
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
    const barColor = binary[i] === '1' ? (obj.barColor || '#000') : '#fff';
    context.fillStyle = barColor;
    context.fillRect(x, y, obj.barWidth, obj.barHeight);
    if(obj.type=="ean13"){
      if(i<=2 || (i>=45 && i<=49) || i>=92){
        context.fillRect(x, y, obj.barWidth, obj.barHeight*1.1);
      }
    }else if(obj.type=="upc"){
      if(i<=9 || (i>=45 && i<=49) || i>=85){
        context.fillRect(x, y, obj.barWidth, obj.barHeight*1.1);
      }
    }
    x += obj.barWidth;
  }
  // Add right padding
  x += obj.padding * obj.barWidth;

  if (text){
    if(obj.type=="ean13"){
      let t1 = text.substring(0,1);
      let t2 = text.substring(1, 6);
      let t3 = text.substring(7);
      context.fillStyle = obj.textColor || '#000';
      context.font = `${obj.fontSize || 12}px ${obj.fontFamily || 'Arial'}`;
      context.fillText(t1, obj.padding * 1.2 , y + obj.barHeight + (obj.fontSize || 12) + 5);
      context.fillText(t2, init_x+obj.barWidth*26 , y + obj.barHeight + (obj.fontSize || 12) + 5);
      context.fillText(t3, init_x+obj.barWidth*70 , y + obj.barHeight + (obj.fontSize || 12) + 5);
    }else if(obj.type=="upc"){
      let t1 = text.substring(0, 1);
      let t2 = text.substring(1, 6);
      let t3 = text.substring(6, 11);
      let t4 = text.substring(11);
      context.fillStyle = obj.textColor || '#000';
      context.font = `${obj.fontSize || 12}px ${obj.fontFamily || 'Arial'}`;
      context.fillText(t1, init_x-obj.barWidth*3 , y + obj.barHeight + (obj.fontSize || 12) + 5);
      context.fillText(t2, init_x+obj.barWidth*29 , y + obj.barHeight + (obj.fontSize || 12) + 5);
      context.fillText(t3, init_x+obj.barWidth*65 , y + obj.barHeight + (obj.fontSize || 12) + 5);
      context.fillText(t4, init_x+obj.barWidth*98 , y + obj.barHeight + (obj.fontSize || 12) + 5);
    }else{
      context.fillStyle = obj.textColor || '#000';
      context.font = `${obj.fontSize || 12}px ${obj.fontFamily || 'Arial'}`;
      context.fillText(text, obj.padding + (binary.length / 2) * obj.barWidth, y + obj.barHeight + (obj.fontSize || 12) + 5);
    }
  }
  return canvas;
}