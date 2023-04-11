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
    array.forEach((element)=>{
        let div = document.createElement('div');
        div.classList.add('col-12' , 'col-md-3', 'my-4')
        div.innerHTML=`
        <div class="announcement-card">
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

function filterByCategory(categoria){

    if(categoria != 'All'){
        let filtered = data.filter((annuncio)=> annuncio.category == categoria);
        showCards(filtered);
    } else {
        showCards(data);
    }
}

let checkInputs = document.querySelectorAll('.form-check-input');

checkInputs.forEach((checkInputs)=>{
    checkInputs.addEventListener('click', ()=>{
        filterByCategory(checkInputs.id);
    })
})

});