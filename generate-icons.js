// Simple icon generation for PWA
function generatePWAIcons() {
  const sizes = [192, 512];
  
  sizes.forEach(size => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    
    // Draw rounded rectangle background
    ctx.fillStyle = gradient;
    ctx.beginPath();
    const radius = size * 0.2;
    ctx.roundRect(0, 0, size, size, radius);
    ctx.fill();
    
    // Add calculator icon
    const iconSize = size * 0.5;
    const x = (size - iconSize) / 2;
    const y = (size - iconSize) / 2;
    
    // Calculator body
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.beginPath();
    ctx.roundRect(x, y, iconSize, iconSize, iconSize * 0.1);
    ctx.fill();
    
    // Display area
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.roundRect(x + iconSize * 0.1, y + iconSize * 0.1, iconSize * 0.8, iconSize * 0.25, iconSize * 0.02);
    ctx.fill();
    
    // Display text
    ctx.fillStyle = 'white';
    ctx.font = `bold ${iconSize * 0.08}px -apple-system, BlinkMacSystemFont, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TEM/TNA', x + iconSize * 0.5, y + iconSize * 0.225);
    
    // Button grid
    ctx.fillStyle = '#667eea';
    const buttonSize = iconSize * 0.12;
    const buttonGap = iconSize * 0.04;
    const startX = x + iconSize * 0.1;
    const startY = y + iconSize * 0.45;
    
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        const buttonX = startX + col * (buttonSize + buttonGap);
        const buttonY = startY + row * (buttonSize + buttonGap);
        ctx.beginPath();
        ctx.roundRect(buttonX, buttonY, buttonSize, buttonSize * 0.7, buttonSize * 0.1);
        ctx.fill();
      }
    }
    
    // Convert to blob and create download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `icon-${size}x${size}.png`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  });
}

// Polyfill for roundRect
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
    this.beginPath();
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    this.closePath();
  };
}

// Auto-generate icons when this script is loaded
if (typeof window !== 'undefined') {
  generatePWAIcons();
}