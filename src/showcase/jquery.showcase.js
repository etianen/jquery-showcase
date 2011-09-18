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
        // Configure plugin.
        var settings = {
            slideSelector: "> li",
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
            // Find and activate the showcase.
            var showcase = $(this).addClass("jquery-showcase").show();
            var thumbnails = $("<div/>", {
                "class": "jquery-showcase-thumbnails"
            });
            showcase.append(thumbnails);
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
                // Set the image scaling callbacks.
                function scaleImages() {
                    fitToContainer(slide, image);
                    fitToContainer(thumbnail, thumbnailImage);
                }
                scaleImages();
                $(window).resize(scaleImages);
            });
            // Only show the first slide.
            slides.slice(1).hide();
        });
    }

}(jQuery));