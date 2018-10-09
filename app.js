document.addEventListener("DOMContentLoaded", function (event) {
    var grandTotal = 0
    var itemList = []
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
            }
            return food
        }).then(function (data) {
            let selected = document.querySelectorAll('#selectedItem')
            for (let i = 0; i < selected.length; i++) {
                selected[i].addEventListener('click', function selectedItem(event) {
                    event.target.setAttribute('value', 'food')
                    let foodName = event.target.innerText.split("$")[0]
                    let foodPrice = event.target.innerText.split("$")[1]
                    let displayCont = document.querySelector('#displayCont')
                    let orderedItem = document.createElement('p')
                    orderedItem.innerText = foodName + foodPrice
                    displayCont.appendChild(orderedItem)
                    grandTotal += Number(foodPrice)
                    let spanTotal = document.querySelector('#displayCont span')
                    spanTotal.innerText = grandTotal.toFixed(2)
                    itemList.push(foodName)
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
        event.preventDefault()
        var finalList = {
            name: name,
            phoneNumber: phoneNumber,
            address,
            itemList,
            grandTotal
        }
        var postURL = 'https://galvanize-eats-api.herokuapp.com/orders'
    var settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(finalList)
    }
    fetch(postURL, settings)
        .then(function(response) {
            return response.text()
        })
        .then(function(body) {
            document.body.innerHTML = `<h1>${body}</h1>`
        })
    })
})