const products = {
    crazy: {
        name: "Crazy",
        price: 31000,
        image: 'images/products/burger-1.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    light: {
        name: "Light",
        price: 26000,
        image: 'images/products/burger-2.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: "CheeseBurger",
        price: 29000,
        image: 'images/products/burger-3.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: "dBurger",
        price: 24000,
        image: 'images/products/burger-4.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    }
}

const productBtns = document.querySelectorAll('.wrapper__list-btn');
const productModal = document.querySelector('.wrapper__navbar-basket');
const productBasket = document.querySelector('.wrapper__navbar-btn');
const closeProductBasket = document.querySelector('.wrapper__navbar-close');
const basketCount = document.querySelector('.warapper__navbar-count');
const basketCheckList = document.querySelector('.wrapper__navbar-checklist');
const basketTotalPrice = document.querySelector('.wrapper__navbar-totalprice span');
const basketOrderBtn = document.querySelector('.wrapper__navbar-bottom');
const basketBody = document.querySelector('.print__body');
const basketFooter = document.querySelector('.print__footer');

productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        addProduct(this)
    })
})


function addProduct(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    products[parentId].amount++
    basket()
}

function basket() {
    const productList = []
    let totalCount = 0
    for (const key in products) {
        const product = products[key]
        const productCard = document.querySelector(`#${product.name.toLowerCase()}`);
        const productCount = productCard.querySelector('.wrapper__list-count');
        if (product.amount > 0) {
            productList.push(product)
            basketCount.classList.add('active')
            productCount.classList.add('active')
            productCount.innerHTML = product.amount
            totalCount += product.amount
        } else {
            productCount.classList.remove('active')
            productCount.innerHTML = 0
        }
        basketCount.innerHTML = totalCount
    }
    basketCheckList.innerHTML = ''
    for (let i = 0; i < productList.length; i++) {
        basketCheckList.innerHTML += cardItemBurger(productList[i])
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketCount.classList.add('active')
    }else {
        basketCount.classList.remove('active')
    }
    basketCount.innerHTML = allCount.toString()
    basketTotalPrice.innerHTML = totalSummProduct()
}

function totalCountProduct() {
    let total = 0
    for (const key in products) {
        total += products[key].amount
    }
    return total
}
function totalSummProduct() {
    let total = 0
    for (const key in products) {
        total += products[key].totalSumm
    }
    return total.toString()
}

function cardItemBurger(productData) {
    const {name, price, amount, image} = productData
    return `
    <div class="wrapper__navbar-product">
        <div class="wrapper__navbar-info">
            <img src="${image}" alt="${name}"
                class="wrapper__navbar-productImage">
            <div class="wrapper__navbar-infoSub">
                <p class="wrapper__navbar-infoName">${name}</p>
                <p class="wrapper__navbar-infoPrice"><span>${price}</span>sum</p>
            </div>
        </div>
        <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
            <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
            <output class="wrapper__navbar-count">${amount}</output>
            <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
        </div>
    </div>`
}








productBasket.addEventListener('click', function () {
    productModal.classList.add('active')
})
closeProductBasket.addEventListener('click', function () {
    productModal.classList.remove('active')
})

window.addEventListener('click',function (e) {
    const btn = e.target
    if (btn.classList.contains("wrapper__navbar-symbol")) {
        const attr = btn.getAttribute('data-symbol')
        const attrParent = btn.closest('.wrapper__navbar-option')
        if (attrParent) {
            const attrId = attrParent.getAttribute('id').split('_')[0]
            if (attr === '+') products[attrId].amount++
            else if (attr === '-') products[attrId].amount--
            basket()
        }
    }
})


basketOrderBtn.addEventListener('click',function () {
    basketBody.innerHTML = ''
    for (const key in products) {
        const {name, totalSumm, amount} = products[key]
        if (amount) {
            basketBody.innerHTML += `<div class="print__body-item">
                                        <p class="print__body-item_name">
                                            <span class="name">${name}</span>
                                            <span class="count">${amount}</span>
                                        </p>
                                        <p class="print__body-price">${totalSumm}</p>
                                    </div>`
        }

    }
    basketFooter.innerHTML = totalSummProduct() + ' summa'
    window.print()
})