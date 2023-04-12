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

let opener = document.querySelector('.opener');
let movedDivs = document.querySelectorAll('.moved');

// variabile appoggio opener per far tornare indietro i moved
let conferma

// array di oggetti docenti

let teachers = [

    {name : 'Valerio Vacca', languages : ['HTML', 'CSS', 'JS', 'POKEMON'], url : 'https://picsum.photos/200'},
    {name : 'Francesco Talamona', languages : ['HTML', 'pearl', 'ruby', 'POKEMON'], url : 'https://picsum.photos/200'},
    {name : 'Paola', languages : ['HTML', 'CSS', 'gle', 'gooo'], url : 'https://picsum.photos/200'},
    {name : 'Robbolo', languages : ['HTML', 'oppolo', 'Jesus', 'POKEMON'], url : 'https://picsum.photos/200'},

];

// cattura cardwrapper

let cardWrapper = document.querySelector('#cardWrapper');

movedDivs.forEach((moved, i)=>{

    moved.style.backgroundImage = `url('${teachers[i].url}')`;
    // evento click per far apparire i docenti

    moved.addEventListener('click', ()=>{

        cardWrapper.innerHTML='';
        let div = document.createElement('div');
        div.classList.add('teacher-card');
        div.innerHTML=`
        <p class="h3">${teachers[i].name}</p>
        <p>${teachers[i].languages}</p>
        `;

        cardWrapper.appendChild(div);

        // cattura la singola card per cambiare immagine
        let card = document.querySelector('.teacher-card');
        card.style.backgroundImage=`url('${teachers[i].url}')`
    })

})

opener.addEventListener('click', ()=>{
    if(conferma == false){
        conferma = true
        movedDivs.forEach((moved, i)=>{
            let angle = (360 * i) / movedDivs.length;
            moved.style.transform = `rotate(${angle}deg) translate(200px) rotate(-${angle}deg)`;
            opener.innerHTML = `<i class="fa-solid fa-minus text-blackC fa-5x"></i>`;      
    })} else {
        cardWrapper.innerHTML='';
        movedDivs.forEach((moved, i)=>{
            // let angle = (360 * i) / movedDivs.length;
            moved.style.transform = `rotate(0deg) translate(0px)`;
            opener.innerHTML = `<i class="fa-solid fa-plus fa-5x"></i>`;
            conferma = false;
            
    })}

    }
)

