/* Description: Custom JS file */


(function($) {
    "use strict"; 
   
  AOS.init({
    duration: 1000,   // animation duration (in ms)
    once: true,       // whether animation should happen only once
    offset: 120,      // trigger point (px from viewport bottom)
  });


     if (typeof Swiper !== "undefined") {
    var swiper = new Swiper(".mySwiper", {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 3,
        centeredSlides: true, // ✅ center active slide
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: { slidesPerView: 1, centeredSlides: false },
            768: { slidesPerView: 2, centeredSlides: false },
            992: { slidesPerView: 3, centeredSlides: true } // ✅ large screens center
        }
    });
} else {
    console.error("Swiper not loaded.");
}

	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Details Lightbox - Magnific Popup */
    $('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
    });
    

    /* Text Slider - Swiper */
	var textSlider = new Swiper('.text-slider', {
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
    });

    
    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});


            // ROI Chart
        function loadRoiChart() {
        const ctx = document.getElementById('roiChart').getContext('2d');
        const gradientBlue = ctx.createLinearGradient(0, 0, 0, 400);
        gradientBlue.addColorStop(0, 'rgba(54, 162, 235, 0.9)');
        gradientBlue.addColorStop(1, 'rgba(54, 162, 235, 0.3)');

        const gradientRed = ctx.createLinearGradient(0, 0, 0, 400);
        gradientRed.addColorStop(0, 'rgba(255, 99, 132, 0.9)');
        gradientRed.addColorStop(1, 'rgba(255, 99, 132, 0.3)');

        new Chart(ctx, {
            type: 'bar',
            data: {
            labels: ['ROI', 'Sales Growth', 'Leads', 'Conversion Rate'],
            datasets: [
                {
                label: 'Without Marketing',
                data: [20, 15, 30, 8],
                backgroundColor: gradientRed,
                borderRadius: 12
                },
                {
                label: 'With K2Z Marketing',
                data: [70, 65, 90, 35],
                backgroundColor: gradientBlue,
                borderRadius: 12
                }
            ]
            },
            options: {
            animation: { duration: 2000 },
            responsive: true,
            plugins: { legend: { position: 'bottom' } },
            scales: {
                y: { beginAtZero: true, max: 100, ticks: { callback: v => v + "%" } }
            }
            }
        });
        }

        // Case Study Chart
        function loadCaseChart() {
        const ctx2 = document.getElementById('caseChart').getContext('2d');
        const gradientSales = ctx2.createLinearGradient(0, 0, 0, 400);
        gradientSales.addColorStop(0, 'rgba(54, 162, 235, 0.6)');
        gradientSales.addColorStop(1, 'rgba(54, 162, 235, 0)');

        const gradientROI = ctx2.createLinearGradient(0, 0, 0, 400);
        gradientROI.addColorStop(0, 'rgba(75, 192, 192, 0.6)');
        gradientROI.addColorStop(1, 'rgba(75, 192, 192, 0)');

        new Chart(ctx2, {
            type: 'line',
            data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                label: 'Sales ($)',
                data: [5000, 7000, 10000, 15000, 20000, 30000],
                borderColor: '#36A2EB',
                backgroundColor: gradientSales,
                fill: true,
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#36A2EB'
                },
                {
                label: 'ROI (%)',
                data: [20, 35, 50, 65, 75, 90],
                borderColor: '#4CAF50',
                backgroundColor: gradientROI,
                fill: true,
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#4CAF50'
                }
            ]
            },
            options: {
            animation: { duration: 2000 },
            responsive: true,
            plugins: { legend: { position: 'bottom' } },
            scales: { y: { beginAtZero: true } }
            }
        });
        }

                // Animate Counters
                function animateCounter(element) {
                const target = +element.getAttribute('data-target');
                let current = 0;
                const increment = target / 80; // speed factor
                const timer = setInterval(() => {
                    current += increment;
                    if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
                    element.textContent = target + "%";
                    clearInterval(timer);
                    element.classList.add("glow"); // add glow once finished
                    } else {
                    element.textContent = Math.floor(current) + "%";
                    }
                }, 30);

                }

                // Intersection Observers
                const roiObserver = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    loadRoiChart();
                    roiObserver.disconnect();
                }
                }, { threshold: 0.5 });

                const caseObserver = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    loadCaseChart();
                    caseObserver.disconnect();
                }
                }, { threshold: 0.5 });

                const kpiObserver = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    animateCounters();
                    kpiObserver.disconnect();
                }
                }, { threshold: 0.5 });

                // Observe elements
                roiObserver.observe(document.querySelector('#roi'));
                caseObserver.observe(document.querySelector('#case-study'));
                kpiObserver.observe(document.querySelector('#kpi'));

                // Init AOS
                AOS.init({ duration: 1200, once: true });
        

                

})(jQuery);


$(document).ready(function () {
  // Ensure Swiper is loaded before initializing
  
});
