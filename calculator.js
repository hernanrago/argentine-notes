const bonds = [
  {
    "bond_name": "S16A5",
    "days_to_finish": 120,
    "payoff": 131.211
  },
  {
    "bond_name": "S28A5",
    "days_to_finish": 120,
    "payoff": 130.813
  },
  {
    "bond_name": "S16Y5",
    "days_to_finish": 150,
    "payoff": 136.861
  },
  {
    "bond_name": "S30Y5",
    "days_to_finish": 150,
    "payoff": 136.331
  },
  {
    "bond_name": "S18J5",
    "days_to_finish": 180,
    "payoff": 147.695
  },
  {
    "bond_name": "S30J5",
    "days_to_finish": 180,
    "payoff": 146.607
  },
  {
    "bond_name": "S31L5",
    "days_to_finish": 210,
    "payoff": 147.74
  },
  {
    "bond_name": "S15G5",
    "days_to_finish": 10,
    "payoff": 146.794
  },
  {
    "bond_name": "S29G5",
    "days_to_finish": 24,
    "payoff": 157.7
  },
  {
    "bond_name": "S12S5",
    "days_to_finish": 38,
    "payoff": 158.977
  },
  {
    "bond_name": "S30S5",
    "days_to_finish": 56,
    "payoff": 159.734
  },
  {
    "bond_name": "T17O5",
    "days_to_finish": 73,
    "payoff": 158.872
  },
  {
    "bond_name": "S31O5",
    "days_to_finish": 90,
    "payoff": 132.821
  },
  {
    "bond_name": "S10N5",
    "days_to_finish": 105,
    "payoff": 122.254
  },
  {
    "bond_name": "S28N5",
    "days_to_finish": 105,
    "payoff": 123.561
  },
  {
    "bond_name": "T15D5",
    "days_to_finish": 132,
    "payoff": 170.838
  },
  {
    "bond_name": "T30E6",
    "days_to_finish": 240,
    "payoff": 142.222
  },
  {
    "bond_name": "T13F6",
    "days_to_finish": 270,
    "payoff": 144.966
  },
  {
    "bond_name": "T30J6",
    "days_to_finish": 360,
    "payoff": 144.896
  },
  {
    "bond_name": "T15E7",
    "days_to_finish": 450,
    "payoff": 160.777
  },
  {
    "bond_name": "TTM26",
    "days_to_finish": 540,
    "payoff": 135.238
  },
  {
    "bond_name": "TTJ26",
    "days_to_finish": 630,
    "payoff": 144.629
  },
  {
    "bond_name": "TTS26",
    "days_to_finish": 720,
    "payoff": 152.096
  },
  {
    "bond_name": "TTD26",
    "days_to_finish": 810,
    "payoff": 161.144
  }
];

function initializeBondCards() {
  const bondsGrid = document.getElementById('bondsGrid');
  if (!bondsGrid) {
    console.error('bondsGrid element not found');
    return;
  }
  
  // Sort bonds by days to finish (ascending)
  const sortedBonds = [...bonds].sort((a, b) => a.days_to_finish - b.days_to_finish);
  
  sortedBonds.forEach(bond => {
    const bondCard = document.createElement('div');
    bondCard.className = 'bond-card';
    bondCard.innerHTML = `
      <div class="bond-header">
        <h3>${bond.bond_name}</h3>
        <div class="bond-details">
          <span class="detail-item">Days: ${bond.days_to_finish}</span>
          <span class="detail-item">Payoff: $${bond.payoff.toFixed(2)}</span>
        </div>
      </div>
      <div class="bond-input">
        <input type="number" id="input-${bond.bond_name}" step="0.01" placeholder="Enter price" class="price-input">
        <button onclick="calculateBond('${bond.bond_name}')" class="calc-btn">Calculate</button>
      </div>
      <div class="bond-results" id="results-${bond.bond_name}">
        <div class="result-item">
          <span class="label">Purchase Price:</span>
          <span class="value" id="price-${bond.bond_name}">-</span>
        </div>
        <div class="result-item">
          <span class="label">Commission Fee (0.049%):</span>
          <span class="value" id="commission-${bond.bond_name}">-</span>
        </div>
        <div class="result-item">
          <span class="label">Market Fee (0.01%):</span>
          <span class="value" id="market-${bond.bond_name}">-</span>
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

function calculateBond(bondName) {
  const inputElement = document.getElementById(`input-${bondName}`);
  if (!inputElement) {
    console.error(`Input element for ${bondName} not found`);
    return;
  }
  
  const basePrice = parseFloat(inputElement.value);
  if (isNaN(basePrice) || basePrice <= 0) {
    alert('Please enter a valid purchase price.');
    return;
  }

  const bond = bonds.find(b => b.bond_name === bondName);
  if (!bond) {
    console.error(`Bond ${bondName} not found`);
    return;
  }

  const commissionFee = basePrice * 0.0049;
  const marketFee = basePrice * 0.0001;
  const totalCost = basePrice + commissionFee + marketFee;

  const effectiveRate = bond.payoff / totalCost - 1;

  const tem = (Math.pow(1 + effectiveRate, 30 / bond.days_to_finish) - 1) * 100;
  const tna = (Math.pow(1 + effectiveRate, 365 / bond.days_to_finish) - 1) * 100;

  updateBondCard(bond.bond_name, basePrice, commissionFee, marketFee, totalCost, tem, tna);
}

function updateBondCard(bondName, basePrice, commissionFee, marketFee, totalCost, tem, tna) {
  const priceElement = document.getElementById(`price-${bondName}`);
  const commissionElement = document.getElementById(`commission-${bondName}`);
  const marketElement = document.getElementById(`market-${bondName}`);
  const totalElement = document.getElementById(`total-${bondName}`);
  const temElement = document.getElementById(`tem-${bondName}`);
  const tnaElement = document.getElementById(`tna-${bondName}`);
  
  if (priceElement) priceElement.textContent = `$${basePrice.toFixed(2)}`;
  if (commissionElement) commissionElement.textContent = `$${commissionFee.toFixed(2)}`;
  if (marketElement) marketElement.textContent = `$${marketFee.toFixed(2)}`;
  if (totalElement) totalElement.textContent = `$${totalCost.toFixed(2)}`;
  if (temElement) temElement.textContent = `${tem.toFixed(2)}%`;
  if (tnaElement) tnaElement.textContent = `${tna.toFixed(2)}%`;
}

document.addEventListener('DOMContentLoaded', initializeBondCards);
