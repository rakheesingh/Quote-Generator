let apiQuotes = [];
let randomQuote;
const quoteContainer = document.querySelector("#quote-container");
const quoteText = quoteContainer.querySelector("#quote");
const quoteAuthor = quoteContainer.querySelector("#quote-author");
const nextQuoteClick = document.querySelector("#next-quote");
const tweetQuote = document.querySelector("#twitter");
const loader = document.querySelector("#loader");

function newQuote() {
  let len = apiQuotes.length;
  let randomNumber = Math.floor(Math.random() * (len - 1));
  randomQuote = apiQuotes[randomNumber];
  if (randomQuote.text.length > 100) quoteText.classList.add("long-quote");
  else quoteText.classList.remove("long-quote");
  quoteText.textContent = randomQuote.text;
  quoteAuthor.textContent = randomQuote.author ? randomQuote.author : "Unknown";
}

function loading()
{
    loader.hidden=false;
    quoteContainer.hidden=true;
}

function complete()
{
    loader.hidden=true;
    quoteContainer.hidden=false;
}

// Get Quotes from API
async function getQuotes() {
  const apiURL = "https://type.fit/api/quotes";
  loading();
  try {
    let response = await fetch(apiURL);
    apiQuotes = await response.json();
    loader.classList.remove('loader');
    newQuote();
  } catch (error) {
    console.log(error);
  }
  complete();
}

function tweetQuoteFunc() {
  let twitterUrl = `https://twitter.com/intent/tweet?text=${randomQuote.text} - ${randomQuote.author}`;
  window.open(twitterUrl,'_blank');
}
//Event Listner
tweetQuote.addEventListener('click', tweetQuoteFunc);
nextQuoteClick.addEventListener('click', newQuote);

//On Load
getQuotes();
