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
Hide comments marked as flamebait

To be fixed
===========

*/


if(window.location.href.search("roosterteeth.com/") > 0) // Rooster Teeth
{
    current_site = "RT";
    //alert("Rooster Teeth");
    // favicon
    //var favIcon = "";
}
else if(window.location.href.search("fun.haus/") > 0) // Funhaus
{
    current_site = "FH";
    //alert("Funhaus");
    // favicon
    var favIcon = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABSlBMVEUAAAABAAECAQA3GgYrEgkXCwIUCgIVCgIZDAQcDgMVCgIEAgEDAQADAQADAQEEAgIKBQEDAgACAQAFAgECAQAAAAAAAAEIBAABAAACAQADAQABAAAAAAABAAABAAABAQABAQIHBAADAgAJBQIDAgEAAAAAAAADAQEIBAEHAwEGAwEIBAMGAwEBAAAGAwEJBQECAQEAAAADAgEFAwAHBAEMBgMGAwEEAgEAAAABAAAHAwACAQAGAwIBAAAAAAADAgEGAwAIBAEGAwEFAgEBAAAJBAIDAgEAAAADAQEJBQEYEQMWCwIIBAEFAwEBAAAGAwEHAwIDAQABAAACAQAVCwEIBgACAQABAQEBAQATCwAHBgABAQAAAAAFAgECAQADAQADAQAEAgAXDAELBwIDAgADAQADAQEcDgIaDQEcDgIbDgIbDgIAAAD///+/K5A+AAAAbHRSTlMAAAAAAAkKCgMCCarCwb44KLjCqOH7SjXz3szx/u3o5EM1yh9r/PNSICUnCDj9bh5Q94dnQAROjPj8U58LwvZ+XDtEgfcmcfRZGwEBG1v1dCfR9KUEA6PUsgQDr+SiuLe6gAMCfrikBQYEBAbomQOXAAAAAWJLR0RtuwYArQAAAAd0SU1FB+ACHQEvODn/h8QAAAC6SURBVBjTY2BAB6xsEMDOwckFpFgZuHl4wYCPX0CQl1dImEEkBwJExcQlgJQkg5R0To6MrJycvIIiUEBaiUFZRTVHTV1DU0tbRyJHV0+fgdFANMfQyNjE1MzcIsfSigksAATWNrZAEqeAnb2Do6mTswtYwNVNNcfdw9PL28fXL0fXP4AhMAhorV9wSGiYn0xOjl841GERkVHRYEYMQ2xcfHx8QmJSckoCkJGaxpCeAQKZzCxZYEY2hu8B+5s3RDPiTSQAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDItMjlUMDE6NDc6NTYrMDE6MDBpZHDiAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTAyLTI5VDAxOjQ3OjU2KzAxOjAwGDnIXgAAAFd6VFh0UmF3IHByb2ZpbGUgdHlwZSBpcHRjAAB4nOPyDAhxVigoyk/LzEnlUgADIwsuYwsTIxNLkxQDEyBEgDTDZAMjs1Qgy9jUyMTMxBzEB8uASKBKLgDqFxF08kI1lQAAAABJRU5ErkJggg==";
}
else if(window.location.href.search("achievementhunter.com/") > 0) // Achievement Hunter
{
    current_site = "AH";
    //alert("Achievement Hunter");
    // favicon
    //var favIcon = "";
}
else if(window.location.href.search("theknow.tv/") > 0) // The Know
{
    current_site = "TK";
    //alert("The Know");
    // favicon
    //var favIcon = "";
}
else if(window.location.href.search("screwattack.com/") > 0) // ScrewAttack
{
    current_site = "SA";
    //alert("ScrewAttack");
    // favicon
    //var favIcon = "";
}
//alert(current_site);

if(current_site != "RT")
{
    var docHead = document.getElementsByTagName('head')[0];       
    var newLink = document.createElement('link');
    newLink.rel = 'icon';
    newLink.href = 'data:image/png;base64,'+favIcon;
    docHead.appendChild(newLink);
}



var hideWatched = 1;
var ahToken = "oDchKTzfaEjo0Wc5IVL2vhrBcJ5gPF2jdA6zky07";
knowToken = "WktPIzoPbcZCjQLzC2DjkmZFkI9yHvchd6B4ubg6";
hausToken = "5MyZST5f139tI4wankbRGTqXj7AwGLWy6L3BIrdc";

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
        watched[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
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
        video = watchStatus[i].parentNode.parentNode.parentNode.href;
        //alert(token);
        //alert(video);
        //video = video.replace("http:", "https:");
        if(video.search("episode/(lets-play|ahwu|things-to-do-in|play-pals|achievement-unlocked|behind-the-scenes|achievement-hunter|fails-of-the-weak)") > 0){
            video = video.replace("roosterteeth.com", "achievementhunter.com");
            token = ahToken;
        }
        if(video.search("episode/(the-know|the-patch|in-review)") > 0){
            video = video.replace("roosterteeth.com", "theknow.tv");
            token = knowToken;
        }
        if(video.search("episode/(gameplay|dude-soup|fan-show|funhaus)") > 0){
            video = video.replace("roosterteeth.com", "fun.haus");
            token = hausToken;
        }

        watchStatus[i].children[0].style.display = "inline-block";
        watchStatus[i].children[0].style.verticalAlign = "top";
        // old watch button code: var myForm = "<form method=\"POST\" style=\"display: inline-block;\" action=\""+video+"/mark-watched\" accept-charset=\"UTF-8\" id=\"watch-20220\"><input name=\"_method\" type=\"hidden\" value=\"PUT\"><input name=\"_token\" type=\"hidden\" value=\""+token+"\"><i class=\"ion-eye\" style=\"font-size:35px;color:white;padding:0 5px;position: absolute; top: -3px; left: 0px;\"></i><input type=submit value=\" \" style=\"background-color: transparent;margin: -7px 0 0 0;display: inline-block;width: 40px;box-shadow: none !important;\" title=\"Mark as Watched\"></form>";
        
        var myForm = "<form method=\"POST\" style=\"display: inline-block;\" action=\""+video+"/mark-watched\" accept-charset=\"UTF-8\" id=\"watch-20220\"><input name=\"_method\" type=\"hidden\" value=\"PUT\"><input name=\"_token\" type=\"hidden\" value=\""+token+"\"><i class=\"ion-eye\"></i><input type=submit value=\" \" title=\"Mark as Watched\"></form>";
        

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
