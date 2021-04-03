

const API_URL = 'https://type.fit/api/quotes';

let apiQuotes = []

let RAND_QUOTE = '';

const quote = document.getElementById('quote');
const author = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loaderDiv = document.querySelector('.loader');
const quoteContainer = document.querySelector('.quote-container');

// display new quote
const newQuote = () => {
    let randomNumber = Math.floor(Math.random() * apiQuotes.length);
    const randomQuote = apiQuotes[randomNumber];
    RAND_QUOTE = randomQuote;

    quote.textContent = randomQuote.text;
    author.textContent = randomQuote.author ? randomQuote.author : 'Unknown';

    if (randomQuote.text.length > 70){
        quote.classList.add('long-quote');
    }else {
        quote.classList.remove('long-quote');
    }
}


//get quotes from api
const getQuotes = async () => {

    try{
        const response = await fetch(API_URL);
        apiQuotes = await response.json();

        if (apiQuotes.length > 0){
            loaderDiv.style.display = 'none';
            quoteContainer.classList.remove('none');
        }
        newQuote();

    }catch (err){
        console.log(err);
    }
}


// tweet
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${RAND_QUOTE.text} - ${RAND_QUOTE.author}`;
    window.open(twitterUrl, '_blank');
}


newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();