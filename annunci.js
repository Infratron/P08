// catturo la navbar

let MainNavbar = document.querySelector('#MainNavbar');

// creo l'evento per lo scroll della navbar

window.addEventListener('scroll', ()=>{

    if(window.scrollY > 0 ){
        MainNavbar.classList.remove('bg-transparent');
        MainNavbar.classList.add('navcustom');
    } else if(window.scrollY == 0 && varcontr == true){
        MainNavbar.classList.remove('bg-transparent');
    }
    else {
        MainNavbar.classList.add('bg-transparent');
        MainNavbar.classList.remove('navcustom');
        MainNavbar.classList.add('transnav');
    }
});

let toggler = document.querySelector('.navbar-toggler-icon');

// dichiarazione variabile di controllo 

let varcontr = false;

toggler.addEventListener('click', ()=>{

    if(toggler == window.scrollY == 0 && varcontr == false){
        MainNavbar.classList.remove('bg-transparent');
        MainNavbar.classList.add('navcustom');
        varcontr = true;
    }  else{
        MainNavbar.classList.add('bg-transparent');
        MainNavbar.classList.remove('navcustom');
        varcontr = false;
    }
    
});

fetch('./annunci.json').then( (response)=> response.json()).then((data)=> {


// cattura wrapper radio buttons

let categoryWrapper = document.querySelector('#category-Wrapper');

function setCategoryFilters(){
let categories = data.map((annuncio)=> annuncio.category);

let uniqueCategories = [];
categories.forEach((category)=>{
    if( !uniqueCategories.includes(category)){
        uniqueCategories.push(category)
    }
})
    uniqueCategories.forEach((category)=>{

        let div = document.createElement('div');
        div.classList.add('form-check')
        div.innerHTML= `
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}"> 
        <label class="form-check-label" for="flexRadioDefault1">
          ${category}
        </label>
        `;
        categoryWrapper.appendChild(div);
    })
};



setCategoryFilters();

let cardsWrapper = document.querySelector('#cardsWrapper');

function showCards (array){
    cardsWrapper.innerHTML= '';

    array.sort((a , b)=> Number(b.price - a.price))

    array.forEach((element, i)=>{
        let div = document.createElement('div');
        div.classList.add('col-12' , 'col-md-3', 'my-4')
        div.innerHTML=`
        <div class="announcement-card">
        <img class="my-2 imgcardcustom" src="https://picsum.photos/${200 + i}" alt="">
        <p class="h2">${element.name}</p>
        <h3>${element.category}</h3>
        <h3>${element.price}€</h3>
        </div>
        `;
        cardsWrapper.appendChild(div);
    })
} 

showCards(data);

// mostra card filtrate per categoria al click sul radio button

function filterByCategory(array){
    // trasformiamo la nodelist in un array, sfruttando il papà array ed il suo metodo from che mi trasforma una nodelist in questo caso specifico in un array

    let categoria = Array.from(checkInputs).find((button)=> button.checked).id;

    if(categoria != 'All'){
        let filtered = array.filter((annuncio)=> annuncio.category == categoria);
        return filtered;
    } else {
       return data;
    }
}

let checkInputs = document.querySelectorAll('.form-check-input');

checkInputs.forEach((checkInputs)=>{
    checkInputs.addEventListener('click', ()=>{
        globalFilter();
    })
})

// cattura range input and number

let inputPrice = document.querySelector('#inputPrice');
let incrementNumber = document.querySelector('#incrementNumber');

// funzione settaggio valore input price 

function setInputPrice(){

    let prices = data.map((annuncio)=> (annuncio.price));
    let maxPrice = Math.max(...prices);
    inputPrice.max = Math.ceil(maxPrice);
    inputPrice.value = Math.ceil(maxPrice);
    incrementNumber.innerHTML = Math.ceil(maxPrice);
}

setInputPrice();

// funzione che filtra per prezzo

function filterByPrice(array){
    let filtered = array.filter((annuncio)=> annuncio.price <= Math.ceil(inputPrice.value));
    return filtered;
}
// evento al cambio dell'input range

inputPrice.addEventListener('input', ()=>{

    incrementNumber.innerHTML = inputPrice.value
    globalFilter();
})

let wordInput = document.querySelector('#wordInput');

    // funzione filtra per parola

    function filterbyWord(array){

        let nome = wordInput.value;
        let filtered = array.filter ( (annuncio)=> annuncio.name.toLowerCase().includes(nome.toLowerCase()) );
        return filtered;

    }

    // evento digitazione parola sull'input
   
    wordInput.addEventListener('input', ()=>{

        globalFilter();

    })

    // filtro dei filtri, funzione globale

function globalFilter(){

    let filteredByCategory =  filterByCategory(data);
    let filteredByPrice = filterByPrice(filteredByCategory);
    let filteredByWord = filterbyWord(filteredByPrice);
    showCards(filteredByWord);

}
});


