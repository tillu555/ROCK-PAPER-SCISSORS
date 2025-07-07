document.addEventListener('DOMContentLoaded', () => {
    // Create particles
    const particlesContainer = document.getElementById('particles');
    const colors = ['#ff7eee', '#8a76ff', '#5dffd0', '#ff5ee3', '#b388ff', '#6d6aff'];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 15;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${-size}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.color = color;
        
        particlesContainer.appendChild(particle);
    }
    
    // Game logic
    const choices = document.querySelectorAll('.choice');
    const playerSelectionEl = document.getElementById('player-selection');
    const computerSelectionEl = document.getElementById('computer-selection');
    const resultTextEl = document.getElementById('result-text');
    const playerScoreEl = document.getElementById('player-score');
    const computerScoreEl = document.getElementById('computer-score');
    const resetBtn = document.getElementById('reset-btn');
    const resultEl = document.querySelector('.result');
    
    let playerScore = 0;
    let computerScore = 0;
    let gameActive = true;
    
    // Map choice to icon
    const choiceIcons = {
        rock: '<i class="fa-solid fa-hand-back-fist"></i>',
        paper: '<i class="fa-solid fa-hand"></i>',
        scissors: '<i class="fa-solid fa-hand-scissors"></i>'
    };
    
    // Game function
    function playGame(playerChoice) {
        if (!gameActive) return;
        
        // Set player selection
        playerSelectionEl.innerHTML = choiceIcons[playerChoice];
        
        // Computer selection
        const choicesArr = ['rock', 'paper', 'scissors'];
        const computerChoice = choicesArr[Math.floor(Math.random() * 3)];
        computerSelectionEl.innerHTML = choiceIcons[computerChoice];
        
        // Determine winner
        let result;
        
        if (playerChoice === computerChoice) {
            result = 'draw';
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            result = 'win';
            playerScore++;
            playerScoreEl.textContent = playerScore;
        } else {
            result = 'lose';
            computerScore++;
            computerScoreEl.textContent = computerScore;
        }
        
        // Update UI
        resultTextEl.textContent = result === 'draw' ? 'It\'s a Draw!' : 
                                  result === 'win' ? 'You Win!' : 'You Lose!';
        
        // Update result styling
        resultEl.className = 'result';
        resultEl.classList.add(result);
        
        // Add confetti for win
        if (result === 'win') {
            createConfetti();
        }
        
        // Disable further moves until reset
        gameActive = false;
    }
    
    // Create confetti
    function createConfetti() {
        const container = document.querySelector('.container');
        const colors = ['#ff7eee', '#8a76ff', '#5dffd0', '#ff5ee3', '#b388ff', '#6d6aff'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = Math.random() * 3 + 2;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.left = `${posX}%`;
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${delay}s`;
            confetti.style.backgroundColor = color;
            
            container.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    // Reset game
    function resetGame() {
        playerSelectionEl.innerHTML = '❔';
        computerSelectionEl.innerHTML = '❔';
        resultTextEl.textContent = 'Choose your move!';
        resultEl.className = 'result';
        gameActive = true;
    }
    
    // Event listeners
    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            if (!gameActive) return;
            const playerChoice = choice.getAttribute('data-choice');
            playGame(playerChoice);
        });
    });
    
    resetBtn.addEventListener('click', resetGame);
});