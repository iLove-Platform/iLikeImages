const canvasState = {
  image: null,
  fileName: 'ilikeimages.jpg',
  tool: null,
  calmSub: null,
  checkboxes: {},
  sliders: {
    brightness: 50,
    contrast: 50,
    saturate: 50,
    warmth: 50,
    grain: 0
  }
};

function getCanvas() {
  return document.getElementById('canvas');
}

function getCtx() {
  return getCanvas().getContext('2d');
}

function loadImageFile(file, onLoad) {
  if (!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      canvasState.image = img;
      canvasState.fileName = file.name.replace(/\.[^.]+$/, '') + '-ilikeimages.jpg';
      setupCanvasSize(img);
      onLoad();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function setupCanvasSize(img) {
  const canvas = getCanvas();
  const maxW = 1400;
  const scale = Math.min(1, maxW / img.width);
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  canvas.style.display = 'block';
  const hint = document.getElementById('hint');
  if (hint) hint.style.display = 'none';
}

function buildFilterString() {
  const parts = [];
  let toolStr = '';

  if (canvasState.tool) {
    if (canvasState.tool === 'calm' && canvasState.calmSub) {
      toolStr = toolPresets.calm[canvasState.calmSub] || '';
    } else if (typeof toolPresets[canvasState.tool] === 'string') {
      toolStr = toolPresets[canvasState.tool];
    }
    if (toolStr) parts.push(toolStr);
  }

  let bShift = 0, cShift = 0, sShift = 0, wShift = 0, gShift = 0;

  for (const key in canvasState.checkboxes) {
    if (canvasState.checkboxes[key]) {
      const p = checkboxPresets[key];
      if (p) {
        bShift += p.brightness;
        cShift += p.contrast;
        sShift += p.saturate;
        wShift += p.warmth;
        gShift += p.grain;
      }
    }
  }

  const bVal = clamp(canvasState.sliders.brightness + bShift, 0, 100);
  const cVal = clamp(canvasState.sliders.contrast + cShift, 0, 100);
  const sVal = clamp(canvasState.sliders.saturate + sShift, 0, 100);
  const wVal = clamp(canvasState.sliders.warmth + wShift, 0, 100);

  parts.push('brightness(' + sliderToBrightness(bVal).toFixed(3) + ')');
  parts.push('contrast(' + sliderToContrast(cVal).toFixed(3) + ')');
  parts.push('saturate(' + sliderToSaturate(sVal).toFixed(3) + ')');

  const warmthStr = sliderToWarmth(wVal);
  if (warmthStr) parts.push(warmthStr);

  return parts.join(' ');
}

function getGrainValue() {
  let gShift = 0;
  for (const key in canvasState.checkboxes) {
    if (canvasState.checkboxes[key]) {
      const p = checkboxPresets[key];
      if (p) gShift += p.grain;
    }
  }
  return clamp(canvasState.sliders.grain + gShift, 0, 100);
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function render() {
  if (!canvasState.image) return;
  const canvas = getCanvas();
  const ctx = getCtx();
  const filterStr = buildFilterString();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.filter = filterStr || 'none';
  ctx.drawImage(canvasState.image, 0, 0, canvas.width, canvas.height);
  ctx.filter = 'none';

  const grain = getGrainValue();
  if (grain > 0) {
    drawGrain(ctx, canvas.width, canvas.height, grain);
  }
}

function drawGrain(ctx, w, h, amount) {
  const strength = (amount / 100) * 0.35;
  const count = Math.floor(w * h * 0.04 * (amount / 100));
  ctx.save();
  ctx.globalAlpha = strength;
  for (let i = 0; i < count; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const v = Math.random() > 0.5 ? 255 : 0;
    ctx.fillStyle = 'rgb(' + v + ',' + v + ',' + v + ')';
    ctx.fillRect(x, y, 1, 1);
  }
  ctx.restore();
}

function downloadImage() {
  if (!canvasState.image) return;
  const canvas = getCanvas();
  canvas.toBlob(function (blob) {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = canvasState.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }, 'image/jpeg', 0.95);
    }
