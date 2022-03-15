window.addEventListener('DOMContentLoaded', (event) => {

    let PAGE_SIZE = 15;
    let PAGE_NUMBER = 0;
    const API_URL = `https://api.instantwebtools.net/v1/passenger?page=${PAGE_NUMBER}&size=${PAGE_SIZE}`;

    const listContainer = document.getElementById('list-container');
    let load = true;
    listContainer.addEventListener('scroll', handleScroll);
    fetchTestimonials();

    function fetchTestimonials() {
        load = false;
        fetch(API_URL).then(response => response.json()).then(results => {
            if (results) {
                load = true;
                createFragmentList(results?.data)
            }
        });
    }

    function createFragmentList(results) {
        const fragment = document.createDocumentFragment();
        results.forEach((item) => {
            fragment.appendChild(renderItem(item));
        })
        listContainer.appendChild(fragment);
    }


    function renderItem(item) {
        const elem = document.createElement('div');
        elem.classList.add('item');
        elem.textContent = item?.name
        return elem;
    }

    function handleScroll() {
        const bottomSpaceLeft = (this.scrollHeight - this.scrollTop - this.clientHeight);
        if (load && bottomSpaceLeft < 5) {
            PAGE_NUMBER++;
            fetchTestimonials();
        }

    }
});