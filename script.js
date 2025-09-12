let Secondlayout = document.getElementById('2nd-layout');
let buttonCategories = document.getElementById('button-categories');

window.onload = function () {
    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {
        let plants = data.plants;
        plants.forEach(function (data) {
            reUsuableCard(data);
        })
    })
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json())
    .then(data => {
        let categories = data.categories;
        categories.forEach(data => {
            let singleBtn = document.createElement('div')
            singleBtn.innerHTML = `
                <button class=" category-buttons w-[90%] hover:bg-green-300 rounded text-start my-2 pl-2 py-2"> ${data.category_name} </button>
            `;
            buttonCategories.appendChild(singleBtn)
        })
        let singleBtn = document.createElement('div')
        singleBtn.innerHTML = `<button id="allTrees" class="category-buttons hover:bg-green-300 bg-green-600 w-[90%] rounded text-start my-2 pl-2 py-2"> All Trees </button>`;
        buttonCategories.prepend(singleBtn)
        allTrees();
        
        let categoryButtons = document.querySelectorAll('.category-buttons')
        categoryButtons.forEach((data, index) => {
            data.addEventListener('click', () => {
                categoryButtons.forEach(data => data.classList.remove('bg-green-600'))
                data.classList.add('bg-green-600')
                let url = `https://openapi.programming-hero.com/api/category/${index}`
                Secondlayout.innerHTML = '';
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    let plants = data.plants
                        plants.forEach(function (data) {
                        reUsuableCard(data);
                    })
                })
            })
        })
    })
}

function allTrees () {
    let allTrees = document.getElementById('allTrees')
    allTrees.addEventListener('click', () => {
        
        let categoryButtons = document.querySelectorAll('.category-buttons');
        categoryButtons.forEach(btn => btn.classList.remove('bg-green-600'));
        allTrees.classList.add('bg-green-600');
        
    Secondlayout.innerHTML = '';
    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {
        let plants = data.plants;
        plants.forEach(function (data) {
            reUsuableCard(data);
        })
    })
})}

let cart = [];

let addToCart = (name, price) => {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    renderMyUi(cart)
}

let renderMyUi = (cart) => {
    console.log(cart)
    let cartInsertion = document.getElementById('cartInsertion');
    cartInsertion.innerHTML = ''

    cart.forEach((item, index) => {
        let div = document.createElement('div');
        div.innerHTML = `
                            <div class="cartDynamic flex justify-between items-center px-3 py-2 bg-blue-300 rounded">
                                <div>
                                    <h2>${item.name}</h2>
                                    <p>$ <span>${item.price}</span> * <span>${item.quantity}</span></p>
                                </div>
                                <div>
                                    <button class="deleteBtn bg-red-500 text-white px-2 rounded"> * </button>
                                </div>
                            </div> `;
        div.querySelector('.deleteBtn').addEventListener('click', () => {
            removeFromCart(index);
        })
        cartInsertion.appendChild(div);
    })
    calculateTheTotal() ;
}
let calculateTheTotal = () => {
    let total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity ), 0 )
    document.getElementById('totalResult').innerText = total;
}
let removeFromCart = (index) => {
    cart.splice(index, 1);
    renderMyUi(cart);
}

function reUsuableCard (data) {
                let div = document.createElement('div')
            div.innerHTML = `
                    <div class="bg-white rounded w-[240px]">
                        <div class="my-card p-2">
                            <img class="w-[220px] h-[250px] rounded" src="${data.image}" alt="">
                            <h2 class="title text-xl font-bold mt-2"> ${data.name}</h2>
                            <p class="mb-2 opacity-75 text-sm pb-5 pt-2 truncate-text">${data.description}</p>
                            <div class="flex justify-between">
                                <h3 class="tag bg-[#dcfce7] rounded-lg px-4">${data.category}</h3>
                                <div class="taka">
                                    <p>${data.price} </p>
                                </div>
                            </div>
                            <button class="addToCart w-full bg-green-600 rounded-lg mt-3 hover:text-white">Add to cart</button>
                        </div>
                    </div>
            `;
            Secondlayout.appendChild(div);

            document.querySelectorAll('.addToCart').forEach(btn => {
                btn.replaceWith(btn.cloneNode(true));
            });            

            document.querySelectorAll('.addToCart').forEach(btn => {
            btn.addEventListener('click', () => {
            let card = btn.closest('.my-card');
                let price = card.querySelector('.taka p').innerText;
                let name = card.querySelector('.title').innerText;
                addToCart(name, price)
            })
})
}