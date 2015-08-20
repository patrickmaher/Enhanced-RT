// ==UserScript==
// @name       Enhanced Rooster Teeth
// @version    0.0.1
// @description  Enhancments for the Rooster Teeth family of websites
// @include    http*://roosterteeth.com/*
// @include    http*://achievementhunter.com/*
// @include    http*://theknow.tv/*
// @include    http*://fun.haus/*
// @include    http*://redvsblue.com/*
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

*/
var hideWatched = 1;


// Hide Watched Videos
if(hideWatched == 1)
{
    var block = document.getElementsByClassName("episode-blocks");
    childLI = block[0].children;
    for ( i = 0; i < childLI.length; i++)
    {
        childLI[i].style.clear = "none";
        childLI[i].style.float = "none";
        childLI[i].style.display = "inline-block";
        childLI[i].style.verticalAlign = "top";
        childLI[i].style.marginRight = "1%";
    }

    var watched = document.getElementsByClassName("watched");
    for ( i = 0; i < watched.length; i++)
    {
        watched[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
    }
}

// Mark as Watched Button
//var notWatched = document.getElementsByName("_token");
var token;
var video;
//var replaceDiv;

var watchStatus = document.getElementsByClassName("watch-status-container");
for ( i = 0; i < watchStatus.length; i++)
{
    //alert(watchStatus[i].children[0].innerHTML);
    if(watchStatus[i].children[0].innerHTML != "Watched")
    {
        token = watchStatus[i].children[0].children[0].value;
        video = watchStatus[i].parentNode.parentNode.href;
        //alert(token);
        //alert(video);
        video = video.replace("http:", "https:");
        watchStatus[i].children[0].style.display = "inline-block";
        watchStatus[i].children[0].style.verticalAlign = "top";
        var myForm = "<form method=\"POST\" style=\"display: inline-block;\" action=\""+video+"/mark-watched\" accept-charset=\"UTF-8\" id=\"watch-20220\"><input name=\"_method\" type=\"hidden\" value=\"PUT\"><input name=\"_token\" type=\"hidden\" value=\""+token+"\"><i class=\"ion-eye\" style=\"font-size:35px;color:white;padding:0 5px;position: absolute; top: -3px; left: 0px;\"></i><input type=submit value=\" \" style=\"background-color: transparent;margin: -7px 0 0 0;display: inline-block;width: 40px;box-shadow: none !important;\" title=\"Mark as Watched\"></form>";
        watchStatus[i].innerHTML = myForm.concat(watchStatus[i].innerHTML);
        //watchStatus[i].innerHTML = "<form method=\"POST\" action=\""+video+"\"/mark-watched\" accept-charset=\"UTF-8\" id=\"watch-20220\"><input name=\"_method\" type=\"hidden\" value=\"PUT\"><input name=\"_token\" type=\"hidden\" value=\""+token+"\"><input type=submit value=Mark></form>";
    }
}

//alert(token);
//alert(video);
//alert(notWatched[0].parentNode.innerHTML);

//var replaceDiv = document.getElementsByClassName("watch-status-container");
//replaceDiv[0].innerHTML = "<form method=\"POST\" action=\""+video+"/mark-watched\" accept-charset=\"UTF-8\" id=\"watch-20220\"><input name=\"_method\" type=\"hidden\" value=\"PUT\"><input name=\"_token\" type=\"hidden\" value=\""+token+"\"><input type=submit value=Mark></form>"


//notWatched[0].parentNode.action = video+"/mark-watched";
//notWatched[0].parentNode.innerHTML = "<input name=\"_method\" type=\"hidden\" value=\"PUT\" readonly=\"\"><input name=\"_token\" type=\"hidden\" value=\""+token+"\"><button class=\"queue-button-remove\" type=\"submit\">Mark Watched</button>";
