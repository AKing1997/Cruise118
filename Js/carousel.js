$(document).ready(function () {
    var carouselConfig = {
        id: "carouselCrusire",
        height: "50",
        showNavButtons: false,
        showCaptions: false,
        items: [
            {
                bgSrc: "/assets/img/carousel/bg/1.png",
                imgSrc: "/assets/img/carousel/1.png",
                interval: 2000,
                link: "https://example.com/page2",
                caption: {
                    title: "Second slide label",
                    text: "Some representative placeholder content for the second slide."
                },
                active: true
            },
            {
                bgSrc: "/assets/img/carousel/bg/2.jpg",
                imgSrc: "/assets/img/carousel/2.png",
                link: "https://example.com/page3",
                interval: 2000,
                caption: {
                    title: "Third slide label",
                    text: "Some representative placeholder content for the third slide."
                },
                active: false
            },
            {
                bgSrc: "/assets/img/carousel/bg/1.png",
                imgSrc: "/assets/img/carousel/3.png",
                link: "https://example.com/page4",
                interval: 2000,
                caption: {
                    title: "Fourth slide label",
                    text: "Some representative placeholder content for the fourth slide."
                },
                active: false
            }
        ]
    };

    
    var $carousel = $('<div>', {
        id: carouselConfig.id,
        class: 'carousel carousel-dark slide',
        'data-bs-ride': 'carousel',
        style: 'height: ' + carouselConfig.height + '%;'
    });

    
    var $indicators = $('<div>', { class: 'carousel-indicators' });
    $.each(carouselConfig.items, function (index, item) {
        var $indicator = $('<button>', {
            type: 'button',
            'data-bs-target': '#' + carouselConfig.id,
            'data-bs-slide-to': index,
            class: item.active ? 'active' : '',
            'aria-label': 'Slide ' + (index + 1),
            'aria-current': item.active ? 'true' : 'false'
        });
        $indicators.append($indicator);
    });

    var $carouselInner = $('<div>', { class: 'carousel-inner' });
    $.each(carouselConfig.items, function (index, item) {
        var $carouselItem = $('<div>', {
            class: 'carousel-item' + (item.active ? ' active' : ''),
            'data-bs-interval': item.interval || 2000,
            style: 'background-image: url(' + item.bgSrc + '); background-size: cover; background-position: center; height: ' + carouselConfig.height + '%;'
        });

        var $link = $('<a>', { href: item.link, style: 'display: block; height: 100%; position: relative;' });

        var $img = $('<img>', {
            src: item.imgSrc,
            class: 'fixed-img container mt-5 mb-5 d-flex justify-content-center',
            alt: 'Slide ' + (index + 1),
        });
        $link.append($img);

        $carouselItem.append($link);

        if (item.caption && carouselConfig.showCaptions) {
            var $caption = $('<div>', { class: 'carousel-caption d-none d-md-block' });
            var $captionTitle = $('<h5>').text(item.caption.title);
            var $captionText = $('<p>').text(item.caption.text);
            $caption.append($captionTitle).append($captionText);
            $carouselItem.append($caption);
        }

        $carouselInner.append($carouselItem);
    });

    if (carouselConfig.showNavButtons) {
        var $prevButton = $('<button>', {
            class: 'carousel-control-prev',
            type: 'button',
            'data-bs-target': '#' + carouselConfig.id,
            'data-bs-slide': 'prev'
        }).append(
            $('<span>', { class: 'carousel-control-prev-icon', 'aria-hidden': 'true' })
        ).append(
            $('<span>', { class: 'visually-hidden' }).text('Previous')
        );

        var $nextButton = $('<button>', {
            class: 'carousel-control-next',
            type: 'button',
            'data-bs-target': '#' + carouselConfig.id,
            'data-bs-slide': 'next'
        }).append(
            $('<span>', { class: 'carousel-control-next-icon', 'aria-hidden': 'true' })
        ).append(
            $('<span>', { class: 'visually-hidden' }).text('Next')
        );

        $carousel.append($prevButton).append($nextButton);
    }

    $carousel.append($indicators).append($carouselInner);

    $('#carouselContainer').append($carousel);
});
