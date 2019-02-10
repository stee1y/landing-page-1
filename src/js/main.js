document.addEventListener('DOMContentLoaded', function () {

    var widthDevice = window.innerWidth;
    var menuToggle = document.getElementsByClassName('main-nav__toggle')[0];
    var userListHidden = document.getElementById('user-list');
    var siteListHidden = document.getElementById('site-list');
    var menuMain = document.getElementById('container');
    var overlayMenu = document.getElementsByClassName('header')[0];
    var menuShedow = document.getElementsByClassName('main-nav')[0];


    function menuMainHidden() {
        menuMain.style.flexDirection='row';
        userListHidden.style.display='none';
        siteListHidden.style.display='none';
    };

    function menuMainVisible() {
        userListHidden.style.display='flex';
        siteListHidden.style.display='flex';
    };

    if (widthDevice >=320 && widthDevice <= 1169) {
        menuToggle.style.display='block';
        overlayMenu.style.position='absolute';
        overlayMenu.style.height='auto';
        menuMainHidden();
    } else if (widthDevice >=1170) {
        menuToggle.style.display='none';
        menuMainVisible();
    };

    window.onresize = function () {
        widthDevice = window.innerWidth;
        if (widthDevice >=320 && widthDevice <= 749) {
            menuMainHidden();
            menuToggle.classList.remove('main-nav__toggle-closed');
            overlayMenu.style.height='auto';
            overlayMenu.style.backgroundColor='transparent';
            menuShedow.style.boxShadow='0 0 0';
            menuToggle.style.display='block';
            overlayMenu.style.position='absolute';
        } else if (widthDevice >=750 && widthDevice <= 1169) {
            menuMainHidden();
            menuShedow.style.boxShadow='0 0 0';
            menuToggle.style.display='block';
            overlayMenu.style.position='absolute';
            overlayMenu.style.height='auto';
            menuToggle.classList.remove('main-nav__toggle-closed');
            overlayMenu.style.backgroundColor='transparent';
        } else if (widthDevice >=1170) {
            menuMainVisible();
            menuShedow.style.boxShadow='0 0 0';
            menuToggle.style.display='none';
            overlayMenu.style.height='auto';
            overlayMenu.style.backgroundColor='transparent';
        };
    };

    menuToggle.addEventListener('click', function () {

        if (menuToggle.className == 'main-nav__toggle' ) {
            menuToggle.classList.add('main-nav__toggle-closed');
            menuShedow.style.boxShadow='5px 5px 20px #000';
            menuMain.style.flexDirection='column';
            userListHidden.style.display='block';
            siteListHidden.style.display='block';
            overlayMenu.style.height='100vh';
            overlayMenu.style.position='fixed';
            overlayMenu.style.backgroundColor='rgba(57,24,88, 0.5)';

        } else {
            menuToggle.classList.remove('main-nav__toggle-closed');
            menuShedow.style.boxShadow='0 0 0';
            menuMain.style.flexDirection='row';
            userListHidden.style.display='none';
            siteListHidden.style.display='none';
            overlayMenu.style.position='absolute';
            overlayMenu.style.height='auto';
            overlayMenu.style.backgroundColor='transparent';
        }
    });


    var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
        V = 0.2;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
    for (var i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
            e.preventDefault(); //отменяем стандартное поведение
            var w = window.pageYOffset,  // производим прокрутка прокрутка
                hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
            t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
                start = null;
            requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
            function step(time) {
                if (start === null) start = time;
                var progress = time - start,
                    r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
                window.scrollTo(0,r);
                if (r != w + t) {
                    requestAnimationFrame(step)

                                                            // Скрытие меню после нажатия

                    if (menuToggle.className != 'main-nav__toggle' ) {
                        menuToggle.classList.remove('main-nav__toggle-closed');
                        menuShedow.style.boxShadow='0 0 0';
                        menuMain.style.flexDirection='row';
                        userListHidden.style.display='none';
                        siteListHidden.style.display='none';
                        overlayMenu.style.position='absolute';
                        overlayMenu.style.height='auto';
                        overlayMenu.style.backgroundColor='transparent';
                    } else {
                        return
                    }


                } else {
                    location.hash = hash  // URL с хэшем
                }
            }
        }, false);
    }
});