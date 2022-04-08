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
// @version      3.8.9
// ==/UserScript==


//console.log(window.location.protocol);
//console.log(window.location.host);
//console.log(window.location.pathname);
//console.log(window.location.href);


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

var watchedThreshold = 35;

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

ready('.side-nav-menu', function(element) {
	//console.log("Enhanced RT: Side Menu Detected");

	// Add recently added link to side menu
	var recentlyAddedItem = document.createElement("li");
	recentlyAddedItem.className = "side-nav-menu__item";
	var recentlyAddedLink = document.createElement("a");
	recentlyAddedLink.className = "side-nav-menu__link waves-effect waves-brand";
	recentlyAddedLink.href = "/watch/recently-added";
	recentlyAddedLink.appendChild(document.createTextNode("Recently Added"));
	recentlyAddedItem.appendChild(recentlyAddedLink);

	element.insertBefore(recentlyAddedItem, document.getElementsByClassName("side-nav-menu")[0].childNodes[3]);
});

ready('.carousel-title', function(element) {
	//console.log("Enhanced RT: Carousel Detected");
	//console.log(element.childNodes[0].nodeValue);
	
	if(element.childNodes[0] != undefined && element.childNodes[0].nodeValue == "recent episodes")
	{
		var recentLink = document.createElement("a");
		recentLink.className = "carousel-title link";
		recentLink.href = "/watch/recently-added";
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
	fullWindowButton.className = "icon-expand-alt";
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
			event.target.className = "icon-compress-alt";
			event.target.title = "Non-Full Window";
			
			// Disable scroll while in full window
			document.getElementsByTagName("body")[0].style.overflow = "hidden";
			
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
			event.target.className = "icon-expand-alt";
			event.target.title = "Full Window";
			
			// Re-enable scroll
			document.getElementsByTagName("body")[0].style.overflow = "visible";
			
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

ready('.vjs-upnext', function(element) {
	//console.log("Enhanced RT: Up Next Div Detected");
	
	// Ignore if it is the Up Next template Div
	if(element.childNodes[0].childNodes[1].childNodes[0].href != "https://roosterteeth.com/")
	{
		// Only download Auto Play Next Video preference if user is logged in
		if(document.cookie.indexOf("rt_access_token=") != -1)
		{
			// Get users Auto Play Next Video preference from server
			var meXMLHttp = new XMLHttpRequest();
			
			meXMLHttp.onreadystatechange = function() {
				
				if (this.readyState == 4 && this.status == 200) // Successfully downloaded user preference
				{
					var meObj = JSON.parse(this.responseText);
					//console.log("Connected, get preference from server");
					//console.log("Auto Play Next Video is " + meObj.attributes.preferences.autoplay);

					autoPlayNextVideo = meObj.attributes.preferences.autoplay.toString();
					// Store users Auto Play Next Video preference locally
					localStorage.setItem("enhancedRT_autoPlayNextVideo", autoPlayNextVideo);
					
					if(autoPlayNextVideo == "false")
					{
						// Stop next video auto play
						element.childNodes[0].childNodes[0].childNodes[0].click();

						// Delete next up div so it does not display
						element.parentNode.removeChild(element);
						
						//console.log("Auto Play Next Video has been killed");
						//alert("Auto Play Next Video has been killed");
					}
				}


				if (this.readyState == 4 && this.status != 200) // Failed to downloaded user preference
				{
					// Could not connect, get preference from local storage
					autoPlayNextVideo = ((localStorage.getItem("enhancedRT_autoPlayNextVideo") == null) ? "true" : localStorage.getItem("enhancedRT_autoPlayNextVideo"));
					//console.log("Could not connect, get preference from local storage");
					//console.log("Auto Play Next Video is " + autoPlayNextVideo);
					
					if(autoPlayNextVideo == "false")
					{
						// Stop next video auto play
						element.childNodes[0].childNodes[0].childNodes[0].click();

						// Delete next up div so it does not display
						element.parentNode.removeChild(element);
						
						//console.log("Auto Play Next Video has been killed");
						//alert("Auto Play Next Video has been killed");
					}
				}
			};

			// Request user's preferences from server
			meXMLHttp.open("GET", "https://business-service.roosterteeth.com/api/v1/me", true);
			meXMLHttp.send();

		}
		else
		{
			// User not logged in, get preference from local storage
			autoPlayNextVideo = ((localStorage.getItem("enhancedRT_autoPlayNextVideo") == null) ? "true" : localStorage.getItem("enhancedRT_autoPlayNextVideo"));
			//console.log("Not logged in, get preference from local storage");
			//console.log("Auto Play Next Video is " + autoPlayNextVideo);
			
			if(autoPlayNextVideo == "false")
			{
				// Stop next video auto play
				element.childNodes[0].childNodes[0].childNodes[0].click();

				// Delete next up div so it does not display
				element.parentNode.removeChild(element);
				//console.log("Auto Play Next Video has been killed");
				//alert("Auto Play Next Video has been killed");
			}
		}
	}
});

ready('.error-page-wrapper', function(element) {
	if(window.location.pathname.search("/watch/recently-added") >= 0)
	{
		//console.log("Enhanced RT: Recently Added Page Detected");
		//console.log(element);
		
		// Remove 404 error
		element.remove();
		
		// Remove video player error
		document.getElementsByClassName("persistent-player")[0].remove();
		
		// Only check Auto Play Next Video preference if user is logged in
		if(document.cookie.indexOf("rt_access_token=") != -1)
		{
			// Update users Auto Play Next Video preference and store locally
			var meXMLHttp = new XMLHttpRequest();
			
			meXMLHttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) // Successfully downloaded user preference
				{
					var meObj = JSON.parse(this.responseText);
					// Store users Auto Play Next Video preference locally
					localStorage.setItem("enhancedRT_autoPlayNextVideo", meObj.attributes.preferences.autoplay.toString());
				}
			};

			// Request user's preferences from server
			meXMLHttp.open("GET", "https://business-service.roosterteeth.com/api/v1/me", true);
			meXMLHttp.send();
		}
		
		// Create Recently Added page
		recentlyAdded();
	}
});

ready('.percent-bar', function(element) {
	if(window.location.pathname.search("/watch/recently-added") == -1 && window.location.pathname.search("/my-watchlist") == -1)
	{
		//console.log("Enhanced RT: Watched Video Detected");
		//console.log(element);
		//console.log(element.childNodes[0].childNodes[0].style.width);
		//console.log(element.parentNode.childNodes[0].childNodes[1].childNodes[0]);

		var episodeLengthTimestamp = element.parentNode.childNodes[0].childNodes[1].childNodes[0].nodeValue.split(":");

		if(episodeLengthTimestamp.length == 3)
		{
			var episodeLength = (parseInt(episodeLengthTimestamp[0]) * 3600) + (parseInt(episodeLengthTimestamp[1]) * 60) + parseInt(episodeLengthTimestamp[2]);
		}
		else
		{
			var episodeLength = (parseInt(episodeLengthTimestamp[0]) * 60) + parseInt(episodeLengthTimestamp[1]);
		}
		
		if(episodeLength - (episodeLength * (parseFloat(element.childNodes[0].childNodes[0].style.width) / 100)) < watchedThreshold)
		{
			// Create Watched/Resume label
			var WatchedDiv = document.createElement("div");
			WatchedDiv.className = "timestamp";
			WatchedDiv.style.top = "0%";
			WatchedDiv.style.left = "0%";
			WatchedDiv.style.right = "auto";
			WatchedDiv.style.bottom = "auto";
			WatchedDiv.style.fontSize = "1rem";
			
			// Set Watched label text
			WatchedDiv.appendChild(document.createTextNode("Watched"));
			
			// Append Watched/Resume label
			element.parentNode.childNodes[0].appendChild(WatchedDiv);
		}
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


function seconds2Timestamp(seconds)
{
	var timestamp = ["hours", "minutes", "seconds"];
	timestamp.hours = Math.floor(seconds / 3600);
	seconds %= 3600;
	timestamp.minutes = Math.floor(seconds / 60);
	timestamp.seconds = seconds % 60;
	return timestamp;
}

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
	var episodesPerPage = 100;
	
	// Channel colors and logo URLs
	var channelData = new Array;
	channelData.push({id: "92b6bb21-91d2-4b1b-bf95-3268fa0d9939", color: "C9373F", logo: "https://assets.roosterteeth.com/img/RT_Cockbite_White.png"});
	channelData.push({id: "2cb2a70c-be50-46f5-93d7-84a1baabb4f7", color: "5F9F41", logo: "https://assets.roosterteeth.com/img/AH_Logo_White.png"});
	channelData.push({id: "2dc2a30b-55b7-443c-b565-1b3be9257fc4", color: "FE8204", logo: "https://assets.roosterteeth.com/img/FH_Logo_White.png"});
	channelData.push({id: "dd838359-a0e0-405f-b18b-5b0ed16ef852", color: "00AEEF", logo: "https://assets.roosterteeth.com/img/SA_Logo_White.png"});
	channelData.push({id: "84c7eaaf-54ab-40b6-8832-f6527eb22335", color: "D5B037", logo: "https://assets.roosterteeth.com/img/CC_Logo_White.png"});
	channelData.push({id: "33c38834-k169-3828-a527-49f7baz27482", color: "1BB479", logo: "https://assets.roosterteeth.com/img/SP7_Logo_White.png"});
	channelData.push({id: "528e5605-502e-499b-a3a3-2652498607ac", color: "8B54DC", logo: "https://assets.roosterteeth.com/img/GA_Logo_White.png"});
	channelData.push({id: "d7882a89-da75-4ee3-a02a-f49dc5889214", color: "D8262F", logo: "https://assets.roosterteeth.com/static/media/IG_Logo_White.f699b6b7.png"});
	channelData.push({id: "23g6dajk-76dc-27y3-6531-h5902rh48941", color: "FC1334", logo: "https://assets.roosterteeth.com/img/JT_Logo_White.png"});
	
	// ***Initial Setup Start***

	// Create elements for episode grid
	var showWrapperDiv = document.createElement("div");
	showWrapperDiv.className = "show-main__wrapper";
	
	// Start by appending parent element to page. The other elements will be added to it.
	document.getElementsByClassName("episode-main")[0].insertBefore(showWrapperDiv, document.getElementsByClassName("episode-main")[0].childNodes[0]);
	
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


	// Determine if channel logos can be used instead of channel checkboxes. Logos should work on all browsers except Microsoft Edge.
	if(CSS.supports("-webkit-mask-image", "url()"))
	{
		var watchedLogoDiv = document.createElement("div");
		watchedLogoDiv.className = ((watchedFilter == "false") ? "icon-eye" : "icon-eye-slash");
		watchedLogoDiv.title = ((watchedFilter == "false") ? "Hide Watched Episodes" : "Show Watched Episodes");
		watchedLogoDiv.style = "display: inline-block; cursor: pointer; margin-right: 20px; font-size: 40px; color: #ddd; opacity: 1;";
		watchedLogoDiv.style.color = ((watchedFilter == "false") ? "#ddd" : "gray");
		watchedLogoDiv.style.opacity = ((watchedFilter == "false") ? 1 : 0.5);
		watchedLogoDiv.style.verticalAlign = "top";
		headerDiv.appendChild(watchedLogoDiv);
		
		watchedLogoDiv.onclick = function (event)
		{
			if(event.target.className == "icon-eye-slash")
			{
				event.target.className = "icon-eye";
				event.target.style.color = "#ddd";
				event.target.style.opacity = 1;
				event.target.title = "Hide Watched Episodes";
				watchedFilter = "false";
				localStorage.setItem("enhancedRT_watchedFilter", watchedFilter);
			}
			else if(event.target.className == "icon-eye")
			{
				event.target.className = "icon-eye-slash";
				event.target.style.color = "gray";
				event.target.style.opacity = 0.5;
				event.target.title = "Show Watched Episodes";
				watchedFilter = "true";
				localStorage.setItem("enhancedRT_watchedFilter", watchedFilter);
			}
			
			hideVideos();
			checkForEndlessTrigger();
		};
	}
	else
	{
		var watchedLabel = document.createElement("label");
		watchedLabel.style = "font-size: 1.64rem; margin-right: 10px;";
		watchedLabel.style.cursor = "pointer";
		watchedLabel.title = ((watchedFilter == "false") ? "Hide Watched Episodes" : "Show Watched Episodes");
		var watchedCheckbox = document.createElement("input");
		watchedCheckbox.type = "checkbox";
		watchedCheckbox.id = "watchedFilter";
		watchedCheckbox.defaultChecked = ((watchedFilter == "false") ? true : false);
		watchedCheckbox.style = "position: static; opacity: 100; pointer-events:auto; width: 17px; height: 17px; margin-left: 5px;";
		watchedCheckbox.style.cursor = "pointer";
		watchedLabel.appendChild(watchedCheckbox);
		watchedLabel.appendChild(document.createTextNode("Watched"));
		
		headerDiv.appendChild(watchedLabel);
		
		watchedCheckbox.onclick = function (event)
		{
			if(event.target.checked == true)
			{
				watchedFilter = "false";
				localStorage.setItem("enhancedRT_watchedFilter", watchedFilter);
				event.target.parentNode.title = "Hide Watched Episodes";
			}
			else if(event.target.checked == false)
			{
				watchedFilter = "true";
				localStorage.setItem("enhancedRT_watchedFilter", watchedFilter);
				event.target.parentNode.title = "Show Watched Episodes";
			}
			
			hideVideos();
			checkForEndlessTrigger();
		};
	}

	// Get List of Channels
	var channelsXMLHttp = new XMLHttpRequest();
	
	channelsXMLHttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var channelsObj = JSON.parse(this.responseText);
			
			
			for (var i = 0, len = channelsObj.data.length; i < len; i++)
			{
				//console.log("Name: " + channelsObj.data[i].attributes.name + " ID: " + channelsObj.data[i].uuid);
				//channelArray[channelsObj.data[i].uuid] = "true";

				logoFound = false;
				
				// Create channel and series filter elements
				var channelSettingDiv = document.createElement("div");
				channelSettingDiv.style.display = "inline-block";
				channelSettingDiv.style.verticalAlign = "top";
				
				var channelFilterDiv = document.createElement("div");
				channelFilterDiv.classList.add("js-enhancedrt-channel-logo");
				channelFilterDiv.dataset.channelId = channelsObj.data[i].uuid;
				channelFilterDiv.dataset.channelName = channelsObj.data[i].attributes.name;

				var showSeriesDiv = document.createElement("div");
				showSeriesDiv.style.marginRight = "20px";
				showSeriesDiv.style.cursor = "pointer";
				showSeriesDiv.title = "Show Series Filters";	

				var arrowDownIcon = document.createElement("i");
				arrowDownIcon.classList.add("icon-keyboard_arrow_down");
				arrowDownIcon.style.fontSize = "x-large";
				
				showSeriesDiv.appendChild(arrowDownIcon);
				
				
				//Connect channel and series filter elements
				channelSettingDiv.appendChild(channelFilterDiv);
				channelSettingDiv.appendChild(showSeriesDiv);
				headerDiv.appendChild(channelSettingDiv);
				
				// Display series filters
				showSeriesDiv.onclick = function (event)
				{
					//console.log(event.currentTarget);
					var seriesList = document.getElementsByClassName("js-enhancedrt-series-list");
					for ( i = 0; i < seriesList.length; i++)
					{
						if(event.currentTarget.parentNode.children[0].dataset.channelId.indexOf(seriesList[i].dataset.channelId) != -1)
						{
							if(seriesList[i].style.display == "none")
							{
								seriesList[i].style.display = "";
								event.currentTarget.children[0].className = "icon-keyboard_arrow_up";
								event.currentTarget.children[0].title = "Hide Series Filters";
							}
							else
							{
								seriesList[i].style.display = "none";
								event.currentTarget.children[0].className = "icon-keyboard_arrow_down";
								event.currentTarget.children[0].title = "Show Series Filters";
							}
						}
						else
						{
							seriesList[i].style.display = "none";
							document.querySelector(".js-enhancedrt-channel-logo[data-channel-ID='" + seriesList[i].dataset.channelId + "'] + div > i").className = "icon-keyboard_arrow_down";
							document.querySelector(".js-enhancedrt-channel-logo[data-channel-ID='" + seriesList[i].dataset.channelId + "'] + div > i").title = "Show Series Filters";
						}
					}
				};
				
				
				
				// Determine if channel logos can be used instead of channel checkboxes. Logos should work on all browsers except Microsoft Edge.
				if(CSS.supports("-webkit-mask-image", "url()"))
				{
					// Find channel color and logo URL
					channelData.forEach(function(element) {
						if(element.id == channelsObj.data[i].uuid)
						{
							
							logoFound = true;


							channelFilterDiv.dataset.channelColor = element.color;
							channelFilterDiv.dataset.channelLogo = element.logo;
							arrowDownIcon.style.color = "#" + channelFilterDiv.dataset.channelColor;
							
							channelFilterDiv.title = ((channelFilter.indexOf(channelsObj.data[i].uuid) == -1) ? "Hide " : "Show ") + channelFilterDiv.dataset.channelName;
							channelFilterDiv.style = "display:inline-block; cursor: pointer; width: 40px; height: 40px; margin-right: 20px; -webkit-mask-image: url('" + channelFilterDiv.dataset.channelLogo + "'); -webkit-mask-size: 100% 100%;"
							if(channelFilter.indexOf(channelsObj.data[i].uuid) == -1)
							{
								channelFilterDiv.title = "Hide " + channelFilterDiv.dataset.channelName;
								channelFilterDiv.style.backgroundColor = "#" + channelFilterDiv.dataset.channelColor;
								channelFilterDiv.style.opacity = 1;
							}
							else
							{
								channelFilterDiv.title = "Show " + channelFilterDiv.dataset.channelName;
								channelFilterDiv.style.backgroundColor = "gray";
								channelFilterDiv.style.opacity = 0.5;
							}

							
							channelFilterDiv.onclick = function (event)
							{
								if(event.target.style.backgroundColor == "gray")
								{
									event.target.style.backgroundColor = "#" + event.target.dataset.channelColor;
									event.target.style.opacity = 1;
									event.target.title = "Hide " + event.target.dataset.channelName;
									if (channelFilter.indexOf(event.target.dataset.channelId) != -1) {
										channelFilter.splice(channelFilter.indexOf(event.target.dataset.channelId), 1);
									}
									localStorage.setItem("enhancedRT_channelFilter", JSON.stringify(channelFilter));
								}
								else if(event.target.style.backgroundColor != "gray")
								{
									event.target.style.backgroundColor = "gray";
									event.target.style.opacity = 0.5;
									event.target.title = "Show " + event.target.dataset.channelName;
									if (channelFilter.indexOf(event.target.dataset.channelId) == -1) {
										channelFilter.push(event.target.dataset.channelId)
									}
									localStorage.setItem("enhancedRT_channelFilter", JSON.stringify(channelFilter));
								}
								
								hideVideos();
								checkForEndlessTrigger();
							};

						}
					});
					
					
				}
				
				// Default to checkbox if no logo found or logo image mask not supported
				if(!logoFound)
				{
					
					channelFilterDiv.style.height = "46px";
					
					var channelLabel = document.createElement("label");
					channelLabel.style = "font-size: 1.64rem; margin-right: 10px;";
					channelLabel.style.cursor = "pointer";
					channelLabel.title = ((channelFilter.indexOf(channelsObj.data[i].uuid) == -1) ? "Hide " + channelsObj.data[i].attributes.name : "Show " + channelsObj.data[i].attributes.name);
					var channelCheckbox = document.createElement("input");
					channelCheckbox.type = "checkbox";
					channelCheckbox.id = channelsObj.data[i].uuid;
					channelCheckbox.defaultChecked = ((channelFilter.indexOf(channelsObj.data[i].uuid) == -1) ? true : false);
					channelCheckbox.style = "position: static; opacity: 100; pointer-events:auto; width: 17px; height: 17px; margin-left: 5px;";
					channelCheckbox.style.cursor = "pointer";
					channelLabel.appendChild(channelCheckbox);
					channelLabel.appendChild(document.createTextNode(channelsObj.data[i].attributes.name));
					
					channelFilterDiv.appendChild(channelLabel);

					
					channelCheckbox.onclick = function (event)
					{
						if(event.target.checked == true)
						{
							//console.log("onclick checked: " + event.target.checked);
							if (channelFilter.indexOf(event.target.id) != -1) {
								channelFilter.splice(channelFilter.indexOf(event.target.id), 1);
							}
							localStorage.setItem("enhancedRT_channelFilter", JSON.stringify(channelFilter));
							event.target.parentNode.title = "Hide " + event.target.parentNode.textContent;
						}
						else if(event.target.checked == false)
						{
							//console.log("onclick unchecked: " + event.target.checked);
							if (channelFilter.indexOf(event.target.id) == -1) {
								channelFilter.push(event.target.id)
							}
							localStorage.setItem("enhancedRT_channelFilter", JSON.stringify(channelFilter));
							event.target.parentNode.title = "Show " + event.target.parentNode.textContent;
						}
						
						hideVideos();
						checkForEndlessTrigger();
					};
					
				}
				
				
				

				
				// Get series that belong to this channel
				var seriesXMLHttp = new XMLHttpRequest();
				
				seriesXMLHttp.onreadystatechange = function()
				{
					if (this.readyState == 4 && this.status == 200)
					{
						var seriesObj = JSON.parse(this.responseText);
						
						var seriesDiv = document.createElement("div");
						seriesDiv.className = "js-enhancedrt-series-list";
						seriesDiv.style.display = "none";
						seriesDiv.dataset.channelId = seriesObj.data[1].attributes.channel_id;

						seriesDiv.style.textAlign = "left";
						seriesDiv.style.margin = "20px 4%";
						
						for (var i = 0, len = seriesObj.data.length; i < len; i++)
						{
							//console.log("Series name: " + seriesObj.data[i].attributes.title + " ID: " + seriesObj.data[i].uuid);

							var seriesLabel = document.createElement("label");
							seriesLabel.style = "font-size: 1.64rem; margin-right: 10px;";
							seriesLabel.style = "margin-bottom: 5px; margin-right: 10px; width: 16%";
							seriesLabel.style.display = "inline-block";
							seriesLabel.style.whiteSpace = "nowrap";
							seriesLabel.style.overflow = "hidden";
							seriesLabel.style.textOverflow = "ellipsis";
							seriesLabel.style.cursor = "pointer";
							seriesLabel.title = ((seriesFilter.indexOf(seriesObj.data[i].uuid) == -1) ? "Hide " + seriesObj.data[i].attributes.title : "Show " + seriesObj.data[i].attributes.title);
							//seriesLabel.style.textAlign = "left";
							var seriesCheckbox = document.createElement("input");
							seriesCheckbox.type = "checkbox";
							seriesCheckbox.id = seriesObj.data[i].uuid;
							seriesCheckbox.defaultChecked = ((seriesFilter.indexOf(seriesObj.data[i].uuid) == -1) ? true : false);
							seriesCheckbox.style = "position: static; opacity: 100; pointer-events:auto; width: 17px; height: 17px; margin-left: 5px;";
							seriesCheckbox.style.verticalAlign = "top";
							seriesCheckbox.style.cursor = "pointer";
							seriesLabel.appendChild(seriesCheckbox);
							seriesLabel.appendChild(document.createTextNode(seriesObj.data[i].attributes.title));
							
							seriesDiv.appendChild(seriesLabel);
							
							seriesCheckbox.onclick = function (event)
							{
								if(event.target.checked == true)
								{
									//console.log("onclick checked: " + event.target.checked);
									if (seriesFilter.indexOf(event.target.id) != -1) {
										seriesFilter.splice(seriesFilter.indexOf(event.target.id), 1);
									}
									localStorage.setItem("enhancedRT_seriesFilter", JSON.stringify(seriesFilter));
									event.target.parentNode.title = "Hide " + event.target.parentNode.textContent;
								}
								else if(event.target.checked == false)
								{
									//console.log("onclick unchecked: " + event.target.checked);
									if (seriesFilter.indexOf(event.target.id) == -1) {
										seriesFilter.push(event.target.id)
									}
									localStorage.setItem("enhancedRT_seriesFilter", JSON.stringify(seriesFilter));
									event.target.parentNode.title = "Show " + event.target.parentNode.textContent;
								}
								
								hideVideos();
								checkForEndlessTrigger();
							};
							
						}
						
						headerDiv.appendChild(seriesDiv);

					}
				}

				// Request series list from server
				seriesXMLHttp.open("GET", "https://svod-be.roosterteeth.com/api/v1/channels/" + channelsObj.data[i].attributes.slug + "/shows", true);
				seriesXMLHttp.send();

			}
		}
	};

	// Request channels list from server
	channelsXMLHttp.open("GET", "https://svod-be.roosterteeth.com/api/v1/channels", true);
	channelsXMLHttp.send();


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
	timestampDiv.style.fontSize = "1rem";
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
				
				// Make sure that display text actually starts with season and episode information by detecting an episode number
				if(myObj.data[i].attributes.display_title.split(" -", 1)[0].search(":E\\d") >= 0)
				{
					// Separate season/episode number from display title so it can be displayed separately
					// Pulling the season information from the display title field saves from making a query to the Season API for each episode
					var seasonInfo = myObj.data[i].attributes.display_title.split(" -", 1)[0].split(":");
					var seasonInfoText = " - " + seasonInfo[0] + " : " + seasonInfo[1];
				}
				else
				{
					// Season and episode info were not found, so seasonInfo text will be left blank
					// Could query the Season API instead of leaving it blank
					var seasonInfoText = "";
				}

				// Clone element structure for individual episodes. Don't need to rebuild the whole structure for each episode.
				var cloneEpisodeDiv = episodeDiv.cloneNode(true);

				// Update cloned elements with current episodes information
				cloneEpisodeDiv.dataset.episodeId = myObj.data[i].uuid;
				cloneEpisodeDiv.dataset.channelId = myObj.data[i].attributes.channel_id;
				cloneEpisodeDiv.dataset.seriesId = myObj.data[i].attributes.show_id;
				cloneEpisodeDiv.getElementsByClassName("card-image-wrapper")[0].childNodes[0].href = "/episode/" + myObj.data[i].attributes.slug;
				cloneEpisodeDiv.getElementsByClassName("image")[0].style = "background-image: url(\"" + myObj.data[i].included.images["0"].attributes.small + "\"); background-size: cover;";
				cloneEpisodeDiv.getElementsByClassName("episode-title")[0].href = "/episode/" + myObj.data[i].attributes.slug;
				cloneEpisodeDiv.getElementsByClassName("episode-title")[0].childNodes[0].nodeValue = myObj.data[i].attributes.title;
				cloneEpisodeDiv.getElementsByClassName("episode-extra__link")[0].href = "/series/" + myObj.data[i].attributes.show_slug;
				cloneEpisodeDiv.getElementsByClassName("episode-extra__link")[0].childNodes[0].nodeValue = myObj.data[i].attributes.show_title + seasonInfoText;
				cloneEpisodeDiv.getElementsByClassName("info-line")[0].title = myObj.data[i].attributes.title + "\n" + myObj.data[i].attributes.show_title + seasonInfoText + "\n\n" + myObj.data[i].attributes.description;
				
				
				// Show channel color for each video
				channelData.forEach(function(element) {
					if(element.id == myObj.data[i].attributes.channel_id)
					{
						cloneEpisodeDiv.getElementsByClassName("info-line")[0].style.borderLeft = "10px solid #" + element.color;
						cloneEpisodeDiv.getElementsByClassName("info-line")[0].style.paddingLeft = "5px";
					}
				});

				// Show channel logo over thumbnail
				//<div class="timestamp" style="top: 74%;left: 0%;right: 84%;bottom: 0%;/* display: none; */background: #1d1d1d;"><img src="https://roosterteeth.com/img/AH_Logo_White.png" style="height: 100%;width: 100%;"></div>

				var episodeLength = seconds2Timestamp(myObj.data[i].attributes.length);
				
				cloneEpisodeDiv.getElementsByClassName("timestamp")[0].childNodes[0].nodeValue = ((episodeLength.hours == 0) ? episodeLength.minutes : episodeLength.hours + ":" + ('0'+episodeLength.minutes).slice(-2)) +':'+ ('0'+episodeLength.seconds).slice(-2);

				// Format episode date to human readable
				var episodeDate = new Date(myObj.data[i].attributes.original_air_date);
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
			getWatchTimes(watchTimeXMLHttp, episodeBatch);
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

			for (var i = 0; i < watchTimeObj.length; i++)
			{
				for (var j = 0; j < episodeData.data.length; j++)
				{
					if(episodeData.data[j].uuid == watchTimeObj[i].uuid)
					{
						// Create Watched/Resume label
						var WatchedDiv = document.createElement("div");
						WatchedDiv.className = "timestamp";
						WatchedDiv.style.top = "0%";
						WatchedDiv.style.left = "0%";
						WatchedDiv.style.right = "auto";
						WatchedDiv.style.bottom = "auto";
						WatchedDiv.style.fontSize = "1rem";
						
						if(watchTimeObj[i].value > episodeData.data[j].attributes.length - watchedThreshold)
						{
							// Set Watched label text
							WatchedDiv.appendChild(document.createTextNode("Watched"));
							
							document.querySelector("[data-episode-id='"+watchTimeObj[i].uuid+"']").dataset.watched = "true";
							
							//console.log("Episode " + episodeData.data[j].attributes.display_title + " is watched. It is " + episodeData.data[j].attributes.length + " seconds long and watch time is " + watchTimeObj[i].value + " seconds.");
						}
						else // There is a watch time but it is not within the watched threshold
						{
							// Set Resume label text
							var watchedLength = seconds2Timestamp(watchTimeObj[i].value);
							WatchedDiv.appendChild(document.createTextNode("Resume from " + ((watchedLength.hours == 0) ? watchedLength.minutes : watchedLength.hours + ":" + ('0'+watchedLength.minutes).slice(-2)) +':'+ ('0'+watchedLength.seconds).slice(-2)));
							
							var PercentDiv = document.createElement("div");
							PercentDiv.className = "percent-bar";
							var ProgressDiv = document.createElement("div");
							ProgressDiv.className = "progress";
							var DeterminateDiv = document.createElement("div");
							DeterminateDiv.className = "determinate";
							DeterminateDiv.style.width = "" + (Math.round((Math.trunc(watchTimeObj[i].value) / episodeData.data[j].attributes.length) * 1000000) / 10000) + "%";
							
							ProgressDiv.appendChild(DeterminateDiv);
							PercentDiv.appendChild(ProgressDiv);
							
							document.querySelector("[data-episode-id='"+watchTimeObj[i].uuid+"']").childNodes[0].childNodes[0].childNodes[0].appendChild(PercentDiv);
						}

						// Append Watched/Resume label
						document.querySelector("[data-episode-id='"+watchTimeObj[i].uuid+"']").childNodes[0].childNodes[0].childNodes[0].childNodes[0].appendChild(WatchedDiv);

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
		// Only get watch times if access token exists
		if(localStorage.getItem("rt_access_token") != null)
		{
			// Retrieve rt_access_token from local storage
			var accessToken = localStorage.getItem("rt_access_token");
			
			// Request watch times for current episode batch
			watchTimeXMLHttp.open("GET", "https://wtcg.roosterteeth.com/api/v1/my/played_positions/mget/" + episodeBatch, true);
			watchTimeXMLHttp.setRequestHeader('Authorization', 'Bearer ' + accessToken);
			watchTimeXMLHttp.send();
		}
		
		// Old code used to retrieve rt_access_token when it was stored in a cookie.
		/*
		if(document.cookie.indexOf("rt_access_token=") != -1)
		{
			// Retrieve rt_access_token from document.cookie
			var tokenLocation = document.cookie.indexOf("rt_access_token=") + 16;
			var accessToken = document.cookie.substring(tokenLocation, document.cookie.indexOf(";", tokenLocation));
			
			// Request watch times for current episode batch
			watchTimeXMLHttp.open("GET", "https://wtcg.roosterteeth.com/api/v1/my/played_positions/mget/" + episodeBatch, true);
			watchTimeXMLHttp.setRequestHeader('Authorization', 'Bearer ' + accessToken);
			watchTimeXMLHttp.send();
		}
		*/
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
		
		if(seriesFilter.indexOf(episode[i].dataset.seriesId) != -1)
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
