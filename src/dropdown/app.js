window.addEventListener('DOMContentLoaded', (event) => {
    let dropdown = document.querySelector('div#css-dropdown');
    dropdown.classList.add('hide');

    let button = document.querySelector('button#css-btn');
    button.addEventListener('click', (event) => {
        if (event?.srcElement?.ariaExpanded === 'false') {
            dropdown.classList.remove('hide');
            dropdown.classList.add('show');
            button.setAttribute('aria-expanded', true);
        } else {
            dropdown.classList.remove('show');
            dropdown.classList.add('hide');
            button.setAttribute('aria-expanded', false);
        }
    })
})