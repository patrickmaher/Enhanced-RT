// ==UserScript==
// @name       Enhanced RT
// @version    2.0.2
// @description  Enhancments for the Rooster Teeth family of websites
// @include    *://*.roosterteeth.com/*
// @exclude    *://store.roosterteeth.com/*
// @run-at document-end
// ==/UserScript==


/*
Features
========
-Works on all sites in the Rooster Teeth family.
-Video filters that allow you to hide videos that you don't want to see on the Recently Added page.
-Endless loading of videos on the Recently Added page.
-Converts video time stamps in comments into click-able links.
-Align videos to browser window on video and live stream pages.
-Pauses video when video page loaded using comments button.
-Settings page which can be accessed from the profile menu at the top right of the page.
-Legacy favorite icons for Funhaus, Achievement Hunter, ScrewAttack, and The Know.

The Known Issues
================
-Filtering is based on a list of show titles that I manually entered. If new shows are added the list needs to be updated to correctly filter that show.
-Endless Video feature makes queue button reload the page in order to queue a video instead of doing it in the background.

Future Features
===============
-Button to mark videos as watched.


Possible Future Features
========================
-Filter videos on Recently Added page by: Sponsor Content, Video Length, Date Uploaded, etc.
-Additional settings: pages that filters are active on, completely disable all features.
-Endless scrolling of news on the homepage for Rooster Teeth, The Know, Achievement Hunter, Funhaus, and ScrewAttack.
-Endless scrolling of forums.
-Mouse over users for more info card.
-Profile cover photo tester.
-Hide comments marked as flamebait.
-Clicking on video timestamps in comments sets video player to that time.
-bit.ly link dump reverse lookup
-comment permalinks

To be fixed
===========



Versions
========
2.0.2
-Added YT Primetime to the Stream filter.

2.0.1
-Fixed some issues with Endless Videos feature that were present while the pagination was gone. Now that the pagination is back the Endless Videos feature should work the same as it did before version 2.0.0.
-Fixed the clickable video timestamp in comments feature to work with new videojs player.

2.0.0
-Fixed the code for the Recently Added page to work with the updates that Rooster Teeth made to the site on 2016-10-19. Recently added page no longer shows videos from all sites so the site filters have been disabled. Added convenient links to Recently Added page for each site. Fixed Endless Videos so that it works without the pagination controls that were removed from the bottom of the page.


1.0.2
-Added Past Livestreams from The Know to the Stream filter.

1.0.1
-Added new Rooster Teeth show Always Open to the filter list.
-Disabled the feature that makes timestamps in comments clickable. Rooster Teeth implemented a new video player on 2016-09-01 which broke this feature. I will fix it in a future update.

1.0.0
-Added new Rooster Teeth show Crunch Time to the filter list.
-Added settings link to recently added page.
-Firefox WebExtensions support.


0.4.0
-Added new Rooster Teeth shows Day 5 and Camp Camp to the filter list.
-Added new Achievement Hunter show Heroes Halfwits to the filter list.
-Added new Funhaus show Twits and Crits to the filter list.
-Added Stream filter that filters out AH Full Streams, FH Fullhaus, and RT live stream archives.
-Added Unknown filter to help filter videos that the filters cannot correctly detect.
-Added support for Cow Chop and The Creatures subdomains inlcuding favicons.
-Added filter for Cow Chop. Note that older Cow Chop and UberHaxorNova videos cannot be properly detected because there is no naming convention used. Please use the new Unkown filter for those.
-Improved how subdomains are handled so that when new sites are added the extension will still work. The extension should work on all subdomains of roosterteeth.com except for the store subdomain.

0.3.0
-Updated to handle domain changes made to the Rooster Teeth family of websites. As of 5/23/16 the Rooster Teeth family of sites were change so that Achievement Hunter, Funhaus, The Know, and ScrewAttack domains forward to subdomains of roosterteeth.com.

0.2.3
-Added new ScrewAttack shows Gameattack and Screwattack Illustrated to the filter list.
0.2.2
-Added new Achievement Hunter show Theater Mode to the filter list.
0.2.1
-Added new ScrewAttack show Random Awesomeness to the filter list.
0.2.0
-Added feature that converts video time stamps posted in video comments into links that play the video starting from the specified time when clicked.
-Added option to pause video when loading a video page using the comments button. If you are not a sponsor this will not work because the video will not pause due to the video advertisement.
-Changed video alignment feature so that it will not do alignment when loading a video page using the comments button.
-Added option to enable old favorite icons. This is off by default. Rooster Teeth added unique favorite icons for each website so they don't all have the same teeth logo any more.
-Added option to align videos to browser window on live stream pages.

0.1.0
-Added option to endlessly load videos on the Recently Added page.
-Added option to align videos to browser window on video pages.
-Improved settings page.

0.0.5
-Updated filters to correctly identify some new videos that were not being filtered.
-Optimizations for filtering.

0.0.4
-Added favorite icons for Achievement Hunter, ScrewAttack, and The Know.

0.0.3
-Fixed bug in detecting newly migrated screwattack.com site.

0.0.2
-Public Release

*/


// *********
// All Pages
// *********

//console.log(window.location.protocol);
//console.log(window.location.host);
//console.log(window.location.pathname);
//console.log(window.location.href);

// *********
// Functions
// *********
function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

// 2D Array Creation function
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

// ********************************
// Load Settings from Local Storage
// ********************************

// Set Array Indices
var hideWatched = 0;
var hideStreams = 1;
var hideRT = 2;
var hideAH = 3;
var hideFH = 4;
var hideSA = 5;
var hideTK = 6;
var hideCC = 7;
//var hideTC = ?;
var hideUnknown = 8;
hideValue = 0;
hideText = 1;
hideName = 2;
currentSiteDomain = window.location.protocol + "//" + window.location.host;


// Load Stored Settings
var hide = createArray(9, 3);
hide[hideWatched][hideValue] = ((localStorage.getItem("hideWatched") == null) ? 0 : localStorage.getItem("hideWatched"));
hide[hideWatched][hideText] = "hideWatched";
hide[hideWatched][hideName] = "Watched";
hide[hideStreams][hideValue] = ((localStorage.getItem("hideStreams") == null) ? 0 : localStorage.getItem("hideStreams"));
hide[hideStreams][hideText] = "hideStreams";
hide[hideStreams][hideName] = "Streams";
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
hide[hideCC][hideValue] = ((localStorage.getItem("hideCC") == null) ? 0 : localStorage.getItem("hideCC"));
hide[hideCC][hideText] = "hideCC";
hide[hideCC][hideName] = "Cow Chop";
//hide[hideTC][hideValue] = ((localStorage.getItem("hideTC") == null) ? 0 : localStorage.getItem("hideTC"));
//hide[hideTC][hideText] = "hideTC";
//hide[hideTC][hideName] = "The Creatures";
hide[hideUnknown][hideValue] = ((localStorage.getItem("hideUnknown") == null) ? 0 : localStorage.getItem("hideUnknown"));
hide[hideUnknown][hideText] = "hideUnknown";
hide[hideUnknown][hideName] = "Unknown";

// Load Endless Video Setting
endlessVideos = ((localStorage.getItem("endlessVideos") == null) ? 1 : localStorage.getItem("endlessVideos"));

// Load Video Alignment Setting
videoAlign = ((localStorage.getItem("videoAlign") == null) ? 0 : localStorage.getItem("videoAlign"));

// Load Live Stream Alignment Setting
liveStreamAlign = ((localStorage.getItem("liveStreamAlign") == null) ? 0 : localStorage.getItem("liveStreamAlign"));

// Load Comments Stop Playback Setting
commentsStopPlayback = ((localStorage.getItem("commentsStopPlayback") == null) ? 1 : localStorage.getItem("commentsStopPlayback"));

// Load Favicon Setting
replaceFavicon = ((localStorage.getItem("replaceFavicon") == null) ? 0 : localStorage.getItem("replaceFavicon"));


// *************
// Detect Domain
// *************
if(window.location.host.search("funhaus.roosterteeth.com") >= 0) // Funhaus
{
    currentSite = "FH";
    //currentSiteDomain = "funhaus.roosterteeth.com";

    // favicon
    var favIcon = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABSlBMVEUAAAABAAECAQA3GgYrEgkXCwIUCgIVCgIZDAQcDgMVCgIEAgEDAQADAQADAQEEAgIKBQEDAgACAQAFAgECAQAAAAAAAAEIBAABAAACAQADAQABAAAAAAABAAABAAABAQABAQIHBAADAgAJBQIDAgEAAAAAAAADAQEIBAEHAwEGAwEIBAMGAwEBAAAGAwEJBQECAQEAAAADAgEFAwAHBAEMBgMGAwEEAgEAAAABAAAHAwACAQAGAwIBAAAAAAADAgEGAwAIBAEGAwEFAgEBAAAJBAIDAgEAAAADAQEJBQEYEQMWCwIIBAEFAwEBAAAGAwEHAwIDAQABAAACAQAVCwEIBgACAQABAQEBAQATCwAHBgABAQAAAAAFAgECAQADAQADAQAEAgAXDAELBwIDAgADAQADAQEcDgIaDQEcDgIbDgIbDgIAAAD///+/K5A+AAAAbHRSTlMAAAAAAAkKCgMCCarCwb44KLjCqOH7SjXz3szx/u3o5EM1yh9r/PNSICUnCDj9bh5Q94dnQAROjPj8U58LwvZ+XDtEgfcmcfRZGwEBG1v1dCfR9KUEA6PUsgQDr+SiuLe6gAMCfrikBQYEBAbomQOXAAAAAWJLR0RtuwYArQAAAAd0SU1FB+ACHQEvODn/h8QAAAC6SURBVBjTY2BAB6xsEMDOwckFpFgZuHl4wYCPX0CQl1dImEEkBwJExcQlgJQkg5R0To6MrJycvIIiUEBaiUFZRTVHTV1DU0tbRyJHV0+fgdFANMfQyNjE1MzcIsfSigksAATWNrZAEqeAnb2Do6mTswtYwNVNNcfdw9PL28fXL0fXP4AhMAhorV9wSGiYn0xOjl841GERkVHRYEYMQ2xcfHx8QmJSckoCkJGaxpCeAQKZzCxZYEY2hu8B+5s3RDPiTSQAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDItMjlUMDE6NDc6NTYrMDE6MDBpZHDiAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTAyLTI5VDAxOjQ3OjU2KzAxOjAwGDnIXgAAAFd6VFh0UmF3IHByb2ZpbGUgdHlwZSBpcHRjAAB4nOPyDAhxVigoyk/LzEnlUgADIwsuYwsTIxNLkxQDEyBEgDTDZAMjs1Qgy9jUyMTMxBzEB8uASKBKLgDqFxF08kI1lQAAAABJRU5ErkJggg==";
}
else if(window.location.host.search("achievementhunter.roosterteeth.com") >= 0) // Achievement Hunter
{
    currentSite = "AH";
    //currentSiteDomain = "achievementhunter.roosterteeth.com";

    // favicon
	var favIcon = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACE1BMVEUnQxsqRx43VitunmA6XC0AAABwtlI7Xi9TeUUpRx0+YS0mRRssTh8tUB9vr1FzwFFyvFFvrlEsUB8rTh4mRBo9Xy05XSo4XilxtVFxtFI2WSU2WSdxt1EFHABur1FzvFFyu1FurlFwtFFwsE5xu1NxulJwsFBtrFFyulFxulFsqlFxtlFvq1FxuVFup1EAAAE7Wy1ws1F0xFFusVFvsVJ40k44WCtAYDFvtVFynlpuoFhvtFE6WytwtlFwtlJxt1Fxt1FxtVFxuFFxuFFxtFJxtlFxuFFxuFFxtlFxt1Fxt1FvtVFvtVFvtFFutFButFBvtVBxt1Fxt1FvtFBvtVFwt1Fxt1Fxt1Fxt1FxuVFoqEppq0xxuFFxt1Fwt1FwtVFxt1FxuFFxuFFxt1FwtVBvslJxt1FxuFFxuFFxtlFvsVJwtlFyuVJyuVJwtlF0vFNzvFNwtFFxuFFRhDtxuFFws1FwtlFxuFFzu1J0vFN0vFNzu1JxuFFwtlFxt1FxuFFxt1Fxs1Fxs1Fxt1FxuFFxt1Fxt1Fxt1FwtlFwtlFxt1Fxt1Fws1JvtVFwtlFwtVFwtVFwtlFwtFJyulJyuVJin0djoEcZKBIbLBRxuFFxuVFssE4mPhwpQh5tsk9zvFNIdDRKeDZkokgwTyMbLBMcLRQyUCRlpElbk0EIDAYBAgEJDwddl0Nrr01UiDxUiT3///+yFwYrAAAAk3RSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPTmIgRDLxA098+83gHgZFxYWFSDEvh0amtXY1tn5+NnUlReD8O5+FANM0MxIAyKsph93bwq6/rMHMevxjpLz5yxx2FYEBVrbarOwKi20rQcichIVcx8RzCN3AAAAAWJLR0SwQ2SuxAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+ADDAkKMAQBl+MAAAELSURBVBjTY2BgZGJmYWWztWNjZedg4mRg4OLm4WXl47d3EBBkFRIWEWUQE2dlZZVwdHJ2kQQypKQZWEFAxtXN3UMGyJCVBQvIyXtOnuKloAhiM3j7+Pr5BwROnRYU7O/n6xPCEBoWHhEWGTV9RnRMWER4bBxDfELizJmzZs+ZO2/WzJlJySkMSqlp6TNnzl+wcP7MmRmZWUoMrMoq2TmLFi9Zumx5bp6qGivQFnWN/BUrV61avaZAU4sVJKBUWLR2XXHx+tklpUpgAZmy8lkVlVXVs2pqtUECOpp1M+sbGpuaW2a26urpMxgYFra1dxgZm5h2dnX3GJoxmFv09vVrW7KyWslMmDjJ2gYAM+ZK57lPUXIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDMtMTJUMDk6MTA6NDgrMDE6MDDi2p8WAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTAzLTEyVDA5OjEwOjQ4KzAxOjAwk4cnqgAAAFd6VFh0UmF3IHByb2ZpbGUgdHlwZSBpcHRjAAB4nOPyDAhxVigoyk/LzEnlUgADIwsuYwsTIxNLkxQDEyBEgDTDZAMjs1Qgy9jUyMTMxBzEB8uASKBKLgDqFxF08kI1lQAAAABJRU5ErkJggg==";
}
else if(window.location.host.search("theknow.roosterteeth.com") >= 0) // The Know
{
    currentSite = "TK";
    //currentSiteDomain = "theknow.roosterteeth.com";

    // favicon
	var favIcon = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABv1BMVEUAAAABAQEAZJ8AY50AY54CAgIADRUAXZMBITQAYpwAHCwAIzcAY5wDAwMAYZoAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEAAAAAAAAAAAAAAAAAAAAAAAABAQEAY50AY50AY50AZqIABAYAAAAAAAAAAAABAQEAY50AY50AY50AY50AY50AYJgAAAAAAAAAAAAAAAAAAAAAAAAAY50AY50AY50AY50AZJ4AT30AAAAAAAAAAAAAAAADAwMAY50AY50AY50AaKUCGSYAAAAAAAABAQEAYpsAYpwAY50AY50AZJ4AAQEAAAABAQEAY50AY50AY50HBwcAAAABAQEAY50AY50AY50AY54BAQEAAAAAAAAAAAABAQEAY50AY50AY54BAQEAAAAAAAAAAAAAY50AY50AY50AAAAAAAAAAAAAAAAAY50AY50AY50AY50AZqIAAAAAAAAAAAABAQEAY50AY50AY50BX5YCAQAAAAAAAAAAY5wAZJ8ASXQAAAAAAAAAAAAAAAAAYZoAZqEAL0oAAAAAAAAAAAAAAAAAAAAAAAAAY53////U6D+TAAAAknRSTlMAAAAAAAAAAAAAAAAAAAAMlrtBRLeqJuX7SinO+HdO+vE1FLaZCgECNW6EMJfKHwdseBqWoLDbkvnrRhXO/N7wfdX3/HkBA6SoTE/yrQ9khOWMCWzaLPHdIgGeB2HWvggQy/3fIZPPES7A9k9P9lJZ71aJe/Do2EKKFZsMFC3Ik7Wa6QSof9xfHmAEYFWxKASBZzt/MQ8AAAABYktHRJR/Z0oVAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AMMCCEX1rm11gAAAPRJREFUGNNjYIAAfgFBIQYGYRFRKJ9RTFxCkkFKWkYWwmdikJNXUFRSnqSiysDArKbOoqGpNUlcW2eSrh6Qr29gaGRsYjrJzNzC0oqBlYHZ2sbWzt7BcZKTk7OLKyNQhZu7rYenl/ekSZN8fIF8Bj//gMAgtmAgPySUASQQNjk8gj0yCiggEg3iM8TExsVzJCROSpqUnAIW4ExNS+fKsEzKzJLPBrspJzw3jzs/qaDQcVIR0FIGhuKS0rLyiknSlVWTMqtBemo0auvqGyY1MhQ6N4WC9fA0t7S2TWpn6AiZ1MnACxTg6+ru6e3tY+ifkDkRaAgA/ss77+z5UvcAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDMtMTJUMDg6MzM6MjMrMDE6MDBIfxksAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTAzLTEyVDA4OjMzOjIzKzAxOjAwOSKhkAAAAFd6VFh0UmF3IHByb2ZpbGUgdHlwZSBpcHRjAAB4nOPyDAhxVigoyk/LzEnlUgADIwsuYwsTIxNLkxQDEyBEgDTDZAMjs1Qgy9jUyMTMxBzEB8uASKBKLgDqFxF08kI1lQAAAABJRU5ErkJggg==";
}
else if(window.location.host.search("screwattack.roosterteeth.com") >= 0) // ScrewAttack
{
    currentSite = "SA";
    //currentSiteDomain = "screwattack.roosterteeth.com";

    // favicon
    var favIcon = "AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD9syTe+akO+vGhBv3unwT/758E//CgBP/woAT/8aEE//KiBP/yogT/8aEE//CgBP/xoQT/8aEE//SkB/r6sSHg96YI+v+sC///qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT/9qQF/fGhBP//xFL//9SB//+xGv//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//CgBP/yoQX//6oE///MZ////Pb//92b//+4Lf//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP/yogX/8qEF//+qBP//qgT//8xn/////v////7//+a1///BR///qgT//6oE//+qBP//qgT//6oE//+qBP//qgT/8qEE//OiBf//qgT//6oE//+qBP//zGf////+/////////////+/Q///JYf//rAr//6oE//+qBP//qgT//6oE//GhBP/0ogX//6oE//+qBP//qgT//6oE///Se////////////////////////+rB//+qBP//qgT//6oE//+qBP/xoQT/9KIF//+qBP//qgT//6oE//+qBP//4aX////////////////////////DTv//qgT//6oE//+qBP//qgT/8qIF//OiBf//qgT//6oE//+qBP//tij///77///////////////////ouv//qgT//6oE//+qBP//qgT//6oE//OiBf/xoQT//6oE//+qBP//qgT//7Ym///iqf///v3/////////////5bH//60M//+qBP//qgT//6oE//+qBP/zogX/8KAE//+qBP//qgT//6oE//+qBP//qgT//7Yo///enf///fn////////rxP//sBb//6oE//+qBP//qgT/9KIF//GhBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//7Mf///ZkP//+/T///La//+2Jv//qgT//6oE//WjBf/xoQT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//7AX///Vg///8tn//707//+qBP/1owb/8aEE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//64R///NbP//vTz/86IF//imB/r/qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6wJ//upDPr9syPe9qYJ+PKhBf3yoQT/8qEE//KhBP/zogX/9aMF//SjBf/zogX/9KIF//SiBf/zogX/9KIF/famCvj+tCXeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
}
else if(window.location.host.search("www.roosterteeth.com") >= 0 || window.location.host.search("roosterteeth.com") == 0) // Rooster Teeth
{
    currentSite = "RT";
    //currentSiteDomain = "roosterteeth.com";
	
	// favicon
	var favIcon = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA09pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoMTMuMCAyMDEyMDMwNS5tLjQxNSAyMDEyLzAzLzA1OjIxOjAwOjAwKSAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjlEOTMzRjJGNEEzMTFFMkI4QUFCRjlDMDVBNERFQjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjlEOTMzRjNGNEEzMTFFMkI4QUFCRjlDMDVBNERFQjMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2OUQ5MzNGMEY0QTMxMUUyQjhBQUJGOUMwNUE0REVCMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2OUQ5MzNGMUY0QTMxMUUyQjhBQUJGOUMwNUE0REVCMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlKJMEUAAAKgSURBVHjalFNtSFNhFD5392P3uu1uTnfnamattDSiLBQjLEwJLaLv0AUlWUSRIwttKf4oFYmgsjRKsC/oT0H0gUb0a34E/nJm4mgaNCMp2dKlm7vTe7qTCku0euD8ec/znOccznkBZBAEAXPBFKfN3Jab0hhv1hc1XLGiUknnziLNV6Agf1MTogOHP9ZLONWKSUmWipl5Cv6CfrfH6+x8Dbpojmiqrff7fF8c/9UB/MidLMnz6o38Og5gvZak8uftgFUotsiktOGw2KomKcI/GVaNv/eKVsH4MEttsjjFYLBq0NMsU7/NtFbEM8pTGbzGnqOLNigVCnCOjYGBpiGGYYAZ8cIKgwmQoSEkhqCgz3X8M0o3yYhSRVLWQ4LQYRWE7ekaXiUhwDhKsGwyBLETI6AL+ICJMUOUAmBKAuB0ehhgWdU7n/cepaWZEpsgXF5MSBAeG4URQAiERkEpisBZVoN2XR4syc4GXUYGNO3aDY96uyF1eQpwHJsleydThCR5EjkOGNlR5FmIoijYeLACdCnJQK9aCUSMHhzOLrhYfAI63naDQJBwOBiApCkGXBr+2PTwR/btb0cZQ243dvW8QffQJ7z7ogULCgvRaDbLA8F07C23Y3vleexPEPC6ZWnkbcd0gbiERZvLqqsc91+99DeX2jGd5X6JfkZN462IB/bmbsUHcQLKm6r5c3va2+WVE3aj4TehiufxeY8TpVE/dqWuxXo1hTzL1s3afWJ62obHpWdRMUNsq76AX2XXcFsHti2MxQolgTTD2Oa6OfJc0dGhS3VXsfJGA3a6+lAKBNFjO4ONKsAcmhmQr3LNvHevW2Da8+HJMxSftuBg8Wm8Y+DxAAWooaha+FdEA5TtJCGcSRIuNUFci/zo+fjfBRgAU8wMakurlqkAAAAASUVORK5CYII=";
}
else if(window.location.host.search("cowchop.roosterteeth.com") >= 0) // Cow Chop
{
    currentSite = "CC";
    //currentSiteDomain = "cowchop.roosterteeth.com";

    // favicon
    var favIcon = "AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAMMOAADDDgAAAAAAAAAAAAD///8A////AAAAAAAJCQoAAwMDDRkZHGQoKS7LLC40+l1fZf21uL39s7a7/KKkqeJ1dqnJYGGfoykoNg0yMkcA////AP///wASEhQADQwOFyAhJZ41Nz/2QUZQ/0RKVf9MUVv/vcDG/+Ll6v/Nz9n/hofS/3Nzw+9JSXM6T0+AAP///wAqLC8AExMSAy0wNo0+Qkv/R01Y/0dNWP9GTFf/UFVe/8PFyv/h5On/wcPS/21tuv9kZKr/aWmBm0dIIgb///8AQ0hRAEJGTzBESVPmR01Y/0dNWP9HTVj/REpV/3F0e//a3OH/3+Ln/8DB3f+RkMv/lZTQ/6Sky+V2d3syICMmLSUmKkM6PkeKR01X/0dNWP9HTVj/R01Y/0RKVf90d37/297j/97h6P+5ueX/srH0/7e3/P+qqdv4g4OOWDAzOdQ1OED4MjU89kFHUf9HTVj/R01Y/0dNWP9FS1b/R0xW/4uOk//O0Nf/rq7P/7Sz6/+8vPb/np6//W5ucowuMDfsNDU9/zU3P/81OED/RUtW/0dNWP9ITVf/W15l/1teZP9JTVb/Zmlw/7Gyuv+mp7L/lZWe/6Slrf+Vl5v3Ki0yrjQ3Pv4wMjr/Li81/z1CS/9GTFf/cHJ2/0pKSv8yMjH/XF5g/0ZLVP+IiY3/cXFx/zw8PP+SlJn/jpCU9RcZHB00OD+ZOz9I9jE0O/8xNDz/RkxW/3+Ag/8ZGRj/AAAA/1lZWv9SVl7/jI2Q/zw8PP8bHBz/lZaa7oeHi3YPERQAJygpCDg7QGw6PkbzPkJM/0BGUP9eYmn/VVZX/1JSUv9rbHD/XGBn/7y+wv96env/RERF6YGDhWBIR0gE////ACAeHwANCQUHLjA2nEJHUv9ESVP/U1hg/1VYXv9VV13/Y2dv/6+yuP/f4eb/r7G0801NTV4AAAABJiYlAP///wD7+/sALzE2ACYoLSJRVFvCiYyS/8LEyf/Exsv/wMLI/9LV2//e4eb/yMrO/YeIi40GBQUGMjEyAAAAAAD///8A////AAkHBgCpq64AcHByJZiZnKTExsr3u73B/s7R1vvFx8zyp6mt57e5vd9mZ2gkY2RlAAAAAAAAAAAA////AP///wAAAAAAAAAAAEpLTAA3NzgNmZqep4CAg31zdHdOY2RmOlJSVDl8fX+LYWFjC0dISQAAAAAAAAAAAP///wD///8AAAAAAAAAAAAaGhkAAAAAAFNTVSBISEoJQ0NFAAoKCgAXFxcCISEiDiIiIgENDQ0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAEAAGABAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAEABAABgAwAAcAcAAHgHAAD4xwAA//8AAA==";
}
else if(window.location.host.search("thecreaturehub.roosterteeth.com") >= 0) // The Creatures
{
    currentSite = "TC";
    //currentSiteDomain = "thecreaturehub.roosterteeth.com";

    // favicon
    var favIcon = "AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwLDQAAAAADGRwhMC40PINBSVS+PkRP2l9gZdpXWF2+JSkxgxodIjAAAAADDAsNAAAAAAAAAAAAAAAAABgZHQAODQ8OKS83cTpEUNpBTlv8Rk9a/29yd/+ysLH/qKeo/0hOV/w4Qk3aKS83cQ0NDg4XGRwAAAAAABITGAAIBggOIicxkDxHVPdHVWP/UFlj/1tbhP+LibP/x8bH/8/NzP+UlJj/SFRh/zxHVPciJS+QCgUGDhMSFgAAAAACFEZsciVDYPg1PU3/SVZj/3qIj/9SWZL/Ghh//1JXfv+bp6//srW2/11kbf81Pk7/JzVI+BUySnIAAAACDTBDMBSBvdkgYIr/PUVU/3eOnP+IpLH/Ul5w/zM0Vf8wMlX/YXKC/5Wqtf9pcHn/KzJB/x5nlP8Uf7rZDTFEMBFlhYIMrez8GXqk/0xaaP+JmaL/kaCn/3uKkv+rq6v/j5WZ/2+CkP+Cm6n/b4GN/yw/UP8Qlsz/Da3s/BFlhYIak7q9B7/5/xOGrf9PY3L/hJWe/5KRjf+OmZ7/q7S5/5ynrP+KkZH/m6Sn/4KTnf81WWz/Ca/k/wfA+v8ak7q9IKTN2gyl1f8kS2H/QExa/2t/i/9vgYz/g5un/4ehrv+Dm6j/g4+V/4mWnP94i5j/Ml5z/wiz5/8Gx///IaPL2iCnz9oSjLX/NEBR/zpEU/9JVmT/YHOA/3mRn/9+l6X/f5il/22CkP9leYb/UWBt/yRRZ/8ZeJv/D6DO/yGjytoam7+9FIux/ztLWv9GU2H/MTlG/z9KWP9HVGH/S1lm/01caf9NW2n/RVJh/zE5SP83QE//NjxL/yFacv8ciqm9D3CLghGUuPw4UGH/SVZk/0JPXP9GUmD/QEtY/0NQXf9CTlv/PkpX/y82Q/8+Slj/SFVj/ztEU/8eXnb8EWJ5ggs7SDAPkrLZK2V7/0dRX/9JVWP/PVBe/zZATv88Q1L/QEtY/0RRX/9BTFr/R1Ri/ztVZf8jbob/EYOg2Qs8STAAAAACDmuBchiRrfg1Z3n/OGx+/x2euv8ci6b/H4CZ/zVhcv9JU2D/QFtq/yqGnf8Xttf/EbbY+A5sgXIAAAACDTdAAAoQEw4Reo2QGLTP9xnQ7v8W3/7/Ft///xbe/v8gs83/Loyg/yCyy/8X2vn/FcXj9xF8kJALDhAODTY/AAAAAAAONDoADBIUDhNzgnEZscXaHNTs/B7i+v8e5///Hef+/x3g+P8c1e38GbDF2hNxf3EMEBIODjI4AAAAAAAAAAAAAAAAAA0LDAAIAAADED5EMBx8h4Msrry+NL/M2jS/zNosr7y+HHyHgxA+RDAIAAADDQsMAAAAAAAAAAAA4AcAAMADAACAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIABAADAAwAA4AcAAA==";
}
else
{
	currentSite = "Unknown";
	var favIcon = "";
}

//console.log(currentSite);
//console.log(currentSiteDomain);


// **************
// Change favicon
// **************
if(replaceFavicon == 1)
{
	var docHead = document.getElementsByTagName('head')[0];       
	var newLink = document.createElement('link');
	newLink.rel = 'icon';
	newLink.href = 'data:image/png;base64,'+favIcon;
	docHead.appendChild(newLink);
}

// *****************************
// Settings Link in Profile Menu
// *****************************
var settingsLink = document.getElementById("profile-menu");
if(settingsLink != null)
{
	var settingsLinkHTML = "<li><a href=\"" + currentSiteDomain + "/EnhancedRT/settings\">Enhanced RT</a></li>";
	settingsLink.children[0].children[3].outerHTML = settingsLink.children[0].children[3].outerHTML.concat(settingsLinkHTML);
}


//recently added page number from URL
/*
var currentPage = location.search.replace(/^\D+/g, '');
if(currentPage == ''){currentPage = 1;}
currentPage = parseInt(currentPage);
//console.log(currentPage);
*/


// *************
// Settings Page
// *************
if(window.location.pathname=="/EnhancedRT/settings")
{
    var settings = document.getElementById("body-block");
	var settingsHTML = "<center><div style=\"display: inline-block;padding: 10px;\"><h1>Enhanced RT Settings</h1><div style=\"border:1px solid black;display: inline-block;padding: 10px;\"><h3>Recently Added Page Settings</h3>\n\
	<label style=\"color:#666;font-size:12px;\"><input style=\"margin:0 0 0 1em;\" type=checkbox id=\"endlessVideos\" "+((endlessVideos == 1) ? "checked" : "")+">Endless Videos</label>";
	for ( i = 0; i < hide.length; i++)
	{
		settingsHTML = settingsHTML.concat("<label style=\"color:#666;font-size:12px;\"><input style=\"margin:0 0 0 1em;\" type=checkbox id="+hide[i][hideText]+" "+((hide[i][hideValue] == 0) ? "checked" : "")+">"+hide[i][hideName]+"</label>");
	}
	settingsHTML = settingsHTML.concat("</div><br><br><div style=\"border:1px solid black;padding: 10px;\"><h3>Video Page Settings</h3><label style=\"color:#666;font-size:12px;\"><input style=\"margin:0 0 0 1em;\" type=checkbox id=\"videoAlign\" "+((videoAlign == 1) ? "checked" : "")+">Align Video Player with Browser Window</label> <label style=\"color:#666;font-size:12px;\"><input style=\"margin:0 0 0 1em;\" type=checkbox id=\"commentsStopPlayback\" "+((commentsStopPlayback == 1) ? "checked" : "")+">Pause Video Loaded Using Comment Button</label></div>\n\
	<br><br><div style=\"border:1px solid black;padding: 10px;\"><h3>Live Stream Page Settings</h3><label style=\"color:#666;font-size:12px;\"><input style=\"margin:0 0 0 1em;\" type=checkbox id=\"liveStreamAlign\" "+((liveStreamAlign == 1) ? "checked" : "")+">Align Video Player with Browser Window</label></div>\n\
	<br><br><div style=\"border:1px solid black;padding: 10px;\"><h3>Site Wide Settings</h3><label style=\"color:#666;font-size:12px;\"><input style=\"margin:0 0 0 1em;\" type=checkbox id=\"replaceFavicon\" "+((replaceFavicon == 1) ? "checked" : "")+">Replace Favicon with <img src=\"data:image/png;base64,"+favIcon+"\"> (Legacy Setting)</label></div>\n\
	<br><font style=\"color:red;\">Please note that these settings will only apply to the website you are currently on, which is: "+currentSiteDomain+"<br>\n\
	Visit the settings page on each website using the links below to change the settings for those sites.</font><br>\n\
	<br><a href=\"http://roosterteeth.com/EnhancedRT/settings\">Rooster Teeth</a> &nbsp; &nbsp; <a href=\"http://achievementhunter.roosterteeth.com/EnhancedRT/settings\">Achievement Hunter</a> &nbsp; &nbsp; <a href=\"http://funhaus.roosterteeth.com/EnhancedRT/settings\">Funhaus</a> &nbsp; &nbsp; <a href=\"http://screwattack.roosterteeth.com/EnhancedRT/settings\">ScrewAttack</a> &nbsp; &nbsp; <a href=\"http://theknow.roosterteeth.com/EnhancedRT/settings\">The Know</a></div></center>");
	settings.innerHTML = settingsHTML;
	
	
	
	for ( i = 0; i < hide.length; i++)
	{
		//console.log("Make onclick trigger for " + hide[i][hideName]);
		document.getElementById( hide[i][hideText] ).onclick = function (event) {
			//console.log("onclick detected for " + event.target.id);
			if(hide[eval(event.target.id)][hideValue] == 1)
			{
				//console.log("onclick hide value changed to 0");
				hide[eval(event.target.id)][hideValue] = 0;
				localStorage.setItem(hide[eval(event.target.id)][hideText], hide[eval(event.target.id)][hideValue]);
			}
			else
			{
				//console.log("onclick hide value changed to 1");
				hide[eval(event.target.id)][hideValue] = 1;
				localStorage.setItem(hide[eval(event.target.id)][hideText], hide[eval(event.target.id)][hideValue]);
			}
		};
	}
	
	
	document.getElementById("endlessVideos").onclick = function () {
		if(endlessVideos == 1)
		{
			endlessVideos = 0;
			localStorage.setItem("endlessVideos", endlessVideos);
		}
		else
		{
			endlessVideos = 1;
			localStorage.setItem("endlessVideos", endlessVideos);
		}
	};
	
	document.getElementById("videoAlign").onclick = function () {
		if(videoAlign == 1)
		{
			videoAlign = 0;
			localStorage.setItem("videoAlign", videoAlign);
		}
		else
		{
			videoAlign = 1;
			localStorage.setItem("videoAlign", videoAlign);
		}
	};
	
	document.getElementById("commentsStopPlayback").onclick = function () {
		if(commentsStopPlayback == 1)
		{
			commentsStopPlayback = 0;
			localStorage.setItem("commentsStopPlayback", commentsStopPlayback);
		}
		else
		{
			commentsStopPlayback = 1;
			localStorage.setItem("commentsStopPlayback", commentsStopPlayback);
		}
	};
	
	document.getElementById("liveStreamAlign").onclick = function () {
		if(liveStreamAlign == 1)
		{
			liveStreamAlign = 0;
			localStorage.setItem("liveStreamAlign", liveStreamAlign);
		}
		else
		{
			liveStreamAlign = 1;
			localStorage.setItem("liveStreamAlign", liveStreamAlign);
		}
	};
	
	document.getElementById("replaceFavicon").onclick = function () {
		if(replaceFavicon == 1)
		{
			replaceFavicon = 0;
			localStorage.setItem("replaceFavicon", replaceFavicon);
		}
		else
		{
			replaceFavicon = 1;
			localStorage.setItem("replaceFavicon", replaceFavicon);
		}
	};
	
}


// *******************
// Recently Added Page
// *******************
if(window.location.pathname=="/episode/recently-added")
{
	//console.log("Recently Added Page");

	// ***************
	// Filter Controls
	// ***************
	var filters = document.getElementsByClassName("grid-blocks");
	//alert(filters[0].parentNode.children[1].outerHTML);
	
	var filtersHTML = "<center><b>Enhanced RT</b> (<a href=\"" + currentSiteDomain + "/EnhancedRT/settings\">Settings</a>)<br><font style=\"color:red;\">Site filters are currently disabled because of the changes made to the RT site on 2016-10-19.<br>\n\
	<label style=\"color:#666;font-size:12px;\"><input style=\"margin:0 0 0 1em;\" type=checkbox id=\"endlessVideos\" "+((endlessVideos == 1) ? "checked" : "")+">Endless Videos</label>";
	for ( i = 0; i < hide.length; i++)
	{
		filtersHTML = filtersHTML.concat("<label style=\"color:#666;font-size:12px;\"><input style=\"margin:0 0 0 1em;\" type=checkbox id="+hide[i][hideText]+" "+((hide[i][hideValue] == 0) ? "checked" : "")+" "+((i > 1) ? "disabled" : "")+">"+hide[i][hideName]+"</label>");
	}
	filtersHTML = filtersHTML.concat("</font><br>Recently Added: <a href=\"http://roosterteeth.com/episode/recently-added\">RT</a> - <a href=\"http://achievementhunter.roosterteeth.com/episode/recently-added\">AH</a> - <a href=\"http://funhaus.roosterteeth.com/episode/recently-added\">Funhaus</a> - <a href=\"http://screwattack.roosterteeth.com/episode/recently-added\">ScrewAttack</a> - <a href=\"http://gameattack.roosterteeth.com/episode/recently-added\">Game Attack</a> - <a href=\"http://theknow.roosterteeth.com/episode/recently-added\">The Know</a> - <a href=\"http://cowchop.roosterteeth.com/episode/recently-added\">Cow Chop</a> - <a href=\"http://thecreaturehub.roosterteeth.com/episode/recently-added\">Creatures</a>");
	filtersHTML = filtersHTML.concat("</center>");
	filters[0].parentNode.children[1].outerHTML = filtersHTML.concat(filters[0].parentNode.children[1].outerHTML);

	for ( i = 0; i < hide.length; i++)
	{
		document.getElementById( hide[i][hideText] ).onclick = function (event) {
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
			checkForEndlessTrigger();
		};
	}
	document.getElementById("endlessVideos").onclick = function () {
		if(endlessVideos == 1)
		{
			endlessVideos = 0;
			localStorage.setItem("endlessVideos", endlessVideos);
		}
		else
		{
			endlessVideos = 1;
			localStorage.setItem("endlessVideos", endlessVideos);
			checkForEndlessTrigger();
		}
	};
	hideVideos();


	// *******************************
	// Hide Watched or Filtered Videos
	// *******************************
	function hideVideos()
	{
		
		var block = document.getElementsByClassName("grid-blocks");
		childLI = block[0].children;
		for ( i = 0; i < childLI.length; i++)
		{
			childLI[i].style.clear = "none";
			childLI[i].style.float = "none";
			childLI[i].style.display = "inline-block";
			childLI[i].style.verticalAlign = "top";
			childLI[i].style.marginRight = "1%";
			
			video = childLI[i].children[0].href;
			/*
			if(video.search("episode/(lets-play|ahwu|things-to-do-in|play-pals|achievement-unlocked|behind-the-scenes|achievement-hunter|fails-of-the-weak|easter-eggs|achievement-hunt|five-facts|off-topic|how-to|vs-|go-|rage-quit|countdown|achievement-horse|forced-enjoyment|megacraft|sunday-driving|this-is|imaginary-achievements|theater-mode|heroes-halfwits)") >= 0)
			{
				video = video.replace(window.location.host, "achievementhunter.roosterteeth.com");
				if(hide[hideAH][hideValue] == 1)
				{
					childLI[i].style.display = "none";
				}
			}
			else if(video.search("episode/(the-know|the-patch|in-review|news-roundups|leaderboard|rt-news)") >= 0)
			{
				video = video.replace(window.location.host, "theknow.roosterteeth.com");
				if(hide[hideTK][hideValue] == 1)
				{
					childLI[i].style.display = "none";
				}
			}
			else if(video.search("episode/(rt-sponsor-cut|happy-hour|free-play|lazer-team|million-dollars-but|rt-podcast|the-slow-mo-guys|rt-animated-adventures|rt-shorts|immersion|red-vs-blue|rt-anime-podcast|on-the-spot|buff-buddies|sponsor-vlog|rt-life|sportsball|rt-specials|rwby|x-ray-and-vav|trailers|social-disorder|rooster-teeth-entertainment-system|the-strangerhood|panics|1-800-magic|music-videos|rtx|pilot-program|rt-recap|r-t-docs|rt-docs|ten-little-roosters|rt-showcase|day-5|camp-camp|crunch-time|always-open)") >= 0)
			{
				video = video.replace(window.location.host, "roosterteeth.com");
				if(hide[hideRT][hideValue] == 1)
				{
					childLI[i].style.display = "none";
				}
			}
			else if(video.search("episode/(gameplay|dude-soup|fan-show|funhaus|fullhaus|open-haus|demo-disk|rest-of|twits-crits)") >= 0)
			{
				video = video.replace(window.location.host, "funhaus.roosterteeth.com");
				if(hide[hideFH][hideValue] == 1)
				{
					childLI[i].style.display = "none";
				}
			}
			else if(video.search("episode/(.*the-1-show|sidescrollers|five-fun-facts|.*top-10|desk-of-death-battle|.*evil-craig|available-now-podcast|.*reasons-we-hate|.*-sidescrollers|.*reasons-we-love|is-.*-good|announcing-g1|.*-screwattack-royal-rumble|.*one-minute-melee|screwattacks-top-10|samus-nutty|.*death-battle|fairly-odd-relatives|pokemon-vs-digimon|.*top-5|five-more-fun-facts|.*the-best.*ever|community-project|batman-dual|how-much-would-it-cost|the-worst|clip-of-the-week|dbx|top-10s|who-is|chad-|.*great-moments-in|hard-news|metal-gear-ben|.*nerdtastic|newsroom|[advantage]-newsroom|.*out-of-the-box|reboot-or-retro|.*the-armory|.*the-industry|.*video-game-vault|yaoi-hitler|dicks|top-ten|jackie-chan-hates-his-son|top-20|what-new-shows-are-coming-to-screwattack|superman-dies|screwattack-advantage|what-other-crazy|the-great-sphero|nicks-worst|amiibottles|screwattack-story-time|.*\x3Fwho-is\x3F|what-super-powers|chuck-vs-segata|watch-parker|sega-channel|random-awesomeness|screw-attack-illustrated|game-attack)") >= 0)
			{
				video = video.replace(window.location.host, "screwattack.roosterteeth.com");
				if(hide[hideSA][hideValue] == 1)
				{
					childLI[i].style.display = "none";
				}
			}
			else if(video.search("episode/(.*cow-chop|.*amazon-prime-time|.*wrong-side-of-youtube|.*-dark-souls-3-ep-|.*-shovel-knight-amiibo-co-op-ep-|.*foreign-import-gameplay|.*virtual-reality-gameplay|.*animated-classics|.*til-i-rage)") >= 0)
			{
				video = video.replace(window.location.host, "cowchop.roosterteeth.com");
				if(hide[hideCC][hideValue] == 1)
				{
					childLI[i].style.display = "none";
				}
			}
			else if(hide[hideUnknown][hideValue] == 1)
			{
				childLI[i].style.display = "none";
			}
		*/
			// Hide Streams
			if(hide[hideStreams][hideValue] == 1)
			{
				if(video.search("episode/(.*-full-stream|fullhaus|.*-live-stream|past-livestreams|.*yt-primetime)") >= 0)
				{
					childLI[i].style.display = "none";
				}
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


	// *********************
	// Endless Video Loading
	// *********************
	if(!window.frameElement) // If not in a frame
	{
		// Setup scroll listener
		document.addEventListener("scroll", function (event) {
			checkForEndlessTrigger();
		});
		
		// Don't load a new page if already loading one.
		var endlessLoadingInProgress = 0;
		
		// Number of pages loaded without a break
		var endlessPagesLoaded = 1;
		
		// Is loading paused?
		var loadingPaused = 0;
		
		
		checkForEndlessTrigger = function(){
			//console.log("checkForEndlessTrigger");
			var endlessFrameHTML = document.getElementsByClassName("pagination")[0];
			if(endlessFrameHTML == undefined){return;}
			var endlessOffset = endlessFrameHTML.offsetTop + endlessFrameHTML.clientHeight;
			var pageOffset = window.pageYOffset + window.innerHeight;
			
			// Check if scrolled low enough to load more videos
			if(pageOffset > (endlessOffset - 100) && endlessVideos == 1)
			{
				//console.log("EndlessTriggered");
				loadNextVideoPage = function(){
					if(endlessLoadingInProgress == 0) // If not already loading a new page
					{
						if(endlessPagesLoaded < 10)
						{
							//console.log("Endless Load New Page");
							endlessLoadingInProgress = 1;
							
							// Find current page number
							var currentPage = parseInt(document.getElementsByClassName("current")[0].children[0].innerHTML);
							
							//console.log("Endless Found current page: " + currentPage);
							//Find end page number
							var endPage = parseInt(document.getElementsByClassName("controls")[0].children[11].children[0].innerHTML);
							
							
							//console.log("Endless Found end page: " + endPage);

							if(currentPage < endPage) // Don't go past last page
							{
								// Create iframe for next page of videos
								var endlessFrameHTML = document.getElementsByClassName("pagination")[0];
								
								//console.log("Endless endlessFrameHTML: " + endlessFrameHTML);
								endlessFrameHTML.outerHTML = endlessFrameHTML.outerHTML.concat("<iframe id=\"endless\" style=\"visibility: hidden;width: 1px;height: 1px;\" src=\""+currentSiteDomain+"/episode/recently-added?page="+(currentPage + 1)+"\"></iframe>");
								//console.log("Endless endlessFrameHTML.outerHTML: " + endlessFrameHTML.outerHTML);
							
								// Loading Animation
								var endlessLoadingHTML = document.getElementsByClassName("pagination")[0];
								
								
								var endlessLoadingAnimation = "<div id=\"loadingAnimation\"><center><br><img src=\"data:image/gif;base64,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\"> Loading videos from page "+ (currentPage + 1) + "</center></div>";
								
								
								endlessLoadingHTML.outerHTML = endlessLoadingAnimation.concat(endlessLoadingHTML.outerHTML);

							
								// When frame is loaded move videos and controls to parent page
								document.getElementById("endless").onload = function () {
									//console.log("Endless iframe loaded");
									//console.log(document.getElementById("endless").contentWindow.document.getElementsByClassName("grid-blocks"));
									
									//var endlessFrameVideos = window.frames["endless"].contentWindow.document.getElementsByClassName("grid-blocks");

									
									var endlessFrameVideos = document.getElementById("endless").contentWindow.document.getElementsByClassName("grid-blocks");

									
									filters[0].innerHTML = filters[0].innerHTML.concat(endlessFrameVideos[0].innerHTML);
									//console.log(endlessFrameVideos[0].innerHTML);
									
									
									//var endlessFrameControls = window.frames['endless'].contentWindow.document.getElementsByClassName("controls")[0];
									
									
									var endlessFrameControls = document.getElementById("endless").contentWindow.document.getElementsByClassName("controls")[0];
									
									var primaryControls = document.getElementsByClassName("controls")[0];
									primaryControls.outerHTML = endlessFrameControls.outerHTML;

									
									// Delete iframe when done
									var endlessFrame = document.getElementById("endless");
									endlessFrame.parentNode.removeChild(endlessFrame);
									
									// Delete loading animation when done
									var loadingDiv = document.getElementById("loadingAnimation");
									loadingDiv.parentNode.removeChild(loadingDiv);
									
									hideVideos();
									
									endlessPagesLoaded++;
									
								
									// Stop loading every 10 pages and show button to load more
									if(endlessPagesLoaded >= 10)
									{
										if(loadingPaused == 0)
										{
											loadingPaused = 1;
											var endlessLoadingHTML = document.getElementsByClassName("pagination")[0];
											var endlessLoadingButton = "<div id=\"loadingBreak\"><center><br><button id=\"loadMore\" type=\"button\">Load more videos</button></center></div>";
											endlessLoadingHTML.outerHTML = endlessLoadingButton.concat(endlessLoadingHTML.outerHTML);
											
											document.getElementById("loadMore").onclick = function () {
												endlessPagesLoaded = 0;
												loadingPaused = 0;
												// Delete load more button after clicked
												var loadingDiv = document.getElementById("loadingBreak");
												loadingDiv.parentNode.removeChild(loadingDiv);
												loadNextVideoPage();
											};
										}
									}
								
									
									endlessLoadingInProgress = 0;
									checkForEndlessTrigger();
								}
							}
						};
					}
				};
				loadNextVideoPage();
			}
		};
		
		checkForEndlessTrigger();
	}

}


// **************
// Any Video Page
// **************
if(window.location.pathname.search("/episode/") >= 0 && window.location.pathname != "/episode/recently-added" && window.location.pathname.search("/embed") == -1)
{
	//console.log("Video Page");
	//console.log(window.location.pathname.search("/embed"));
	
	window.onload = function(){
		if(window.location.hash == "#comments" && commentsStopPlayback == 1)
		{
			//var playerDiv = document.getElementById("episode-26089");
			//alert(playerDiv[0].children[0].id);
			//jwplayer(playerDiv[0].children[0].id).stop();
			
			//var playerInstance = jwplayer(episodeID);
			//var playerInstance = jwplayer('episode-26089');
			//playerInstance.stop();
			
			//console.log(window.location.hash);
			exec(function() {
				var playerDiv = document.getElementsByClassName("container");
				episodeID = playerDiv[0].children[0].id;
				var playerInstance = jwplayer(episodeID);
				//alert("test pause");
				playerInstance.play(false);
				/*
				function stopVideoNow()
				{
					//alert("playing");
					if(videoStopped == 0)
					{
						//alert("stopping");
						videoStopped = 1;
						playerInstance.pause();
					}
				}
				videoStopped = 0;
				//playerInstance.onPlay(stopVideoNow());
				playerInstance.onBeforePlay(stopVideoNow())
				*/
			});
		}
		
		if(videoAlign == 1 && window.location.hash != "#comments")
		{
			//console.log("align video");
			var heroBlock = document.getElementById("hero-block");
			//var scrollPos = -window.pageYOffset + ((heroBlock.offsetTop + heroBlock.clientHeight) - window.innerHeight);
			var scrollPos = (heroBlock.offsetTop + heroBlock.clientHeight) - window.innerHeight;
			/*
			alert("Block Top: "+heroBlock.offsetTop+"\n\
			Block Height: "+heroBlock.clientHeight+"\n\
			Window pageYOffset: "+window.pageYOffset+"\n\
			Window innerHeight: "+window.innerHeight);
			alert(scrollPos);
			*/
			window.scrollTo(0, parseInt(scrollPos));
		}

		
		function linkVideoTimestamps(commentElement)
		{
			for ( var i = 0; i < commentElement.length; i++)
			{
				var j = 2;
				while(commentElement[i].children[1].children[j].tagName != "DIV")
				{
					//console.log("Comment: "+i+", Line: "+j)
					//commentElement[i].children[1].children[j].innerHTML = commentElement[i].children[1].children[j].innerHTML.replace(/(?!<a[^>]*?>)((\d|\d\d)(:))?(\d|\d\d)(:)(\d\d)(?![^<]*?<\/a>)/g, "<a title=\"Go to video timestamp $2$3$4$5$6\" href=\"#\" onclick=\"var heroBlock = document.getElementById('hero-block');var scrollPos = (heroBlock.offsetTop + heroBlock.clientHeight) - window.innerHeight;window.scrollTo(0, scrollPos);if(jwplayer('"+episodeID+"').getState()!=='playing' && jwplayer('"+episodeID+"').getState()!=='paused'){jwplayer('"+episodeID+"').play(true);setTimeout(function() {jwplayer('"+episodeID+"').seek((0$2*3600)+($4*60)+$6);}, 1000);}else{jwplayer('"+episodeID+"').seek((0$2*3600)+($4*60)+$6);}return false;\">$2$3$4$5$6</a>");
					
					commentElement[i].children[1].children[j].innerHTML = commentElement[i].children[1].children[j].innerHTML.replace(/(?!<a[^>]*?>)((\d|\d\d)(:))?(\d|\d\d)(:)(\d\d)(?![^<]*?<\/a>)/g, "<a title=\"Go to video timestamp $2$3$4$5$6\" href=\"javascript:undefined\" onclick=\"var heroBlock = document.getElementById('hero-block');var scrollPos = (heroBlock.offsetTop + heroBlock.clientHeight) - window.innerHeight;window.scrollTo(0,  parseInt(scrollPos));document.getElementById('"+videoID+"').currentTime=(0$2*3600)+($4*60)+$6;document.getElementById('"+videoID+"').play();\">$2$3$4$5$6</a>");
					j++;
				}
				
				// Check for comment replies
				j++;
				//console.log(commentElement[i].children[1].children[j]);
				if(commentElement[i].children[1].children[j] != undefined)
				{
					//console.log(commentElement[i].children[1].children[j].tagName);
					if(commentElement[i].children[1].children[j].tagName == "FORM")
					{
						j++;
					}
					
					if(commentElement[i].children[1].children[j].children[0] != undefined)
					{
						//console.log(commentElement[i].children[1].children[j].children.length+" comment Replies Detected");
						var commentReplies = commentElement[i].children[1].children[j].children;
						linkVideoTimestamps(commentReplies);
					}
				}
			}
		}
		
		// Comment Timestamps
		var commentsList = document.getElementsByClassName("comments-list");
		var comments = commentsList[0].children;
		//var playerDiv = document.getElementsByClassName("jwplayer");
		//var episodeID = playerDiv[0].id;
		var videoID = document.getElementsByTagName("video")[0].id;

		linkVideoTimestamps(comments);
		
		var controls = document.getElementsByClassName("controls")[0];
		
		// If there is more than 1 page of comments
		if(controls != undefined)
		{
			controls.addEventListener('click', function() {
				setTimeout(function() {
					var commentsList = document.getElementsByClassName("comments-list");
					var comments = commentsList[0].children;
					linkVideoTimestamps(comments);
				}, 3000);
			});
		}


	}
		
}


// ****************
// Live Stream Page
// ****************
if(window.location.pathname.search("/livestream/") >= 0)
{
	//console.log("Live Stream Page");
	
	if(liveStreamAlign == 1)
	{
		window.onload = function(){
			var heroBlock = document.getElementById("hero-block");
			//var scrollPos = -window.pageYOffset + ((heroBlock.offsetTop + heroBlock.clientHeight) - window.innerHeight);
			var scrollPos = (heroBlock.offsetTop + heroBlock.clientHeight) - window.innerHeight;
			/*
			alert("Block Top: "+heroBlock.offsetTop+"\n\
			Block Height: "+heroBlock.clientHeight+"\n\
			Window pageYOffset: "+window.pageYOffset+"\n\
			Window innerHeight: "+window.innerHeight);
			alert(scrollPos);
			*/
			window.scrollTo(0, parseInt(scrollPos));
		}
	}
}