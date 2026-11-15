document.addEventListener('DOMContentLoaded', function () {
  initYear();
  initUpload();
  initTools();
  initSliders();
  initCheckboxes();
  initDownload();
});

function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

function initUpload() {
  const uploadBtn = document.getElementById('uploadBtn');
  const fileInput = document.getElementById('fileInput');
  const downloadBtn = document.getElementById('downloadBtn');

  if (!uploadBtn || !fileInput) return;

  uploadBtn.addEventListener('click', function () {
    fileInput.click();
  });

  fileInput.addEventListener('change', function (e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    loadImageFile(file, function () {
      render();
      if (downloadBtn) downloadBtn.disabled = false;
    });
    fileInput.value = '';
  });
}

function initTools() {
  const toolBtns = document.querySelectorAll('.tool-btn');
  const subBtns = document.querySelectorAll('.sub-btn');
  const calmSubtools = document.getElementById('calmSubtools');

  toolBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const tool = btn.getAttribute('data-tool');

      toolBtns.forEach(function (b) { b.classList.remove('active'); });

      if (tool === 'calm') {
        btn.classList.add('active');
        canvasState.tool = 'calm';
        if (canvasState.calmSub) {
          const activeSub = document.querySelector('.sub-btn[data-sub="' + canvasState.calmSub + '"]');
          if (activeSub) activeSub.classList.add('active');
        }
        if (calmSubtools) calmSubtools.hidden = false;
      } else {
        toolBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        canvasState.tool = tool;
        canvasState.calmSub = null;
        if (calmSubtools) calmSubtools.hidden = true;
        subBtns.forEach(function (b) { b.classList.remove('active'); });
      }

      render();
    });
  });

  subBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const sub = btn.getAttribute('data-sub');
      subBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      canvasState.tool = 'calm';
      canvasState.calmSub = sub;
      render();
    });
  });
}

function initSliders() {
  const map = {
    brightness: 'brightness',
    contrast: 'contrast',
    saturate: 'saturate',
    warmth: 'warmth',
    grain: 'grain'
  };

  Object.keys(map).forEach(function (id) {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('input', function () {
      canvasState.sliders[map[id]] = parseInt(input.value, 10) || 0;
      render();
    });
  });
}

function initCheckboxes() {
  const boxes = document.querySelectorAll('.check-row input[type="checkbox"]');
  boxes.forEach(function (box) {
    box.addEventListener('change', function () {
      const key = box.getAttribute('data-check');
      if (!key) return;
      canvasState.checkboxes[key] = box.checked;
      render();
    });
  });
}

function initDownload() {
  const downloadBtn = document.getElementById('downloadBtn');
  if (!downloadBtn) return;
  downloadBtn.addEventListener('click', function () {
    downloadImage();
  });
}
