const toogleBtn= document.querySelector('.navbar_toogleBtn');
const menu = document.querySelector('.navbar_menu');
const ham = document.querySelector('.ham');


toogleBtn.addEventListener('click',()=>{
    menu.classList.toggle('active');
    ham.classList.toggle('change');    
})