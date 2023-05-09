var storedFontSize = localStorage.getItem("fontSize");

if (storedFontSize) {
    document.body.style.fontSize = storedFontSize + "px";
}

const buttons = document.getElementsByTagName("button");
const nav = document.querySelector("nav");

if (localStorage.getItem("color")) {
    const savedColor = localStorage.getItem("color");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = savedColor;
    }
    nav.style.backgroundColor = savedColor;
}