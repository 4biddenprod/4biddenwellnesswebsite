/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile)
			$body.addClass('is-touch');

	// Forms.
		var $form = $('form');

		// Auto-resizing textareas.
			$form.find('textarea').each(function() {

				var $this = $(this),
					$wrapper = $('<div class="textarea-wrapper"></div>'),
					$submits = $this.find('input[type="submit"]');

				$this
					.wrap($wrapper)
					.attr('rows', 1)
					.css('overflow', 'hidden')
					.css('resize', 'none')
					.on('keydown', function(event) {

						if (event.keyCode == 13
						&&	event.ctrlKey) {

							event.preventDefault();
							event.stopPropagation();

							$(this).blur();

						}

					})
					.on('blur focus', function() {
						$this.val($.trim($this.val()));
					})
					.on('input blur focus --init', function() {

						$wrapper
							.css('height', $this.height());

						$this
							.css('height', 'auto')
							.css('height', $this.prop('scrollHeight') + 'px');

					})
					.on('keyup', function(event) {

						if (event.keyCode == 9)
							$this
								.select();

					})
					.triggerHandler('--init');

				// Fix.
					if (browser.name == 'ie'
					||	browser.mobile)
						$this
							.css('max-height', '10em')
							.css('overflow-y', 'auto');

			});

	// Menu.
		var $menu = $('#menu');

		$menu.wrapInner('<div class="inner"></div>');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					if (href == '#menu')
						return;

					window.setTimeout(function() {
						window.location.href = href;
					}, 350);

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
    // Function to initialize a slider by its container ID
    function initSlider(sliderId) {
        const container = document.querySelector(`#${sliderId}`);
        const slides = container.querySelectorAll(".slide");
        const prevBtn = container.querySelector(".prev");
        const nextBtn = container.querySelector(".next");
        const dots = container.querySelectorAll(".dot");
        const pausePlayBtn = container.querySelector(".pause-play");

        let currentSlide = 0;
        let isPlaying = true;
        let slideInterval = setInterval(nextSlide, 5000);

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? "block" : "none";
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === index);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        function togglePlayPause() {
            if (isPlaying) {
                clearInterval(slideInterval);
            } else {
                slideInterval = setInterval(nextSlide, 5000);
            }
            isPlaying = !isPlaying;
        }

        function goToSlide(e) {
            currentSlide = parseInt(e.target.dataset.slide, 10);
            showSlide(currentSlide);
        }

        // Event Listeners
        if (prevBtn) prevBtn.addEventListener("click", prevSlide);
        if (nextBtn) nextBtn.addEventListener("click", nextSlide);
        if (pausePlayBtn) pausePlayBtn.addEventListener("click", togglePlayPause);
        dots.forEach((dot) => dot.addEventListener("click", goToSlide));

        // Swipe Gesture Support
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        container.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) nextSlide();
            if (touchEndX - touchStartX > 50) prevSlide();
        });

        // Keyboard Navigation (Scoped to Container Focus)
        container.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === " ") togglePlayPause();
        });

        showSlide(currentSlide);
    }

    // Initialize sliders by their unique container IDs
    initSlider("slideshow-container-1");
    initSlider("slideshow-container-2");
});
document.addEventListener("DOMContentLoaded", function () {
    const secondSlider = document.getElementById("slideshow-container-2");
    if (secondSlider) {
        secondSlider.style.marginBottom = "40px";
    }
});
const slider = document.getElementById('cslider-slider');
const progressBar = document.getElementById('progress-bar');
const prevButton = document.getElementById('prev-slide');
const nextButton = document.getElementById('next-slide');

// Update arrows and progress bar
function updateArrows() {
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    if (slider.scrollLeft <= 0) {
        prevButton.classList.add('disabled');
    } else {
        prevButton.classList.remove('disabled');
    }
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
        nextButton.classList.add('disabled');
    } else {
        nextButton.classList.remove('disabled');
    }
}

// Update progress bar
slider.addEventListener('scroll', () => {
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    const scrollPercentage = (slider.scrollLeft / maxScrollLeft) * 100;
    progressBar.style.width = `${Math.min(scrollPercentage, 100)}%`;
    updateArrows();
});

// Previous slide button
prevButton.addEventListener('click', () => {
    slider.scrollBy({
        left: -slider.clientWidth / 2,
        behavior: 'smooth'
    });
});

// Next slide button
nextButton.addEventListener('click', () => {
    slider.scrollBy({
        left: slider.clientWidth / 2,
        behavior: 'smooth'
    });
});

// Initialize arrows on page load
window.addEventListener('load', updateArrows);