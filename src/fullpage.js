window.addEventListener('load', function () {
    if (document.body.classList.contains('fullsc') && window.innerWidth > 1024) {
        const sections = document.querySelectorAll('section');
        const content = this.document.querySelectorAll('.main_content');
        let spin_vaule = 0;
        this.window.addEventListener('mousewheel', function (e) {
            if (e.deltaY > 0) {
                spin_vaule += 1;
            } else {
                spin_vaule = 1;
            }
            scroll_content(spin_vaule);
        });
        function scroll_content(count) {

            content.setAttribute('style', '\
            transform: translateY(-'+count*100+'vh);\
            ')  
        }
    }
});