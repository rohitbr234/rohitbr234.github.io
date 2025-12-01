/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');

	// Breakpoints.
		breakpoints({
			xlarge:	[ '1281px',  '1680px' ],
			large:	[ '981px',   '1280px' ],
			medium:	[ '737px',   '980px'  ],
			small:	[ '481px',   '736px'  ],
			xsmall:	[ '361px',   '480px'  ],
			xxsmall:[ null,      '360px' ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Fix: Enable IE flexbox workaround.
		if (browser.name == 'ie') {

			var flexboxFixTimeoutId;

			$window.on('resize.flexbox-fix', function() {

				clearTimeout(flexboxFixTimeoutId);

				flexboxFixTimeoutId = setTimeout(function() {

					if ($wrapper.prop('scrollHeight') > $window.height())
						$wrapper.css('height', 'auto');
					else
						$wrapper.css('height', '100vh');

				}, 250);

			}).triggerHandler('resize.flexbox-fix');

		}

	// Nav.
		var $nav = $header.children('nav'),
			$nav_li = $nav.find('li');

		// Add "middle" alignment classes if we're dealing with an even number of items.
			if ($nav_li.length % 2 == 0)
				$nav.addClass('use-middle');

		// Main articles.
			$main_articles.each(function() {

				var $this = $(this);

				// Toggle.
					$this._hide = function(addState) {

						// Remove "active" state, add "inactive" state.
							$this.removeClass('active');

							if (typeof addState != 'boolean' || addState)
								$this.addClass('inactive');

					};

					$this._show = function() {

						// Remove "inactive" state, add "active" state.
							$this.removeClass('inactive');
							$this.addClass('active');

					};

			});

	// Show/hide.
		$main._show = function(id, initial) {

			var $article = $main_articles.filter('#' + id);

			// No such article? Bail.
				if ($article.length == 0)
					return;

			// Handle lock.
				if (initial !== true && $body.hasClass('is-switching')) {

					$body.addClass('is-article-visible');

					$main_articles.removeClass('active');

					$header.hide();
					$footer.hide();
					$main.show();

					$article.show();

					$article._show(true);

					if (history.pushState)
						history.pushState(null, null, '#' + id);

					return;

				}

			// No lock.
				$body.addClass('is-switching');

			// Add a short delay.
				window.setTimeout(function() {

					// Hide header/footer.
						$header.addClass('hide');
						$footer.addClass('hide');

					// Show main, article.
						$main.show();
						$article.show();

						$article._show(true);

					// Activate artcile's parent.
						$article.parent().addClass('active');

					// Hide others (if any).
						$main_articles.not($article).each(function() {
							var $this = $(this);
							$this._hide(true);
							$this.hide();
						});

					// Body.
						$body.removeClass('is-switching');
						$body.addClass('is-article-visible');

					// Update hash.
						if (history.pushState)
							history.pushState(null, null, '#' + id);

				}, 100);

		};

		$main._hide = function(addState) {

			var $article = $main_articles.filter('.active');

			// No such article? Bail.
				if ($article.length == 0)
					return;

			// Add a short delay.
				window.setTimeout(function() {

					// Hide article.
						$article.removeClass('active');

						$article.addClass('inactive');

					// Local scroll disappear fix (Chrome/Android)
						$article.scrollTop(0);

					// Hide main, header, footer.
						$main.hide();
						$header.show();
						$footer.show();

						$body.removeClass('is-article-visible');

					// Deactivate parent.
						$article.parent().removeClass('active');

					// Remove update hash.
						if (history.pushState && addState !== true) {
							history.pushState(null, null, '#');
						}

				}, 100);

		};

	// Click handlers.

		// Links.
			$nav_li.on('click', function(event) {

				var href = $(this).children('a').attr('href'),
					id = href.substring(1);

				event.preventDefault();
				event.stopPropagation();

				// Show article.
					if ($body.hasClass('is-article-visible'))
						$main._hide(true);

					$main._show(id);

			});

		// Close.
			$main.on('click', function(event) {

				if ($body.hasClass('is-article-visible')) {
					event.stopPropagation();
					event.preventDefault();
					$main._hide();
				}

			});

			$body.on('click', function(event) {

				if ($body.hasClass('is-article-visible')) {
					event.stopPropagation();
					event.preventDefault();
					$main._hide();
				}

			});

	// Prevent scrolling when article visible.
		$window.on('keydown', function(event) {
			if ($body.hasClass('is-article-visible')
			&& event.keyCode == 27) {
				event.preventDefault();
				event.stopPropagation();
				$main._hide();
			}
		});

	// Hash change.
		$window.on('hashchange', function() {

			if (location.hash == ''
			|| location.hash == '#') {

				if ($body.hasClass('is-article-visible'))
					$main._hide(true);

			}
			else {

				var id = location.hash.substring(1);
				if ($main_articles.filter('#' + id).length > 0) {
					if ($body.hasClass('is-article-visible')) {
						$main._hide(true);
						window.setTimeout(function() {
							$main._show(id);
						}, 400);
					}
					else
						$main._show(id);
				}

			}

		});

	// Initial load.
		if (location.hash != ''
		&& location.hash != '#')
			$window.on('load', function() {
				$main._show(location.hash.substring(1), true);
			});

})(jQuery);
