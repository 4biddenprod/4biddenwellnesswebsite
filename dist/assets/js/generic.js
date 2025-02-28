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

  //custome slide

  document.addEventListener("DOMContentLoaded", function () {
	const slider = document.querySelector(".custom-slider");
	const slides = document.querySelectorAll(".custom-slide");
	let currentIndex = 0;
  
	// Function to show the next slide
	function showNextSlide() {
	  currentIndex = (currentIndex + 1) % slides.length;
	  updateSlider();
	}
  
	// Function to update the slider position
	function updateSlider() {
	  const offset = -currentIndex * 100;
	  slider.style.transform = `translateX(${offset}%)`;
  
	  // Update aria-hidden attributes for accessibility
	  slides.forEach((slide, index) => {
		slide.setAttribute("aria-hidden", index !== currentIndex);
	  });
	}
  
	// Auto-play functionality
	let autoplayInterval = setInterval(showNextSlide, 5000);
  
	// Pause autoplay on hover
	slider.addEventListener("mouseenter", () => clearInterval(autoplayInterval));
	slider.addEventListener("mouseleave", () => {
	  autoplayInterval = setInterval(showNextSlide, 5000);
	});
  
	// Touch support for mobile devices
	let touchStartX = 0;
	let touchEndX = 0;
  
	slider.addEventListener("touchstart", (e) => {
	  touchStartX = e.touches[0].clientX;
	});
  
	slider.addEventListener("touchend", (e) => {
	  touchEndX = e.changedTouches[0].clientX;
	  handleSwipe();
	});
  
	function handleSwipe() {
	  if (touchEndX < touchStartX) {
		showNextSlide(); // Swipe left
	  } else if (touchEndX > touchStartX) {
		currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Swipe right
		updateSlider();
	  }
	}
  
	// Keyboard navigation
	document.addEventListener("keydown", (e) => {
	  if (e.key === "ArrowRight") {
		showNextSlide();
	  } else if (e.key === "ArrowLeft") {
		currentIndex = (currentIndex - 1 + slides.length) % slides.length;
		updateSlider();
	  }
	});
  });
// Pillola per Desktop Only with Auto-Open for First Visit
document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("carrd2-ml-open-popup-btn");
    const popup = document.getElementById("carrd2-ml-popup-form");
    const overlay = document.getElementById("carrd2-ml-overlay");
    const closeBtn = document.getElementById("carrd2-close-btn");
    const form = document.getElementById("carrd2-ml-form");
    const successMessage = document.querySelector(".carrd2-form-successBody");

    let formSubmitted = false;
    let animationTimeout;
    const firstVisitKey = "hasVisitedDesktopBefore"; // Unique key for desktop visitors
    const isDesktop = window.innerWidth > 768; // Check if the device is desktop

    function resetAnimation(element, animationClass) {
        element.style.opacity = "0";
        element.style.visibility = "hidden";
        clearTimeout(animationTimeout);
        animationTimeout = setTimeout(() => {
            element.classList.remove("carrd2-hidden-btn", "carrd2-visible-btn");
            void element.offsetWidth;
            element.style.opacity = "1";
            element.style.visibility = "visible";
            element.classList.add(animationClass);
        }, 10);
    }

    // Auto-open for first-time desktop visitors
    if (!localStorage.getItem(firstVisitKey) && isDesktop) {
        console.log("First-time desktop visitor detected. Showing popup.");
        popup.style.display = "block";
        overlay.style.display = "block";
        localStorage.setItem(firstVisitKey, "true"); // Mark as visited
    }

    // Open Button Event Listener
    openBtn.addEventListener("click", function () {
        if (formSubmitted) return;
        resetAnimation(openBtn, "carrd2-hidden-btn");
        popup.style.display = "block";
        overlay.style.display = "block";
    });

    // Close Button and Overlay Event Listeners
    closeBtn.addEventListener("click", closeForm);
    overlay.addEventListener("click", closeForm);

    function closeForm() {
        popup.style.display = "none";
        overlay.style.display = "none";
        if (!formSubmitted) {
            setTimeout(() => {
                resetAnimation(openBtn, "carrd2-visible-btn");
            }, 50);
        }
    }

    // Form Submit Event Listener
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (formSubmitted) return;

        const formData = new FormData(form);
        fetch(form.action, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    form.style.display = "none";
                    successMessage.style.display = "flex";
                    formSubmitted = true;
                    openBtn.style.visibility = "hidden";
                    successMessage.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => {
                        popup.style.display = "none";
                        overlay.style.display = "none";
                    }, 3000);
                } else {
                    console.error("Form submission failed.");
                }
            })
            .catch((error) => console.error("Form submission error:", error));
    });
});



	//Pillola per Mobile Only 

	document.addEventListener("DOMContentLoaded", function () {
		const openBtn = document.getElementById("second-ml-open-popup-btn");
		const popup = document.getElementById("second-ml-popup-form");
		const overlay = document.getElementById("second-ml-overlay");
		const closeBtn = document.getElementById("second-close-btn");
		const form = document.getElementById("ml-form-second");
		const successMessage = document.querySelector(".second-ml-form-successBody");
		const messageElement = document.querySelector(".form-message-second");
		let formSubmitted = false;
		const isMobile = window.innerWidth <= 768; // Check if device is mobile
		const firstVisitKey = "hasVisitedBefore";
		function resetAnimations() {
		openBtn.classList.remove("hidden", "visible");
		void openBtn.offsetWidth; // Trigger reflow to restart animation
		}
		function showPopup() {
		if (!formSubmitted && isMobile) {
		console.log("Auto-opening popup for first-time mobile visitor");
		resetAnimations();
		openBtn.classList.add("hidden");
		popup.style.display = "block";
		overlay.style.display = "block";
		messageElement.style.display = "block"; // Show original message
		}
		}
		// Auto-open for first-time mobile visitors
		if (!localStorage.getItem(firstVisitKey) && isMobile) {
		showPopup();
		localStorage.setItem(firstVisitKey, "true"); // Mark as visited
		}
		openBtn.addEventListener("click", function () {
		if (formSubmitted) return;
		resetAnimations();
		openBtn.classList.add("hidden");
		popup.style.display = "block";
		overlay.style.display = "block";
		messageElement.style.display = "block";
		});
		closeBtn.addEventListener("click", handleClosePopup);
		overlay.addEventListener("click", handleClosePopup);
		function handleClosePopup() {
		if (formSubmitted) return;
		resetAnimations();
		openBtn.classList.add("visible");
		popup.style.display = "none";
		overlay.style.display = "none";
		form.style.display = "block";
		successMessage.style.display = "none";
		}
		form.addEventListener("submit", function (event) {
		event.preventDefault();
		messageElement.style.display = "none";
		form.style.display = "none";
		successMessage.style.display = "flex";
		formSubmitted = true;
		successMessage.scrollIntoView({ behavior: "smooth" });
		setTimeout(function () {
		popup.style.display = "none";
		overlay.style.display = "none";
		}, 3000);
		const formData = new FormData(form);
		fetch(form.action, {
		method: "POST",
		body: formData,
		}).catch((error) => console.error("Form submission error:", error));
		});
		});	

		


		//Footer form // 

		function ml_webform_success_22728804() {
			try {
			  window.top.location.href = 'https://www.4biddenprod.com';
			} catch (e) {
			  window.location.href = 'https://www.4biddenprod.com';
			}
		  }
		src="https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024" 
		
		  fetch("https://assets.mailerlite.com/jsonp/1260530/forms/146427399209223985/takel")
		
		