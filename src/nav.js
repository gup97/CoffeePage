const toogleBtn= document.querySelector('.navbar_toogleBtn');
const menu = document.querySelector('.navbar_menu');

toogleBtn.addEventListener('click',()=>{
    menu.classList.toggle('active');
})