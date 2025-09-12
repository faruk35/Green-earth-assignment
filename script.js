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
                <button class=" category-buttons w-[90%] rounded text-start my-2 pl-2"> ${data.category_name} </button>
            `;
            buttonCategories.appendChild(singleBtn)
        })
        let singleBtn = document.createElement('div')
        singleBtn.innerHTML = `<button id="allTrees" class=" category-buttons w-[90%] rounded text-start my-2 pl-2"> All Trees </button>`;
        buttonCategories.prepend(singleBtn)
        allTrees();
        
        let categoryButtons = document.querySelectorAll('.category-buttons')
        categoryButtons.forEach((data, index) => {
            index = index+1;
            data.addEventListener('click', () => {
                categoryButtons.forEach(data => data.classList.remove('bg-green-500'))
                data.classList.add('bg-green-500')
                let url = `https://openapi.programming-hero.com/api/category/${index}`
                Secondlayout.innerHTML = '';
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    let plants = data.plants
                    console.log(plants)
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
    Secondlayout.innerHTML = '';
    buttonCategories.innerHTML = '';
    window.onload();
})
}
function reUsuableCard (data) {
                let div = document.createElement('div')
            div.innerHTML = `
                    <div class="bg-white rounded w-[240px]">
                        <div class="my-card p-2">
                            <img class="w-[220px] h-[300px] rounded" src="${data.image}" alt="">
                            <h2 class="title text-xl font-bold mt-2"> ${data.name}</h2>
                            <p class="mb-2 opacity-75 text-sm py-2">${data.description}</p>
                            <div class="flex justify-between">
                                <h3 class="tag bg-[#dcfce7] rounded-lg px-4">${data.category}</h3>
                                <div class="taka">
                                    <p>${data.price} </p>
                                </div>
                            </div>
                            <button class="w-full bg-green-500 rounded-lg mt-3">Add to cart</button>
                        </div>
                    </div>
            `;
            Secondlayout.appendChild(div);
}