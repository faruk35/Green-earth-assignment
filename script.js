let Secondlayout = document.getElementById('2nd-layout');
let buttonCategories = document.getElementById('button-categories');

window.onload = function () {
    showSpinner();
    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {
        let plants = data.plants;
        plants.forEach(function (data) {
            reUsuableCard(data);
        })
        hideSpinner();
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
                showSpinner();
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
                    hideSpinner();
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
        showSpinner();
        fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {
        let plants = data.plants;
        plants.forEach(function (data) {
            reUsuableCard(data);
        })
        hideSpinner();
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
                            <div class="cartDynamic flex justify-between items-center px-3 py-2 bg-blue-200 rounded">
                                <div>
                                    <h2 class='font-semibold'>${item.name}</h2>
                                    <p> ৳ <span>${item.price}</span> <i class="fa-solid fa-xmark"></i> <span>${item.quantity}</span></p>
                                </div>
                                <div>
                                    <button class="deleteBtn bg-red-500 text-white px-2 rounded"> <i class="fa-solid fa-xmark"></i> </button>
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
                    <div class="bg-white rounded sm:w-[240px] w-[400px] shadow-lg">
                        <div class="my-card p-1">
                            <img class="sm:w-[220px] sm:h-[250px] w-[400px] h-[400px] rounded" src="${data.image}" alt="">
                            <h2 class="title text-xl font-bold mt-2 cursor-pointer"> ${data.name}</h2>
                            <p class="mb-2 opacity-75 text-sm pb-5 pt-2 truncate-text">${data.description}</p>
                            <div class="flex justify-between items-center">
                                <h3 class="tag bg-[#dcfce7] rounded-lg px-3">${data.category}</h3>
                                <div class="taka flex">
                                    <p id='realP'>${data.price}</p>
                                </div>
                            </div>
                            <button class="addToCart w-full bg-green-600 rounded-lg mt-3 hover:text-white text-xl py-1">Add to cart</button>
                        </div>
                    </div>
            `;
            Secondlayout.appendChild(div);

                div.querySelector('.title').addEventListener('click', () => {
                document.getElementById('modalTitle').innerText = data.name;
                document.getElementById('modalImage').src = data.image;
                document.getElementById('modalCategory').innerText = data.category;
                document.getElementById('modalPrice').innerText = data.price;
                document.getElementById('modalDescription').innerText = data.description;
                document.getElementById('myModal').showModal();

            });

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

// Spinner Loading functionalities 
let spinner = document.getElementById('spinner');

function showSpinner() {
    spinner.classList.remove('hidden');
}

function hideSpinner() {
    spinner.classList.add('hidden');
}
