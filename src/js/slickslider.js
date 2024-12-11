$(document).ready(function() {
    // Initialize the image slider with sync to thumbnails and custom animation
    $('.image-slider').slick({
        arrows: false,  // Disable next/prev arrows
        autoplay: false, // Disable autoplay
        infinite: true,  // Infinite loop for slider
        speed: 1000,     // Speed for the animation
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,     // Disable default fade effect to allow sliding
        asNavFor: '.thumbnail-slider', // Sync with the thumbnail slider
        autoplaySpeed: 3000 // Optional: Auto-switch slides every 3 seconds
    });

    // Initialize the thumbnail slider
    $('.thumbnail-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.image-slider', // Sync with the main image slider
        focusOnSelect: true
    });

    // Handle content display on slide change
    $('.image-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        // Remove active class from all content items
        $('.content-item').removeClass('active');
        
        // Add active class to the content that corresponds to the next slide
        $('.content-item[data-slide="' + nextSlide + '"]').addClass('active');

        // Remove animation class from the previous slide
        $('.slick-current .slide').removeClass('slide-exiting');

        // Add a custom class to trigger the exit animation for the current slide
        $('.slick-current .slide').addClass('slide-exiting');
    });

    $('.image-slider').on('afterChange', function(event, slick, currentSlide) {
        // After the change, the next slide should already have the animation (via CSS)
    });

    // Initialize content for the first slide
    $('.content-item[data-slide="0"]').addClass('active');

    // Optional: Clicking a thumbnail manually triggers the image slider
    $('.thumbnail').on('click', function() {
        var slideIndex = $(this).data('slide');
        $('.image-slider').slick('slickGoTo', slideIndex);
    });
});









// SEARCH-BAR SCRIPT

document.addEventListener('DOMContentLoaded', function () {
    const searchBarContainer = document.querySelector('.search-bar-container');
    const searchBar = document.getElementById('searchBar');

    // Expand search bar when clicked or focused
    searchBar.addEventListener('focus', function () {
      searchBarContainer.classList.add('active');
    });

    // Collapse search bar when it loses focus (optional)
    searchBar.addEventListener('blur', function () {
      if (!searchBar.value) {
        searchBarContainer.classList.remove('active');
      }
    });
  });