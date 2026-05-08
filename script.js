const display = document.querySelector(".display-quotes"); 
const btn = document.querySelector(".search-btn");
const userInput = document.querySelector(".search");

btn.addEventListener("click", handleSearch)

async function handleSearch(){
  display.innerHTML = ""; //empty the space for new quotes 

  const input = userInput.value;

  if (input === ""){
    display.innerHTML = "Enter author first"; 
    return;
  }

  const quotes = await fetchQuotes();

  const matchedQuotes = quotes.filter(q => q.author && q.author.toLowerCase().includes(input.toLowerCase()));

  if(matchedQuotes.length === 0){
    display.innerHTML = "Author quote does not exist";
    return;
  }

  showOnUi(matchedQuotes);
}

async function fetchQuotes(){
const res = await fetch('https://api.freeapi.app/api/v1/public/quotes')
const data = await res.json();
return data?.data?.data || []; 
}

function showOnUi(quotes){
  const html = quotes.map(q => `<div class = "quote-card"> <p>${q.content}</p> <h4>${ q.author}</h4> </div>`).join("");
  display.innerHTML = html
};