const northamericabutton = document.querySelector('#northamericabutton');
const northamericamenu = document.querySelector('#northamericamenu');

northamericabutton.addEventListener('click', () => {
    if (northamericamenu.style.display === 'none') {
        northamericamenu.style.display = 'block';
    } else {
        northamericamenu.style.display = 'none';
    }
});
document.addEventListener('click', function(e) {
    var northamericamenu = document.querySelector('#northamericamenu');
    var northamericabutton = document.querySelector('#northamericabutton');
    if (northamericamenu !== e.target && !northamericamenu.contains(e.target) && northamericabutton !== e.target) {
        northamericamenu.style.display = 'none';
    }
});


const europebutton = document.querySelector('#europebutton');
const europemenu = document.querySelector('#europemenu');

europebutton.addEventListener('click', () => {
    if (europemenu.style.display === 'none') {
        europemenu.style.display = 'block';
    } else {
        europemenu.style.display = 'none';
    }
});
document.addEventListener('click', function(e) {
    var europemenu = document.querySelector('#europemenu');
    var europebutton = document.querySelector('#europebutton');
    if (europemenu !== e.target && !europemenu.contains(e.target) && europebutton !== e.target) {
        europemenu.style.display = 'none';
    }
});


const southamericabutton = document.querySelector('#southamericabutton');
const southamericamenu = document.querySelector('#southamericamenu');

southamericabutton.addEventListener('click', () => {
    if (southamericamenu.style.display === 'none') {
        southamericamenu.style.display = 'block';
    } else {
        southamericamenu.style.display = 'none';
    }
});
document.addEventListener('click', function(e) {
    var southamericamenu = document.querySelector('#southamericamenu');
    var southamericabutton = document.querySelector('#southamericabutton');
    if (southamericamenu !== e.target && !southamericamenu.contains(e.target) && southamericabutton !== e.target) {
        southamericamenu.style.display = 'none';
    }
});

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