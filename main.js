// catturo la navbar

let MainNavbar = document.querySelector('#MainNavbar');

// creo l'evento per lo scroll della navbar

window.addEventListener('scroll', ()=>{

    if(window.scrollY > 0){
        MainNavbar.classList.remove('bg-transparent');
        MainNavbar.classList.add('navcustom');
    }else{
        MainNavbar.classList.add('bg-transparent');
        MainNavbar.classList.remove('navcustom');
        MainNavbar.classList.add('transnav');
    }
});