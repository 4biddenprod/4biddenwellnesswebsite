// Main Entry Point
document.addEventListener("DOMContentLoaded", function () {
    // Initialize all modules
    Breakpoints.init();
    Preload.init();
    TouchDetection.init();
    SimpleSlider.init();
    Forms.init();
    Menu.init();
    Slider.init();
    CustomSlider.init();
    DesktopPopup.init();
    MobilePopup.init();
    ScrollHandler.init();
    ImageGrid.init();
});

// Breakpoints Module
const Breakpoints = (function () {
    function init() {
        breakpoints({
            xlarge: ['1281px', '1680px'],
            large: ['981px', '1280px'],
            medium: ['737px', '980px'],
            small: ['481px', '736px'],
            xsmall: ['361px', '480px'],
            xxsmall: [null, '360px']
        });
    }

    return { init };
})();

// Preload Module
const Preload = (function () {
    function init() {
        window.addEventListener('load', function () {
            window.setTimeout(function () {
                document.body.classList.remove('is-preload');
            }, 100);
        });
    }

    return { init };
})();

// Touch Detection Module
const TouchDetection = (function () {
    function init() {
        if (browser.mobile) {
            document.body.classList.add('is-touch');
        }
    }

    return { init };
})();

// Forms Module
const Forms = (function () {
    function init() {
        const $form = $('form');

        $form.find('textarea').each(function () {
            const $this = $(this);
            const $wrapper = $('<div class="textarea-wrapper"></div>');
            const $submits = $this.find('input[type="submit"]');

            $this
                .wrap($wrapper)
                .attr('rows', 1)
                .css('overflow', 'hidden')
                .css('resize', 'none')
                .on('keydown', function (event) {
                    if (event.keyCode == 13 && event.ctrlKey) {
                        event.preventDefault();
                        event.stopPropagation();
                        $(this).blur();
                    }
                })
                .on('blur focus', function () {
                    $this.val($.trim($this.val()));
                })
                .on('input blur focus --init', function () {
                    $wrapper.css('height', $this.height());
                    $this.css('height', 'auto').css('height', $this.prop('scrollHeight') + 'px');
                })
                .on('keyup', function (event) {
                    if (event.keyCode == 9) $this.select();
                })
                .triggerHandler('--init');

            if (browser.name == 'ie' || browser.mobile) {
                $this.css('max-height', '10em').css('overflow-y', 'auto');
            }
        });
    }

    return { init };
})();

// Menu Module
const Menu = (function () {
    let $menu, $body;

    function init() {
        $menu = $('#menu');
        $body = $('body');

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
                const href = $(this).attr('href');

                if ($(this).hasClass('submenu-trigger')) {
                    event.preventDefault();
                    event.stopPropagation();
                    const submenuId = $(this).data('target');
                    openSubmenu(submenuId);
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                $menu._hide();

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
                if (!$(event.target).closest('#menu').length && !$(event.target).closest('nav ul li a[href="#menu"]').length) {
                    $menu._hide();
                }
            })
            .on('keydown', function (event) {
                if (event.keyCode == 27) $menu._hide();
            });

        $menu.on('click', '.back-button', function (event) {
            event.preventDefault();
            const targetId = $(this).data('target');
            if (targetId === 'menu') {
                goBackToMenu();
            } else {
                $(this).closest('.submenu').removeClass('active');
                document.getElementById(targetId).classList.add('active');
            }
        });
    }

    function openSubmenu(submenuId) {
        const allMenus = document.querySelectorAll('.submenu');
        allMenus.forEach(menu => menu.classList.remove('active'));
        document.getElementById(submenuId).classList.add('active');
    }

    function goBackToMenu() {
        const allMenus = document.querySelectorAll('.submenu');
        allMenus.forEach(menu => menu.classList.remove('active'));
    }

    return { init };
})();

// Refactored Multi-instance Slider Logic
class MultiSlider {
    constructor(container) {
        this.container = container;
        this.slider = container.querySelector('.cslider-slider');
        this.progressBar = container.querySelector('.cslider-progress-bar');
        this.prevButton = container.querySelector('.cslider-arrow.left');
        this.nextButton = container.querySelector('.cslider-arrow.right');

        if (!this.slider || !this.progressBar || !this.prevButton || !this.nextButton) {
            console.error("Missing slider components in container", container);
            return;
        }

        this.bindEvents();
        this.updateProgressBar();
    }

    bindEvents() {
        this.slider.addEventListener('scroll', this.updateProgressBar.bind(this));
        this.prevButton.addEventListener('click', this.prevSlide.bind(this));
        this.nextButton.addEventListener('click', this.nextSlide.bind(this));
    }

    updateProgressBar() {
        const maxScrollLeft = this.slider.scrollWidth - this.slider.clientWidth;
        const scrollPercentage = (this.slider.scrollLeft / maxScrollLeft) * 100;
        this.progressBar.style.width = `${Math.min(scrollPercentage, 100)}%`;
        this.updateArrows();
    }

    updateArrows() {
        const maxScrollLeft = this.slider.scrollWidth - this.slider.clientWidth;
        this.prevButton.classList.toggle('disabled', this.slider.scrollLeft <= 0);
        this.nextButton.classList.toggle('disabled', false); // force enable

    }

    prevSlide() {
        this.slider.scrollBy({
            left: -this.slider.clientWidth / 2,
            behavior: 'smooth'
        });
    }

    nextSlide() {
        this.slider.scrollBy({
            left: this.slider.clientWidth / 2,
            behavior: 'smooth'
        });
    }
}

// Initialize all sliders on page
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cslider-container').forEach(container => new MultiSlider(container));
});


// Desktop Popup Module
const DesktopPopup = (function () {
    let openBtn, popup, overlay, closeBtn, form, successMessage, formSubmitted, animationTimeout, firstVisitKey, isDesktop;

    function init() {
        openBtn = document.getElementById("carrd2-ml-open-popup-btn");
        popup = document.getElementById("carrd2-ml-popup-form");
        overlay = document.getElementById("carrd2-ml-overlay");
        closeBtn = document.getElementById("carrd2-close-btn");
        form = document.getElementById("carrd2-ml-form");
        successMessage = document.querySelector(".carrd2-form-successBody");
        formSubmitted = false;
        firstVisitKey = "hasVisitedDesktopBefore";
        isDesktop = window.innerWidth > 768;

        if (!openBtn || !popup || !overlay || !closeBtn || !form || !successMessage) {
            console.error("Desktop popup elements not found!");
            return;
        }

        if (!localStorage.getItem(firstVisitKey) && isDesktop) {
            showPopup();
            localStorage.setItem(firstVisitKey, "true");
        }

        openBtn.addEventListener('click', handleOpenBtnClick);
        closeBtn.addEventListener('click', closeForm);
        overlay.addEventListener('click', closeForm);
        form.addEventListener('submit', handleFormSubmit);
    }

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

    function showPopup() {
        popup.style.display = "block";
        overlay.style.display = "block";
    }

    function handleOpenBtnClick() {
        if (formSubmitted) return;
        resetAnimation(openBtn, "carrd2-hidden-btn");
        showPopup();
    }

    function closeForm() {
        popup.style.display = "none";
        overlay.style.display = "none";
        if (!formSubmitted) {
            setTimeout(() => {
                resetAnimation(openBtn, "carrd2-visible-btn");
            }, 50);
        }
    }

    function handleFormSubmit(event) {
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
    }

    return { init };
})();

// Mobile Popup Module
const MobilePopup = (function () {
    let openBtn, popup, overlay, closeBtn, form, successMessage, messageElement, formSubmitted, isMobile, firstVisitKey;

    function init() {
        openBtn = document.getElementById("second-ml-open-popup-btn");
        popup = document.getElementById("second-ml-popup-form");
        overlay = document.getElementById("second-ml-overlay");
        closeBtn = document.getElementById("second-close-btn");
        form = document.getElementById("ml-form-second");
        successMessage = document.querySelector(".second-ml-form-successBody");
        messageElement = document.querySelector(".form-message-second");
        formSubmitted = false;
        isMobile = window.innerWidth <= 768;
        firstVisitKey = "hasVisitedBefore";

        if (!openBtn || !popup || !overlay || !closeBtn || !form || !successMessage || !messageElement) {
            console.error("Mobile popup elements not found!");
            return;
        }

        if (!localStorage.getItem(firstVisitKey) && isMobile) {
            showPopup();
            localStorage.setItem(firstVisitKey, "true");
        }

        openBtn.addEventListener('click', handleOpenBtnClick);
        closeBtn.addEventListener('click', handleClosePopup);
        overlay.addEventListener('click', handleClosePopup);
        form.addEventListener('submit', handleFormSubmit);
    }

    function resetAnimations() {
        openBtn.classList.remove("hidden", "visible");
        void openBtn.offsetWidth;
    }

    function showPopup() {
        if (!formSubmitted && isMobile) {
            resetAnimations();
            openBtn.classList.add("hidden");
            popup.style.display = "block";
            overlay.style.display = "block";
            messageElement.style.display = "block";
        }
    }

    function handleOpenBtnClick() {
        if (formSubmitted) return;
        resetAnimations();
        openBtn.classList.add("hidden");
        popup.style.display = "block";
        overlay.style.display = "block";
        messageElement.style.display = "block";
    }

    function handleClosePopup() {
        if (formSubmitted) return;
        resetAnimations();
        openBtn.classList.add("visible");
        popup.style.display = "none";
        overlay.style.display = "none";
        form.style.display = "block";
        successMessage.style.display = "none";
    }

    function handleFormSubmit(event) {
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
    }

    return { init };
})();

// Scroll Handler Module
const ScrollHandler = (function () {
    let promoBanner, header;

    function init() {
        promoBanner = document.getElementById("promo-banner");
        header = document.getElementById("header");

        if (!promoBanner || !header) {
            console.error("Scroll handler elements not found!");
            return;
        }

        window.addEventListener('scroll', handleScroll);
    }

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    return { init };
})();

// Image Grid Module
const ImageGrid = (function () {
    let placeholder;

    function init() {
        placeholder = document.getElementById("image-grid-placeholder");

        if (!placeholder) {
            console.error("Image grid placeholder not found!");
            return;
        }

        fetch("components/image-grid.html", { cache: "no-cache" })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status} - ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                if (!html || html.trim() === "") {
                    throw new Error("Received empty HTML content.");
                }
                placeholder.innerHTML = html;
            })
            .catch(error => {
                console.error("Fetch error:", error);
                placeholder.innerHTML = `<p style="color: red; text-align: center;">⚠️ Failed to load image grid. Please try again later.</p>`;
            });
    }

    return { init };
})();




//Footer form // 
function ml_webform_success_22728804() {
    var $ = ml_jQuery || jQuery;
    $('.ml-subscribe-form-22728804 .row-success').show();
    $('.ml-subscribe-form-22728804 .row-form').hide();
  }

src="https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024" 
  fetch("https://assets.mailerlite.com/jsonp/1260530/forms/146427399209223985/takel")





  // Simple Slider Module
const SimpleSlider = (function () {
    let sliders;

    function init() {
        sliders = document.querySelectorAll('.slideshow-container');

        if (!sliders.length) {
            console.error("Sliders not found!");
            return;
        }

        sliders.forEach(slider => {
            const slides = slider.querySelectorAll('.slide');
            let currentIndex = 0;

            // Show the first slide
            slides[currentIndex].classList.add('active');
            slides[currentIndex].setAttribute('aria-hidden', false);

            // Auto-play the slider
            setInterval(() => {
                showNextSlide(slides, currentIndex);
                currentIndex = (currentIndex + 1) % slides.length;
            }, 5000); // Change slide every 5 seconds
        });
    }

    function showNextSlide(slides, currentIndex) {
        // Fade out the current slide
        slides[currentIndex].classList.remove('active');
        slides[currentIndex].setAttribute('aria-hidden', true);

        // Calculate the next slide index
        const nextIndex = (currentIndex + 1) % slides.length;

        // Fade in the next slide
        slides[nextIndex].classList.add('active');
        slides[nextIndex].setAttribute('aria-hidden', false);
    }

    return { init };
})();