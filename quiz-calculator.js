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

function startQuiz() {
    document.querySelector('.start-button-container').style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'block';
    resetQuiz();
}

function resetQuiz() {
    answers = {};
    document.querySelectorAll('.quiz-slide').forEach(slide => {
        slide.classList.remove('left', 'right', 'active');
    });
    document.querySelector('#slide1').classList.add('active');
    document.querySelector('#quiz-result').style.display = 'none'; // Hide the results section initially
    document.querySelector('#quiz-action-buttons').classList.remove('active'); // Hide the action buttons initially
    document.querySelector('#quiz-result').innerHTML = 'Click Get Recommendation to see which VITO machine is best for you';
}

function nextSlide(current, answer) {
    answers[`question${current}`] = answer;
    const currentSlide = document.querySelector(`#slide${current}`);
    const nextSlide = document.querySelector(`#slide${current + 1}`);
    currentSlide.classList.remove('active');
    currentSlide.classList.add('left');
    nextSlide.classList.remove('right');
    nextSlide.classList.add('active');
}

function getRecommendation(foodType) {
    answers['foodType'] = foodType;
    const { question1, question2 } = answers;
    let result = "No recommendation available";
    let imgSrc = "";

    if (question1 === 1) { // 1-3 fryers
        if (question2 === 22) { // Up to 22 pounds
            result = (foodType === "Carbs") ? "VITO 30" : "VITO VL";
            imgSrc = (foodType === "Carbs") ? "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/v30.png?v=1704294802" : "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vl.png?v=1704295457";
        } else if (question2 === 37) { // Up to 37 pounds
            result = (foodType === "Carbs") ? "VITO VM" : "VITO VL";
            imgSrc = (foodType === "Carbs") ? "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vm.png?v=1704295536" : "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vl.png?v=1704295457";
        } else { // More than 37 pounds
            result = (foodType === "Carbs") ? "VITO VM" : "VITO VL";
            imgSrc = (foodType === "Carbs") ? "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vm.png?v=1704295536" : "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vl.png?v=1704295457";
        }
    } else if (question1 === 4) { // 4 fryers
        if (question2 === 22) { // Up to 22 pounds
            result = (foodType === "Carbs") ? "VITO VM" : "VITO VL";
            imgSrc = (foodType === "Carbs") ? "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vm.png?v=1704295536" : "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vl.png?v=1704295457";
        } else if (question2 === 37) { // Up to 37 pounds
            result = (foodType === "Carbs") ? "VITO VM" : "VITO VL";
            imgSrc = (foodType === "Carbs") ? "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vm.png?v=1704295536" : "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vl.png?v=1704295457";
        } else { // More than 37 pounds
            result = "VITO VL";
            imgSrc = "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vl.png?v=1704295457";
        }
    } else { // More than 4 fryers
        result = "VITO VL";
        imgSrc = "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vl.png?v=1704295457";
    }

    document.querySelector('.quiz-slide.active').classList.remove('active');
    document.querySelector('#quiz-result').style.display = 'block'; // Show the results section
    document.querySelector('#quiz-action-buttons').classList.add('active'); // Show the action buttons
    document.getElementById('quiz-result').innerHTML = `
    <div class="result-wrapper">
        We Recommend the ${result}
        <img src="${imgSrc}" alt="${result}">
        <a href="path/to/product-page" target="_blank">Learn More</a>
    </div>
`;
}
