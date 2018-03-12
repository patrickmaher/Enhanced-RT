// ==UserScript==
// @name       Enhanced RT
// @version    3.0.0
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
-Endless loading of videos on the Recently Added page. (Currently broken)
-Converts video time stamps in comments into click-able links.
-Settings page which can be accessed from the profile menu at the top right of the page.
-Legacy favorite icons for Funhaus, Achievement Hunter, ScrewAttack, and The Know.
-Align videos to browser window on video and live stream pages.
-Pauses video when video page loaded using comments button.

The Known Issues
================
-Filtering is based on a list of show titles that I manually entered. If new shows are added the list needs to be updated to correctly filter that show.
-Endless Video feature makes queue button reload the page in order to queue a video instead of doing it in the background.
-When switching between comment pages on video pages, timestamps in comments may not be detected if the comments took too long to load. Need to find a way to detect when comments are loaded instead of using time delay.

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
3.0.0
-Added initial support for the Rooster Teeth Beta site.
-Created Beta site Recently Added video page which uses Rooster Teeth's API to determine available channles and videos.
-Beta site Recently Added page displays videos in a grid view, allows the user to loaded additional videos on the page, and the videos can be filtered by channel.
-Beta site RECENT VIDEOS text on home page is converted to a clickable link to the Recently Added page.
-Beta site video comment timestamps are converted to clickable links.
-Beta site Binge Mode on/off setting added to the settings page.


2.0.6
-Removed temporary fix that adds Sugar Pine 7 to the channel filter drop down options. No longer needed now that it has been officially added to the website.

2.0.5
-Added Game Attack and Sugar Pine 7 filters.
-Removed Endless Videos options since the feature isn't working.
-Temporary fix that adds Sugar Pine 7 to the channel filter drop down options

2.0.4
-Fixes for updates made to RT sites.

2.0.3
-Negative timestamps in video comments now link to the correct position in the video
-Changed video comments timestamp detection delay when switching between comment pages. Was waiting 3 seconds for comments to load, now waits 7 seconds. Need to find a way to detect when comments are loaded instead of using time delay.

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
-Added filter for Cow Chop. Note that older Cow Chop and UberHaxorNova videos cannot be properly detected because there is no naming convention used. Please use the new Unknown filter for those.
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
var hideGA = 8;
var hideSP7 = 9;
var hideUnknown = 10;
hideValue = 0;
hideText = 1;
hideName = 2;
currentSiteDomain = window.location.protocol + "//" + window.location.host;


// Load Stored Settings
var hide = createArray(11, 3);
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
hide[hideGA][hideValue] = ((localStorage.getItem("hideGA") == null) ? 0 : localStorage.getItem("hideGA"));
hide[hideGA][hideText] = "hideGA";
hide[hideGA][hideName] = "Game Attack";
hide[hideSP7][hideValue] = ((localStorage.getItem("hideSP7") == null) ? 0 : localStorage.getItem("hideSP7"));
hide[hideSP7][hideText] = "hideSP7";
hide[hideSP7][hideName] = "Sugar Pine 7";
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


// SVOD Beta Load Endless Video Setting
var videoBinge = ((localStorage.getItem("video-binge") == null) ? "true" : localStorage.getItem("video-binge"));


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
else if(window.location.host.search("gameattack.roosterteeth.com") >= 0) // Game Attack
{
    currentSite = "GA";
    //currentSiteDomain = "gameattack.roosterteeth.com";

    // favicon
    var favIcon = "";
}
else if(window.location.host.search("sugarpine7.roosterteeth.com") >= 0) // Sugar Pine 7
{
    currentSite = "SP7";
    //currentSiteDomain = "sugarpine7.roosterteeth.com";

    // favicon
    var favIcon = "";
}
else if(window.location.host.search("svod.roosterteeth.com") >= 0) // SVOD
{
	currentSite = "SVOD";
	var favIcon = "";
}
else
{
	currentSite = "Unknown";
	var favIcon = "";
}

//console.log(currentSite);
//console.log(currentSiteDomain);


if(currentSite != "SVOD") // Not on SVOD
{

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
	var settingsHTML = "<center><div style=\"display: inline-block;padding: 10px;\"><h1>Enhanced RT Settings</h1><div style=\"border:1px solid black;display: inline-block;padding: 10px;\"><h3>Recently Added Page Settings</h3>\n";
	//<label style=\"color:#666;font-size:12px;\"><input style=\"margin:0 0 0 1em;\" type=checkbox id=\"endlessVideos\" "+((endlessVideos == 1) ? "checked" : "")+">Endless Videos</label>";
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
	
	
/*	document.getElementById("endlessVideos").onclick = function () {
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
*/	
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
	// Temp Fix to add SP7 drop down option
	// ***************
/*	
	SP7fix = document.createElement('option');
	SP7fix.value = '9';
	SP7fix.dataset.filter = 'sugarpine7';
	SP7fix.label = 'Sugar Pine 7';
	var channelFilter = document.getElementById("channelFilter");
	channelFilter.append(SP7fix);
*/
	
	
	// ***************
	// Filter Controls
	// ***************
	var filters = document.getElementsByClassName("grid-blocks");
	var recentHeader = document.getElementsByClassName("recently-added-header");
	//alert(filters[0].parentNode.children[1].outerHTML);
	
	
	var filtersHTML = "<center><b>Enhanced RT</b> (<a href=\"" + currentSiteDomain + "/EnhancedRT/settings\">Settings</a>)<br>\n";
	
	/*<label style=\"color:#666;font-size:12px;\"><input style=\"margin:0 0 0 1em;\" type=checkbox id=\"endlessVideos\" "+((endlessVideos == 1) ? "checked" : "")+">Endless Videos</label>*/


	for ( i = 0; i < hide.length; i++)
	{
		filtersHTML = filtersHTML.concat("<label style=\"color:#666;font-size:12px;\"><input style=\"margin:0 0 0 1em;\" type=checkbox id="+hide[i][hideText]+" "+((hide[i][hideValue] == 0) ? "checked" : "")+ ">" +hide[i][hideName]+"</label>");
	}
	
	
	filtersHTML = filtersHTML.concat("</font>");
	//filtersHTML = filtersHTML.concat("<br><img src=\"https://yt3.ggpht.com/-hddEYyXVeZM/AAAAAAAAAAI/AAAAAAAAAAA/ghwEL1-FHdE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg\" title=\"Rooster Teeth\" height=\"50\" width=\"50\" style=\"opacity: 1;\"><img src=\"https://yt3.ggpht.com/--LriGZRRpiw/AAAAAAAAAAI/AAAAAAAAAAA/ttVIfJrhhSo/s100-c-k-no-mo-rj-c0xffffff/photo.jpg\" title=\"Achievement Hunter\" height=\"50\" width=\"50\" style=\"opacity: 0.4;\"><img src=\"https://yt3.ggpht.com/-HILPkklaPdc/AAAAAAAAAAI/AAAAAAAAAAA/hQJlzz2yVKo/s100-c-k-no-mo-rj-c0xffffff/photo.jpg\" title=\"Funhaus\" height=\"50\" width=\"50\" style=\"opacity: 1;\"><img src=\"https://yt3.ggpht.com/-SUZQeTehAWg/AAAAAAAAAAI/AAAAAAAAAAA/5qECcvH4Tgw/s100-c-k-no-mo-rj-c0xffffff/photo.jpg\" title=\"ScrewAttack\" height=\"50\" width=\"50\" style=\"opacity: 1;\"><img src=\"https://yt3.ggpht.com/-GNSc5FQPkL8/AAAAAAAAAAI/AAAAAAAAAAA/RaKPDs9yekM/s100-c-k-no-mo-rj-c0xffffff/photo.jpg\" title=\"Game Attack\" height=\"50\" width=\"50\" style=\"opacity: 1;\"><img src=\"https://yt3.ggpht.com/-0lKHa9Wjo54/AAAAAAAAAAI/AAAAAAAAAAA/fVDFDWwii7A/s100-c-k-no-mo-rj-c0xffffff/photo.jpg\" title=\"The Know\" height=\"50\" width=\"50\" style=\"opacity: 0.4;\"><img src=\"https://yt3.ggpht.com/-JFEziQI27OU/AAAAAAAAAAI/AAAAAAAAAAA/txesb6uR8BE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg\" title=\"Cow Chop\" height=\"50\" width=\"50\" style=\"opacity: 1;\"><img src=\"https://yt3.ggpht.com/-k4hkmiUDStw/AAAAAAAAAAI/AAAAAAAAAAA/cNfVCYG3lng/s100-c-k-no-mo-rj-c0xffffff/photo.jpg\" title=\"The Creatures\" height=\"50\" width=\"50\" style=\"opacity: 1;\">");
	//filtersHTML = filtersHTML.concat("<br>Recently Added: <a href=\"http://roosterteeth.com/episode/recently-added\">RT</a> - <a href=\"http://achievementhunter.roosterteeth.com/episode/recently-added\">AH</a> - <a href=\"http://funhaus.roosterteeth.com/episode/recently-added\">Funhaus</a> - <a href=\"http://screwattack.roosterteeth.com/episode/recently-added\">ScrewAttack</a> - <a href=\"http://gameattack.roosterteeth.com/episode/recently-added\">Game Attack</a> - <a href=\"http://theknow.roosterteeth.com/episode/recently-added\">The Know</a> - <a href=\"http://cowchop.roosterteeth.com/episode/recently-added\">Cow Chop</a> - <a href=\"http://thecreaturehub.roosterteeth.com/episode/recently-added\">Creatures</a>");
	filtersHTML = filtersHTML.concat("</center>");
	
	
	var div = document.createElement("div");
	//div.className = "container-fluid";
	div.innerHTML = filtersHTML;
	
	//var element = recentHeader[0];
	//element.appendChild(div);
	
	var element = document.getElementsByClassName("col-lg-8")[0];
	element.insertBefore(div, element.childNodes[2]);
	
	//var element = document.getElementsByName("paginated-results")[0];
	//element.insertBefore(div, element.childNodes[0]);
	
	//recentHeader[0].outerHTML = recentHeader[0].outerHTML.concat(filtersHTML);

	
	
	filters[0].id = "detect";
	
	//document.getElementsByClassName("grid-blocks")[0].id = "detect";
	
	// select the target node
	//var target = document.getElementById("detect");
	var target = document.getElementById("recently-added-grid");
	
	// create an observer instance
	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
		console.log(mutation);
	  });
	  console.log("hide videos after change");
	  hideVideos();
	});
	 
	// configuration of the observer:
	//var config = { attributeFilter: ["style"] };
	var config = { attributes: true, childList: true, characterData: true };

	 
	// pass in the target node, as well as the observer options
	observer.observe(target, config);
	
	
	
	

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
			//checkForEndlessTrigger();
		};
	}
/*	document.getElementById("endlessVideos").onclick = function () {
		if(endlessVideos == 1)
		{
			endlessVideos = 0;
			localStorage.setItem("endlessVideos", endlessVideos);
		}
		else
		{
			endlessVideos = 1;
			localStorage.setItem("endlessVideos", endlessVideos);
			//checkForEndlessTrigger();
		}
	};
*/
	
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
			
			if(video.search("achievementhunter.roosterteeth.com") >= 0)
			{
				if(hide[hideAH][hideValue] == 1)
				{
					childLI[i].style.display = "none";
				}
			}
			else if(video.search("theknow.roosterteeth.com") >= 0)
			{
				if(hide[hideTK][hideValue] == 1)
				{
					childLI[i].style.display = "none";
				}
			}
			else if(video.search("//roosterteeth.com") >= 0)
			{
				if(hide[hideRT][hideValue] == 1)
				{
					childLI[i].style.display = "none";
				}
			}
			else if(video.search("funhaus.roosterteeth.com") >= 0)
			{
				if(hide[hideFH][hideValue] == 1)
				{
					childLI[i].style.display = "none";
				}
			}
			else if(video.search("screwattack.roosterteeth.com") >= 0)
			{
				if(hide[hideSA][hideValue] == 1)
				{
					childLI[i].style.display = "none";
				}
			}
			else if(video.search("cowchop.roosterteeth.com") >= 0)
			{
				if(hide[hideCC][hideValue] == 1)
				{
					childLI[i].style.display = "none";
				}
			}
			else if(video.search("gameattack.roosterteeth.com") >= 0)
			{
				if(hide[hideGA][hideValue] == 1)
				{
					childLI[i].style.display = "none";
				}
			}
			else if(video.search("sugarpine7.roosterteeth.com") >= 0)
			{
				if(hide[hideSP7][hideValue] == 1)
				{
					childLI[i].style.display = "none";
				}
			}
			else if(hide[hideUnknown][hideValue] == 1)
			{
				childLI[i].style.display = "none";
			}
			
			
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

/*
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
*/
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
					
					commentElement[i].children[1].children[j].innerHTML = commentElement[i].children[1].children[j].innerHTML.replace(/(?!<a[^>]*?>)(-)?((\d|\d\d)(:))?(\d|\d\d)(:)(\d\d)(?![^<]*?<\/a>)/g, "<a title=\"Go to video timestamp $1$3$4$5$6$7\" href=\"javascript:undefined\" onclick=\"var heroBlock = document.getElementById('hero-block');var scrollPos = (heroBlock.offsetTop + heroBlock.clientHeight) - window.innerHeight;window.scrollTo(0,  parseInt(scrollPos));if('$1' == '-'){document.getElementById('"+videoID+"').currentTime=(Math.floor(document.getElementById('"+videoID+"').duration))-((0$3*3600)+($5*60)+$7);}else{document.getElementById('"+videoID+"').currentTime=(0$3*3600)+($5*60)+$7;}document.getElementById('"+videoID+"').play();\">$1$3$4$5$6$7</a>"); 
					j++;
					
					//1 is $1, 2 is $2, 3 is $3, 4 is $4, 5 is $5, 6 is $6, 7 is $7, //regex parts for testing
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
				}, 7000);
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

}// Not on SVOD
else // On SVOD
{
	// Try to use MutationObserver to detect page changes since Beta site loads pages differently
	
	/*
	// select the target node
	var target = document.getElementsByClassName("main-col")[0];
	
	// create an observer instance
	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
		console.log(mutation);
	  });
	  console.log("Page Change Detected");
	  console.log(window.location.pathname);
	});
	 
	// configuration of the observer:
	//var config = { attributeFilter: ["style"] };
	var config = { childList:true, subtree:true };

	 
	// pass in the target node, as well as the observer options
	observer.observe(target, config);
	*/
	
	
	(function(win) {
		'use strict';
		
		var listeners = [], 
		doc = win.document, 
		MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
		observer;
		
		function ready(selector, fn) {
			// Store the selector and callback to be monitored
			listeners.push({
				selector: selector,
				fn: fn
			});
			if (!observer) {
				// Watch for changes in the document
				observer = new MutationObserver(check);
				observer.observe(document.getElementsByClassName("main-col")[0], {
					childList: true,
					subtree: true
				});
			}
			// Check if the element is currently in the DOM
			check();
		}
			
		function check() {
			// Check the DOM for elements matching a stored selector
			for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
				listener = listeners[i];
				// Query for elements matching the specified selector
				elements = doc.querySelectorAll(listener.selector);
				for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
					element = elements[j];
					// Make sure the callback isn't invoked with the 
					// same element more than once
					if (!element.ready) {
						element.ready = true;
						// Invoke the callback with the element
						listener.fn.call(element, element);
					}
				}
			}
		}

		// Expose `ready`
		win.ready = ready;
				
	})(this);
	
	
	ready('.carousel-title', function(element) {
		//console.log("Enhanced RT: Carousel Detected");
		//console.log(element.childNodes[0].nodeValue);
		
		if(element.childNodes[0] != undefined && element.childNodes[0].nodeValue == "recent videos")
		{
			var recentLink = document.createElement("a");
			recentLink.className = "carousel-title link";
			recentLink.href = "/episode/recently-added";
			recentLink.appendChild(document.createTextNode("recent videos "));
			var recentArrow = document.createElement("i");
			recentArrow.className = "show-more icon-keyboard_arrow_right";
			recentLink.appendChild(recentArrow);
			element.parentNode.insertBefore(recentLink, element);
			element.parentNode.removeChild(element);
		}
		
	});
	
	
	ready('.episode-main', function(element) {
		if(window.location.pathname.search("/episode/recently-added") >= 0)
		{
			//console.log("Enhanced RT: Recently Added Page Detected");
			//console.log(element);
			recentlyAdded();
		}
	});
	
	
	ready('.Linkify', function(element) {
		if(window.location.pathname.search("/episode/") >= 0)
		{
			//console.log("Enhanced RT: Comment Detected");
			//console.log(element);
			detectVideoTimestamps(element);
		}
	});
	
	ready('.settings-app', function(element) {
		//console.log("Enhanced RT: Settings Page Detected");
		displaySettings();
	});
	
	
	
	// *******************
	// Settings Page
	// *******************
	function displaySettings()
	{
		//console.log(document.getElementsByClassName("simplebar-content")[1]);

		// Create elements for Enhanced RT settings
		var settingsDiv = document.createElement("div");
		settingsDiv.className = "settings-app__page";
		settingsDiv.style = "margin-top: 50px;";
		
		var settingsSection = document.createElement("section");
		settingsSection.className = "settings-app__section";
		
		var settingsHeader = document.createElement("h2");
		settingsHeader.className = "settings-app__subheading";
		settingsHeader.appendChild(document.createTextNode("Enhanced RT"));
		
		var settingsList = document.createElement("ul");
		settingsList.className = "form-list";
		
		var settingsItem = document.createElement("li");
		settingsItem.className = "form-list__row qa-username-form";
		
		var settingsLabel = document.createElement("span");
		settingsLabel.className = "form-list__label";
		settingsLabel.appendChild(document.createTextNode("Binge Mode"));
		
		var settingsCell = document.createElement("div");
		settingsCell.className = "form-list__cell";
		
		var settingsCheckbox = document.createElement("input");
		settingsCheckbox.type = "checkbox";
		settingsCheckbox.id = "video-binge";
		settingsCheckbox.defaultChecked = ((videoBinge == "true") ? true : false);
		//console.log(videoBinge);
		//console.log(settingsCheckbox.defaultChecked);
		
		settingsCheckbox.style="position: static; opacity: 100; pointer-events:auto; margin:0 0 0 1em; width: 17px; height: 17px;";
		
		settingsDiv.appendChild(settingsSection);
		settingsSection.appendChild(settingsHeader);
		settingsSection.appendChild(settingsList);
		settingsList.appendChild(settingsItem);
		settingsItem.appendChild(settingsLabel);
		settingsItem.appendChild(settingsCell);
		settingsCell.appendChild(settingsCheckbox);
		
		document.getElementsByClassName("simplebar-content")[1].appendChild(settingsDiv);
		
		
		document.getElementById("video-binge").onclick = function (event)
		{
			if(videoBinge == "true")
			{
				videoBinge = "false";
				localStorage.setItem("video-binge", videoBinge);
			}
			else
			{
				videoBinge = "true";
				localStorage.setItem("video-binge", videoBinge);
			}
		};
	
		
		//console.log(document.getElementsByClassName("simplebar-content")[1]);

	}

	// Get settings from local storage
	var watchedFilter = new Array;
	var watchedFilterString = localStorage.getItem("enhancedRT_watchedFilter");
	watchedFilter = ((watchedFilterString == null) ? [] : JSON.parse(watchedFilterString));
	
	var streamFilter = new Array;
	var streamFilterString = localStorage.getItem("enhancedRT_streamFilter");
	streamFilter = ((streamFilterString == null) ? [] : JSON.parse(streamFilterString));
	
	var channelFilter = new Array;
	var channelFilterString = localStorage.getItem("enhancedRT_channelFilter");
	channelFilter = ((channelFilterString == null) ? [] : JSON.parse(channelFilterString));
	
	var seriesFilter = new Array;
	var seriesFilterString = localStorage.getItem("enhancedRT_seriesFilter");
	seriesFilter = ((seriesFilterString == null) ? [] : JSON.parse(seriesFilterString));
	
	
	// *******************
	// Recently Added Page
	// *******************
	function recentlyAdded()
	{	

			
		var episodePage = 1;
		var episodesPerPage = 24;
		
		
		// ***Initial Setup Start***

		// Create elements for episode grid
		var showWrapperDiv = document.createElement("div");
		showWrapperDiv.className = "show-main__wrapper";
		
		// Start by appending parent element to page. The other elements will be added to it.
		document.getElementsByClassName("simplebar-content")[1].appendChild(showWrapperDiv);
		
		// ***Filters Setup Start***
		
		// Filters
		var CenterHeader = document.createElement("center");
		var headerDiv = document.createElement("div");
		var pageTitleHeader = document.createElement("h4");
		pageTitleHeader.className = "shows-title";
		var pageTitleSpan = document.createElement("span");
		CenterHeader.appendChild(headerDiv);
		headerDiv.appendChild(pageTitleHeader);
		pageTitleHeader.appendChild(pageTitleSpan);
		pageTitleSpan.appendChild(document.createTextNode("Recently Added (Enhanced RT)"));
		showWrapperDiv.appendChild(CenterHeader);


		
		
		// Get List of Channels
		var channelsXMLHttp = new XMLHttpRequest();
		
		channelsXMLHttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var channelsObj = JSON.parse(this.responseText);
				
				for (var i = 0, len = channelsObj.data.length; i < len; i++)
				{
					//console.log("Name: " + channelsObj.data[i].attributes.name + " ID: " + channelsObj.data[i].uuid);
					//channelArray[channelsObj.data[i].uuid] = "true";
					
					
					var channelLabel = document.createElement("label");
					channelLabel.style = "font-size: 1.64rem;";
					var channelCheckbox = document.createElement("input");
					channelCheckbox.type = "checkbox";
					channelCheckbox.id = channelsObj.data[i].uuid;
					channelCheckbox.defaultChecked = ((channelFilter.indexOf(channelsObj.data[i].uuid) == -1) ? true : false);
					channelCheckbox.style = "position: static; opacity: 100; pointer-events:auto; margin:0 0 0 1em; width: 17px; height: 17px;";
					channelLabel.appendChild(channelCheckbox);
					channelLabel.appendChild(document.createTextNode(channelsObj.data[i].attributes.name));
					
					headerDiv.appendChild(channelLabel);
					
					channelLabel.onclick = function (event)
					{
						if(event.target.checked == true)
						{
							//console.log("onclick checked: " + event.target.checked);
							if (channelFilter.indexOf(event.target.id) != -1) {
								channelFilter.splice(channelFilter.indexOf(event.target.id), 1);
							}
							localStorage.setItem("enhancedRT_channelFilter", JSON.stringify(channelFilter));
						}
						else if(event.target.checked == false)
						{
							//console.log("onclick unchecked: " + event.target.checked);
							if (channelFilter.indexOf(event.target.id) == -1) {
								channelFilter.push(event.target.id)
							}
							localStorage.setItem("enhancedRT_channelFilter", JSON.stringify(channelFilter));
						}
						
						hideVideos();
						checkForEndlessTrigger();
					};
					
				}
			}
		};
		
		// Request channels list from server
		channelsXMLHttp.open("GET", "https://svod-be.roosterteeth.com/api/v1/channels", true);
		channelsXMLHttp.send();
		
		/*
		for ( i = 0; i < hide.length; i++)
		{
			//<label style=\"color:#666;font-size:12px;\"><input style=\"margin:0 0 0 1em;\" type=checkbox id="+hide[i][hideText]+" "+((hide[i][hideValue] == 0) ? "checked" : "")+ ">" +hide[i][hideName]+"</label>"
			var channelLabel = document.createElement("label");
			//channelLabel.style = "color:#666;font-size:12px;";
			channelLabel.style = "font-size: 1.64rem;";

			var channelCheckbox = document.createElement("input");
			//channelCheckbox.style = "margin:0 0 0 1em;";
			channelCheckbox.type = "checkbox";
			channelCheckbox.id = hide[i][hideText];
			channelCheckbox.defaultChecked = ((hide[i][hideValue] == 0) ? true : false);
			channelCheckbox.style = "position: static; opacity: 100; pointer-events:auto; margin:0 0 0 1em; width: 17px; height: 17px;";
			channelLabel.appendChild(channelCheckbox);
			channelLabel.appendChild(document.createTextNode(hide[i][hideName]));
			
			headerDiv.appendChild(channelLabel);
			
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
		*/
		
		/*
		var rtLogoDiv = document.createElement("div");
		rtLogoDiv.style="background-color: #c9373f; width: 50px; height: 50px; -webkit-mask-box-image: url(https://svod.roosterteeth.com/img/RT_Cockbite_White.png);"
		headerDiv.appendChild(rtLogoDiv);
		var ahLogoDiv = document.createElement("div");
		ahLogoDiv.style="background-color: #5f9f41; width: 50px; height: 50px; -webkit-mask-box-image: url(https://svod.roosterteeth.com/img/AH_Logo_White.png);"
		headerDiv.appendChild(ahLogoDiv);
		var fhLogoDiv = document.createElement("div");
		fhLogoDiv.style="background-color: #fe8204; width: 50px; height: 50px; -webkit-mask-box-image: url(https://svod.roosterteeth.com/img/FH_Logo_White.png);"
		headerDiv.appendChild(fhLogoDiv);
		var saLogoDiv = document.createElement("div");
		saLogoDiv.style="background-color: #00aeef; width: 50px; height: 50px; -webkit-mask-box-image: url(https://svod.roosterteeth.com/img/SA_Logo_White.png);"
		headerDiv.appendChild(saLogoDiv);
		var ccLogoDiv = document.createElement("div");
		ccLogoDiv.style="background-color: #d5b037; width: 50px; height: 50px; -webkit-mask-box-image: url(https://svod.roosterteeth.com/img/CC_Logo_White.png);"
		headerDiv.appendChild(ccLogoDiv);
		var sp7LogoDiv = document.createElement("div");
		sp7LogoDiv.style="background-color: #1bb479; width: 50px; height: 50px; -webkit-mask-box-image: url(https://svod.roosterteeth.com/img/SP7_Logo_White.png);"
		headerDiv.appendChild(sp7LogoDiv);
		var gaLogoDiv = document.createElement("div");
		gaLogoDiv.style="background-color: #8b54dc; width: 50px; height: 50px; -webkit-mask-box-image: url(https://svod.roosterteeth.com/img/GA_Logo_White.png);"
		headerDiv.appendChild(gaLogoDiv);
		var tkLogoDiv = document.createElement("div");
		tkLogoDiv.style="background-color: #00639d; width: 50px; height: 50px; -webkit-mask-box-image: url(https://svod.roosterteeth.com/img/TK_Logo_White.png);"
		headerDiv.appendChild(tkLogoDiv);
		var jtLogoDiv = document.createElement("div");
		jtLogoDiv.style="background-color: #FC1334; width: 175px; height: 175px; -webkit-mask-image: url(https://rtv3-image.roosterteeth.com/store/bed8a666-3528-4c89-9dc9-643bacf0c681.png/original/SongsAboutGamesLogo.png); -webkit-mask-position: right; transform: scale(0.33);"
		headerDiv.appendChild(jtLogoDiv);
		
		https://svod.roosterteeth.com/img/JT_Logo_White.png
		*/
		
		
		// ***Filters Setup End***

		
		
		// ***Episode Grid Setup Start***

		
		var showContainerSection = document.createElement("section");
		showContainerSection.className = "show-container";
		
		var showContentDiv = document.createElement("div");
		showContentDiv.className = "show-content";
		
		var carouselContainerSection = document.createElement("section");
		carouselContainerSection.className = "carousel-container";
		
		var episodeGridContainerDiv = document.createElement("div");
		episodeGridContainerDiv.className = "episode-grid-container row";
		
		var showMoreDiv = document.createElement("div");
		showMoreDiv.className = "col s12 show-more";
		showMoreDiv.appendChild(document.createTextNode("show more"));
		
		var arrowDownIcon = document.createElement("i");
		arrowDownIcon.className = "icon-keyboard_arrow_down";
		
		// Connect elements for episode grid
		showWrapperDiv.appendChild(showContainerSection);
		showContainerSection.appendChild(showContentDiv);
		showContentDiv.appendChild(carouselContainerSection);
		carouselContainerSection.appendChild(episodeGridContainerDiv);
		episodeGridContainerDiv.appendChild(showMoreDiv);
		showMoreDiv.appendChild(arrowDownIcon);
		
		showMoreDiv.onclick = function (event)
		{
			getEpisodes(xmlhttp, episodePage, episodesPerPage);
			episodePage++;
			hideVideos();
			//checkForEndlessTrigger();
		};

		// Move footer to new location
		document.getElementsByClassName("show-main__wrapper")[0].appendChild(document.getElementsByClassName("footer-container")[0]);

		// Delete episodes div that will not be used
		document.getElementsByClassName("episode-content")[0].remove();
		
		
		
		// ***Episode Grid Setup End***


		
		// ***Episode Clone Setup Start***

		
		
		// Create elements used to display individual episode 
		var episodeDiv = document.createElement("div");
		episodeDiv.className = "col s12 m4 l3";
		
		var episodeCardDiv = document.createElement("div");
		episodeCardDiv.className = "episode-card";
		
		var cardContentDiv = document.createElement("div");
		cardContentDiv.className = "card-content";
		
		var cardImageDiv = document.createElement("div");
		cardImageDiv.className = "card-image-wrapper";
		
		var imageLink = document.createElement("a");
		imageLink.href = "***Episode URL***";
		
		var imageDiv = document.createElement("div");
		imageDiv.className = "image";
		imageDiv.style = "background-image: url(\"***Thumbnail URL***\");";
		
		var timestampDiv = document.createElement("div");
		timestampDiv.className = "timestamp";
		timestampDiv.appendChild(document.createTextNode("***Timestamp Text***"));
		
		
		var infoDiv = document.createElement("div");
		infoDiv.className = "info-line";
		
		var infoLeftDiv = document.createElement("div");
		infoLeftDiv.className = "info-left";
		
		var titleLink = document.createElement("a");
		titleLink.className = "episode-title";
		titleLink.href = "***Episode URL***";
		titleLink.appendChild(document.createTextNode("***Episode Title Text***"));
		
		var episodeExtraDiv = document.createElement("div");
		episodeExtraDiv.className = "episode-extra";
		var dateText = document.createTextNode("***Episode Date***");
		
		var seriesLink = document.createElement("a");
		seriesLink.className = "episode-extra__link";
		seriesLink.href = "***Series URL***";
		seriesLink.appendChild(document.createTextNode("***Series Name Text***"));
		
		
		// Connect elements for individual episode
		episodeDiv.appendChild(episodeCardDiv);
			episodeCardDiv.appendChild(cardContentDiv);
				cardContentDiv.appendChild(cardImageDiv);
					cardImageDiv.appendChild(imageLink);
						imageLink.appendChild(imageDiv);
						imageLink.appendChild(timestampDiv);
				cardContentDiv.appendChild(infoDiv);
					infoDiv.appendChild(infoLeftDiv);
						infoLeftDiv.appendChild(titleLink);
						infoLeftDiv.appendChild(episodeExtraDiv);
							episodeExtraDiv.appendChild(seriesLink);
							episodeExtraDiv.appendChild(dateText);




		// ***Episode Clone Setup Start***


		
		// ***Initial Setup End***
		
		
		
		
		// Get List of Episodes
		var xmlhttp = new XMLHttpRequest();
		/*
		xmlhttp.status = function() {
			console.log();
			
		}
		*/
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {

				// Episode list
				var myObj = JSON.parse(this.responseText);

				// Parse episodes in list
				for (var i = 0, len = myObj.data.length; i < len; i++) {
					//console.log("Title: " + myObj.data[i].attributes.title + " Show: " + myObj.data[i].attributes.show_title + " Channel: " + myObj.data[i].attributes.channel_id);

					// Clone element structure for individual episodes. Don't need to rebuild the whole structure for each episode.
					var cloneEpisodeDiv = episodeDiv.cloneNode(true);

					// Update cloned elements with current episodes information
					cloneEpisodeDiv.id = myObj.data[i].attributes.channel_id;
					cloneEpisodeDiv.getElementsByClassName("card-image-wrapper")[0].childNodes[0].href = "/episode/" + myObj.data[i].attributes.slug;
					cloneEpisodeDiv.getElementsByClassName("image")[0].style = "background-image: url(\"" + myObj.data[i].included.images["0"].attributes.small + "\");";
					cloneEpisodeDiv.getElementsByClassName("episode-title")[0].href = "/episode/" + myObj.data[i].attributes.slug;
					cloneEpisodeDiv.getElementsByClassName("episode-title")[0].childNodes[0].nodeValue = myObj.data[i].attributes.display_title;
					cloneEpisodeDiv.getElementsByClassName("episode-extra__link")[0].href = "/series/" + myObj.data[i].attributes.show_slug;
					cloneEpisodeDiv.getElementsByClassName("episode-extra__link")[0].childNodes[0].nodeValue = myObj.data[i].attributes.show_title;

					// Format episode length to human readable
					var totalSeconds = myObj.data[i].attributes.length;
					hours = Math.floor(totalSeconds / 3600);
					totalSeconds %= 3600;
					minutes = Math.floor(totalSeconds / 60);
					seconds = totalSeconds % 60;
					cloneEpisodeDiv.getElementsByClassName("timestamp")[0].childNodes[0].nodeValue = ((hours == 0) ? minutes : hours + ":" + ('0'+minutes).slice(-2)) +':'+ ('0'+seconds).slice(-2);

					// Format episode date to human readable
					var episodeDate = new Date(myObj.data[i].sort["0"]);
					var episodeDateFormatted = ('0' + (episodeDate.getMonth()+1)).slice(-2) + '/' + ('0' + episodeDate.getDate()).slice(-2) + '/' + episodeDate.getFullYear();
					cloneEpisodeDiv.getElementsByClassName("episode-extra")[0].childNodes[1].nodeValue = " | " + episodeDateFormatted;

					// Add episode to page
					document.getElementsByClassName("episode-grid-container")[0].insertBefore(cloneEpisodeDiv, document.getElementsByClassName("show-more")[0]);
				}
				
				hideVideos();
			}
		};
		
		// Get initial set of episodes
		getEpisodes(xmlhttp, episodePage, episodesPerPage);
		episodePage++;

		
		
		

		
		
		
		
		// *********************
		// Endless Video Loading
		// *********************
		
		
		// Setup scroll listener
		
		
		/*document.addEventListener("scroll", function (event)
		{
			console.log("Scrolling");

			checkForEndlessTrigger();
		});
		
		window.onscroll=window.onresize= check;
		document.addEventListener("wheel", function (e) {

			check();
			
		}, true);
		
		function check()
		{
			console.log("Scrolling");

		}
		*/
		
		
		/*
		var observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
			  //callback(entry.intersectionRatio > 0);
			  console.log("Show More Visible");
			});
		  }, options);

		  var options = {root: document.documentElement}
		  observer.observe(showMoreDiv);

		
		// Don't load a new page if already loading one.
		var endlessLoadingInProgress = 0;
		
		// Number of pages loaded without a break
		var endlessPagesLoaded = 1;
		
		// Is loading paused?
		var loadingPaused = 0;
		*/
		
		checkForEndlessTrigger = function()
		{
			/*
			console.log("checkForEndlessTrigger");
			//var endlessFrameHTML = document.getElementsByClassName("pagination")[0];
			//if(endlessFrameHTML == undefined){return;}
			//var endlessOffset = endlessFrameHTML.offsetTop + endlessFrameHTML.clientHeight;
			var endlessOffset = showMoreDiv.offsetTop + showMoreDiv.clientHeight;
			var pageOffset = window.pageYOffset + window.innerHeight;
			
			// Check if scrolled low enough to load more videos
			if(pageOffset > (endlessOffset - 100) && endlessVideos == 1)
			{
				//console.log("EndlessTriggered");
				
			}
			*/
		};
		
		//checkForEndlessTrigger();
	}
	
	
	
	
	function getEpisodes(xmlhttp, episodePage, episodesPerPage)
	{
		//Make sure you can't request more episodes if a request is already in progress.
		//Make sure you can't keep loading past the last page of videos available.
		//Make Loading Animation, possibly the orange loading circle used on the Beta site.
		// Stop loading every 10 pages and show button to load more
		
		// Request episodes list from server
		xmlhttp.open("GET", "https://svod-be.roosterteeth.com/api/v1/episodes?page=" + episodePage + "&per_page=" + episodesPerPage, true);
		xmlhttp.send();
	}
	
	
	
	
	// *******************************
	// Hide Watched or Filtered Videos
	// *******************************
	function hideVideos()
	{
		
		var episode = document.getElementsByClassName("col s12 m4 l3");
		for ( i = 0; i < episode.length; i++)
		{
			if(channelFilter.indexOf(episode[i].id) != -1)
			{
				episode[i].style.display = "none";
			}
			else
			{
				episode[i].style.display = "";
			}
		}
		
		/*
		var episode = document.getElementsByClassName("col s12 m4 l3");
		for ( i = 0; i < episode.length; i++)
		{
			//episode[i].style.display = "";
			
			if(episode[i].id == "achievement-hunter")
			{
				if(hide[hideAH][hideValue] == 1)
				{
					episode[i].style.display = "none";
				}
			}
			else if(episode[i].id == "the-know")
			{
				if(hide[hideTK][hideValue] == 1)
				{
					episode[i].style.display = "none";
				}
			}
			else if(episode[i].id == "rooster-teeth")
			{
				if(hide[hideRT][hideValue] == 1)
				{
					episode[i].style.display = "none";
				}
			}
			else if(episode[i].id == "funhaus")
			{
				if(hide[hideFH][hideValue] == 1)
				{
					episode[i].style.display = "none";
				}
			}
			else if(episode[i].id == "screwattack")
			{
				if(hide[hideSA][hideValue] == 1)
				{
					episode[i].style.display = "none";
				}
			}
			else if(episode[i].id == "cow-chop")
			{
				if(hide[hideCC][hideValue] == 1)
				{
					episode[i].style.display = "none";
				}
			}
			else if(episode[i].id == "game-attack")
			{
				if(hide[hideGA][hideValue] == 1)
				{
					episode[i].style.display = "none";
				}
			}
			else if(episode[i].id == "sugar-pine-7")
			{
				if(hide[hideSP7][hideValue] == 1)
				{
					episode[i].style.display = "none";
				}
			}
			else if(hide[hideUnknown][hideValue] == 1)
			{
				episode[i].style.display = "none";
			}
			*/
			
			
			
			/*
			// Hide Streams
			if(hide[hideStreams][hideValue] == 1)
			{
				if(episode[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].href.search("episode/(.*-full-stream|fullhaus|.*-live-stream|past-livestreams|.*yt-primetime)") >= 0)
				{
					episode[i].style.display = "none";
				}
			}
			*/
		
			/*
			if(hide[hideWatched][hideValue] == 1)
			{
				var watched = document.getElementsByClassName("watched");
				for ( i = 0; i < watched.length; i++)
				{
					//watched[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = " "+((hide[hideWatched][hideValue] == 1) ? "none" : "")+"";
					watched[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
				}
			}
			*/
		
		//}

	}


	
	
	
	// **************
	// Any Video Page
	// **************	
	function detectVideoTimestamps(comment)
	{
		//console.log(comment);
						
		for ( var i = 0; i < comment.childNodes.length; i++)
		{
			//comment.childNodes[i].nodeValue = comment[i].childNodes[i].nodeValue.replace(/(?!<a[^>]*?>)(-)?((\d|\d\d)(:))?(\d|\d\d)(:)(\d\d)(?![^<]*?<\/a>)/g, "<a title=\"Go to video timestamp $1$3$4$5$6$7\" href=\"javascript:undefined\" onclick=\"var heroBlock = document.getElementById('hero-block');var scrollPos = (heroBlock.offsetTop + heroBlock.clientHeight) - window.innerHeight;window.scrollTo(0,  parseInt(scrollPos));if('$1' == '-'){document.getElementById('"+videoID+"').currentTime=(Math.floor(document.getElementById('"+videoID+"').duration))-((0$3*3600)+($5*60)+$7);}else{document.getElementById('"+videoID+"').currentTime=(0$3*3600)+($5*60)+$7;}document.getElementById('"+videoID+"').play();\">$1$3$4$5$6$7</a>");
			//console.log("i: " + i);

			var currentNode = i;
			var splitTimestamp = null;
			var contiguousTextCount = 0;
			var contiguousText;

			if(comment.childNodes[i].nodeName == "#text") // Only check text nodes for timestamps
			{
				//console.log(comment.childNodes[i].nodeValue);
				contiguousText = comment.childNodes[i].nodeValue;
				contiguousTextCount++;

				while(comment.childNodes[i+1] != undefined && comment.childNodes[i+1].nodeName == "#text")
				{
					contiguousText += comment.childNodes[i+1].nodeValue;
					contiguousTextCount++;
					i++;
				}
				
				//console.log("contiguousTextCount: " + contiguousTextCount + " Text: " + contiguousText);
				//splitTimestamp = comment.childNodes[i].nodeValue.split(/([\d]{0,2}:?[\d]{1,2}:[\d]{2})/g);
				//splitTimestamp = comment.childNodes[i].nodeValue.split(/((?:(?:2[0-3]|[01]?[0-9]):)?[0-5]?[0-9]:[0-5][0-9])/g);
				splitTimestamp = contiguousText.split(/((?:(?:2[0-3]|[01]?[0-9]):)?[0-5]?[0-9]:[0-5][0-9])/g);
				//console.log(splitTimestamp);
			}

			if(splitTimestamp != null && splitTimestamp.length > 1) // If array size is 1 we know that there were no matches.
			{
				//console.log("splitTimestamp checked");
				
				
				
				for ( var j = 0; j < splitTimestamp.length; j++)
				{
					//console.log("j: " + j);
					//console.log(splitTimestamp[j]);
					if(splitTimestamp[j] != "") // Split produces empty arrary elements if match is at the end or begining of string. Ignore them.
					{
						
						//var matchTimestamp = splitTimestamp[j].match(/([\d]{0,2}:)?([\d]{1,2}):([\d]{2})/);
						var matchTimestamp = splitTimestamp[j].match(/(?:(2[0-3]|[01]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9])/);
						if(matchTimestamp != null)
						{
							var commentNode = document.createElement("a");
							commentNode.onclick = getTimestampLink(matchTimestamp);
							commentNode.href = "javascript:undefined";
							commentNode.title = "Go to video timestamp " + matchTimestamp[0];
							commentNode.appendChild(document.createTextNode(matchTimestamp[0]));
							
							
							
						}
						else
						{
							var commentNode = document.createTextNode(splitTimestamp[j]);
						}
						
						if(comment.childNodes[i+1] != undefined)
						{
							comment.insertBefore(commentNode, comment.childNodes[i+1]);
						}
						else
						{
							comment.appendChild(commentNode);
						}
						
						i++; // We inserted a new child so we need to increment i so it still points at the next child.
					}
				}
				
				while(contiguousTextCount > 0)
				{
					comment.removeChild(comment.childNodes[currentNode]); // Remove the node we replaced with timestamp link
					contiguousTextCount--;
					i--; // We removed a node so we need to decrement i so it still points at the next child.
				}
			}
		}
		
	}
			
	/*
	function linkVideoTimestamps()
	{

		var commentElement = document.getElementsByClassName("Linkify");
		console.log("linkVideoTimestamps function");
		console.log(commentElement);
		console.log(commentElement.length);
		console.log(commentElement[0]);
		for ( var i = 0; i < commentElement.length; i++)
		{
			console.log("i: " + i);
			for ( var j = 0; j < commentElement[i].childNodes.length; j++)
			{
				//commentElement[i].childNodes[j].nodeValue = commentElement[i].childNodes[j].nodeValue.replace(/(?!<a[^>]*?>)(-)?((\d|\d\d)(:))?(\d|\d\d)(:)(\d\d)(?![^<]*?<\/a>)/g, "<a title=\"Go to video timestamp $1$3$4$5$6$7\" href=\"javascript:undefined\" onclick=\"var heroBlock = document.getElementById('hero-block');var scrollPos = (heroBlock.offsetTop + heroBlock.clientHeight) - window.innerHeight;window.scrollTo(0,  parseInt(scrollPos));if('$1' == '-'){document.getElementById('"+videoID+"').currentTime=(Math.floor(document.getElementById('"+videoID+"').duration))-((0$3*3600)+($5*60)+$7);}else{document.getElementById('"+videoID+"').currentTime=(0$3*3600)+($5*60)+$7;}document.getElementById('"+videoID+"').play();\">$1$3$4$5$6$7</a>");
				console.log("j: " + j);
				var splitTimestamp = null;

				if(commentElement[i].childNodes[j].nodeName == "#text") // Only check text nodes for timestamps
				{
					console.log(commentElement[i].childNodes[j].nodeValue);
					splitTimestamp = commentElement[i].childNodes[j].nodeValue.split(/([\d]{0,2}:?[\d]{1,2}:[\d]{2})/g);
				}

				if(splitTimestamp != null && splitTimestamp.length > 1) // If array size is 1 we know that there were no matches.
				{
					console.log("splitTimestamp checked");
					console.log(splitTimestamp[0]);
					
					var insertCount = 0;
					var currentNode = j;
					
					for ( var k = 0; k < splitTimestamp.length; k++)
					{
						console.log("k: " + k);
						if(splitTimestamp[k] != "") // Split produces empty arrary elements if match is at the end or begining of string. Ignore them.
						{
							
							var matchTimestamp = splitTimestamp[k].match(/([\d]{0,2}:)?([\d]{1,2}):([\d]{2})/);
							if(matchTimestamp != null)
							{
								var commentNode = document.createElement("a");
								commentNode.onclick = getTimestampLink(matchTimestamp);
								commentNode.href = "javascript:undefined";
								commentNode.title = "Go to video timestamp " + matchTimestamp[0];
								commentNode.appendChild(document.createTextNode(matchTimestamp[0]));
								
								
								
							}
							else
							{
								var commentNode = document.createTextNode(splitTimestamp[k]);
							}
							
							if(commentElement[i].childNodes[j+1] != undefined)
							{
								commentElement[i].insertBefore(commentNode, commentElement[i].childNodes[j+1]);
							}
							else
							{
								commentElement[i].appendChild(commentNode);
							}
							j++; // We inserted a new child so we need to increment j so it still points at the next child.
						}
					}
					
					commentElement[i].removeChild(commentElement[i].childNodes[currentNode]); // Remove the node we replaced with timestamp link
					j--; // We removed a node so we need to decrement j so it still points at the next child.
					
				}
				

				//.replace(/[\d]{0,2}:?[\d]{1,2}:[\d]{2}/g, "timestamp.");
				//commentElement[i].childNodes[j].nodeValue
				// Add anchor element instead of altering text
			}
			
			/*
			while(commentElement[i].children[1].children[j].tagName != "DIV")
			{
				//console.log("Comment: "+i+", Line: "+j)
				//commentElement[i].children[1].children[j].innerHTML = commentElement[i].children[1].children[j].innerHTML.replace(/(?!<a[^>]*?>)((\d|\d\d)(:))?(\d|\d\d)(:)(\d\d)(?![^<]*?<\/a>)/g, "<a title=\"Go to video timestamp $2$3$4$5$6\" href=\"#\" onclick=\"var heroBlock = document.getElementById('hero-block');var scrollPos = (heroBlock.offsetTop + heroBlock.clientHeight) - window.innerHeight;window.scrollTo(0, scrollPos);if(jwplayer('"+episodeID+"').getState()!=='playing' && jwplayer('"+episodeID+"').getState()!=='paused'){jwplayer('"+episodeID+"').play(true);setTimeout(function() {jwplayer('"+episodeID+"').seek((0$2*3600)+($4*60)+$6);}, 1000);}else{jwplayer('"+episodeID+"').seek((0$2*3600)+($4*60)+$6);}return false;\">$2$3$4$5$6</a>");
				
				commentElement[i].children[1].children[j].innerHTML = commentElement[i].children[1].children[j].innerHTML.replace(/(?!<a[^>]*?>)(-)?((\d|\d\d)(:))?(\d|\d\d)(:)(\d\d)(?![^<]*?<\/a>)/g, "<a title=\"Go to video timestamp $1$3$4$5$6$7\" href=\"javascript:undefined\" onclick=\"var heroBlock = document.getElementById('hero-block');var scrollPos = (heroBlock.offsetTop + heroBlock.clientHeight) - window.innerHeight;window.scrollTo(0,  parseInt(scrollPos));if('$1' == '-'){document.getElementById('"+videoID+"').currentTime=(Math.floor(document.getElementById('"+videoID+"').duration))-((0$3*3600)+($5*60)+$7);}else{document.getElementById('"+videoID+"').currentTime=(0$3*3600)+($5*60)+$7;}document.getElementById('"+videoID+"').play();\">$1$3$4$5$6$7</a>"); 
				j++;
				
				//1 is $1, 2 is $2, 3 is $3, 4 is $4, 5 is $5, 6 is $6, 7 is $7, //regex parts for testing
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
	*/
	
	function getTimestampLink (matchTimestamp)
	{
		return function()
		{
			var videoID = document.getElementsByTagName("video")[0].id;
			document.getElementsByClassName('video-container')[0].scrollIntoView(false);
			document.getElementById(videoID).currentTime=(((matchTimestamp[1] != undefined)?parseInt(matchTimestamp[1]):0 * 3600) + (parseInt(matchTimestamp[2]) * 60) + parseInt(matchTimestamp[3]));
			document.getElementById(videoID).play();
			//console.log(((matchTimestamp[1] != undefined)?parseInt(matchTimestamp[1]):0 * 3600));
		}
	
	}
	
				
	
	/*
	var controls = document.getElementsByClassName("controls")[0];
	
	// If there is more than 1 page of comments
	if(controls != undefined)
	{
		controls.addEventListener('click', function() {
			setTimeout(function() {
				var commentsList = document.getElementsByClassName("comments-list");
				var comment = commentsList[0].children;
				linkVideoTimestamps(comment);
			}, 7000);
		});
	}
	*/
	
}