/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/slickslider.js":
/*!*******************************!*\
  !*** ./src/js/slickslider.js ***!
  \*******************************/
/***/ (() => {

eval("$(document).ready(function() {\n    // Initialize the image slider with sync to thumbnails and custom animation\n    $('.image-slider').slick({\n        arrows: false,  // Disable next/prev arrows\n        autoplay: false, // Disable autoplay\n        infinite: true,  // Infinite loop for slider\n        speed: 1000,     // Speed for the animation\n        slidesToShow: 1,\n        slidesToScroll: 1,\n        fade: false,     // Disable default fade effect to allow sliding\n        asNavFor: '.thumbnail-slider', // Sync with the thumbnail slider\n        autoplaySpeed: 3000 // Optional: Auto-switch slides every 3 seconds\n    });\n\n    // Initialize the thumbnail slider\n    $('.thumbnail-slider').slick({\n        slidesToShow: 4,\n        slidesToScroll: 1,\n        asNavFor: '.image-slider', // Sync with the main image slider\n        focusOnSelect: true\n    });\n\n    // Handle content display on slide change\n    $('.image-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {\n        // Remove active class from all content items\n        $('.content-item').removeClass('active');\n        \n        // Add active class to the content that corresponds to the next slide\n        $('.content-item[data-slide=\"' + nextSlide + '\"]').addClass('active');\n\n        // Remove animation class from the previous slide\n        $('.slick-current .slide').removeClass('slide-exiting');\n\n        // Add a custom class to trigger the exit animation for the current slide\n        $('.slick-current .slide').addClass('slide-exiting');\n    });\n\n    $('.image-slider').on('afterChange', function(event, slick, currentSlide) {\n        // After the change, the next slide should already have the animation (via CSS)\n    });\n\n    // Initialize content for the first slide\n    $('.content-item[data-slide=\"0\"]').addClass('active');\n\n    // Optional: Clicking a thumbnail manually triggers the image slider\n    $('.thumbnail').on('click', function() {\n        var slideIndex = $(this).data('slide');\n        $('.image-slider').slick('slickGoTo', slideIndex);\n    });\n});\n\n\n\n\n\n\n\n\n\n// SEARCH-BAR SCRIPT\n\ndocument.addEventListener('DOMContentLoaded', function () {\n    const searchBarContainer = document.querySelector('.search-bar-container');\n    const searchBar = document.getElementById('searchBar');\n\n    // Expand search bar when clicked or focused\n    searchBar.addEventListener('focus', function () {\n      searchBarContainer.classList.add('active');\n    });\n\n    // Collapse search bar when it loses focus (optional)\n    searchBar.addEventListener('blur', function () {\n      if (!searchBar.value) {\n        searchBarContainer.classList.remove('active');\n      }\n    });\n  });\n\n//# sourceURL=webpack://webpack-hbs-project/./src/js/slickslider.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/slickslider.js"]();
/******/ 	
/******/ })()
;