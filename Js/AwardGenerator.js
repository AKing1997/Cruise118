$(document).ready(function () {
    $.ajax({
      url: "./../Json/awards.json",
      method: "GET",
      dataType: "json",
      success: function (data) {
        GenerateAwardCardList("awardContainer", data.awards.items);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error loading JSON:", textStatus, errorThrown);
      },
    });
  });
  
  function GenerateAwardCardList(elementId, dataSource) {
    elementId = "#" + elementId;
    
    dataSource.forEach((awards) => {
      const itemHTML = `
          <div class="col-5 col-sm-3 col-lg-2 m-1 text-center p-0 custom-card">
            <img loading="lazy" src="${awards.image}" alt="${awards.alt}">
            <p class="p-3">${awards.description}</p>
          </div>
          `;
      $(elementId).append(itemHTML);
    });
  }