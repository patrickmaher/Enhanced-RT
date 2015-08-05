// ==UserScript==
// @name       Enhanced Rooster Teeth
// @version    0.0.1
// @description  Enhancments for the Rooster Teeth family of websites
// @include    http://roosterteeth.com/*
// @include    http://achievementhunter.com/*
// @include    http://theknow.tv/*
// @include    http://fun.haus/*
// @include    http://redvsblue.com/*
// ==/UserScript==


/*
Features
========
Hide watched videos.


Planned Features
================
Button to mark videos as watched.
Filter videos on Recently Added page by:
    Website: Rooster Teeth, The Know, Achievement Hunter, and Funhaus.
    Sponsor Content.
    Video Length.
    Date Uploaded.
Previous/Next button for navigation of Recently Added page.
Endless scrolling of videos on Recently Added page.
Enhanced Rooster Teeth menu with toggles: hide watched videos, filter settings, endless scrolling, pages that filters are active on, completely disable all features.


Possible Future Features
========================
Endless scrolling of news on the homepage for Rooster Teeth, The Know, Achievement Hunter, and Funhaus.
Endless scrolling of forums.
Mouse over users for more info card.
Profile cover photo tester.

To be fixed
===========
Filtered videos leave a blank space.
*/

var watched = document.getElementsByClassName("watched");
for ( i = 0; i < watched.length; i++) {
    watched[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
}

var notWatched = document.getElementsByName("_token");
//alert(notWatched[0].parentNode.innerHTML);
notWatched[0].parentNode.action = "http://roosterteeth.com/episode/red-vs-blue-season-2-episode-30/mark-watched";
notWatched[0].parentNode.innerHTML = "<input name=\"_method\" type=\"hidden\" value=\"PUT\" readonly=\"\"><input name=\"_token\" type=\"hidden\" value=\"s0y6AvoXPJDM9n6Glfdzwc8rid0nzjC2vNkedk8c\"><button class=\"queue-button-remove\" type=\"submit\">Mark Watched</button>";
