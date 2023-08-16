const searchContainer = document.querySelector(".search-container")
const searchInput = document.querySelector(".search-input")
const searchBtn = document.querySelector(".search-btn")

let counter = 0

searchBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const value = searchInput.value

    console.log(value)

    if(counter < 1) {
        console.log("teset<1")
    }
    else {
        console.log("teset>1")
    }

    counter++
    searchInput.value = ""
});
