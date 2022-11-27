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

const URL = './data/data.json';
const directoryCards = document.getElementById("directory__cards");
const spots = [...document.querySelectorAll(".spots")];


const data = await fetch(URL)
.then(response => response.json())
.then(json => json);

const cards = createAllCards(data);

if(buttons.length > 0) {
  changeView();
  window.onresize = () => changeView();
  insertCardsInDOM(cards);
}

// create spots

if(spots.length > 0) {
  createSpots(data);
}

// buttons 

buttons.forEach( button => {
  button.addEventListener("click", () => {

    // changeClassInAllCards(cards, button.id);
    changeCardContainerClass(button.id);


  })
});

// Change the view when needed


if(buttons.length > 0) {
  window.onresize = () => changeView();
}




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

function createSpots(data) {

  // if(spots != null) {
  let newSpots = data.filter(element => element.status == "gold" || element.status == "silver");
  console.log(newSpots)
  spots.forEach((element) => {
      // pick a random business
      let index = Math.floor(Math.random() * newSpots.length);
      console.log(index);
      let spot = newSpots.splice(index, 1)[0];
      console.log(spot);
  
      // create the elements for the spot
      // const div = document.createElement('div');

      element.innerHTML = `
  <h2>${spot.businessName}</h2>
  <div>
  <img src="${spot.logo}" alt="logo of ${spot.businessName}" loading="lazy">
  </div>
  <p>${spot.phone}</p>
  <p>${spot.address}</p>
      `
      
      // let h2 = document.createElement('h2');
      // let img = document.createElement('img');
      // let phone = document.createElement('p');
      // let address = document.createElement('p');
  
      // //set the title
      // h2.textContent = spot.businessName;
  
      // // build the image
      // img.classList.add("spot-img");
      // img.setAttribute('src',spot.logo);
      // img.setAttribute('alt', `logo of ${spot.businessName}`);
      // img.setAttribute('loading','lazy');
  
      // // set the descripcion phone and adress
      // phone.textContent = spot.phone;
      // address.textContent = spot.address;
  
      // div.appendChild(h2);
      // div.appendChild(img);
      // div.appendChild(phone);
      // div.appendChild(address);
      // element.appendChild(div);
  })
  // }
}
