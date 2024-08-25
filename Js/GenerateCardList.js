$(document).ready(function () {
  $.ajax({
    url: "http://cruise118.kankit.es/Json/destinations.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
        GenerateCardList("destinations", data.destinations);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error loading JSON:", textStatus, errorThrown);
    },
  });

  $.ajax({
    url: "http://cruise118.kankit.es/Json/categories.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
        GenerateCardList("categories", data.categories);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error loading JSON:", textStatus, errorThrown);
    },
  });
});

function GenerateCardList(elementId, dataSource) {
  elementId = "#" + elementId;
  dataSource.forEach((cruise) => {
    const itemHTML = `
        <div class="col-lg-4 col-md-6 col-sm-6 col-12 d-flex justify-content-center align-items-end mb-3 p-1">
            <a class="w-100" href="${cruise.link}">
                <div class="card m-1 p-0 w-100 overflow-hidden">
                                            <div class="card-img-overlay d-flex justify-content-center align-items-end image-hover-zoom">
                            <div class="d-flex justify-content-center text-white" style="z-index: 1;">
                                <div class="w-100 text-center " style="text-shadow: 2px 2px 3px #2E2E2E; opacity: 1">
                                    <h2 class="mb-0 fs-4 shadow-lg">${cruise.title}</h2>
                                    <hr class="text-white mx-auto w-100 m-1" style="height: 2px; opacity: 1">
                                    <p class="shadow-lg">${cruise.description}</p>
                                </div>
                            </div>
                        </div>
                    
                    <div class="card-img w-100 shadow-lg image-hover">
                        <img loading="lazy" class="img-fluid ob-center ob-cover w-100" style="height: 220px" src="${cruise.image}">
                    </div>
                </div>
            </a>
        </div>
        `;
    $(elementId).append(itemHTML);
  });
}