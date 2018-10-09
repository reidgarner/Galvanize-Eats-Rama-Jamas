document.addEventListener("DOMContentLoaded", function (event) {
    var grandTotal = 0
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
        }).then(function (data) {
            let selected = document.querySelectorAll('#selectedItem')
            for (let i = 0; i < selected.length; i++) {
                selected[i].addEventListener('click', function selectedItem(event) {
                    event.target.setAttribute('value', 'food')
                    console.log(event.target.innerText.split("$"))
                    let foodName = event.target.innerText.split("$")[0]
                    let foodPrice = event.target.innerText.split("$")[1]
                    let displayCont = document.querySelector('#displayCont')
                    let orderedItem = document.createElement('p')
                    orderedItem.innerText = foodName + foodPrice
                    displayCont.appendChild(orderedItem)
                    grandTotal += Number(foodPrice)
                    let spanTotal = document.querySelector('#displayCont span')
                    spanTotal.innerText = grandTotal.toFixed(2)
                })
            }
            return data
        })

    let addItem = document.querySelector('.deliver')
    addItem.addEventListener('click', function () {
        let nameInput = document.querySelector('.info-input-1')
        let name = nameInput.value
        let phoneNumberInput = document.querySelector('.info-input-2')
        let phoneNumber = phoneNumberInput.value
        let addressInput = document.querySelector('.info-input-3')
        let address = addressInput.value
        let grandTotal = document
        event.preventDefault()
        console.log(name)
        console.log(phoneNumber)
        console.log(address)

    } )



    // function selectItem(event) {
    //     let displayCont = document.querySelector('#displayCont')
    //     let quantity = document.querySelector('#')
    // }
    
    // when you hit deliver
    // it should grab the values from the form: name, phone, address
    // it should grab the total and list of items
        // create list of items global variable
        // add items to it every time an item is added to the menu
    // submit a post request with the form values and menu totals
    // display post response
})