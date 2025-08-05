const bonds = [
  {
    "bond_name": "S15G5",
    "days_to_finish": 10,
    "fair_value": 145.39517909683724
  },
  {
    "bond_name": "S12S5",
    "days_to_finish": 38,
    "fair_value": 153.06248002239778
  },
  {
    "bond_name": "S30S5",
    "days_to_finish": 56,
    "fair_value": 150.77402190474686
  },
  {
    "bond_name": "S29G5",
    "days_to_finish": 24,
    "fair_value": 154.00352391683643
  },
  {
    "bond_name": "T13F6",
    "days_to_finish": 192,
    "fair_value": 120.50800150690125
  },
  {
    "bond_name": "T30J6",
    "days_to_finish": 329,
    "fair_value": 117.08269819158807
  },
  {
    "bond_name": "TO26",
    "days_to_finish": 438,
    "fair_value": 104.69305555555556
  },
  {
    "bond_name": "T15D5",
    "days_to_finish": 132,
    "fair_value": 149.13241116764138
  },
  {
    "bond_name": "T17O5",
    "days_to_finish": 73,
    "fair_value": 147.1951327410928
  }
];

let selectedBond = null;

function initializeBondSelector() {
  const bondSelect = document.getElementById('bondSelect');
  
  bonds.forEach(bond => {
    const option = document.createElement('option');
    option.value = bond.bond_name;
    option.textContent = `${bond.bond_name} (${bond.days_to_finish} days)`;
    bondSelect.appendChild(option);
  });

  bondSelect.addEventListener('change', function() {
    const bondName = this.value;
    if (bondName) {
      selectedBond = bonds.find(bond => bond.bond_name === bondName);
      updateBondInfo();
      document.getElementById('calculateBtn').disabled = false;
    } else {
      selectedBond = null;
      document.getElementById('bondInfo').style.display = 'none';
      document.getElementById('calculateBtn').disabled = true;
      clearResults();
    }
  });
}

function updateBondInfo() {
  if (selectedBond) {
    document.getElementById('daysToMaturity').textContent = selectedBond.days_to_finish;
    document.getElementById('fairValue').textContent = `$${selectedBond.fair_value.toFixed(2)}`;
    document.getElementById('bondInfo').style.display = 'block';
  }
}

function clearResults() {
  document.getElementById('basePrice').value = '';
  document.getElementById('tem').value = '';
  document.getElementById('tna').value = '';
  document.getElementById('output').textContent = '';
}

function calculateFromPrice() {
  if (!selectedBond) {
    document.getElementById('output').innerText = 'Please select a bond first.';
    return;
  }

  const basePrice = parseFloat(document.getElementById('basePrice').value);
  if (isNaN(basePrice) || basePrice <= 0) {
    document.getElementById('output').innerText = 'Invalid base price.';
    return;
  }

  const commissionFee = basePrice * 0.0049;
  const marketFee = basePrice * 0.0001;
  const totalCost = basePrice + commissionFee + marketFee;

  const effectiveRate = selectedBond.fair_value / totalCost - 1;

  const tem = (Math.pow(1 + effectiveRate, 30 / selectedBond.days_to_finish) - 1) * 100;
  const tna = (Math.pow(1 + effectiveRate, 365 / selectedBond.days_to_finish) - 1) * 100;

  document.getElementById('tem').value = tem.toFixed(2);
  document.getElementById('tna').value = tna.toFixed(2);

  updateOutput(basePrice, commissionFee, marketFee, totalCost, tem, tna);
}

function updateOutput(basePrice, commissionFee, marketFee, totalCost, tem, tna) {
  document.getElementById('output').innerText =
    `Bond: ${selectedBond.bond_name}\n` +
    `Base price: $${basePrice.toFixed(2)}\n` +
    `Commission fee (0.49%): $${commissionFee.toFixed(2)}\n` +
    `Market fee (0.01%): $${marketFee.toFixed(2)}\n` +
    `Total paid (technical value): $${totalCost.toFixed(2)}\n\n` +
    `Fair value: $${selectedBond.fair_value.toFixed(2)}\n` +
    `Days to maturity: ${selectedBond.days_to_finish}\n` +
    `TEM (Monthly Effective Rate): ${tem.toFixed(2)}%\n` +
    `TNA (Nominal Annual Rate): ${tna.toFixed(2)}%`;
}

document.getElementById('tem').addEventListener('input', () => {
  if (!selectedBond) return;
  
  const tem = parseFloat(document.getElementById('tem').value) / 100;
  if (isNaN(tem) || tem <= 0) return;

  const effectiveRate = Math.pow(1 + tem, selectedBond.days_to_finish / 30) - 1;
  const totalCost = selectedBond.fair_value / (1 + effectiveRate);
  const basePrice = totalCost / 1.005;

  const commissionFee = basePrice * 0.0049;
  const marketFee = basePrice * 0.0001;

  const tna = (Math.pow(1 + effectiveRate, 365 / selectedBond.days_to_finish) - 1) * 100;

  document.getElementById('basePrice').value = basePrice.toFixed(2);
  document.getElementById('tna').value = tna.toFixed(2);

  updateOutput(basePrice, commissionFee, marketFee, totalCost, tem * 100, tna);
});

document.getElementById('tna').addEventListener('input', () => {
  if (!selectedBond) return;
  
  const tna = parseFloat(document.getElementById('tna').value) / 100;
  if (isNaN(tna) || tna <= 0) return;

  const effectiveRate = Math.pow(1 + tna, selectedBond.days_to_finish / 365) - 1;
  const totalCost = selectedBond.fair_value / (1 + effectiveRate);
  const basePrice = totalCost / 1.005;

  const commissionFee = basePrice * 0.0049;
  const marketFee = basePrice * 0.0001;

  const tem = (Math.pow(1 + effectiveRate, 30 / selectedBond.days_to_finish) - 1) * 100;

  document.getElementById('basePrice').value = basePrice.toFixed(2);
  document.getElementById('tem').value = tem.toFixed(2);

  updateOutput(basePrice, commissionFee, marketFee, totalCost, tem, tna * 100);
});

document.addEventListener('DOMContentLoaded', initializeBondSelector);
