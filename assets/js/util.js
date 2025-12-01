/*
	util.js
	Imported from the HTML5 UP "Dimension" template
*/

/*
	Function:	polyfill
	Purpose:	Adds support for certain features on older browsers.
*/

(function() {

	// Polyfill: matches
		if (!Element.prototype.matches)
			Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

	// Polyfill: closest
		if (!Element.prototype.closest)
			Element.prototype.closest = function(s) {
				var el = this;
				if (!document.documentElement.contains(el)) return null;
				do {
					if (el.matches(s)) return el;
					el = el.parentElement || el.parentNode;
				} while (el !== null && el.nodeType === 1);
				return null;
			};

})();

/*
	Function:	$$$
	Purpose:	Shortcut for querying DOM elements.
*/

var $$$ = function(selector, context) {
	return (context ? context : document).querySelectorAll(selector);
};

/*
	Function:	on
	Purpose:	Helper method for adding event listeners to multiple elements.
*/

var on = function(elements, event, handler) {
	if (elements instanceof NodeList) {
		elements.forEach(function(element) {
			element.addEventListener(event, handler);
		});
	} else if (elements instanceof Node) {
		elements.addEventListener(event, handler);
	}
};

/*
	Function:	scrollToY
	Purpose:	Smoothly scroll to a specific vertical position.
*/

var scrollToY = function(targetY, duration) {
	var startY = window.pageYOffset,
		distanceY = targetY - startY,
		startTime = null;

	function animationStep(currentTime) {
		if (startTime === null) startTime = currentTime;

		var timeElapsed = currentTime - startTime,
			progress = Math.min(timeElapsed / duration, 1),
			ease = progress < 0.5
				? 2 * progress * progress
				: -1 + (4 - 2 * progress) * progress;

		window.scrollTo(0, startY + distanceY * ease);

		if (progress < 1)
			requestAnimationFrame(animationStep);
	}

	requestAnimationFrame(animationStep);
};

/*
	Function:	toggleClass
	Purpose:	Add, remove, or toggle a CSS class on an element.
*/

var toggleClass = function(element, className, force) {
	if (force === true)
		element.classList.add(className);
	else if (force === false)
		element.classList.remove(className);
	else
		element.classList.toggle(className);
};

/*
	Function:	escapeHTML
	Purpose:	Escapes HTML for safe insertion into the DOM.
*/

var escapeHTML = function(html) {
	var text = document.createTextNode(html),
		div = document.createElement('div');
	div.appendChild(text);
	return div.innerHTML;
};
