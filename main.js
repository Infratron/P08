// catturo la navbar

let MainNavbar = document.querySelector('#MainNavbar');

// catturo elementi HTML nello scope globale
let Primospan = document.querySelector('#Primospan')
let Secondospan = document.querySelector('#Secondospan')
let Terzospan = document.querySelector('#Terzospan')

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

function createinterval (finalnumber, element){

    let counter = 0;

    let interval = setInterval(()=>{

    if (counter < finalnumber){
        counter++
        element.innerHTML = counter;
    } else {
        clearInterval(interval)
    }
    }, 1)
}

// variabile appoggio per cessare incremento numeri

let check = true;


let observed = new IntersectionObserver(
    
    (entries)=>{

    entries.forEach((entry)=>{
        if(entry.isIntersecting && check == true){
            createinterval(1500 , Primospan);
            createinterval(2500 , Secondospan);
            createinterval(850 , Terzospan);
            check = false;
        }
    })
    
    }
)

observed.observe(Primospan);


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

let cardinters = document.querySelectorAll('.card-inters');

cardinters.forEach((card, i)=>{

    card.addEventListener('mouseenter', ()=>{
        cardinters[i].classList.add('card-inters-sec')
    })

    card.addEventListener('mouseleave' , ()=>{
        cardinters[i].classList.remove('card-inters-sec')
        cardinters[i].classList.add('card-inters-sec-trans')
    })
});