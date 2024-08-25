$(document).ready(function() {
    $.ajax({
        url: "https://cruise118.kankit.es/Json/mostPopularData.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            GenerateList("mostPopularCruiseDeals", data.mostPopularCruiseDeals);
            AddViewMoreButton("mostPopularCruiseDeals",data.mostPopularCruiseDeals.viewMoreLink);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Error loading JSON:", textStatus, errorThrown);
        },
      });

      $.ajax({
        url: "https://cruise118.kankit.es/Json/spotlightData.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            GenerateList("spotlight", data.spotlight);
            AddViewMoreButton("spotlight",data.spotlight.viewMoreLink);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Error loading JSON:", textStatus, errorThrown);
        },
      });
});


function GenerateList(elementId, dataSource){
    elementId = "#" + elementId;
    dataSource.forEach(cruise => {
        const itemHTML = `
            <div class="item rounded-1">
                <a href="https://www.cruise118.com/cruise${cruise.links.view}">
                    <img 
                        src="${cruise.logo}"
                        alt="${cruise.line}">
                    <div class="custom-main-container">
                        <div class="custom-text-container">
                            <h5>${cruise.productName}</h5>
                            <p>${cruise.details.departureDate} | ${cruise.details.nights} nights | ${cruise.details.ship} | ${cruise.details.region}</p>
                            <p class="text-danger">${cruise.socialProof.views} views in the last ${cruise.socialProof.timeFrame}!</p>
                        </div>
                        <div class="custom-pricing">
                            <p class="custom-title">Cruise & Fly From</p>
                            <p class="custom-price">${cruise.price.currency}${cruise.price.amount}pp</p>
                        </div>
                    </div>
                </a>
                <button type="button" class="btn btn-primary" onclick="window.location='${cruise.links.bookOnline}'">Book Online</button>
            </div>
        `;
        $(elementId).append(itemHTML);
    });

    

}

function AddViewMoreButton(elementId, url){
    const viewMoreHTML = `
        <div class="m-3 text-center">
            <a href="${url}">
                <button class="btn btn-primary w-25">View More</button>
            </a>
        </div>
    `;
    $("#" + elementId).append(viewMoreHTML);
}