console.log("JavaScript funcionando");

const heart = document.querySelector(".fa-heart");

console.log(heart);

heart.addEventListener("click", function () {
    console.log("Hiciste click");
});
heart.addEventListener("click", function () {
    heart.classList.toggle("liked");
});