let answers = {};

function startQuiz() {
    const startButtonContainer = document.querySelector('.start-button-container');
    const quizContainer = document.querySelector('.quiz-container');
    if (startButtonContainer && quizContainer) {
        startButtonContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        resetQuiz();
        adjustQuizHeight();
        console.log('Quiz started successfully');
    } else {
        console.error('Start button container or quiz container not found.');
    }
}

function resetQuiz() {
    answers = {};
    document.querySelectorAll('.quiz-slide').forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none';
    });
    const firstSlide = document.querySelector('#slide1');
    const finalResults = document.querySelector('#final-results');
    if (firstSlide && finalResults) {
        firstSlide.classList.add('active');
        firstSlide.style.display = 'block';
        finalResults.style.display = 'none';
        adjustQuizHeight();
        console.log('Quiz reset successfully');
    } else {
        console.error('First slide or final results container not found.');
    }
}

function nextSlide(current, answer) {
    answers[`question${current}`] = answer;
    console.log(`Answer for question ${current}: ${answer}`);
    const currentSlide = document.querySelector(`#slide${current}`);
    const nextSlide = document.querySelector(`#slide${current + 1}`);
    
    if (currentSlide) {
        currentSlide.classList.remove('active');
        currentSlide.style.display = 'none';
    }

    if (currentSlide && current < 3) {
        if (nextSlide) {
            nextSlide.classList.add('active');
            nextSlide.style.display = 'block';
            adjustQuizHeight();
            console.log(`Moved to slide ${current + 1}`);
        } else {
            console.error('Next slide not found.');
        }
    } else if (current === 3) {
        answers['foodType'] = answer;
        console.log('Final Answers before calling getRecommendation:', answers);
        getRecommendation(answers['foodType']);
        const resultSlide = document.querySelector('#slide4');
        if (resultSlide) {
            resultSlide.classList.add('active');
            resultSlide.style.display = 'block';
        } else {
            console.error('Result slide not found.');
        }
    } else {
        console.error('Current slide not found.');
    }
}

function getRecommendation(foodType) {
    console.log("getRecommendation called with foodType:", foodType);
    const { question1, question2 } = answers;
    let result = "No recommendation available";
    let imgSrc = "";

    console.log('Question 1:', question1);
    console.log('Question 2:', question2);
    console.log('Food Type:', foodType);

    if (question1 === 1) {
        if (question2 === 22) {
            result = (foodType === "Carbs") ? "VITO 30" : "VITO VL";
            imgSrc = (foodType === "Carbs") ? "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/v30.png?v=1704294802" : "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vl.png?v=1704295457";
        } else if (question2 === 37) {
            result = (foodType === "Carbs") ? "VITO VM" : "VITO VL";
            imgSrc = (foodType === "Carbs") ? "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vm.png?v=1704295536" : "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vl.png?v=1704295457";
        } else {
            result = (foodType === "Carbs") ? "VITO VM" : "VITO VL";
            imgSrc = (foodType === "Carbs") ? "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vm.png?v=1704295536" : "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vl.png?v=1704295457";
        }
    } else if (question1 === 4) {
        if (question2 === 22) {
            result = (foodType === "Carbs") ? "VITO VM" : "VITO VL";
            imgSrc = (foodType === "Carbs") ? "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vm.png?v=1704295536" : "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vl.png?v=1704295457";
        } else if (question2 === 37) {
            result = (foodType === "Carbs") ? "VITO VM" : "VITO VL";
            imgSrc = (foodType === "Carbs") ? "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vm.png?v=1704295536" : "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vl.png?v=1704295457";
        } else {
            result = "VITO VL";
            imgSrc = "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vl.png?v=1704295457";
        }
    } else {
        result = "VITO VL";
        imgSrc = "https://cdn.shopify.com/s/files/1/0004/2496/8203/files/vl.png?v=1704295457";
    }

    console.log(`Recommended model: ${result}`);
    console.log(`Image URL: ${imgSrc}`);

    const finalResults = document.getElementById('final-results');
    if (finalResults) {
        finalResults.style.display = 'flex'; // Ensure the result-wrapper is displayed
        finalResults.innerHTML = `
            <a href="path/to/product-page" target="_blank">Learn more about this product</a>
            <img id="recommendation-img" src="${imgSrc}" alt="${result}" style="max-width: 100%; height: auto;">
            <h2>We Recommend the ${result}</h2>
            <div class="button-wrapper">
                <button class="button" onclick="startQuiz()">Start over</button>
                <button class="button" onclick="placeInCart()">Place in Cart</button>
                <button class="button" onclick="document.location='#calculator-section'">Check Savings</button>
            </div>
        `;
        console.log('Final results innerHTML set successfully');

        // Adjust height once the image is fully loaded
        const recommendationImg = document.getElementById('recommendation-img');
        recommendationImg.onload = function() {
            adjustQuizHeight();  // Adjust the height after image has loaded
        };
    } else {
        console.error('Final results container not found.');
    }
}

function adjustQuizHeight() {
    const quizContainer = document.querySelector('.quiz-container');
    const activeSlide = document.querySelector('.quiz-slide.active');

    if (quizContainer && activeSlide) {
        const newHeight = activeSlide.scrollHeight;
        quizContainer.style.height = newHeight + 'px';  // Adjust the quiz container height
        console.log('Adjusted quiz height to:', newHeight);
    } else {
        console.error('Quiz container or active slide not found.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carbsButton = document.querySelector('#slide3 button:nth-child(1)');
    const proteinsButton = document.querySelector('#slide3 button:nth-child(2)');
    if (carbsButton && proteinsButton) {
        carbsButton.addEventListener('click', () => {
            console.log('Carbs button clicked');
            nextSlide(3, 'Carbs');
        });
        proteinsButton.addEventListener('click', () => {
            console.log('Proteins button clicked');
            nextSlide(3, 'Proteins');
        });
        console.log('Event listeners for slide 3 buttons added successfully');
    } else {
        console.error('Carbs or Proteins button not found.');
    }
    adjustQuizHeight();
    console.log('DOMContentLoaded event fired, quiz height adjusted');
});

// Ensure responsiveness on window resize as well
window.addEventListener('resize', adjustQuizHeight);
