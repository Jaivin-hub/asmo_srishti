import $ from 'jquery'; // Import jQuery
import 'slick-carousel'; // Import Slick JS
import 'slick-carousel/slick/slick.css'; // Import Slick CSS
import 'slick-carousel/slick/slick-theme.css'; // Import Slick Theme CSS
import '../scss/style.scss'; // Import SCSS if needed

document.addEventListener('DOMContentLoaded', () => {
  // Function to initialize a Slick slider with given settings
  const initializeSlider = (selector, slidesToShow, slidesToScroll, autoplaySpeed = 4000, speed = 2000) => {
    console.log(`Initializing slider for ${selector}...`);

    try {
      // Check if Slick is loaded
      if (typeof $.fn.slick === 'undefined') {
        console.error('Slick is not loaded. Ensure it is properly imported.');
        return;
      }

      // Function to initialize the slider with RTL support
      const initSlider = (isRTL) => {
        const sliders = $(selector);  // Select all elements with the given class

        // Check if any slider elements exist
        if (sliders.length === 0) {
          console.error(`No elements found for selector: ${selector}`);
          return;
        }

        // Loop through each slider element and initialize
        sliders.each(function () {
          const slider = $(this);

          // Un-slick if already initialized
          if (slider.hasClass('slick-initialized')) {
            slider.slick('unslick');
          }

          // Define the slider options for this slider
          const sliderOptions = {
            rtl: isRTL,
            arrows: false,
            autoplay: true,
            infinite: true,
            speed: speed,  // Speed can be customized per slider
            slidesToShow: slidesToShow,
            slidesToScroll: slidesToScroll,
            autoplaySpeed: autoplaySpeed,
            draggable: true,
            swipe: true,
            centerMode: false, // Disable centering
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ],
          };

          // Initialize the Slick slider with options
          slider.slick(sliderOptions);
          console.log(`Slider initialized for: ${selector}`);
        });
      };

      // Check the document's direction and initialize accordingly
      const isRTL = $('html').attr('dir') === 'rtl';
      initSlider(isRTL);

    } catch (error) {
      console.error('Error initializing slider:', error);
    }
  };



  // Initialize the second slider with class ".slider-carousel" (2 slides shown, 1 scroll per slide)
  initializeSlider('.slider-carousel', 3, 1, 5000, 1500);    // Second slider (slider-carousel)

  // Initialize the first slider with class ".slider-grid" (4 slides shown, 1 scroll per slide)
  initializeSlider('.slider-grid', 4, 1, 6000, 2000);  // First slider (slider-grid)
  // SLIDER END


  // Scroll-to-Top Button Functionality
  const scrollToTopButton = document.getElementById('scrollToTop');
  if (scrollToTopButton) {
    const toggleButtonVisibility = () => {
      if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
      } else {
        scrollToTopButton.style.display = 'none';
      }
    };

    window.addEventListener('scroll', toggleButtonVisibility);
    scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    toggleButtonVisibility();
  }



  // Video Popup Functionality
  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('videoIframe');
  if (videoModal && videoIframe) {
    const videoSrc = videoIframe.getAttribute('src');
    videoModal.addEventListener('show.bs.modal', () => {
      videoIframe.setAttribute('src', `${videoSrc}&autoplay=1`);
    });

    videoModal.addEventListener('hide.bs.modal', () => {
      videoIframe.setAttribute('src', videoSrc);
    });
  }



  // LOADER-START

  const loaderLogo = document.querySelector('.loaderLogo');
  const loaderWraps = document.querySelector('.loaderWraps');
  const header = document.getElementById('headerVisible');
  const moveLogo = document.getElementById('moveLogo');
  const mainNav = document.getElementById('main_nav');
  const bannerMove = document.getElementById('bannerMove');
  const bannerContMove = document.getElementById('bannerCont_move'); // Element to move from bottom
  const floatmenuMove = document.getElementById('floatmenuMove');   // Element to move after bannerCont_move

  // Step 0: Prevent scrolling and set to top
  document.body.style.overflowY = 'hidden';
  window.scrollTo(0, 0); // Ensure the page is scrolled to the top

  // Ensure the loader logo is visible initially
  loaderLogo.style.opacity = '1';

  // Step 1: Move loader logo to top-center
  setTimeout(() => {
    loaderLogo.classList.add('top-center');

    // Step 2: Calculate moveLogo position
    const moveLogoPosition = moveLogo.getBoundingClientRect();

    // Step 3: Move loader logo to moveLogo position (top-left)
    setTimeout(() => {
      loaderLogo.style.position = 'absolute';
      loaderLogo.style.top = `${moveLogoPosition.top}px`;
      loaderLogo.style.left = `${moveLogoPosition.left}px`;
      loaderLogo.classList.add('top-left');

      // Show the logo in the header
      moveLogo.style.opacity = '1';

      // Step 4: Fade out loader logo
      setTimeout(() => {
        loaderLogo.style.opacity = '0';

        // Step 5: Wait for the banner to scroll to top
        const onScroll = () => {
          if (bannerMove.getBoundingClientRect().top <= 0) {
            // Step 5: Append class to loaderWraps when banner reaches top
            loaderWraps.classList.add('transition-complete');
            window.removeEventListener('scroll', onScroll); // Remove the listener after it triggers
          }
        };

        window.addEventListener('scroll', onScroll);

        // Step 6: Reveal the header
        setTimeout(() => {
          header.id = 'newHeaderId';
          mainNav.classList.add('visible');

          // Step 7: Reveal and animate the banner
          setTimeout(() => {
            bannerMove.classList.add('visible', 'move-up');

            // Step 8: Cleanup banner ID
            setTimeout(() => {
              bannerMove.removeAttribute('id');

              // Step 9: Move bannerContMove from bottom to original position
              if (bannerContMove) {
                bannerContMove.classList.add('move-from-bottom');
                console.log('bannerCont_move moved from bottom to original position.');

                // Step 10: Move floatmenuMove only after bannerContMove finishes
                bannerContMove.addEventListener('transitionend', (event) => {
                  if (event.propertyName === 'transform') { // Ensure transitionend is for transform
                    if (floatmenuMove) {
                      floatmenuMove.classList.add('move-from-bottom');
                      console.log('floatmenuMove moved from bottom to original position.');

                      // Step 11: Re-enable scrolling on the body
                      document.body.style.overflowY = ''; // Restore the default scrolling
                    }
                  }
                });
              }

            }, 0); // No delay for bannerCont_move

          }, 500); // Delay before banner animation

        }, 1000); // Ensure header is visible after loader fades out

      }, 1000); // Delay for loader logo fade-out

    }, 2000); // Delay before moving loader logo to moveLogo position

  }, 2000); // Initial delay for top-center movement


  // LOADER-END

  document.getElementById("customForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    let isValid = true;

    // Full Name Validation
    const fullName = document.getElementById("fullName");
    const nameError = document.getElementById("nameError");
    if (fullName.value.trim() === "") {
        nameError.style.display = "block";
        isValid = false;
    } else {
        nameError.style.display = "none";
    }

    // Email Validation
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        emailError.style.display = "block";
        isValid = false;
    } else {
        emailError.style.display = "none";
    }

    // Phone Number Validation
    const phoneNumber = document.getElementById("phoneNumber");
    const phoneError = document.getElementById("phoneError");
    const phoneRegex = /^[0-9]{10}$/; // Adjust for phone format
    if (!phoneRegex.test(phoneNumber.value.trim())) {
        phoneError.style.display = "block";
        isValid = false;
    } else {
        phoneError.style.display = "none";
    }

    // Comments/Message Validation
    const message = document.getElementById("message");
    const messageError = document.getElementById("messageError");
    if (message.value.trim().length < 10) {
        messageError.style.display = "block";
        isValid = false;
    } else {
        messageError.style.display = "none";
    }

    // If all inputs are valid, submit form or display a success message
    if (isValid) {
        alert("Form submitted successfully!");
        // You can also submit the form programmatically
        // event.target.submit();
    }
});

document.getElementById("newsletterForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default browser validation and form submission

  const emailInput = document.getElementById("newsletterEmail");
  const emailError = document.getElementById("newsletterEmailError");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Email Validation
  if (!emailRegex.test(emailInput.value.trim())) {
      emailError.style.display = "block";
  } else {
      emailError.style.display = "none";
      alert("Thank you for subscribing to our newsletter!");
      // You can perform a form submission here (e.g., via AJAX)
      // event.target.submit();
  }
});
});






// console.log("JavaScript is running!"); // Debugging line






