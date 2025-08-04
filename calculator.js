const faceValue = 157.70;
const maturityDate = new Date('2025-08-29');
const msPerDay = 1000 * 60 * 60 * 24;
const today = new Date();
const daysToMaturity = Math.ceil((maturityDate - today) / msPerDay);

function calculateFromPrice() {
  const basePrice = parseFloat(document.getElementById('basePrice').value);
  if (isNaN(basePrice) || basePrice <= 0 || daysToMaturity <= 0) {
    document.getElementById('output').innerText = 'Invalid base price or maturity date.';
    return;
  }

  const commissionFee = basePrice * 0.0049;
  const marketFee = basePrice * 0.0001;
  const totalCost = basePrice + commissionFee + marketFee;

  const effectiveRate = faceValue / totalCost - 1;

  const tem = (Math.pow(1 + effectiveRate, 30 / daysToMaturity) - 1) * 100;
  const tna = (Math.pow(1 + effectiveRate, 365 / daysToMaturity) - 1) * 100;

  document.getElementById('tem').value = tem.toFixed(2);
  document.getElementById('tna').value = tna.toFixed(2);

  updateOutput(basePrice, commissionFee, marketFee, totalCost, tem, tna);
}

function updateOutput(basePrice, commissionFee, marketFee, totalCost, tem, tna) {
  document.getElementById('output').innerText =
    `Base price: $${basePrice.toFixed(2)}\n` +
    `Commission fee (0.49%): $${commissionFee.toFixed(2)}\n` +
    `Market fee (0.01%): $${marketFee.toFixed(2)}\n` +
    `Total paid (technical value): $${totalCost.toFixed(2)}\n\n` +
    `Days to maturity: ${daysToMaturity}\n` +
    `TEM (Monthly Effective Rate): ${tem.toFixed(2)} %\n` +
    `TNA (Nominal Annual Rate): ${tna.toFixed(2)} %`;
}

document.getElementById('tem').addEventListener('input', () => {
  const tem = parseFloat(document.getElementById('tem').value) / 100;
  if (isNaN(tem) || tem <= 0 || daysToMaturity <= 0) return;

  const effectiveRate = Math.pow(1 + tem, daysToMaturity / 30) - 1;
  const totalCost = faceValue / (1 + effectiveRate);
  const basePrice = totalCost / 1.005; // reverse fees

  const commissionFee = basePrice * 0.0049;
  const marketFee = basePrice * 0.0001;

  const tna = (Math.pow(1 + effectiveRate, 365 / daysToMaturity) - 1) * 100;

  document.getElementById('basePrice').value = basePrice.toFixed(2);
  document.getElementById('tna').value = tna.toFixed(2);

  updateOutput(basePrice, commissionFee, marketFee, totalCost, tem * 100, tna);
});

document.getElementById('tna').addEventListener('input', () => {
  const tna = parseFloat(document.getElementById('tna').value) / 100;
  if (isNaN(tna) || tna <= 0 || daysToMaturity <= 0) return;

  const effectiveRate = Math.pow(1 + tna, daysToMaturity / 365) - 1;
  const totalCost = faceValue / (1 + effectiveRate);
  const basePrice = totalCost / 1.005;

  const commissionFee = basePrice * 0.0049;
  const marketFee = basePrice * 0.0001;

  const tem = (Math.pow(1 + effectiveRate, 30 / daysToMaturity) - 1) * 100;

  document.getElementById('basePrice').value = basePrice.toFixed(2);
  document.getElementById('tem').value = tem.toFixed(2);

  updateOutput(basePrice, commissionFee, marketFee, totalCost, tem, tna * 100);
});
