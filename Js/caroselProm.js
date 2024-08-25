$(document).ready(function () {
  $.ajax({
    url: "http://cruise118.kankit.es/Json/carouselPromotionsData.json", // Reemplaza con la ruta a tu archivo JSON
    method: "GET",
    dataType: "json",
    success: function (data) {
      CreateCarousel("carouselPromotion", data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error loading JSON:", textStatus, errorThrown);
    },
  });

  function CreateCarousel(elementId, dataSource) {
    var carouselElement = $("#" + elementId);

    var items = dataSource.carouselItems;

    items.forEach(function (item, index) {
      var carouselItem = `
                        <div class="col-lg-2 m-1">
                            <a href="${item.href}">
                                <img class="w-100" src="${item.imgSrc}" alt="${item.altText}">
                            </a>
                        </div>
                    `;
      carouselElement.append(carouselItem);
    });
    
    $(carouselElement).slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 800,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [{
          breakpoint: 992,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        }, {
          breakpoint: 576,
          settings: {
            slidesToShow: 1
          }
        }]
      });
  }
});
