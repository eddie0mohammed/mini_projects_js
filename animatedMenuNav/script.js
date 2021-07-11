
const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');

const navArr = [nav1, nav2, nav3, nav4, nav5];

function animateIn(){
    navArr.forEach((nav, index) => {
        nav.classList.remove(`slide-out-${index}`);
        nav.classList.add(`slide-in-${index}`);
    })
}

function animateOut(){
    navArr.forEach((nav, index) => {
        nav.classList.remove(`slide-in-${index}`);
        nav.classList.add(`slide-out-${index}`);
    })
}

function animateOverlay(class1, class2) {
    overlay.classList.add(class1);
    overlay.classList.remove(class2);
}

function toggleNav(){
    menuBars.classList.toggle('change');
    overlay.classList.toggle('overlay-active');
    if (overlay.classList.contains('overlay-active')){
        animateOverlay('overlay-slide-right', 'overlay-slide-left');
        animateIn();

    }else {
        animateOverlay('overlay-slide-left', 'overlay-slide-right');
        animateOut();
    }
}


// event listeners
menuBars.addEventListener('click', toggleNav);

//nav
navArr.forEach((nav) => {
    nav.addEventListener('click', toggleNav);
})

