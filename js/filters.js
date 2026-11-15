const cssgramFilters = {
  aden:      'hue-rotate(-20deg) contrast(0.9) saturate(0.85) brightness(1.2)',
  inkwell:   'grayscale(1) contrast(1.1) brightness(1.1)',
  reyes:     'sepia(0.22) brightness(1.1) contrast(0.85) saturate(0.75)',
  gingham:   'brightness(1.05) hue-rotate(-10deg)',
  toaster:   'contrast(1.5) brightness(0.9)',
  walden:    'brightness(1.1) saturate(1.6)',
  hudson:    'brightness(1.2) contrast(0.9) saturate(1.1)',
  earlybird: 'sepia(0.25) contrast(0.9) brightness(1.1) saturate(1.1)',
  mayfair:   'contrast(1.1) saturate(1.1)',
  lofi:      'saturate(1.1) contrast(1.5)',
  '1977':    'sepia(0.5) hue-rotate(-30deg) saturate(1.4)',
  brooklyn:  'sepia(0.25) hue-rotate(-15deg) contrast(0.9) brightness(1.1)',
  xpro2:     'sepia(0.3)',
  willow:    'grayscale(0.5) contrast(0.95) brightness(0.9)',
  rise:      'sepia(0.2) brightness(1.05) contrast(0.9) saturate(0.9)',
  valencia:  'sepia(0.25) contrast(1.1) brightness(1.1) saturate(1.2)',
  clarendon: 'contrast(1.2) saturate(1.35)',
  amaro:     'hue-rotate(-10deg) contrast(0.9) brightness(1.1) saturate(1.1)',
  nashville: 'sepia(0.2) contrast(1.2) brightness(1.05) saturate(1.2)',
  moon:      'grayscale(1) contrast(1.1) brightness(1.1)',
  perpetua:  'contrast(1.1) brightness(1.1)',
  slumber:   'sepia(0.35) saturate(0.8) brightness(1.05)',
  crema:     'sepia(0.15) brightness(1.05) saturate(0.9)',
  ludwig:    'contrast(1.1) saturate(1.1)',
  stinson:   'brightness(1.1) contrast(0.9)',
  vesper:    'sepia(0.35) contrast(1.1) brightness(1.1)'
};

const toolPresets = {
  contrast: 'contrast(1.15) saturate(1.05)',
  calm: {
    comfort:    'brightness(1.05) contrast(0.9) saturate(0.85) sepia(0.15)',
    evening:    'brightness(0.95) contrast(1.1) saturate(1.2) sepia(0.25) hue-rotate(-10deg)',
    vibe2021:   'brightness(1.02) contrast(0.85) saturate(0.7) sepia(0.1)',
    winter2024: 'brightness(0.94) contrast(1.12) saturate(0.82) hue-rotate(5deg)',
    childhood:  'brightness(1.06) contrast(1.04) saturate(1.22) sepia(0.04)',
    nightDay:   'brightness(1.08) contrast(1.15) saturate(1.05) hue-rotate(10deg)'
  },
  summer: 'contrast(1.15) saturate(1.25) brightness(1.05)',
  winter: 'brightness(1.1) contrast(0.9) saturate(0.75) hue-rotate(8deg)',
  autumn: 'sepia(0.25) hue-rotate(-15deg) contrast(0.9) brightness(1.05)',
  spring: 'sepia(0.2) brightness(1.05) contrast(0.9) saturate(0.9)',
  night:  'brightness(0.8) contrast(1.1) saturate(0.8) hue-rotate(20deg)'
};

const checkboxPresets = {
  goodMood:     { brightness: 8,   contrast: 4,   saturate: 12,  warmth: 10,  grain: 0 },
  greatMorning: { brightness: 12,  contrast: 2,   saturate: 6,   warmth: 14,  grain: 0 },
  vibe:         { brightness: 2,   contrast: -12, saturate: -25, warmth: 8,   grain: 25 },
  calmDay:      { brightness: 4,   contrast: -14, saturate: -18, warmth: 6,   grain: 0 },
  noNoise:      { brightness: 2,   contrast: -6,  saturate: -10, warmth: 0,   grain: -100 },
  alarm:        { brightness: 10,  contrast: 10,  saturate: 4,   warmth: -8,  grain: 0 },
  morning:      { brightness: 10,  contrast: 2,   saturate: 6,   warmth: 12,  grain: 0 },
  colorColor:   { brightness: 0,   contrast: 4,   saturate: 18,  warmth: 4,   grain: 0 },
  winterNight:  { brightness: -18, contrast: 8,   saturate: -20, warmth: -25, grain: 20 },
  newYear:      { brightness: 6,   contrast: 6,   saturate: 12,  warmth: -4,  grain: 8 },
  endOfYear:    { brightness: -8,  contrast: -6,  saturate: -20, warmth: -8,  grain: 4 },
  bestDay:      { brightness: 8,   contrast: 5,   saturate: 14,  warmth: 10,  grain: 0 }
};

function sliderToBrightness(v) {
  return 0.6 + (v / 100) * 0.8;
}

function sliderToContrast(v) {
  return 0.6 + (v / 100) * 0.8;
}

function sliderToSaturate(v) {
  return 0.3 + (v / 100) * 1.4;
}

function sliderToWarmth(v) {
  const t = v / 100;
  if (t >= 0.5) {
    const k = (t - 0.5) * 2;
    return 'sepia(' + (k * 0.35).toFixed(3) + ') hue-rotate(' + (-10 * k).toFixed(1) + 'deg)';
  }
  const k = (0.5 - t) * 2;
  return 'sepia(' + (k * 0.1).toFixed(3) + ') hue-rotate(' + (15 * k).toFixed(1) + 'deg)';
}

function sliderToGrain(v) {
  return v;
                 }
