// Select all necessary DOM elements
const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const currentRound = document.getElementById("current-round");
const currentRoundRolls = document.getElementById("current-round-rolls");
const totalScore = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

// Initialize game variables
let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let total = 0;
let round = 1;
let rolls = 0;

// Function to roll the dice
const rollDice = () => {
  diceValuesArr = [];

  // Generate random dice values
  for (let i = 0; i < 5; i++) {
    const randomDice = Math.floor(Math.random() * 6) + 1;
    diceValuesArr.push(randomDice);
  }

  // Update the dice display
  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });
};

// Function to update the game stats (rounds and rolls)
const updateStats = () => {
  currentRoundRolls.textContent = rolls;
  currentRound.textContent = round;
};

// Function to update radio options with scores
const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`;
};

// Function to update the total score and score history
const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue);
  totalScore.textContent = score;
  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

// Function to get the highest duplicates and update the scores
const getHighestDuplicates = (arr) => {
  const counts = {};

  // Count occurrences of each number
  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  let highestCount = 0;

  // Find the highest count of duplicates
  for (const num of arr) {
    const count = counts[num];
    if (count >= 3 && count > highestCount) {
      highestCount = count;
    }
    if (count >= 4 && count > highestCount) {
      highestCount = count;
    }
  }

  const sumOfAllDice = arr.reduce((a, b) => a + b, 0);

  // Update radio options based on highest duplicates
  if (highestCount >= 4) {
    updateRadioOption(1, sumOfAllDice); // Four of a Kind
  }

  if (highestCount >= 3) {
    updateRadioOption(0, sumOfAllDice); // Three of a Kind
  }

  updateRadioOption(5, 0); // Default option with 0 score
};

// Function to detect a Full House
const detectFullHouse = (arr) => {
  const counts = {};

  // Count occurrences of each number
  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  const hasThreeOfAKind = Object.values(counts).includes(3);
  const hasPair = Object.values(counts).includes(2);

  // Update radio option if Full House is detected
  if (hasThreeOfAKind && hasPair) {
    updateRadioOption(2, 25); // Full House
  }

  updateRadioOption(5, 0); // Default option with 0 score
};

// Function to reset the radio options
const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  });

  scoreSpans.forEach((span) => {
    span.textContent = "";
  });
};

// Function to reset the game
const resetGame = () => {
  diceValuesArr = [0, 0, 0, 0, 0];
  score = 0;
  round = 1;
  rolls = 0;

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });

  totalScore.textContent = score;
  scoreHistory.innerHTML = "";

  currentRoundRolls.textContent = rolls;
  currentRound.textContent = round;

  resetRadioOptions();
};

// Function to check for straights (small and large)
const checkForStraights = (array) => {
  // Sort the array in ascending order and remove duplicates
  const sortedArray = array.slice().sort((a, b) => a - b);
  const uniqueSortedArray = [...new Set(sortedArray)];

  // Helper function to check consecutive numbers
  const isConsecutive = (arr) => arr.every((val, i, a) => !i || (val === a[i - 1] + 1));

  // Check for large straight (five consecutive numbers)
  if (uniqueSortedArray.length === 5 && isConsecutive(uniqueSortedArray)) {
    updateRadioOption(3, 30); // Small straight
    updateRadioOption(4, 40); // Large straight
    return;
  }

  // Check for small straight (four consecutive numbers)
  if (uniqueSortedArray.length >= 4) {
    for (let i = 0; i <= uniqueSortedArray.length - 4; i++) {
      if (isConsecutive(uniqueSortedArray.slice(i, i + 4))) {
        updateRadioOption(3, 30); // Small straight
        return;
      }
    }
  }

  // If no straight is found
  updateRadioOption(5, 0); // No straight
}

// Event listener for rolling the dice
rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("You have made three rolls this round. Please select a score.");
  } else {
    rolls++;
    resetRadioOptions();
    rollDice();
    updateStats();
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);
    checkForStraights(diceValuesArr);
  }
});

// Event listener for showing/hiding the rules
rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;

  if (isModalShowing) {
    rulesBtn.textContent = "Hide rules";
    rulesContainer.style.display = "block";
  } else {
    rulesBtn.textContent = "Show rules";
    rulesContainer.style.display = "none";
  }
});

// Event listener for keeping the score
keepScoreBtn.addEventListener("click", () => {
  let selectedValue;
  let achieved;

  // Find the selected score option
  for (const radioButton of scoreInputs) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      achieved = radioButton.id;
      break;
    }
  }

  if (selectedValue) {
    rolls = 0;
    round++;
    updateStats();
    resetRadioOptions();
    updateScore(selectedValue, achieved);
    
    // End game after 6 rounds
    if (round > 6) {
      setTimeout(() => {
        alert(`Game Over! Your total score is ${score}`);
        resetGame();
      }, 500);
    }
  } else {
    alert("Please select an option or roll the dice");
  }
});