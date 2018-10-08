document.addEventListener("DOMContentLoaded", function (event) {
    fetch('https://galvanize-eats-api.herokuapp.com/menu')
        .then((food) => food.json())
        .then(function (food) {
            for (let i = 0; i < food.menu.length; i++) {
                let menuCont = document.querySelector('#menuCont')
                let menuItems = document.createElement('a')
                menuCont.appendChild(menuItems)
                menuItems.classList.add('menu-items', 'waves-effect', 'waves-grey', 'btn-flat')
                menuItems.setAttribute('id', 'selectedItem')
                menuItems.innerHTML = food.menu[i].name + ' $' + food.menu[i].price
                console.log(food.menu[i])
            }
            return food
        }) .then(function (data) {
            let selected = document.querySelectorAll('#selectedItem')
            for (let i = 0; i < selected.length; i++) {
                selected[i].addEventListener('click', function selectedItem(event) {
                    event.target.setAttribute('value', 'food')
                    console.log(event.target.innerText.split("$")[1])
                })

            }
            return data
        })
let addItem = document.querySelector('#addItem')
addItem.addEventListener('click', selectItem)
function selectItem(event) {
    let displayCont = document.querySelector('#displayCont')
    let quantity = document.querySelector('#')
}





})