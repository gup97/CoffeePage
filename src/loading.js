pageTrans();


/*====================================
*     LOADER
======================================*/
function loader(_success) {
    const inner = document.querySelector('.tmp');
    const innerText = inner.innerHTML + " ";
    
    let w = 0;
    t = setInterval(function () {
        w = w + 1;
        inner.textContent =innerText+ w + '°C';
        if (w === 100) {
            w=0;
            clearInterval(t);
            if (_success) {
                return _success();
            }
        }
    }, 30);
}
function pageTrans() {
    let loading = document.querySelector('.loading');
    window.addEventListener('load', function () {
          console.log("test");
        //  test용 코드 (4초동안 페이지가 로드되면 로딩페이지 보여줌)
        loader();
        console.log("test loader()");

        setTimeout(function () {
            console.log("test2");
            loading.parentElement.removeChild(loading);
            location.href = "./lay.html";
            //main
        }, 4000); 
    });
}
