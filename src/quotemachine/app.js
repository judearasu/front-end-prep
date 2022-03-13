window.addEventListener('DOMContentLoaded', (event) => {

    const URL = "https://type.fit/api/quotes";
    let __QUOTES_LIST = [];

    let cache = new Map();

    const colors = [
        '#16a085',
        '#27ae60',
        '#2c3e50',
        '#f39c12',
        '#e74c3c',
        '#9b59b6',
        '#FB6964',
        '#342224',
        '#472E32',
        '#BDBB99',
        '#77B1A9',
        '#73A857'
    ];

    let loadCached = (url) => {
        if (cache.has(url)) {
            return Promise.resolve(cache.get(url)); // (*)
        }

        return fetch(url)
            .then(response => response.json())
            .then(response => {
                cache.set(url, response);
                return response;
            });
    }

    loadCached(URL).then((response) => {
        __QUOTES_LIST = response;
        if (!document.getElementById('quote').innerHTML) {
            getQuote();
            render();
        }
    })

    getRandomQuote = () => {
        return __QUOTES_LIST[
            Math.floor(Math.random() * __QUOTES_LIST.length)
        ];
    }

    getQuote = () => {
        let randomQuote = getRandomQuote();
        return randomQuote;
    }

    const getQuoteBtn = document.querySelector('button.btn');
    getQuoteBtn.addEventListener('click', (event) => {
        if (event) {
            render();
        }
    })

    render = () => {
        const rand = Math.floor(Math.random() * colors.length);
        document.getElementById('quote').innerHTML = getQuote().text;
        document.getElementById('author').innerHTML = `Author - ${getQuote().author}`;
        document.querySelector('body').style.backgroundColor = colors[rand];
    }
});