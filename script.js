const themeSelector =
document.getElementById("theme-selector");

themeSelector.addEventListener("change", () => {

    document.body.className =
    themeSelector.value;

    localStorage.setItem(
        "theme",
        themeSelector.value
    );

});


const savedTheme =
localStorage.getItem("theme");

if(savedTheme){

    document.body.className =
    savedTheme;

    themeSelector.value =
    savedTheme;

}