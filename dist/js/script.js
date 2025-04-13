const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    overlay = document.querySelector('.menu__overlay'),
    closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

function closeMenu(elem = menu) {
    if (elem === menu) {
        elem.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    } else if (elem === overlay) {
        elem.addEventListener('click', (e) => {
            if (e.target === overlay) {
                menu.classList.remove('active');
            }
        });
    }
}
closeMenu();

const percents = document.querySelectorAll('.skills__ratings-counter'),
    lines = document.querySelectorAll('.skills__ratings-line span');

percents.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;  
}); 