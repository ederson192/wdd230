// Activate buttons

const buttons = [...document.getElementsByClassName("dir__buttons")];


buttons.forEach( button => {
  button.addEventListener("click", (event) => {
    console.log(event.target);
    buttons.forEach(button => button.classList.remove("active"));

    if(event.target.localName === "img") {
      event.target.parentNode.classList.add("active");
    } else {
      
      event.target.classList.add("active");
    }

  }, false)
});


/*------------------------------------------------------- */


// Consuming JSON

const URL = '../data/data.json';
const directoryCards = document.getElementById("directory__cards");

changeView();

const data = await fetch(URL)
  .then(response => response.json())
  .then(json => json);

const cards = createAllCards(data);

insertCardsInDOM(cards);

// buttons 

buttons.forEach( button => {
  button.addEventListener("click", () => {

    // changeClassInAllCards(cards, button.id);
    changeCardContainerClass(button.id);


  })
});

// Change the view when needed

window.onresize = () => changeView();




// -------- FUNCTIONS --------

// this function will help us to change the view when needed
function changeView() {
  buttons.forEach(button => button.classList.remove("active"));

  if(window.innerWidth >= 640 && window.innerWidth < 1024) {
    changeCardContainerClass("list-view");
    buttons[1].classList.add("active");
  } else {
    
    buttons[0].classList.add("active");
      changeCardContainerClass("grid-view");
      
  }
}

function changeCardContainerClass(className) {

  let toRemove = directoryCards.classList[1];

  directoryCards.classList.remove(toRemove);

  directoryCards.classList.add(className)

}

function insertCardsInDOM(cards){
  let container = document.getElementById("directory__cards");

  cards.forEach( card => container.appendChild(card))
}


// function to create all the cards
function createAllCards(data) {
  return data.map( business => createCard(business));
}


// Function to create the card
function createCard(business) {

  const card = document.createElement("section");
  card.className = "views";

  const {businessName, address, phone, website, logo, status} = business;

  card.innerHTML = `
    <img src="${logo}" alt="logo of ${businessName}" loading="lazy">
    <h2>${businessName}</h2>
    <p>${address}</p>
    <p>${phone}</p>
    <a href="${website}" target="_blank">${website}</a>
  `;

  return card;
};