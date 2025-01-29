// function calculateCompoundInterest() {
//     const principal = parseFloat(document.getElementById('initialInvestment').value);
//     const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value) || 0;
//     const years = parseFloat(document.getElementById('years').value);
//     const rate = parseFloat(document.getElementById('interestRate').value) / 100;
//     const variance = parseFloat(document.getElementById('varianceRange').value) / 100 || 0;
//     const compoundFrequency = parseInt(document.getElementById('compoundFrequency').value);
    
//     if (!principal || !years || !rate) {
//         alert('Please fill in all required fields');
//         return;
//     }
    
//     const baseResult = calculateAmount(principal, monthlyContribution, rate, years, compoundFrequency);
    
//     let lowResult = null;
//     let highResult = null;
//     if (variance) {
//         lowResult = calculateAmount(principal, monthlyContribution, rate - variance, years, compoundFrequency);
//         highResult = calculateAmount(principal, monthlyContribution, rate + variance, years, compoundFrequency);
//     }
    
//     displayResults(baseResult, lowResult, highResult);
// }

// function calculateAmount(principal, monthlyContribution, rate, years, frequency) {
//     const periodicRate = rate / frequency;
//     const periods = years * frequency;
    
//     let amount = principal;
//     for (let i = 0; i < periods; i++) {
//         amount = amount * (1 + periodicRate);
//         amount += (monthlyContribution * 12) / frequency;
//     }
    
//     return amount;
// }

// function displayResults(baseAmount, lowAmount, highAmount) {
//     const resultDiv = document.getElementById('result');
//     resultDiv.style.display = 'block';
    
//     let html = `<h3>Results:</h3>`;
//     html += `<p>Final Amount: $${baseAmount.toFixed(2)}</p>`;
    
//     if (lowAmount !== null && highAmount !== null) {
//         html += `<p>Range based on variance:</p>`;
//         html += `<p>Low: $${lowAmount.toFixed(2)}</p>`;
//         html += `<p>High: $${highAmount.toFixed(2)}</p>`;
//     }
    
//     resultDiv.innerHTML = html;
// }

// function resetForm() {
//     document.querySelectorAll('input').forEach(input => input.value = '');
//     document.getElementById('compoundFrequency').value = '365';
//     document.getElementById('result').style.display = 'none';
// }





