$(document).ready(function () {
  $("#relatedCountries .row:first").show();
  $(".countries-list .custom-ul .custom-li:first").addClass("active-li");
  $(".countries-list .custom-ul .custom-li")
    .not(":first")
    .removeClass("active-li");

  $("#relatedCountries .row").not(":first").hide();

  $(".countries-list a").click(function (e) {
    e.preventDefault();

    $(".countries-list .custom-ul .custom-li").removeClass("active-li");

    $(this).closest(".custom-li").addClass("active-li");

    var target = $(this).attr("href");

    $("#relatedCountries .row").hide();
    $(target).show();
  });

  $(".custom-article").on("click", function () {
    var customContentDiv = $(this).find(".custom-content");
    if (customContentDiv.length) {
      customContentDiv.addClass("custom-article-content-flex");
    }
  });

  $(".custom-content").on("click", ".btn", function (event) {
    event.stopPropagation();

    var customContentDiv = $(this).closest(".custom-content");
    customContentDiv.removeClass("custom-article-content-flex");
  });

  $.ajax({
    url: "http://cruise118.kankit.es/Json/cruisesPromo.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
        GeneratePromoCruises("cruisesPromo", data.cruisesPromo);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error loading JSON:", textStatus, errorThrown);
    },
  });
  youtubePlayer("youtube-player");
});


function GeneratePromoCruises(elementId, cruisesPromo){
    const container = $('#' + elementId);

    cruisesPromo.forEach(cruise => {
        const cruiseHtml = `
            <div class="col-12 col-lg-4 mb-2">
                <div class="promo-container shadow-lg">
                    <a href="${cruise.link}">
                        <div class="promo-container-header">
                            <div class="promo-container-view">
                                ${cruise.views}
                            </div>
                            <img src="${cruise.imgSrc}" alt="${cruise.company.name}" class="promo-container-img">
                        </div>
                        <img src="${cruise.company.logo}" alt="${cruise.title}" class="promo-campany-img">
                        <h3 class="promo-container-title">${cruise.title}</h3>
                        <p class="promo-container-itinerary">${cruise.duration} | ${cruise.ship} | ${cruise.destination}</p>
                        <p class="promo-container-subline">${cruise.date}</p>
                        <p class="promo-container-price">${cruise.price.amount} ${cruise.price.perPerson}</p>
                    </a>
                </div>
            </div>
        `;

        container.append(cruiseHtml);
    });
}

function youtubePlayer(elementId) {
  // 1. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 2. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  window.onYouTubeIframeAPIReady = function() {
    var player = new YT.Player(elementId, {
      
      videoId: 'gekd6sSkvag',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  };

  // 3. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    //event.target.playVideo();
  }

  // 4. The API calls this function when the player's state changes.
  var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  }
  function stopVideo() {
    player.stopVideo();
  }
}
