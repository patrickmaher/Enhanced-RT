// ==UserScript==
// @name       Enhanced RT
// @version    0.0.3
// @description  Enhancments for the Rooster Teeth family of websites
// @include    http*://roosterteeth.com/*
// @include    http*://achievementhunter.com/*
// @include    http*://theknow.tv/*
// @include    http*://fun.haus/*
// @include    http*://screwattack.com/*
// @run-at document-end
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
Endless scrolling of videos on Recently Added page.
Enhanced Rooster Teeth menu with toggles: hide watched videos, filter settings, endless scrolling, pages that filters are active on, completely disable all features.


Possible Future Features
========================
Endless scrolling of news on the homepage for Rooster Teeth, The Know, Achievement Hunter, Funhaus, and ScrewAttack.
Endless scrolling of forums.
Mouse over users for more info card.
Profile cover photo tester.
Hide comments marked as flamebait

To be fixed
===========

*/

// Load Settings
var hideWatched = 0;
var hideRT = 1;
var hideAH = 2;
var hideFH = 3;
var hideSA = 4;
var hideTK = 5;
hideValue = 0;
hideText = 1;
hideName = 3;


function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

var hide = createArray(6, 3);
hide[hideWatched][hideValue] = ((localStorage.getItem("hideWatched") == null) ? 0 : localStorage.getItem("hideWatched"));
hide[hideWatched][hideText] = "hideWatched";
hide[hideWatched][hideName] = "Watched";
hide[hideRT][hideValue] = ((localStorage.getItem("hideRT") == null) ? 0 : localStorage.getItem("hideRT"));
hide[hideRT][hideText] = "hideRT";
hide[hideRT][hideName] = "Rooster Teeth";
hide[hideAH][hideValue] = ((localStorage.getItem("hideAH") == null) ? 0 : localStorage.getItem("hideAH"));
hide[hideAH][hideText] = "hideAH";
hide[hideAH][hideName] = "Achievement Hunter";
hide[hideFH][hideValue] = ((localStorage.getItem("hideFH") == null) ? 0 : localStorage.getItem("hideFH"));
hide[hideFH][hideText] = "hideFH";
hide[hideFH][hideName] = "Funhaus";
hide[hideSA][hideValue] = ((localStorage.getItem("hideSA") == null) ? 0 : localStorage.getItem("hideSA"));
hide[hideSA][hideText] = "hideSA";
hide[hideSA][hideName] = "ScrewAttack";
hide[hideTK][hideValue] = ((localStorage.getItem("hideTK") == null) ? 0 : localStorage.getItem("hideTK"));
hide[hideTK][hideText] = "hideTK";
hide[hideTK][hideName] = "The Know";


// Detect Domain
if(window.location.href.search("roosterteeth.com/") > 0) // Rooster Teeth
{
    currentSite = "RT";
    currentSiteDomain = "roosterteeth.com";

    // favicon
    //var favIcon = "";
}
else if(window.location.href.search("fun.haus/") > 0) // Funhaus
{
    currentSite = "FH";
    currentSiteDomain = "fun.haus";

    // favicon
    var favIcon = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABSlBMVEUAAAABAAECAQA3GgYrEgkXCwIUCgIVCgIZDAQcDgMVCgIEAgEDAQADAQADAQEEAgIKBQEDAgACAQAFAgECAQAAAAAAAAEIBAABAAACAQADAQABAAAAAAABAAABAAABAQABAQIHBAADAgAJBQIDAgEAAAAAAAADAQEIBAEHAwEGAwEIBAMGAwEBAAAGAwEJBQECAQEAAAADAgEFAwAHBAEMBgMGAwEEAgEAAAABAAAHAwACAQAGAwIBAAAAAAADAgEGAwAIBAEGAwEFAgEBAAAJBAIDAgEAAAADAQEJBQEYEQMWCwIIBAEFAwEBAAAGAwEHAwIDAQABAAACAQAVCwEIBgACAQABAQEBAQATCwAHBgABAQAAAAAFAgECAQADAQADAQAEAgAXDAELBwIDAgADAQADAQEcDgIaDQEcDgIbDgIbDgIAAAD///+/K5A+AAAAbHRSTlMAAAAAAAkKCgMCCarCwb44KLjCqOH7SjXz3szx/u3o5EM1yh9r/PNSICUnCDj9bh5Q94dnQAROjPj8U58LwvZ+XDtEgfcmcfRZGwEBG1v1dCfR9KUEA6PUsgQDr+SiuLe6gAMCfrikBQYEBAbomQOXAAAAAWJLR0RtuwYArQAAAAd0SU1FB+ACHQEvODn/h8QAAAC6SURBVBjTY2BAB6xsEMDOwckFpFgZuHl4wYCPX0CQl1dImEEkBwJExcQlgJQkg5R0To6MrJycvIIiUEBaiUFZRTVHTV1DU0tbRyJHV0+fgdFANMfQyNjE1MzcIsfSigksAATWNrZAEqeAnb2Do6mTswtYwNVNNcfdw9PL28fXL0fXP4AhMAhorV9wSGiYn0xOjl841GERkVHRYEYMQ2xcfHx8QmJSckoCkJGaxpCeAQKZzCxZYEY2hu8B+5s3RDPiTSQAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDItMjlUMDE6NDc6NTYrMDE6MDBpZHDiAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTAyLTI5VDAxOjQ3OjU2KzAxOjAwGDnIXgAAAFd6VFh0UmF3IHByb2ZpbGUgdHlwZSBpcHRjAAB4nOPyDAhxVigoyk/LzEnlUgADIwsuYwsTIxNLkxQDEyBEgDTDZAMjs1Qgy9jUyMTMxBzEB8uASKBKLgDqFxF08kI1lQAAAABJRU5ErkJggg==";
}
else if(window.location.href.search("achievementhunter.com/") > 0) // Achievement Hunter
{
    currentSite = "AH";
    currentSiteDomain = "achievementhunter.com";

    // favicon
    //var favIcon = "";
}
else if(window.location.href.search("theknow.tv/") > 0) // The Know
{
    currentSite = "TK";
    currentSiteDomain = "theknow.tv";

    // favicon
    //var favIcon = "";
}

else if(window.location.href.search("screwattack.com/") > 0) // ScrewAttack
{
    currentSite = "SA";
    currentSiteDomain = "screwattack.com";

    // favicon
    //var favIcon = "";
}

//alert(currentSite);

// Change favicon
if(currentSite != "RT")
{
	var docHead = document.getElementsByTagName('head')[0];       
	var newLink = document.createElement('link');
	newLink.rel = 'icon';
	newLink.href = 'data:image/png;base64,'+favIcon;
	docHead.appendChild(newLink);
}

// Settings Link in Profile Menu
var settingsLink = document.getElementById("profile-menu");
if(settingsLink != null)
{
	var settingsLinkHTML = "<li><a href=\"http://" + currentSiteDomain + "/EnhancedRT/settings\">Enhanced RT</a></li>";
	settingsLink.children[0].children[3].outerHTML = settingsLink.children[0].children[3].outerHTML.concat(settingsLinkHTML);
}


// Settings Page
if(window.location.pathname=="/EnhancedRT/settings")
{
    var settings = document.getElementById("body-block");
	var settingsHTML = "<center>Enhanced RT Settings<br>Filters - ";
	for ( i = 0; i < hide.length; i++)
	{
		settingsHTML = settingsHTML.concat("<label style=\"color:#666;font-size:12px;\"><input style=\"margin:0 0 0 1em;\" type=checkbox id="+hide[i][hideText]+" "+((hide[i][hideValue] == 0) ? "checked" : "")+">"+hide[i][hideName]+"</label>");
	}
	settingsHTML = settingsHTML.concat("</center>");
	settings.innerHTML = settingsHTML;
	
	for ( i = 0; i < hide.length; i++)
	{
		document.getElementById( hide[i][hideText] ).onclick = function () {
			if(hide[eval(event.target.id)][hideValue] == 1)
			{
				hide[eval(event.target.id)][hideValue] = 0;
				localStorage.setItem(hide[eval(event.target.id)][hideText], hide[eval(event.target.id)][hideValue]);
			}
			else
			{
				hide[eval(event.target.id)][hideValue] = 1;
				localStorage.setItem(hide[eval(event.target.id)][hideText], hide[eval(event.target.id)][hideValue]);
			}
		};
	}
}
// Recently Added Page
if(window.location.pathname=="/episode/recently-added")
{

	var filters = document.getElementsByClassName("episode-blocks");
	//alert(filters[0].parentNode.children[1].outerHTML);
	
	var filtersHTML = "<center>Enhanced RT Filters<br>";
	for ( i = 0; i < hide.length; i++)
	{
		filtersHTML = filtersHTML.concat("<label style=\"color:#666;font-size:12px;\"><input style=\"margin:0 0 0 1em;\" type=checkbox id="+hide[i][hideText]+" "+((hide[i][hideValue] == 0) ? "checked" : "")+">"+hide[i][hideName]+"</label>");
	}
	filtersHTML = filtersHTML.concat("</center>");
	filters[0].parentNode.children[1].outerHTML = filtersHTML.concat(filters[0].parentNode.children[1].outerHTML);

	for ( i = 0; i < hide.length; i++)
	{
		document.getElementById( hide[i][hideText] ).onclick = function () {
			if(hide[eval(event.target.id)][hideValue] == 1)
			{
				hide[eval(event.target.id)][hideValue] = 0;
				localStorage.setItem(hide[eval(event.target.id)][hideText], hide[eval(event.target.id)][hideValue]);
			}
			else
			{
				hide[eval(event.target.id)][hideValue] = 1;
				localStorage.setItem(hide[eval(event.target.id)][hideText], hide[eval(event.target.id)][hideValue]);
			}
			
			hideVideos();
		};
	}

	hideVideos();

	// Hide Watched or Filtered Videos
	function hideVideos()
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
			
			video = childLI[i].children[0].href;
			if(hide[hideSA][hideValue] == 1 && video.search("episode/(.*the-1-show.*|the-best-ever|sidescrollers|five-fun-facts|top-10-|desk-of-death-battle|.*evil-craig|available-now-podcast|.*reasons-we-hate.*|.*-sidescrollers-.*|.*-reasons-we-love-.*|is-.*-good?|announcing-g1-|.*-screwattack-royal-rumble|one-minute-melee-|screwattacks-top-10-|samus-nutty-|.*death-battle.*|fairly-odd-relatives|pokemon-vs-digimon|.*top-5-|five-more-fun-facts-|.*the-best-.*ever|community-project-|batman-dual-|how-much-would-it-cost|the-worst-kept-secret)") > 0){
				 video = video.replace("roosterteeth.com", "screwattack.com");
				 childLI[i].style.display = "none";
			}
			if(hide[hideAH][hideValue] == 1 && video.search("episode/(lets-play|ahwu|things-to-do-in|play-pals|achievement-unlocked|behind-the-scenes|achievement-hunter|fails-of-the-weak|easter-eggs|achievement-hunt|five-facts|off-topic-|how-to-|vs-|go-|rage-quit-|countdown-|achievement-horse-)") > 0){
				video = video.replace("roosterteeth.com", "achievementhunter.com");
				childLI[i].style.display = "none";
			}
			if(hide[hideTK][hideValue] == 1 && video.search("episode/(the-know|the-patch|in-review|news-roundups)") > 0){
				video = video.replace("roosterteeth.com", "theknow.tv");
				childLI[i].style.display = "none";
			}
			if(hide[hideFH][hideValue] == 1 && video.search("episode/(gameplay|dude-soup|fan-show|funhaus|fullhaus|open-haus|demo-disk-|rest-of-)") > 0){
				video = video.replace("roosterteeth.com", "fun.haus");
				childLI[i].style.display = "none";
			}
			if(hide[hideRT][hideValue] == 1 && video.search("episode/(rt-sponsor-cut|happy-hour|free-play|lazer-team|million-dollars-but|rt-podcast|the-slow-mo-guys|rt-animated-adventures|rt-shorts|immersion-|red-vs-blue-|rt-anime-podcast-|on-the-spot-|buff-buddies-|sponsor-vlog-|rt-life-|sportsball-|rt-specials-|rwby-|x-ray-and-vav-|trailers-|social-disorder-|rooster-teeth-entertainment-system-|chad-)") > 0){
				video = video.replace("roosterteeth.com", "fun.haus");
				childLI[i].style.display = "none";
			}
		}

		if(hide[hideWatched][hideValue] == 1)
		{
			var watched = document.getElementsByClassName("watched");
			for ( i = 0; i < watched.length; i++)
			{
				//watched[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = " "+((hide[hideWatched][hideValue] == 1) ? "none" : "")+"";
				watched[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
			}
		}

	}
}