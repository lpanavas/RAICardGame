var data = [
  {
    title: "Mass Surveillance",
    description:
      "Facial recognition is used by governments or corporations for indiscriminate mass surveillance, potentially infringing on privacy rights and civil liberties.",
  },
  {
    title: "Stalker App",
    description:
      "A mobile app uses facial recognition to allow users to identify strangers in public, raising severe privacy and security concerns.",
  },
  {
    title: "Predictive Policing",
    description:
      "Law enforcement agencies use facial recognition to predict potential criminal behavior, which can lead to bias, discrimination, and privacy issues.",
  },
  {
    title: "Unconsented Advertising",
    description:
      "Advertisers use facial recognition in public spaces to identify individuals and deliver targeted ads without explicit consent.",
  },
  {
    title: "Workplace Monitoring",
    description:
      "Employers use facial recognition to track employees' productivity and behavior at work, which can potentially invade personal privacy.",
  },
  {
    title: "Retail Loss Prevention",
    description:
      "Retailers use facial recognition to identify and deter shoplifters, but this application may raise issues about profiling and misidentification.",
  },
  {
    title: "Automated Tagging in Social Media",
    description:
      "Social media platforms use facial recognition to suggest tagging friends in photos, provided users have given explicit consent.",
  },
  {
    title: "Healthcare Applications",
    description:
      "Facial recognition is used in healthcare for patient identification and diagnosis of certain diseases, improving medical accuracy and efficiency.",
  },
  {
    title: "Facial Recognition in Devices",
    description:
      "Devices use facial recognition for user authentication, enhancing security and user experience.",
  },
  {
    title: "Missing Persons and Criminal Identification",
    description:
      "Law enforcement uses facial recognition to locate missing persons or identify criminals, contributing to public safety and justice.",
  },
];
// Shuffle the data.
data.sort(() => Math.random() - 0.5);

var cardPickup = document.getElementById("cardPickup");
var cardPlace = document.getElementById("cardPlace");

function createCardElement(card, index) {
  var cardElement = document.createElement("div");
  cardElement.textContent = card.title;
  cardElement.classList.add("card");
  cardElement.setAttribute("draggable", "true");
  cardElement.id = "card-" + index;

  cardElement.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", cardElement.id);
  });

  return cardElement;
}

function displayNextCard() {
  if (data.length === 0) {
    return;
  }

  var cardElement = createCardElement(data.shift(), Date.now());
  cardPickup.appendChild(cardElement);
}

displayNextCard();

function allowDrop(e) {
  e.preventDefault();
  if (e.target.classList.contains("card")) {
    e.target.style.border = "3px dotted red";
  }
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
  if (divider) {
    document.getElementById("cardPlace").insertBefore(draggedElement, divider);
    divider.remove();
  } else {
    document.getElementById("cardPlace").appendChild(draggedElement);
  }

  // Score computation
  score += 10;
  document.getElementById("score").textContent = score;

  // If there are still cards left, populate a new card in the pickup area
  if (selectedCards.length > 0) {
    const newCard = createCard(selectedCards.shift());
    document.getElementById("cardPickup").appendChild(newCard);
  }
}

// Add the following functions to handle drag events on cards
function dragEnter(e) {
  e.preventDefault();
  if (e.target.classList.contains("card")) {
    divider = document.createElement("div");
    divider.classList.add("divider");
    document.getElementById("cardPlace").insertBefore(divider, e.target);
  }
}

function dragOver(e) {
  e.preventDefault();
}

function dragLeave(e) {
  e.preventDefault();
  if (e.target.classList.contains("card") && divider) {
    divider.remove();
  }
}

// Update the createCard function to assign the new event listeners to the cards
function createCard(cardData) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.draggable = true;
  newCard.textContent = cardData.description;
  newCard.id = cardData.id;
  newCard.addEventListener("dragstart", dragStart);
  newCard.addEventListener("dragenter", dragEnter);
  newCard.addEventListener("dragover", dragOver);
  newCard.addEventListener("dragleave", dragLeave);
  return newCard;
}
