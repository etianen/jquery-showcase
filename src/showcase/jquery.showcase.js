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
            var showcase = $(this).addClass("jquery-showcase");
            var thumbnails = $("<div/>", {
                "class": "jquery-showcase-thumbnails"
            });
            showcase.append(thumbnails);
            // Configure each slide.
            var slides = showcase.find(settings.slideSelector);
            slides.each(function() {
                var slide = $(this).addClass("jquery-showcase-slide");
                var header = slide.find(settings.headerSelector).addClass("jquery-showcase-header");
                var title = slide.find(settings.titleSelector).addClass("jquery-showcase-title");
                var subTitle = slide.find(settings.subTitleSelector).addClass("jquery-showcase-subtitle");
                // Create the slide image.
                var image = slide.find(settings.imageSelector).addClass("jquery-showcase-image");
                var src = image.attr("src");
                function scaleImage() {
                    fitToContainer(slide, image);
                }
                scaleImage();
                $(window).resize(scaleImage);
                // Create the slide thumbnail.
                var thumbnail = $("<div/>", {
                    "class": "jquery-showcase-thumbnail"
                });
                thumbnails.append(thumbnail);
                var thumbnailImage = $("<img>", {
                    src: src,
                    width: image.width(),
                    height: image.height()
                });
                // Apply aspect ratio preserving downsize.
                fitToContainer(thumbnail, thumbnailImage);
                
                thumbnail.append(thumbnailImage);
            });
            // Only show the first slide.
            slides.slice(1).hide();
        });
    }

}(jQuery));