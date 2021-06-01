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
        inner.textContent =innerText+ w + '%';
        if (w === 100) {XMLDocument
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
        //  test용 코드 (4초동안 페이지가 로드되면 로딩페이지 보여줌)
        loader();
        setTimeout(function () {
            loading.parentElement.removeChild(loading);
            location.href = "./main_list.html";
        }, 4000);
    });
}
