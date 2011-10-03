/**
 * A jQuery showcase plugin.
 *
 * Developed by Dave Hall.
 *
 * <http://www.etianen.com/>
 */

(function($) {

    /**
     * Makes as much of the image fit into the container as possible,
     * preserving aspect ratio.
     */
    function fitToContainer(container, image) {
        // Get the container dimensions.
        var containerWidth = container.width();
        var containerHeight = container.height();
        var containerAspect = containerWidth / containerHeight;
        // Get the image dimensions.
        var imageWidth = image.width();
        var imageHeight = image.height();
        var imageAspect = imageWidth / imageHeight;
        // Perform the scale.
        imageWidth = containerWidth;
        imageHeight = containerHeight;
        if (imageAspect < containerAspect) {
            // Image is too wide!
            imageHeight = imageWidth / imageAspect;
        } else if (imageAspect > containerAspect) {
            // Image is too tall!
            imageWidth = imageHeight * imageAspect;
        }
        image.width(imageWidth).height(imageHeight);
        // Perform the crop.
        image.css({
            top: (containerHeight - imageHeight) / 2,
            left: (containerWidth - imageWidth) / 2
        });
    }
    
    /**
     * Applies a preloader to the given image.
     *
     * Great for avoiding a jerky introduction to the page.
     */
    function preload(image, delay, callback) {
        var readyToDisplay = false;
        var loaded = false;
        function doCallback() {
            if (readyToDisplay && loaded) {
                callback();
            }
        }
        // Set the delay function.
        setTimeout(function() {
            readyToDisplay = true;
            doCallback();
        }, delay);
        // This little dance ensures that the load event is fired even
        // if the image is in the browser cache.
        var src = image.attr("src");
        image.attr("src", "").load(function() {
            loaded = true;
            doCallback();
        }).attr("src", src);
    }

    /**
     * The showcase plugin.
     */
    $.fn.showcase = function(options) {
        // Configure the plugin.
        var settings = {
            slideSelector: "ul > li",
            headerSelector: "> article > hgroup",
            titleSelector: "> article > hgroup > h1",
            subTitleSelector: "> article > hgroup > h2",
            imageSelector: "> article > img",
            autoPlay: true,
            duration: 5000
        }
        if (options) { 
            $.extend(settings, options);
        }
        // Run the plugin.
        return this.each(function() {
            var isPlaying = settings.autoPlay;
            // Find and activate the showcase.
            var showcase = $(this).addClass("jquery-showcase").removeClass("jquery-showcase-fallback").show();
            var thumbnails = $("<div/>", {
                "class": "jquery-showcase-thumbnails"
            });
            showcase.append(thumbnails);
            // Add in the overlay.
            var overlay = $("<div/>", {
                "class": "jquery-showcase-overlay"
            });
            thumbnails.append(overlay);
            overlay.fadeIn();
            // Configure each slide.
            var slides = showcase.find(settings.slideSelector);
            slides.each(function(n) {
                var slide = $(this).addClass("jquery-showcase-slide");
                var header = slide.find(settings.headerSelector).addClass("jquery-showcase-header");
                var title = slide.find(settings.titleSelector).addClass("jquery-showcase-title");
                var subTitle = slide.find(settings.subTitleSelector).addClass("jquery-showcase-subtitle");
                var image = slide.find(settings.imageSelector).addClass("jquery-showcase-image");
                // Preload the image.
                preload(image, 0, function() {
                    image.fadeIn();
                });
                // Create the slide thumbnail.
                var thumbnail = $("<div/>", {
                    "class": "jquery-showcase-thumbnail"
                });
                thumbnails.append(thumbnail);
                var thumbnailImage = $("<img>", {
                    src: image.attr("src"),
                    width: image.width(),
                    height: image.height()
                });
                thumbnail.append(thumbnailImage);
                // Preload the thumbnail image.
                preload(thumbnailImage, n * 200, function() {
                    thumbnailImage.fadeIn();
                });
                // Set the image scaling event.
                slide.bind("scale.showcase", function() {
                    // Scale the slide. (Could do this in CSS, but IE6 borks).
                    slide.height(thumbnails.height());
                    slide.width(showcase.width() - thumbnails.width());
                    // Scale the images.
                    fitToContainer(slide, image);
                    fitToContainer(thumbnail, thumbnailImage);
                });
                // Create the show and hide events.
                slide.bind("show.showcase", function() {
                    // Show this slide.
                    slide.css("z-index", 25).fadeIn(function() {
                        // Continue with the autoplay.
                        if (isPlaying) {
                            setTimeout(function() {
                                // We have to check we're still playing, just in case it's changed during the delay.
                                if (isPlaying) { 
                                    // Get the next slide.
                                    var nextSlide = slide.next("li");
                                    if (nextSlide.length == 0) {
                                        nextSlide = slides.eq(0);
                                    }
                                    // Show the next slide.
                                    nextSlide.trigger("show.showcase");
                                }
                            }, settings.duration);
                        }
                    });
                    // Move the overlay.
                    overlay.animate({
                        top: thumbnail.position().top
                    });
                    // Hide the other slides.
                    slides.not(slide).trigger("hide.showcase");
                });
                slide.bind("hide.showcase", function() {
                    slide.css("z-index", 25).fadeOut();
                });
                // Make the thumbnail clickable.
                thumbnail.click(function() {
                    // Disable autoplay.
                    isPlaying = false;
                    slide.trigger("show.showcase");
                });
            });
            // Only show the first slide.
            slides.eq(0).trigger("show.showcase");
            // Set the showcase height.
            showcase.height(thumbnails.height());
            // Set the scaling callbacks.
            slides.trigger("scale.showcase");
            $(window).resize(function() {
                slides.trigger("scale.showcase");
            });
        });
    }

}(jQuery));