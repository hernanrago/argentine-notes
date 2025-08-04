# S29G5 Bond - TEM and TNA Calculator

This is a simple client-side calculator for the Argentine treasury bond **S29G5**.  
It calculates the **Monthly Effective Rate (TEM)** and **Nominal Annual Rate (TNA)** based on:

- User-provided purchase price
- Face value of **$157.70**
- Maturity date: **August 29, 2025**
- Includes:
  - 0.49% commission fee
  - 0.01% market fee

All calculations are done using JavaScript in the browser.  
No server or backend required.

---

## 🔗 Live Demo

Once published on GitHub Pages, your site will be available at:

```
https://your-username.github.io/your-repo/
```

_Replace `your-username` and `your-repo` accordingly._

---

## 🛠 How to use

1. Go to the web page
2. Enter the bond's purchase price (before fees)
3. Click **Calculate**
4. View the breakdown:
   - Base price
   - Commission fee
   - Market fee
   - Total paid
   - Days to maturity
   - Calculated TEM and TNA

---

## 🧪 Example

**Input:**  
`Base price: $154.11`

**Output:**
```
Base price: $154.11
Commission fee (0.49%): $0.76
Market fee (0.01%): $0.02
Total paid (technical value): $154.89

Days to maturity: 26
TEM (Monthly Effective Rate): 2.54 %
TNA (Nominal Annual Rate): 30.31 %
```

---

## 📅 Notes

- All date calculations are based on the user's local date/time
- Maturity is hardcoded as **2025-08-29**
- Face value is fixed at **$157.70**
- Ideal for educational or exploratory use

---

## 📜 License

MIT – free to use and modify.
