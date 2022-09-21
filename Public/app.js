let Mynewurl = document.getElementById("short-link");
function fetchUrls() {
  Mynewurl.innerHTML = "";
  let links = localStorage.getItem("data");
  let linkObject = JSON.parse(links) || [];
  linkObject.forEach(link => {
    let Urlcontainer = `
  <div class="row" style="margin: 8px;">
    <div class="col-sm-3" style="background-color: white;"><p class="second">${link.originalURL}</p></div>
    <div class="col-sm-3" style="background-color: white;"></div>
    <div class="col-sm-2" style="background-color: white;"></div>
    <div class="col-sm-4" style="background-color: white;"><p id="copy_link" class="second1">${link.shortURL}</p><button class="Copy">Copy</button></div>
  </div>
          `;
    Mynewurl.innerHTML += Urlcontainer;
  });
}

fetchUrls();

// listen for a submit event on the form
document.getElementById("url").addEventListener("submit", async e => {
  // prevent the form from getting submitted
  e.preventDefault();

  // submit form using fetch
  let x = { text: document.getElementById("text").value };
  console.log(x);
  let response = await fetch("/submit", {
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(x)
  });

  let data = await response.json();
  //   retrieve data from localstorage
  let urls = JSON.parse(localStorage.getItem("data")) || [];

  // update urls with server's data
  urls.push(data);
  //   store data in local storage.
  localStorage.setItem("data", JSON.stringify(urls));
  console.log(urls);
  fetchUrls();
});

var copyText = document.getElementById("copy_link");
// function myCopy() {}
let Linkcontainer = document.getElementById("url-shortener");

Linkcontainer.addEventListener("click", e => {
  if (e.target.classList.contains("Copy")) {
    console.log(e.target);
    navigator.clipboard.writeText(e.target.previousElementSibling.textContent).then(()=>{
      console.log("Successful")
    },
    ()=>{
      console.log("error")
    })
  }
  e.target.textContent = "Copied"
});



// fetchUrls();