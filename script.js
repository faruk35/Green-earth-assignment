window.onload = function () {
    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {
        let plants = data.plants;
        console.log(plants)
        let Secondlayout = document.getElementById('2nd-layout')
        plants.forEach(function (data) {
            let div = document.createElement('div')
            console.log(data)
            div.innerHTML = `
                    <div class="bg-white rounded w-[240px]">
                        <div class="my-card p-5">
                            <img class="w-[220px] h-[300px]" src="${data.image}" alt="">
                            <h2 class="title"> ${data.name}</h2>
                            <p>${data.description}</p>
                            <div class="flex justify-between">
                                <h3 class="tag bg-[#dcfce7] rounded-lg px-4">Fruit Tree</h3>
                                <div class="taka">
                                    <p>30 $ </p>
                                </div>
                            </div>
                            <button class="w-full bg-green-500 rounded-lg mt-3">Add to cart</button>
                        </div>
                    </div>
            `;
            Secondlayout.appendChild(div);
        })
    })
}