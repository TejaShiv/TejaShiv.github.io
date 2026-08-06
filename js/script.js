window.addEventListener("load", function() {

    var menuBtn = document.getElementById("menu-btn");
    var nav = document.querySelector("nav");
    var node = document.getElementById("profPic");
    var navContainer = document.getElementById("navContainer");

    menuBtn.addEventListener("click", function (e) {
        if (window.innerWidth<1024) {
            node.classList.toggle("hide");
            node.classList.toggle("profile-picture");
            nav.classList.toggle("show");
            navContainer.classList.toggle("nav-expand");

        }
    });


    nav.addEventListener("click", function (e) {

       if (window.innerWidth<1024) {  
            node.classList.toggle("hide");
            node.classList.toggle("profile-picture");
            nav.classList.toggle("show");
            navContainer.classList.toggle("nav-expand");
        }

    });
});


