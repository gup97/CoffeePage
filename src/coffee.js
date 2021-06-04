const coffee_list = document.querySelector(".coffee_list");
const coffee_test = document.querySelector(".test");
const buttons = document.querySelectorAll("button");
let current_element = null;

const changeCoffeeType = (selected) => {
  if(selected.className=="selected"){
    current_element.classList.remove("selected");
    coffee_test.classList.remove(current_element.id);
    return;
  }
  if (current_element) {
    current_element.classList.remove("selected");
    coffee_test.classList.remove(current_element.id);
  }
  current_element = selected;
  coffee_test.classList.add(current_element.id);

  current_element.classList.add("selected");
  coffee_list.innerText = selected.innerText;
  console.log("object2") 
};

const setActiveType = (element) => {
  element.toggleClass("selected");
};

[...buttons].forEach((button) => {
  button.addEventListener("click", () => {
    changeCoffeeType(button);
  });
});
