let score = 0;
let popUpCount = 0;
const maxPopUpCount = 2; // Maximum number of pop-ups per game
const minPoints = 20; // Minimum points to be earned from a pop-up
const maxPoints = 30;

const cardCombos = [
  [
    "Facial Recognition in Devices",
    "Healthcare Applications",
    "Missing Persons and Criminal Identification",
  ],
  [
    "Automated Tagging in Social Media",
    "Healthcare Applications",
    "Facial Recognition in Devices",
  ],
  [
    "Missing Persons and Criminal Identification",
    "Automated Tagging in Social Media",
    "Retail Loss Prevention",
  ],
  ["Retail Loss Prevention", "Workplace Monitoring", "Unconsented Advertising"],
  ["Unconsented Advertising", "Stalker App", "Mass Surveillance"],
  ["Mass Surveillance", "Predictive Policing", "Workplace Monitoring"],
];

var cardsData = [
  {
    id: "card1",
    title: "Mass Surveillance",
    description:
      "Facial recognition is used by governments or corporations for indiscriminate mass surveillance, potentially infringing on privacy rights and civil liberties.",
  },
  {
    id: "card2",
    title: "Stalker App",
    description:
      "A mobile app uses facial recognition to allow users to identify strangers in public, raising severe privacy and security concerns.",
  },
  {
    id: "card3",
    title: "Predictive Policing",
    description:
      "Law enforcement agencies use facial recognition to predict potential criminal behavior, which can lead to bias, discrimination, and privacy issues.",
  },
  {
    id: "card4",
    title: "Unconsented Advertising",
    description:
      "Advertisers use facial recognition in public spaces to identify individuals and deliver targeted ads without explicit consent.",
  },
  {
    id: "card5",
    title: "Workplace Monitoring",
    description:
      "Employers use facial recognition to track employees' productivity and behavior at work, which can potentially invade personal privacy.",
  },
  {
    id: "card6",
    title: "Retail Loss Prevention",
    description:
      "Retailers use facial recognition to identify and deter shoplifters, but this application may raise issues about profiling and misidentification.",
  },
  {
    id: "card7",
    title: "Automated Tagging in Social Media",
    description:
      "Social media platforms use facial recognition to suggest tagging friends in photos, provided users have given explicit consent.",
  },
  {
    id: "card8",
    title: "Healthcare Applications",
    description:
      "Facial recognition is used in healthcare for patient identification and diagnosis of certain diseases, improving medical accuracy and efficiency.",
  },
  {
    id: "card9",
    title: "Facial Recognition in Devices",
    description:
      "Devices use facial recognition for user authentication, enhancing security and user experience.",
  },
  {
    id: "card10",
    title: "Missing Persons and Criminal Identification",
    description:
      "Law enforcement uses facial recognition to locate missing persons or identify criminals, contributing to public safety and justice.",
  },
];

// Shuffle and select cards
const shuffledData = shuffleArray(cardsData);
const selectedCards = shuffledData.slice(0, 15);

// Populate the first card in the pickup area
const newCard = createCard(selectedCards.shift());
document.getElementById("cardPickup").appendChild(newCard);

// Assign event listeners to the cards and the placement area
document.getElementById("cardPlace").addEventListener("dragover", dragOver);
document.getElementById("cardPlace").addEventListener("drop", drop);

function createCard(cardData) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.draggable = true;
  newCard.id = cardData.id;
  newCard.addEventListener("dragstart", dragStart);
  newCard.addEventListener("dragenter", dragEnter);
  newCard.addEventListener("dragover", dragOver);
  newCard.addEventListener("dragleave", dragLeave);

  // Create a title element and append it to the card
  const titleElement = document.createElement("h3");
  titleElement.textContent = cardData.title;
  newCard.appendChild(titleElement);

  // Create a description element and append it to the card
  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = cardData.description;
  newCard.appendChild(descriptionElement);

  return newCard;
}

let divider = null; // global variable to keep track of the divider

// Update the dragStart function to clear any existing dividers
function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  if (divider) divider.remove();
}

// Update the drop function to handle drops between cards
function drop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const draggedElement = document.getElementById(id);

  if (divider && divider.parentNode === document.getElementById("cardPlace")) {
    document.getElementById("cardPlace").insertBefore(draggedElement, divider);
    divider.remove();
    divider = null;
  } else {
    document.getElementById("cardPlace").appendChild(draggedElement);
  }

  // Score computation
  score += 10;

  // Check if any card combos have been achieved
  const cardPlace = document.getElementById("cardPlace");
  const cards = Array.from(cardPlace.getElementsByClassName("card"));
  const cardTitles = cards.map(
    (card) => card.getElementsByTagName("h3")[0].textContent
  );

  const placedCards = Array.from(
    document.getElementById("cardPlace").querySelectorAll(".card")
  );
  if (popUpCount < maxPopUpCount) {
    const random = Math.random();
    if (random < 0.5) {
      // Display pop-up box
      showPopUpBox();
    }
  }

  // Iterate through the placed cards to find card combinations
  if (placedCards.length >= 3) {
    for (let i = 0; i < placedCards.length - 2; i++) {
      const combo = [
        placedCards[i].getElementsByTagName("h3")[0].textContent,
        placedCards[i + 1].getElementsByTagName("h3")[0].textContent,
        placedCards[i + 2].getElementsByTagName("h3")[0].textContent,
      ];

      // Check if the combo is included in the cardCombos array
      const comboIndex = cardCombos.findIndex((c) =>
        c.every((title) => combo.includes(title))
      );

      if (comboIndex !== -1) {
        // Combo found, award bonus points and remove the combo from cardCombos
        score += 50; // adjust the score increment as per your game design
        alert(`Combo achieved: ${combo.join(", ")} - You earned 50 points!`); // log the achieved combo
        cardCombos.splice(comboIndex, 1);
      }
    }
  }

  document.getElementById("score").textContent = score;

  // If there are still cards left, populate a new card in the pickup area
  if (selectedCards.length > 0) {
    const newCard = createCard(selectedCards.shift());
    document.getElementById("cardPickup").appendChild(newCard);
  }
}
function showPopUpBox() {
  const popUpPoints =
    Math.floor(Math.random() * (maxPoints - minPoints + 1)) + minPoints;

  // Create a transparent overlay to cover the entire screen
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  // Create the pop-up box
  const popUpBox = document.createElement("div");
  popUpBox.classList.add("popup");
  popUpBox.innerHTML = `
      <h2>Pop-up Box</h2>
      <p>Click the button to claim your points!</p>
      <button id="popUpButton">Claim Points</button>
    `;
  document.body.appendChild(popUpBox);

  // Add event listener to the pop-up button
  const popUpButton = document.getElementById("popUpButton");
  popUpButton.addEventListener("click", () => {
    score += popUpPoints;
    document.getElementById("score").textContent = score;
    alert(`You earned ${popUpPoints} points!`);
    overlay.remove();
    popUpBox.remove();
  });

  // Increment the pop-up count
  popUpCount++;
}

// Add the following functions to handle drag events on cards
function dragEnter(e) {
  e.preventDefault();
  if (e.target.classList.contains("card")) {
    divider = document.createElement("div");
    divider.classList.add("divider");
    // insert the divider before the card that is being hovered over
    e.target.parentNode.insertBefore(divider, e.target);
  }
}

function dragOver(e) {
  e.preventDefault();
}

function dragLeave(e) {
  e.preventDefault();
  if (e.target.classList.contains("card") && divider) {
    // remove the divider only if the card being left is the one before the divider
    if (divider.nextSibling === e.target) {
      divider.remove();
      divider = null;
    }
  }
}

// Update the createCard function to assign the new event listeners to the cards

function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
