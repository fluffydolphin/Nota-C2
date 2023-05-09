const appearncebutton = document.getElementById("appearncebutton");
const notificationsbutton = document.getElementById("notificationsbutton");
const languagebutton = document.getElementById("languagebutton");
const appearncesettings = document.getElementById("appearncesettings");
const notificationssettings = document.getElementById("notificationssettings");
const languagesettings = document.getElementById("languagesettings");

appearncebutton.addEventListener("click", () => {
    appearncesettings.style.display = "block";
    notificationssettings.style.display = "none";
    languagesettings.style.display = "none";
});

notificationsbutton.addEventListener("click", () => {
    notificationssettings.style.display = "block";
    appearncesettings.style.display = "none";
    languagesettings.style.display = "none";
});


languagebutton.addEventListener("click", () => {
    languagesettings.style.display = "block";
    appearncesettings.style.display = "none";
    notificationssettings.style.display = "none";
});

var fontSizeSlider = document.getElementById("font-size-slider");
var storedFontSize = localStorage.getItem("fontSize");
var percentLabel = document.getElementById("font-size-percent");

if (storedFontSize) {
    document.body.style.fontSize = storedFontSize + "px";
    fontSizeSlider.value = storedFontSize;
    if (storedFontSize == "12") {
        percentLabel.innerHTML = "0%";
    }
    if (storedFontSize == "13") {
        percentLabel.innerHTML = "8%";
    }
    if (storedFontSize == "14") {
        percentLabel.innerHTML = "17%";
    }
    if (storedFontSize == "15") {
        percentLabel.innerHTML = "25%";
    }
    if (storedFontSize == "16") {
        percentLabel.innerHTML = "33%";
    }
    if (storedFontSize == "17") {
        percentLabel.innerHTML = "42%";
    }
    if (storedFontSize == "18") {
        percentLabel.innerHTML = "50%";
    }
    if (storedFontSize == "19") {
        percentLabel.innerHTML = "58%";
    }
    if (storedFontSize == "20") {
        percentLabel.innerHTML = "67%";
    }
    if (storedFontSize == "21") {
        percentLabel.innerHTML = "75%";
    }
    if (storedFontSize == "22") {
        percentLabel.innerHTML = "83%";
    }
    if (storedFontSize == "23") {
        percentLabel.innerHTML = "92%";
    }
    if (storedFontSize == "24") {
        percentLabel.innerHTML = "100%";
    }
}

fontSizeSlider.addEventListener("input", function() {
    var fontSize = this.value;
    localStorage.setItem("fontSize", fontSize);
    document.body.style.fontSize = fontSize + "px";
    var percentValue = (fontSize - this.min) / (this.max - this.min) * 100;
    percentLabel.innerHTML = percentValue.toFixed(0) + "%";
});

const colorPicker = document.getElementById("colorPicker");
const buttons = document.getElementsByTagName("button");
const nav = document.querySelector("nav");

if (localStorage.getItem("color")) {
    const savedColor = localStorage.getItem("color");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = savedColor;
    }
    nav.style.backgroundColor = savedColor;
    colorPicker.value = savedColor;
}

colorPicker.addEventListener("input", function() {
    const newColor = colorPicker.value;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = newColor;
    }
    nav.style.backgroundColor = newColor;

    localStorage.setItem("color", newColor);
});

const parentToggle = document.querySelector('.parent-toggle');
const childToggles = document.querySelectorAll('.child-toggle');
const childTogglesstyle = document.querySelectorAll('.toggle-slider');
const sConnected = document.querySelector('#sConnected');
const sDisconnected = document.querySelector('#sDisconnected');

parentToggle.addEventListener('change', (event) => {
    if (event.target.checked) {
        childToggles.forEach((toggle) => {
            toggle.disabled = true;
        });
        childTogglesstyle.forEach((toggle) => {
            toggle.style.opacity = 0.5;
            toggle.style.cursor = 'default';
        });
        const parentToggle = document.querySelector('.parent-toggle');
        parentToggle.click();
        localStorage.setItem("notistate", "1");
    } else {
        childToggles.forEach((toggle) => {
            toggle.disabled = false;
        });
        childTogglesstyle.forEach((toggle) => {
            toggle.style.opacity = 1;
            toggle.style.cursor = 'pointer';
        });
        localStorage.setItem("notistate", "0");
    }
});


if (localStorage.getItem("sConnected")) {
    const savednotistate = localStorage.getItem("sConnected");
    if (savednotistate == "1") {
        sConnected.click();
        localStorage.setItem("sConnected", "1");
    } else {
        localStorage.setItem("sConnected", "0");
    }
}

if (localStorage.getItem("sDisconnected")) {
    const savednotistate = localStorage.getItem("sDisconnected");
    if (savednotistate == "1") {
        sDisconnected.click();
        localStorage.setItem("sDisconnected", "1");
    } else {
        localStorage.setItem("sDisconnected", "0");
    }
}


if (localStorage.getItem("notistate")) {
    const savednotistate = localStorage.getItem("notistate");
    if (savednotistate == "1") {
        childToggles.forEach((toggle) => {
            toggle.disabled = true;
        });
        childTogglesstyle.forEach((toggle) => {
            toggle.style.opacity = 0.5;
            toggle.style.cursor = 'default';
        });
        const parentToggle = document.querySelector('.parent-toggle');
        parentToggle.click();
        localStorage.setItem("notistate", "1");
    } else {
        childToggles.forEach((toggle) => {
            toggle.disabled = false;
        });
        childTogglesstyle.forEach((toggle) => {
            toggle.style.opacity = 1;
            toggle.style.cursor = 'pointer';
        });
        localStorage.setItem("notistate", "0");
    }
}

sConnected.addEventListener('change', (event) => {
    if (event.target.checked) {
        localStorage.setItem("sConnected", "1");
    } else {
        localStorage.setItem("sConnected", "0");
    }
});

sDisconnected.addEventListener('change', (event) => {
    if (event.target.checked) {
        localStorage.setItem("sDisconnected", "1");
    } else {
        localStorage.setItem("sDisconnected", "0");
    }
});