window.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let color = 'black';
    let eraserMode = false;
    
    function startDrawing(e) {
      isDrawing = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    }
    
    function draw(e) {
      if (!isDrawing) return;
      if (eraserMode) {
        ctx.globalCompositeOperation = 'destination-out'; // Use eraser mode
        ctx.lineWidth = 10; // Set eraser size
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      } else {
        ctx.globalCompositeOperation = 'source-over'; // Use drawing mode
        ctx.lineWidth = 1; // Set drawing size
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = color;
        ctx.stroke();
      }
    }
    
    function stopDrawing() {
      isDrawing = false;
    }
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    const colors = document.getElementsByClassName('color');
    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', function() {
        color = this.style.backgroundColor;
        eraserMode = false;
      });
    }
    
    const eraser = document.querySelector('.eraser');
    eraser.addEventListener('click', function() {
      eraserMode = true;
    });
  });
  