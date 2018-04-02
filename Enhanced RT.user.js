// ==UserScript==
// @name       Enhanced RT
// @version    3.2.0
// @description  Enhances the Rooster Teeth website
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
3.2.0
-Added star icons to episodes on the Recently Added page that are FIRST only and FIRST for a limited time.

3.1.0
-Removed support for the old Rooster Teeth website
-Removed binge mode setting. Rooster Teeth has implemented an auto play setting that takes its place.

3.0.1
-Beta site: Fixed bug in conversion of comment timestamps to seconds when the timestamp contained hours.


3.0.0
-Added initial support for the Rooster Teeth Beta site.
-Beta site: Created Recently Added video page which uses Rooster Teeth's API to determine available channles and videos.
-Beta site: Recently Added page displays videos in a grid view, allows the user to loaded additional videos on the page, and the videos can be filtered by channel.
-Beta site: RECENT VIDEOS text on home page is converted to a clickable link to the Recently Added page.
-Beta site: video comment timestamps are converted to clickable links.
-Beta site: Binge Mode on/off setting added to the settings page.


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

//console.log(window.location.protocol);
//console.log(window.location.host);
//console.log(window.location.pathname);
//console.log(window.location.href);

// Delete local storage items that were used for the old site
localStorage.removeItem("hideWatched");
localStorage.removeItem("hideStreams");
localStorage.removeItem("hideRT");
localStorage.removeItem("hideAH");
localStorage.removeItem("hideFH");
localStorage.removeItem("hideSA");
localStorage.removeItem("hideTK");
localStorage.removeItem("hideCC");
localStorage.removeItem("hideGA");
localStorage.removeItem("hideSP7");
localStorage.removeItem("hideUnknown");

localStorage.removeItem("endlessVideos");
localStorage.removeItem("videoAlign");
localStorage.removeItem("liveStreamAlign");
localStorage.removeItem("commentsStopPlayback");
localStorage.removeItem("replaceFavicon");

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

ready('.side-menu', function(element) {
	//console.log("Enhanced RT: Side Menu Detected");

	// Add schedule and recently added link to side menu
	var scheduleItem = document.createElement("li");
	var scheduleLink = document.createElement("a");
	scheduleLink.className = "waves-effect waves-brand";
	scheduleLink.href = "/schedule";
	scheduleLink.appendChild(document.createTextNode("Schedule"));
	scheduleItem.appendChild(scheduleLink);
	
	var recentlyAddedItem = document.createElement("li");
	var recentlyAddedLink = document.createElement("a");
	recentlyAddedLink.className = "waves-effect waves-brand";
	recentlyAddedLink.href = "/episode/recently-added";
	recentlyAddedLink.appendChild(document.createTextNode("Recently Added"));
	recentlyAddedItem.appendChild(recentlyAddedLink);

	element.insertBefore(recentlyAddedItem, document.getElementsByClassName("side-menu")[0].childNodes[4]);
	element.insertBefore(scheduleItem, document.getElementsByClassName("side-menu")[0].childNodes[4]);	
});

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
	/*
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
	*/
}

// Get settings from local storage
watchedFilter = ((localStorage.getItem("enhancedRT_watchedFilter") == null) ? "false" : localStorage.getItem("enhancedRT_watchedFilter"));

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

	/*
	var watchedLabel = document.createElement("label");
	watchedLabel.style = "font-size: 1.64rem;";
	var watchedCheckbox = document.createElement("input");
	watchedCheckbox.type = "checkbox";
	watchedCheckbox.id = "watchedFilter";
	watchedCheckbox.defaultChecked = ((watchedFilter == "false") ? true : false);
	watchedCheckbox.style = "position: static; opacity: 100; pointer-events:auto; margin:0 0 0 1em; width: 17px; height: 17px;";
	watchedLabel.appendChild(watchedCheckbox);
	watchedLabel.appendChild(document.createTextNode("Watched"));
	
	headerDiv.appendChild(watchedLabel);
	
	watchedLabel.onclick = function (event)
	{
		if(event.target.checked == true)
		{
			watchedFilter = "false";
			localStorage.setItem("enhancedRT_watchedFilter", watchedFilter);
		}
		else if(event.target.checked == false)
		{
			watchedFilter = "true";
			localStorage.setItem("enhancedRT_watchedFilter", watchedFilter);
		}
		
		hideVideos();
		checkForEndlessTrigger();
	};
	*/
	
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
	
	
	//
	var episodeBatch = "";
	var episodeData = new Object();
	
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
			episodeData = myObj;

			// Parse episodes in list
			for (var i = 0, len = myObj.data.length; i < len; i++) {
				//console.log("Title: " + myObj.data[i].attributes.title + " Show: " + myObj.data[i].attributes.show_title + " Channel: " + myObj.data[i].attributes.channel_id);

				// Comma separated list of episodes in current batch.
				episodeBatch += (episodeBatch == "")?myObj.data[i].uuid:("," + myObj.data[i].uuid);
				
				// Clone element structure for individual episodes. Don't need to rebuild the whole structure for each episode.
				var cloneEpisodeDiv = episodeDiv.cloneNode(true);

				// Update cloned elements with current episodes information
				cloneEpisodeDiv.dataset.episodeId = myObj.data[i].uuid;
				cloneEpisodeDiv.dataset.channelId = myObj.data[i].attributes.channel_id;
				cloneEpisodeDiv.dataset.seriesId = myObj.data[i].attributes.show_id;
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

				
				// Determine if episode is First only or First for a limited time and show appropriate star icon
				var premiumDiv = document.createElement("div");
				premiumDiv.className = "premium__badge__wrapper";
				
				// First only
				if(myObj.data[i].attributes.is_sponsors_only == true)
				{
					var starFilledIcon = document.createElement("i");
					starFilledIcon.className = "premium icon-star2";
					premiumDiv.appendChild(starFilledIcon);
					cloneEpisodeDiv.getElementsByClassName("card-image-wrapper")[0].appendChild(premiumDiv);
				}
				// First for limited time
				else if(myObj.data[i].attributes.sponsor_golive_at != myObj.data[i].attributes.member_golive_at)
				{
					// Using member_golive_at value to compare with current date/time. Should we detect if user is not logged on and in that case check public_golive_at instead? Need to find a video where member_golive_at value and public_golive_at differ but member_golive_at date has not yet passed.
					//console.log(myObj.data[i].attributes.display_title + " Current date: " + new Date() + " Release date: " + new Date(myObj.data[i].attributes.member_golive_at));
					if(new Date() < new Date(myObj.data[i].attributes.member_golive_at))
					{
						var starOutlineIcon = document.createElement("i");
						starOutlineIcon.className = "premium icon-star_border";
						premiumDiv.appendChild(starOutlineIcon);
						cloneEpisodeDiv.getElementsByClassName("card-image-wrapper")[0].appendChild(premiumDiv);
					}
				}
				
				// Add episode to page
				document.getElementsByClassName("episode-grid-container")[0].insertBefore(cloneEpisodeDiv, document.getElementsByClassName("show-more")[0]);
			}

			// Get watch times for current episode batch
			//getWatchTimes(watchTimeXMLHttp, episodeBatch);
			// Reset in preparation for next batch
			episodeBatch = "";

			hideVideos();
			
		}
	};
	
	// Get initial set of episodes
	getEpisodes(xmlhttp, episodePage, episodesPerPage);
	episodePage++;
	
	
	
	// Request episode watch times from Watch Time Collector (wtc) server.
	var watchTimeXMLHttp = new XMLHttpRequest();
	
	watchTimeXMLHttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var watchTimeObj = JSON.parse(this.responseText);
			var watchedThreshold = 10;

			for (var i = 0; i < watchTimeObj.length; i++)
			{
				for (var j = 0; j < episodeData.data.length; j++)
				{
					if(episodeData.data[j].uuid == watchTimeObj[i].uuid)
					{
						if(watchTimeObj[i].value > episodeData.data[j].attributes.length - watchedThreshold)
						{
							//console.log("Episode " + episodeData.data[j].attributes.display_title + " is watched. It is " + episodeData.data[j].attributes.length + " seconds long and watch time is " + watchTimeObj[i].value + " seconds.");
							document.querySelector("[data-episode-id='"+watchTimeObj[i].uuid+"']").dataset.watched = "true";
							
							var WatchedDiv = document.createElement("div");
							WatchedDiv.className = "timestamp";
							WatchedDiv.style.top = "0%";
							WatchedDiv.style.left = "0%";
							WatchedDiv.style.right = "89%";
							WatchedDiv.style.bottom = "93%";
							WatchedDiv.appendChild(document.createTextNode("Watched"));
							
							document.querySelector("[data-episode-id='"+watchTimeObj[i].uuid+"']").childNodes[0].childNodes[0].childNodes[0].childNodes[0].appendChild(WatchedDiv);
						}
					}
				}
			}

			// Reset in preparation for next batch
			episodeData = {};
			
			// Need to do hideVideos again after watched status is determined
			hideVideos();
		}
	};
	
	
	function getWatchTimes(watchTimeXMLHttp, episodeBatch)
	{
		// Retrieve rt_access_token from document.cookie
		var tokenLocation = document.cookie.indexOf("rt_access_token=") + 16;
		var accessToken = document.cookie.substring(tokenLocation, document.cookie.indexOf(";", tokenLocation));
		
		// Request watch times for current episode batch
		watchTimeXMLHttp.open("GET", "https://wtc.roosterteeth.com/api/v1/my/played_positions/mget/" + episodeBatch, true);
		watchTimeXMLHttp.setRequestHeader('Authorization', 'Bearer ' + accessToken);
		watchTimeXMLHttp.send();
	}
	
	
	
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
		var hideEpisode = false;
		
		if(channelFilter.indexOf(episode[i].dataset.channelId) != -1)
		{
			hideEpisode = true;
		}

		if(watchedFilter == "true" && episode[i].dataset.watched == "true")
		{
			hideEpisode = true;
		}

		if(hideEpisode == true)
		{
			episode[i].style.display = "none";
		}
		else
		{
			episode[i].style.display = "";
		}
	}
	

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
		document.getElementById(videoID).currentTime=(((matchTimestamp[1] != undefined)?(parseInt(matchTimestamp[1]) * 3600 ) : 0) + (parseInt(matchTimestamp[2]) * 60) + parseInt(matchTimestamp[3]));
		document.getElementById(videoID).play();
		//console.log(((matchTimestamp[1] != undefined)?parseInt(matchTimestamp[1]):0 * 3600));
	}

}