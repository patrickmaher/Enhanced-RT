// ==UserScript==
// @name       Enhanced RT
// @version    0.0.5
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

Versions
========
0.0.5
Updated filters to correctly identify new videos that were not being filtered.
Optimizations for filtering.

0.0.4
Added favorite icons for Achievement Hunter, ScrewAttack, and The Know.

0.0.3
Fixed bug detecting newly migrated screwattack.com site.

0.0.2
Public Release

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
    //var favIcon = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACGVBMVEUnQxsqRx43VitunmA6XC0AAABdnUE7Xi9TeUUpRx0+YS0mRRssTh8tUB9clkBhp0Jfo0JclUAsUB8rTh4mRBo9Xy05XSo4XildnEFdm0E2WSU2WSdenkEFHABalkBgpEFfokFalUBdmkFclz1eokNeoUJclj9Zkz9foUFZkT9dm0BdmkBdnkFbkj9eoUFeoEFajj8AAAE7Wy1hq0Jbl0BbmEFluUE4WCtAYDFcnEFenUFdhEVah0Rcm0E6WytdnUFdnUFenkFenkFdnEFen0Fen0Fdm0FenUFen0Fen0FenUFenkFenkFcnEBcnEBbm0Bbmj9bmj9cm0BenkFenkFcm0BcnEBdnkFenkFenkFenkFeoEFWkTxXkzxen0FenkFdnkFdnEFenkFen0Fen0FenkFdnEBcmEFenUFen0Fen0FenUFcmEBdnUFfoEJfoEJdnUFgokNgokNdm0Ben0FDci9en0FdmkBdnUFen0FfoUJgo0NgokNfoUJen0FdnUFenkFen0FenkFdmkBdmkBenkFen0FenkFdm0FenkFenkFdnUFdnUFenkFenkFdmkFcm0FdnUFdnEFdnEFdnUFdm0FfoEJRiThSijkUIg4WJRBen0FeoEFamD4fNRYiORhbmT9gokI7ZCk9aCpTjDkoQxwWJQ8XJxApRRxUjjpLfzQGCgQBAQEIDAVNgzZZlz5FdTBGdjD///85fAymAAAAlnRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9OYiBEMvEDT3z7zeAeBkXFhYVIMS+HRqa1djW2fn42dSVF4Pw7n4UA0zQzEgDIqymH3dvCrr+swcx6/GOkvPnLHHYVgQFWttqCrOwKi20rQcichIVcx/nWTGdAAAAAWJLR0SyrWrP6AAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+ADDAcjDRKxaRMAAAELSURBVBjTY2BgZGJmYWWzd2BjZedg4mRg4OLm4WXl43d0EhBkFRIWEWUQE2dlZZVwdnF1kwQypKQZWEFAxt3D00sGyJCVBQvIyXtPm+ajoAhiM/j6+QcEBgVPnxESGhjg7xfGEB4RGRURHTNzVmxcRFRkfAJDYlLy7Nlz5s6bv2D27NkpqWkMkukZmbNnL1y0eOHs2VnZOUoMrMoquXlLli5bvmJlfoGqGivQFnWNwlWr16xZu65IQ5MVJKBVXLJ+Q2npxrll5dpgAZ2KyjlV1TW1s+vq2UACunoNsxubmlta22a36xsYMhhJdnR2dRubmJr19Pb1K5kzWFhOmDjJypqV1UZm8pSptnYAt4FMFkoQKWsAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDMtMTJUMDc6MzU6MTMrMDE6MDDsnru9AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTAzLTEyVDA3OjM1OjEzKzAxOjAwncMDAQAAAFd6VFh0UmF3IHByb2ZpbGUgdHlwZSBpcHRjAAB4nOPyDAhxVigoyk/LzEnlUgADIwsuYwsTIxNLkxQDEyBEgDTDZAMjs1Qgy9jUyMTMxBzEB8uASKBKLgDqFxF08kI1lQAAAABJRU5ErkJggg==";
	var favIcon = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACE1BMVEUnQxsqRx43VitunmA6XC0AAABwtlI7Xi9TeUUpRx0+YS0mRRssTh8tUB9vr1FzwFFyvFFvrlEsUB8rTh4mRBo9Xy05XSo4XilxtVFxtFI2WSU2WSdxt1EFHABur1FzvFFyu1FurlFwtFFwsE5xu1NxulJwsFBtrFFyulFxulFsqlFxtlFvq1FxuVFup1EAAAE7Wy1ws1F0xFFusVFvsVJ40k44WCtAYDFvtVFynlpuoFhvtFE6WytwtlFwtlJxt1Fxt1FxtVFxuFFxuFFxtFJxtlFxuFFxuFFxtlFxt1Fxt1FvtVFvtVFvtFFutFButFBvtVBxt1Fxt1FvtFBvtVFwt1Fxt1Fxt1Fxt1FxuVFoqEppq0xxuFFxt1Fwt1FwtVFxt1FxuFFxuFFxt1FwtVBvslJxt1FxuFFxuFFxtlFvsVJwtlFyuVJyuVJwtlF0vFNzvFNwtFFxuFFRhDtxuFFws1FwtlFxuFFzu1J0vFN0vFNzu1JxuFFwtlFxt1FxuFFxt1Fxs1Fxs1Fxt1FxuFFxt1Fxt1Fxt1FwtlFwtlFxt1Fxt1Fws1JvtVFwtlFwtVFwtVFwtlFwtFJyulJyuVJin0djoEcZKBIbLBRxuFFxuVFssE4mPhwpQh5tsk9zvFNIdDRKeDZkokgwTyMbLBMcLRQyUCRlpElbk0EIDAYBAgEJDwddl0Nrr01UiDxUiT3///+yFwYrAAAAk3RSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPTmIgRDLxA098+83gHgZFxYWFSDEvh0amtXY1tn5+NnUlReD8O5+FANM0MxIAyKsph93bwq6/rMHMevxjpLz5yxx2FYEBVrbarOwKi20rQcichIVcx8RzCN3AAAAAWJLR0SwQ2SuxAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+ADDAkKMAQBl+MAAAELSURBVBjTY2BgZGJmYWWztWNjZedg4mRg4OLm4WXl47d3EBBkFRIWEWUQE2dlZZVwdHJ2kQQypKQZWEFAxtXN3UMGyJCVBQvIyXtOnuKloAhiM3j7+Pr5BwROnRYU7O/n6xPCEBoWHhEWGTV9RnRMWER4bBxDfELizJmzZs+ZO2/WzJlJySkMSqlp6TNnzl+wcP7MmRmZWUoMrMoq2TmLFi9Zumx5bp6qGivQFnWN/BUrV61avaZAU4sVJKBUWLR2XXHx+tklpUpgAZmy8lkVlVXVs2pqtUECOpp1M+sbGpuaW2a26urpMxgYFra1dxgZm5h2dnX3GJoxmFv09vVrW7KyWslMmDjJ2gYAM+ZK57lPUXIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDMtMTJUMDk6MTA6NDgrMDE6MDDi2p8WAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTAzLTEyVDA5OjEwOjQ4KzAxOjAwk4cnqgAAAFd6VFh0UmF3IHByb2ZpbGUgdHlwZSBpcHRjAAB4nOPyDAhxVigoyk/LzEnlUgADIwsuYwsTIxNLkxQDEyBEgDTDZAMjs1Qgy9jUyMTMxBzEB8uASKBKLgDqFxF08kI1lQAAAABJRU5ErkJggg==";
	
}
else if(window.location.href.search("theknow.tv/") > 0) // The Know
{
    currentSite = "TK";
    currentSiteDomain = "theknow.tv";

    // favicon
	var favIcon = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABv1BMVEUAAAABAQEAZJ8AY50AY54CAgIADRUAXZMBITQAYpwAHCwAIzcAY5wDAwMAYZoAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEAAAAAAAAAAAAAAAAAAAAAAAABAQEAY50AY50AY50AZqIABAYAAAAAAAAAAAABAQEAY50AY50AY50AY50AY50AYJgAAAAAAAAAAAAAAAAAAAAAAAAAY50AY50AY50AY50AZJ4AT30AAAAAAAAAAAAAAAADAwMAY50AY50AY50AaKUCGSYAAAAAAAABAQEAYpsAYpwAY50AY50AZJ4AAQEAAAABAQEAY50AY50AY50HBwcAAAABAQEAY50AY50AY50AY54BAQEAAAAAAAAAAAABAQEAY50AY50AY54BAQEAAAAAAAAAAAAAY50AY50AY50AAAAAAAAAAAAAAAAAY50AY50AY50AY50AZqIAAAAAAAAAAAABAQEAY50AY50AY50BX5YCAQAAAAAAAAAAY5wAZJ8ASXQAAAAAAAAAAAAAAAAAYZoAZqEAL0oAAAAAAAAAAAAAAAAAAAAAAAAAY53////U6D+TAAAAknRSTlMAAAAAAAAAAAAAAAAAAAAMlrtBRLeqJuX7SinO+HdO+vE1FLaZCgECNW6EMJfKHwdseBqWoLDbkvnrRhXO/N7wfdX3/HkBA6SoTE/yrQ9khOWMCWzaLPHdIgGeB2HWvggQy/3fIZPPES7A9k9P9lJZ71aJe/Do2EKKFZsMFC3Ik7Wa6QSof9xfHmAEYFWxKASBZzt/MQ8AAAABYktHRJR/Z0oVAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AMMCCEX1rm11gAAAPRJREFUGNNjYIAAfgFBIQYGYRFRKJ9RTFxCkkFKWkYWwmdikJNXUFRSnqSiysDArKbOoqGpNUlcW2eSrh6Qr29gaGRsYjrJzNzC0oqBlYHZ2sbWzt7BcZKTk7OLKyNQhZu7rYenl/ekSZN8fIF8Bj//gMAgtmAgPySUASQQNjk8gj0yCiggEg3iM8TExsVzJCROSpqUnAIW4ExNS+fKsEzKzJLPBrspJzw3jzs/qaDQcVIR0FIGhuKS0rLyiknSlVWTMqtBemo0auvqGyY1MhQ6N4WC9fA0t7S2TWpn6AiZ1MnACxTg6+ru6e3tY+ifkDkRaAgA/ss77+z5UvcAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDMtMTJUMDg6MzM6MjMrMDE6MDBIfxksAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTAzLTEyVDA4OjMzOjIzKzAxOjAwOSKhkAAAAFd6VFh0UmF3IHByb2ZpbGUgdHlwZSBpcHRjAAB4nOPyDAhxVigoyk/LzEnlUgADIwsuYwsTIxNLkxQDEyBEgDTDZAMjs1Qgy9jUyMTMxBzEB8uASKBKLgDqFxF08kI1lQAAAABJRU5ErkJggg==";

}
else if(window.location.href.search("screwattack.com/") > 0) // ScrewAttack
{
    currentSite = "SA";
    currentSiteDomain = "screwattack.com";

    // favicon
    var favIcon = "AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD9syTe+akO+vGhBv3unwT/758E//CgBP/woAT/8aEE//KiBP/yogT/8aEE//CgBP/xoQT/8aEE//SkB/r6sSHg96YI+v+sC///qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT/9qQF/fGhBP//xFL//9SB//+xGv//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//CgBP/yoQX//6oE///MZ////Pb//92b//+4Lf//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP/yogX/8qEF//+qBP//qgT//8xn/////v////7//+a1///BR///qgT//6oE//+qBP//qgT//6oE//+qBP//qgT/8qEE//OiBf//qgT//6oE//+qBP//zGf////+/////////////+/Q///JYf//rAr//6oE//+qBP//qgT//6oE//GhBP/0ogX//6oE//+qBP//qgT//6oE///Se////////////////////////+rB//+qBP//qgT//6oE//+qBP/xoQT/9KIF//+qBP//qgT//6oE//+qBP//4aX////////////////////////DTv//qgT//6oE//+qBP//qgT/8qIF//OiBf//qgT//6oE//+qBP//tij///77///////////////////ouv//qgT//6oE//+qBP//qgT//6oE//OiBf/xoQT//6oE//+qBP//qgT//7Ym///iqf///v3/////////////5bH//60M//+qBP//qgT//6oE//+qBP/zogX/8KAE//+qBP//qgT//6oE//+qBP//qgT//7Yo///enf///fn////////rxP//sBb//6oE//+qBP//qgT/9KIF//GhBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//7Mf///ZkP//+/T///La//+2Jv//qgT//6oE//WjBf/xoQT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//7AX///Vg///8tn//707//+qBP/1owb/8aEE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//64R///NbP//vTz/86IF//imB/r/qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6oE//+qBP//qgT//6wJ//upDPr9syPe9qYJ+PKhBf3yoQT/8qEE//KhBP/zogX/9aMF//SjBf/zogX/9KIF//SiBf/zogX/9KIF/famCvj+tCXeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
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
			if(hide[hideSA][hideValue] == 1 && video.search("episode/(.*the-1-show.*|the-best-ever|sidescrollers|five-fun-facts|top-10-|desk-of-death-battle|.*evil-craig|available-now-podcast|.*reasons-we-hate.*|.*-sidescrollers-.*|.*-reasons-we-love-.*|is-.*-good|announcing-g1-|.*-screwattack-royal-rumble|one-minute-melee-|screwattacks-top-10-|samus-nutty-|.*death-battle.*|fairly-odd-relatives|pokemon-vs-digimon|.*top-5-|five-more-fun-facts-|.*the-best-.*ever|community-project-|batman-dual-|how-much-would-it-cost|the-worst-kept-secret|clip-of-the-week|dbx|top-10s|who-is|chad-|.*great-moments-in-|hard-news|metal-gear-ben|.*nerdtastic|newsroom|[advantage]-newsroom|.*out-of-the-box|reboot-or-retro|.*the-armory-|.*-the-industry|.*video-game-vault)") > 0)
			{
				 video = video.replace("roosterteeth.com", "screwattack.com");
				 childLI[i].style.display = "none";
			}
			else if(hide[hideAH][hideValue] == 1 && video.search("episode/(lets-play|ahwu|things-to-do-in|play-pals|achievement-unlocked|behind-the-scenes|achievement-hunter|fails-of-the-weak|easter-eggs|achievement-hunt|five-facts|off-topic-|how-to-|vs-|go-|rage-quit-|countdown-|achievement-horse-|forced-enjoyment-)") > 0)
			{
				video = video.replace("roosterteeth.com", "achievementhunter.com");
				childLI[i].style.display = "none";
			}
			else if(hide[hideTK][hideValue] == 1 && video.search("episode/(the-know|the-patch|in-review|news-roundups)") > 0)
			{
				video = video.replace("roosterteeth.com", "theknow.tv");
				childLI[i].style.display = "none";
			}
			else if(hide[hideFH][hideValue] == 1 && video.search("episode/(gameplay|dude-soup|fan-show|funhaus|fullhaus|open-haus|demo-disk-|rest-of-)") > 0)
			{
				video = video.replace("roosterteeth.com", "fun.haus");
				childLI[i].style.display = "none";
			}
			else if(hide[hideRT][hideValue] == 1 && video.search("episode/(rt-sponsor-cut|happy-hour|free-play|lazer-team|million-dollars-but|rt-podcast|the-slow-mo-guys|rt-animated-adventures|rt-shorts|immersion-|red-vs-blue-|rt-anime-podcast-|on-the-spot-|buff-buddies-|sponsor-vlog-|rt-life-|sportsball-|rt-specials-|rwby-|x-ray-and-vav-|trailers-|social-disorder-|rooster-teeth-entertainment-system-|the-strangerhood-|panics-|1-800-magic-)") > 0)
			{
				video = video.replace("roosterteeth.com", "roosterteeth.com");
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