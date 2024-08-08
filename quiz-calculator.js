// quiz-calculator.js

function calculateROI() {
    // Get input values
    const weeklyConsumption = parseFloat(document.getElementById('weeklyConsumption').value); // Weekly oil consumption
    const oilPrice = parseFloat(document.getElementById('oilPrice').value); // Price of oil per liter
    const foodType = parseFloat(document.getElementById('foodType').value); // Savings percentage based on food type
    const vitoPrice = parseFloat(document.getElementById('vitoPrice').value); // Price of VITO
    const filterAmount = parseFloat(document.getElementById('filterAmount').value); // Amount of filters per week
    const filterPrice = parseFloat(document.getElementById('filterPrice').value); // Price per filter

    // Calculate cost per week
    const costPerWeek = weeklyConsumption * oilPrice; // Weekly oil cost
    const costPerYear = costPerWeek * 52; // Annual oil cost

    // Calculate yearly filter cost
    const yearlyFilterCost = filterAmount * filterPrice * 52; // Yearly filter cost

    // Calculate annual savings
    const annualSavings = (costPerYear * (foodType / 100)) - yearlyFilterCost; // Savings per year

    // Calculate ROI
    const roi = vitoPrice / (annualSavings / 12); // ROI in months

    // Display result
    const resultElement = document.getElementById('calculator-result');
    resultElement.innerText = `Annual Savings: $${annualSavings.toFixed(2)}\nROI: ${roi.toFixed(2)} months`;
    resultElement.style.display = 'block'; // Ensure the results are shown
}

function clearCalculator() {
    // Clear all input fields
    document.getElementById('weeklyConsumption').value = '';
    document.getElementById('oilPrice').value = '';
    document.getElementById('foodType').value = '50'; // Reset to default option
    document.getElementById('vitoPrice').value = '';
    document.getElementById('filterAmount').value = '';
    document.getElementById('filterPrice').value = '';

    // Clear the results
    const resultElement = document.getElementById('calculator-result');
    resultElement.innerText = 'RESULTS WILL APPEAR HERE';
    resultElement.style.display = 'none'; // Hide the results
}
