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

function initializeBondCards() {
  const bondsGrid = document.getElementById('bondsGrid');
  if (!bondsGrid) {
    console.error('bondsGrid element not found');
    return;
  }
  
  bonds.forEach(bond => {
    const bondCard = document.createElement('div');
    bondCard.className = 'bond-card';
    bondCard.innerHTML = `
      <div class="bond-header">
        <h3>${bond.bond_name}</h3>
        <div class="bond-details">
          <span class="detail-item">Days: ${bond.days_to_finish}</span>
          <span class="detail-item">Fair Value: $${bond.fair_value.toFixed(2)}</span>
        </div>
      </div>
      <div class="bond-results" id="results-${bond.bond_name}">
        <div class="result-item">
          <span class="label">Purchase Price:</span>
          <span class="value" id="price-${bond.bond_name}">-</span>
        </div>
        <div class="result-item">
          <span class="label">Total Cost:</span>
          <span class="value" id="total-${bond.bond_name}">-</span>
        </div>
        <div class="result-item">
          <span class="label">TEM:</span>
          <span class="value" id="tem-${bond.bond_name}">-</span>
        </div>
        <div class="result-item">
          <span class="label">TNA:</span>
          <span class="value" id="tna-${bond.bond_name}">-</span>
        </div>
      </div>
    `;
    bondsGrid.appendChild(bondCard);
  });
}

function calculateFromPrice() {
  const basePriceElement = document.getElementById('basePrice');
  if (!basePriceElement) {
    console.error('basePrice element not found');
    return;
  }
  
  const basePrice = parseFloat(basePriceElement.value);
  if (isNaN(basePrice) || basePrice <= 0) {
    alert('Please enter a valid purchase price.');
    return;
  }

  bonds.forEach(bond => {
    const commissionFee = basePrice * 0.0049;
    const marketFee = basePrice * 0.0001;
    const totalCost = basePrice + commissionFee + marketFee;

    const effectiveRate = bond.fair_value / totalCost - 1;

    const tem = (Math.pow(1 + effectiveRate, 30 / bond.days_to_finish) - 1) * 100;
    const tna = (Math.pow(1 + effectiveRate, 365 / bond.days_to_finish) - 1) * 100;

    updateBondCard(bond.bond_name, basePrice, totalCost, tem, tna);
  });
}

function updateBondCard(bondName, basePrice, totalCost, tem, tna) {
  const priceElement = document.getElementById(`price-${bondName}`);
  const totalElement = document.getElementById(`total-${bondName}`);
  const temElement = document.getElementById(`tem-${bondName}`);
  const tnaElement = document.getElementById(`tna-${bondName}`);
  
  if (priceElement) priceElement.textContent = `$${basePrice.toFixed(2)}`;
  if (totalElement) totalElement.textContent = `$${totalCost.toFixed(2)}`;
  if (temElement) temElement.textContent = `${tem.toFixed(2)}%`;
  if (tnaElement) tnaElement.textContent = `${tna.toFixed(2)}%`;
}

document.addEventListener('DOMContentLoaded', initializeBondCards);
