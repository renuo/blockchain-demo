var mineInterval = -1;
var prefix = '';

function update() {
  const text = $('#text').val();
  const hashElement = $('#hash');
  const hash = CryptoJS.SHA256(text);
  hashElement.val(hash);
}

function plusone() {
  const textElement = $('#text');
  const lines = textElement.val().split('\n');
  const last = lines.length - 1;
  const number = parseInt(lines[last]);
  if (isNaN(number)) {
    lines.push('0')
  } else {
    lines[last] = number + 1;
  }
  textElement.val(lines.join('\n'));
  update();
}
function mine(newPrefix) {
  prefix = newPrefix;
  if (mineInterval > 0) {
    stopMine();
  } else {
    startMine();
  }
}

var mineTenSteps = function () {
  for (var i = 0; i < 1237; i++) {
    if (mineInterval > 0) {
      mineStep();
    }
  }
};

function mineStep() {
  const hashElement = $('#hash');
  plusone();
  if (hashElement.val().startsWith(prefix)) {
    stopMine();
  }
}

var startMine = function () {
  mineInterval = setInterval(
      function () {
        mineTenSteps();
      },
      1
  );
};

function stopMine() {
  clearInterval(mineInterval);
  mineInterval = -1;
}

function defaultText() {
  const hashElement = $('#text');
  hashElement.val(
      "Samuel hat CHF 10’000’000 auf einem Konto der Vatikanbank – Franziskus\n" +
      "Ich kaufe Kaffee für CHF 10’000’000 – Samuel\n" +
      "Ich kaufe Gold für CHF 10’000’000 – Samuel"
  );
  update();
}

$(document).ready(
    function () {
      update();
    }
);
