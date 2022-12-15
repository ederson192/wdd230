const URL = "https://brotherblazzard.github.io/canvas-content/fruit.json";
const form = document.getElementById("fresh-form");
let ls = window.localStorage.getItem("juices") || "[]";
ls = JSON.parse(ls);

fetch(URL)
  .then(response => response.json())
  .then( json => {
    json.forEach( fruit => {
      for (let i = 1; i < 4; i++) {
        const key = `fruit${i}`;
        form[key].innerHTML += `
        <option value="${fruit.id}">${fruit.name}</option>
        `
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      changeFresh(".fresh-form",".load_fresh");

      setTimeout(() => changeFresh(".load_fresh",".answer_sended"),"1000");

      const codes = [
        form.fruit1.value,
        form.fruit2.value,
        form.fruit3.value
      ];

      const fruits = codes.map( code => json.find(fruit => fruit.id == code))

      const drink = buildDrink(form, fruits);

      buildNutrition(drink, 'carbohydrates');
      buildNutrition(drink, 'protein');
      buildNutrition(drink, 'fat');
      buildNutrition(drink, 'calories');
      buildNutrition(drink, 'sugar');

      setVal('answer_name',drink.name);
      setVal('answer_email', drink.mail);
      setVal('answer_phone', drink.phone);
      setVal('answer_fruit1', drink.fruits[0].name);
      setVal('answer_fruit2', drink.fruits[1].name);
      setVal('answer_fruit3', drink.fruits[2].name);
      setVal('answer_instructions', drink.instruction);
      setVal('answer_date', drink.date);

      // data in table
      setVal('t_car',drink.calories);
      setVal('t_pro',drink.protein);
      setVal('t_fat',drink.fat);
      setVal('t_sug', drink.sugar);
      setVal('t_cal', drink.calories);

      saveLS(drink);
      form.reset();
    })
  });

// try again with the Form
document.querySelector(".return").addEventListener("click", () => {
  changeFresh(".answer_sended",".load_fresh");

  setTimeout( () => changeFresh(".load_fresh",".fresh-form"),"1000");
});

function setVal(selector, value) {
  document.getElementById(selector).innerHTML = value;
};

function buildDrink(form, fruits) {
  return {
    name: form.name.value,
    mail: form.mail.value,
    phone: form.phone.value,
    fruits,
    instruction: form.instruction.value,
    date: (new Date()).toLocaleString(),
  }
};

function buildNutrition(obj, key) {
  obj[key] = obj.fruits.reduce((acc, fruit) => acc + fruit.nutritions[key],0).toFixed(2);
};

function changeFresh(hide1, hide2) {
  document.querySelector(hide1).classList.toggle('fresh_hide');
  document.querySelector(hide2).classList.toggle('fresh_hide');
}

function saveLS(data) {
  ls.push(data);
  window.localStorage.setItem("juices",JSON.stringify(ls));
}