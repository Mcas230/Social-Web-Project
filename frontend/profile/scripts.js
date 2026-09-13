const modal = document.querySelector(".modal");
const posts = document.querySelector(".posts");

let postsLoaded = 0;
const postsPerLoad = 6;

function loadPosts() {

    for (let i = 0; i < postsPerLoad; i++) {

        posts.innerHTML += `
            <div class="post">
                <img src="warioman.png" alt="">
            </div>
        `;

    }

    postsLoaded += postsPerLoad;
}

window.addEventListener("scroll", () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        loadPosts();
    }

});

loadPosts();

const post = document.querySelector(".post");
const closeModal = document.querySelector(".closeModal");

post.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});