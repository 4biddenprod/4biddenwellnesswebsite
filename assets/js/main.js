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

// Menu functionality
var $menu = $('#menu');
var $body = $('body');

$menu.wrapInner('<div class="inner"></div>');

$menu._locked = false;

$menu._lock = function () {
    if ($menu._locked) return false;

    $menu._locked = true;

    window.setTimeout(function () {
        $menu._locked = false;
    }, 350);

    return true;
};

$menu._show = function () {
    if ($menu._lock()) $body.addClass('is-menu-visible');
};

$menu._hide = function () {
    if ($menu._lock()) $body.removeClass('is-menu-visible');
};

$menu._toggle = function () {
    if ($menu._lock()) $body.toggleClass('is-menu-visible');
};

$menu
    .appendTo($body)
    .on('click', function (event) {
        event.stopPropagation();
    })
    .on('click', 'a', function (event) {
        var href = $(this).attr('href');

        // Check if the link is a submenu trigger
        if ($(this).hasClass('submenu-trigger')) {
            event.preventDefault();
            event.stopPropagation();
            let submenuId = $(this).data('target'); // Get the target submenu ID
            openSubmenu(submenuId); // Open the submenu
            return;
        }

        // Handle standard links
        event.preventDefault();
        event.stopPropagation();

        // Hide menu
        $menu._hide();

        // Redirect
        if (href == '#menu') return;

        window.setTimeout(function () {
            window.location.href = href;
        }, 350);
    })
    .append('<a class="close" href="#menu">Close</a>');

$body
    .on('click', 'a[href="#menu"]', function (event) {
        event.stopPropagation();
        event.preventDefault();
        $menu._toggle();
    })
    .on('click', function (event) {
        // Close menu when clicking outside (on the background)
        if (!$(event.target).closest('#menu').length && !$(event.target).closest('nav ul li a[href="#menu"]').length) {
            $menu._hide();
        }
    })
    .on('keydown', function (event) {
        if (event.keyCode == 27) $menu._hide();
    });

// Function to open a submenu
function openSubmenu(submenuId) {
    let allMenus = document.querySelectorAll('.submenu');
    allMenus.forEach(menu => menu.classList.remove('active'));

    document.getElementById(submenuId).classList.add('active');
}

// Function to go back to the main menu
function goBackToMenu() {
    let allMenus = document.querySelectorAll('.submenu');
    allMenus.forEach(menu => menu.classList.remove('active'));
}

// Event delegation for back buttons
$menu.on('click', '.back-button', function (event) {
    event.preventDefault();

    // Get the target ID from the data-target attribute of the clicked back button
    let targetId = $(this).data('target');

    // If the target is the main menu, call goBackToMenu
    if (targetId === 'menu') {
        goBackToMenu();
    } else {
        // Dynamically hide the current submenu and show the target submenu
        $(this).closest('.submenu').removeClass('active');
        document.getElementById(targetId).classList.add('active');
    }
});

// Function to dynamically go back to a parent submenu
function goBackToSubmenu(currentSubmenuId, parentSubmenuId) {
    document.getElementById(currentSubmenuId).classList.remove('active');
    document.getElementById(parentSubmenuId).classList.add('active');
}

// === FIXED: Open new menu in a new window ===
function openNewMenuWindow(menuId) {
    // Ensure the function is executed inside an event handler (prevents popup blockers)
    let newWindow = window.open("", "_blank", "width=400,height=500");

    if (!newWindow) {
        alert("Popup blocked! Please allow pop-ups for this site.");
        return;
    }

    let menuHtml = document.getElementById(menuId).outerHTML;

    newWindow.document.write(`
        <html>
        <head>
            <title>Menu</title>
            <link rel="stylesheet" type="text/css" href="menu css.css">
        </head>
        <body>
            ${menuHtml}
            <script>
                function goBackToMenu() { window.close(); }
                function goBackToSubmenu() { window.close(); }
            <\/script>
        </body>
        </html>
    `);

    newWindow.document.close();
}


})(jQuery);
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
document.addEventListener('DOMContentLoaded', () => {
	const slideshows = document.querySelectorAll('.slideshow-container');
  
	slideshows.forEach((slideshow) => {
	  const slides = slideshow.querySelectorAll('.slide');
	  const dots = slideshow.querySelectorAll('.dot');
	  let currentSlide = 0;
  
	  const showSlide = (index) => {
		slides.forEach((slide, i) => {
		  slide.setAttribute('aria-hidden', i !== index);
		  slide.style.opacity = i === index ? 1 : 0;
		});
		dots.forEach((dot, i) => {
		  dot.setAttribute('aria-selected', i === index);
		  dot.classList.toggle('active', i === index);
		});
	  };
  
	  dots.forEach((dot, i) => {
		dot.addEventListener('click', () => {
		  currentSlide = i;
		  showSlide(currentSlide);
		});
	  });
  
	  // Auto-play functionality (optional)
	  setInterval(() => {
		currentSlide = (currentSlide + 1) % slides.length;
		showSlide(currentSlide);
	  }, 5000);
  
	  // Touch support for mobile devices
	  let touchStartX = 0;
	  let touchEndX = 0;
  
	  slideshow.addEventListener('touchstart', (e) => {
		touchStartX = e.touches[0].clientX;
	  });
  
	  slideshow.addEventListener('touchend', (e) => {
		touchEndX = e.changedTouches[0].clientX;
		handleSwipe();
	  });
  
	  const handleSwipe = () => {
		if (touchEndX < touchStartX) {
		  currentSlide = (currentSlide + 1) % slides.length;
		} else if (touchEndX > touchStartX) {
		  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
		}
		showSlide(currentSlide);
	  };
	});
  });