(function () {
  let endPoint;

  function onChange() {
    const searchTerm = this.value;
    endPoint = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4e258a4396bf5ba0448b2e2fe574034e&per_page=100&format=json&text=${searchTerm}&nojsoncallback=1&extras=tags,views`;
  }

  async function onSubmit() {
    clearInputField();
    const images = await getImages();
    let { photo } = images.photos;
    render(photo);
  }

  function clearInputField() {
    searchInput.value = "";
  }

  async function getImages() {
    const response = await fetch(endPoint);
    const data = await response.json();
    return data;
  }

  function render(photo) {
    const html =
      photo &&
      photo
        .map((el) => {
          let { secret, server, id, views } = el;
          return `
            <div class="photo"> 
                <img src=${`https://live.staticflickr.com/${server}/${id}_${secret}_q.jpg`}/>
                <div class="centered">${views}</div>
          </div>
        `;
        })
        .join("");
    imageContainer.innerHTML = html;
  }

  const searchBtn = document.querySelector(".submit");
  const searchInput = document.querySelector(".search");

  const imageContainer = document.querySelector(
    ".application-container-squares"
  );

  searchBtn.addEventListener("click", onSubmit);
  searchInput.addEventListener("input", onChange);
})();
