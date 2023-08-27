const accessKey = "v9ZBV_92zlGwcK49wSvIXArhuas-yzwZeQBVkC7W0g0";

const formEl = document.querySelector("form");
const inpuEl = document.getElementById("search-input");
const searchResults = document.querySelector(".tab_1");
const showMore = document.getElementById("show-more");

let inputData = "";
let page = "1";

async function searchImages() {
    inputData = inpuEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results

    if (page === 1) {
        searchResults.innerHTML = ""
    }
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("image_1");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = result.alt_description;


        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
       

    });
    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}
formEl.addEventListener("submit", (event) => {
    event.preventDefault()
    page = 1;
    searchImages();
})
showMore.addEventListener("click", () => {

    searchImages();
}) 