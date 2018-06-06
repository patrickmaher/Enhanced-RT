// ==UserScript==
// @name         Enhanced RT
// @author       Patrick Maher
// @namespace    https://github.com/patrickmaher/Enhanced-RT
// @description  Enhances the Rooster Teeth website
// @match        *://roosterteeth.com/*
// @match        *://*.roosterteeth.com/*
// @exclude      *://store.roosterteeth.com/*
// @run-at       document-end
// @noframes
// @version      3.4.3
// ==/UserScript==


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

	// Add recently added link to side menu
	var recentlyAddedItem = document.createElement("li");
	var recentlyAddedLink = document.createElement("a");
	recentlyAddedLink.className = "waves-effect waves-brand";
	recentlyAddedLink.href = "/episode/recently-added";
	recentlyAddedLink.appendChild(document.createTextNode("Recently Added"));
	recentlyAddedItem.appendChild(recentlyAddedLink);

	element.insertBefore(recentlyAddedItem, document.getElementsByClassName("side-menu")[0].childNodes[4]);
});

ready('.carousel-title', function(element) {
	//console.log("Enhanced RT: Carousel Detected");
	//console.log(element.childNodes[0].nodeValue);
	
	if(element.childNodes[0] != undefined && element.childNodes[0].nodeValue == "recent episodes")
	{
		var recentLink = document.createElement("a");
		recentLink.className = "carousel-title link";
		recentLink.href = "/episode/recently-added";
		recentLink.appendChild(document.createTextNode("recent episodes "));
		var recentArrow = document.createElement("i");
		recentArrow.className = "show-more icon-keyboard_arrow_right";
		recentLink.appendChild(recentArrow);
		element.parentNode.insertBefore(recentLink, element);
		element.parentNode.removeChild(element);
	}
	
});


ready('.vjs-fullscreen-control', function(element) {
	
	// Create Full Window video player button
	var fullWindowButton = document.createElement("button");
	fullWindowButton.className = "icon-expand";
	fullWindowButton.type = "button";
	fullWindowButton.title = "Full Window";
	fullWindowButton.style = "font-size: medium;width: 2em;";
	fullWindowButton.dataset.fullWindow = "false";
	element.parentNode.insertBefore(fullWindowButton, element);
	
	// Toggle between Full Window and Non-Full Window video player
	fullWindowButton.onclick = function (event)
	{
		if(event.target.dataset.fullWindow == "false")
		{
			event.target.className = "icon-compress";
			event.target.title = "Non-Full Window";
			
			var videoElement = document.getElementsByTagName("video")[0];
			
			videoElement.parentNode.parentNode.style.width = "100vw";
			videoElement.parentNode.parentNode.style.height = "56.25vw";
			videoElement.parentNode.parentNode.style.maxHeight = "100vh";
			videoElement.parentNode.parentNode.style.maxWidth = "177.78vh";
			videoElement.parentNode.parentNode.style.margin = "auto";
			videoElement.parentNode.parentNode.style.position = "fixed";
			videoElement.parentNode.parentNode.style.top = "0";
			videoElement.parentNode.parentNode.style.bottom = "0";
			videoElement.parentNode.parentNode.style.left = "0";
			videoElement.parentNode.parentNode.style.right = "0";
			
			videoElement.parentNode.parentNode.parentNode.style.position = "fixed";
			videoElement.parentNode.parentNode.parentNode.style.top = "0";
			videoElement.parentNode.parentNode.parentNode.style.left = "0";
			videoElement.parentNode.parentNode.parentNode.style.width = "100%";
			videoElement.parentNode.parentNode.parentNode.style.height = "100%";
			videoElement.parentNode.parentNode.parentNode.style.zIndex = "10000";

			event.target.dataset.fullWindow = "true";
		}
		else
		{
			event.target.className = "icon-expand";
			event.target.title = "Full Window";
			
			var videoElement = document.getElementsByTagName("video")[0];
			
			videoElement.parentNode.parentNode.style.width = "";
			videoElement.parentNode.parentNode.style.height = "";
			videoElement.parentNode.parentNode.style.maxHeight = "";
			videoElement.parentNode.parentNode.style.maxWidth = "";
			videoElement.parentNode.parentNode.style.margin = "";
			videoElement.parentNode.parentNode.style.position = "";
			videoElement.parentNode.parentNode.style.top = "";
			videoElement.parentNode.parentNode.style.bottom = "";
			videoElement.parentNode.parentNode.style.left = "";
			videoElement.parentNode.parentNode.style.right = "";
			
			videoElement.parentNode.parentNode.parentNode.style.position = "";
			videoElement.parentNode.parentNode.parentNode.style.top = "";
			videoElement.parentNode.parentNode.parentNode.style.left = "";
			videoElement.parentNode.parentNode.parentNode.style.width = "";
			videoElement.parentNode.parentNode.parentNode.style.height = "";
			videoElement.parentNode.parentNode.parentNode.style.zIndex = "";
			
			event.target.dataset.fullWindow = "false";
		}
	};
	
	
	stickyPlayer = new MutationObserver(function () {
		
		// Check if full screen button is hidden and hide full window button accordingly
		if(window.getComputedStyle(document.getElementsByClassName("vjs-fullscreen-control")[0], null).getPropertyValue("display") == "none")
		{
			fullWindowButton.style.display = "none";
		}
		else
		{
			fullWindowButton.style.display = "";
		}
		
	});
	
	// Watch for video player transform to small sticky player
	stickyPlayer.observe(document.getElementsByTagName("video")[0].parentNode, {
		attributes: true,
		attributeFilter: ['style']
	});
	
});

ready('.error-page-wrapper', function(element) {
	if(window.location.pathname.search("/episode/recently-added") >= 0)
	{
		//console.log("Enhanced RT: Recently Added Page Detected");
		//console.log(element);
		
		// Remove 404 error
		element.remove();
		
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
	document.getElementsByClassName("episode-main")[0].appendChild(showWrapperDiv);
	
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
	
	watchedCheckbox.onclick = function (event)
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
				
				channelCheckbox.onclick = function (event)
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
	episodeGridContainerDiv.style = "display: flex; flex-wrap: wrap;";
	
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
	//document.getElementsByClassName("show-main__wrapper")[0].appendChild(document.getElementsByClassName("footer-container")[0]);

	// Delete episodes div that will not be used
	//document.getElementsByClassName("episode-content")[0].remove();
	
	
	
	// ***Episode Grid Setup End***


	
	// ***Episode Clone Setup Start***

	
	
	// Create elements used to display individual episode 
	var episodeDiv = document.createElement("div");
	episodeDiv.className = "col s12 m4 l3";
	episodeDiv.style = "margin-left: 0;";
	
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
				
				// Separate season/episode number from display title so it can be displayed separately
				var seasonInfo = myObj.data[i].attributes.display_title.split(" -", 1)[0].split(":");

				// Clone element structure for individual episodes. Don't need to rebuild the whole structure for each episode.
				var cloneEpisodeDiv = episodeDiv.cloneNode(true);

				// Update cloned elements with current episodes information
				cloneEpisodeDiv.dataset.episodeId = myObj.data[i].uuid;
				cloneEpisodeDiv.dataset.channelId = myObj.data[i].attributes.channel_id;
				cloneEpisodeDiv.dataset.seriesId = myObj.data[i].attributes.show_id;
				cloneEpisodeDiv.getElementsByClassName("card-image-wrapper")[0].childNodes[0].href = "/episode/" + myObj.data[i].attributes.slug;
				cloneEpisodeDiv.getElementsByClassName("image")[0].style = "background-image: url(\"" + myObj.data[i].included.images["0"].attributes.small + "\");";
				cloneEpisodeDiv.getElementsByClassName("episode-title")[0].href = "/episode/" + myObj.data[i].attributes.slug;
				cloneEpisodeDiv.getElementsByClassName("episode-title")[0].childNodes[0].nodeValue = myObj.data[i].attributes.title;
				cloneEpisodeDiv.getElementsByClassName("episode-extra__link")[0].href = "/series/" + myObj.data[i].attributes.show_slug;
				cloneEpisodeDiv.getElementsByClassName("episode-extra__link")[0].childNodes[0].nodeValue = myObj.data[i].attributes.show_title + " - " + seasonInfo[0] + " : " + seasonInfo[1];
				cloneEpisodeDiv.getElementsByClassName("info-line")[0].title = myObj.data[i].attributes.title + "\n" + myObj.data[i].attributes.show_title + " - " + seasonInfo[0] + " : " + seasonInfo[1] + "\n\n" + myObj.data[i].attributes.description;

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
