const itemsPerPage = 25;
let totalItems = 0;
let totalPages = 0;
let currentPage = 1;

$(document).ready(function () {
  $.ajax({
    url: "https://cruise118.kankit.es/Json/cruises.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      totalItems = data.cruises.length;
      totalPages = Math.ceil(totalItems / itemsPerPage);
      initCruises(data.cruises);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error loading JSON:", textStatus, errorThrown);
    },
  });
});

function initCruises(data) {
  $(document).on("click", ".page-link", function (e) {
    e.preventDefault();
    const page = parseInt($(this).data("page"));
    if (page) {
      currentPage = page;
      renderCruises(currentPage, data);
      renderPagination();
    }
  });

  $("#applyChange").click(function () {
    const filteredCruises = applyCruiseFilters(data);
    renderCruises(currentPage, filteredCruises);
  });

  $("#clearAllBtn").click(function () {
    $("#filters-container").find('input[type="text"]').val("");
    $("#filters-container").find('input[type="radio"]').prop("checked", false);
    $("#filters-container").find(".active").removeClass("active");
    $("#filters-container")
      .find("button")
      .each(function () {
        $(this).text($(this).data("default-text"));
      });

    renderCruises(currentPage, data);
  });

  renderCruises(currentPage, data);
  renderPagination();
}

function renderCruises(page, data) {
  $("#cruiseDeals").empty();
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const cruisesToShow = data.slice(start, end);

  cruisesToShow.forEach((cruise) => {
    let itinerary = cruise.itinerary.join(" | ");

    let cruiseCard = `
                <article class="custom-card col d-flex justify-content-center">
                    <img src="${cruise.image.src}" alt="${
      cruise.image.alt
    }" srcset="">
                    <div class="content">
                        <h2>${cruise.title}</h2>
                        <p class="operator" operator="${cruise.operator}">
                            <img class="operator-img" src="https://www.cruise118.com/storage/media/1836467/conversions/RCI-Logo-banner_half.jpg" alt="" srcset="">
                            &emsp; ${cruise.operator}
                        </p>
                        <p class="itinerary">Departure - ${
                          cruise.departure
                        } | ${itinerary}</p>
                        <p class="detail d-flex justify-content-between">
                            <span date="${cruise.date}">${cruise.date}</span>
                            <span nights="${cruise.nights}">${
      cruise.nights
    } Nights</span>
                            <span shipName="${cruise.ship.name}">${
      cruise.ship.name
    }</span>
                            <span region="${cruise.region}">${
      cruise.region
    }</span>
                        </p>
                        <h5 class="p-0 m-0">Fly Cruise From</h5>
                        <div class="pricing">
                            <p class="original_price me-2" currency="${
                              cruise.pricing.currency
                            }" value="${parseFloat(
      cruise.pricing.original_price.replace("£", "")
    )}">
                                ${cruise.pricing.original_price}${
      cruise.pricing.currency
    }
                            </p>
                            <p class="current_price" currency="${
                              cruise.pricing.currency
                            }" value="${parseFloat(
      cruise.pricing.current_price.replace("£", "")
    )}">
                                ${cruise.pricing.current_price} ${
      cruise.pricing.currency
    }
                            </p>
                        </div>
                        <div class="p-1 d-flex justify-content-end">
                            <a href="${
                              cruise.link
                            }" class="w-50 btn btn-success rounded-0 border-0">Buy Deal Online</a>
                        </div>
                    </div>
                </article>
            `;

    $("#cruiseDeals").append(cruiseCard);
  });
}

function renderPagination() {
  const paginationContainer = $("#pagination");
  paginationContainer.empty();

  if (currentPage > 1) {
    paginationContainer.append(
      `<li class="page-item"><a class="page-link" href="#" data-page="${
        currentPage - 1
      }">Previous</a></li>`
    );
  }

  for (let i = 1; i <= totalPages; i++) {
    paginationContainer.append(
      `<li class="page-item ${
        i === currentPage ? "active" : ""
      }"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`
    );
  }

  if (currentPage < totalPages) {
    paginationContainer.append(
      `<li class="page-item"><a class="page-link" href="#" data-page="${
        currentPage + 1
      }">Next</a></li>`
    );
  }
}

function applyCruiseFilters(data) {
  const filters = {
    departureDate: $("#departure_date").val(),
    departingUK: $('input[name="fromUk"]:checked').attr("id"),
    cruiseLine: Array.from(
      $("#cruiseline_list .active").map((_, el) => $(el).data("value"))
    ),
    ship: Array.from(
      $("#ship_list .active").map((_, el) => $(el).data("value"))
    ),
    destination: Array.from(
      $("#destination_list .active").map((_, el) => $(el).data("value"))
    ),
    ports: Array.from(
      $("#ports_list .active").map((_, el) => $(el).data("value"))
    ),
    duration: Array.from(
      $("#durations_list .active").map((_, el) => $(el).data("value"))
    ),
  };

  let filteredCruises = data;

  // Filtrar por fecha de salida
  if (filters.departureDate) {
    const [startDate, endDate] = filters.departureDate
      .split(" - ")
      .map((date) => moment(date, "DD/MM/YYYY").toDate());
    filteredCruises = filteredCruises.filter((cruise) => {
      const cruiseDate = new Date(cruise.date);
      return cruiseDate >= startDate && cruiseDate <= endDate;
    });
  }

  // Filtrar por si sale del Reino Unido
  if (filters.departingUK === "yes") {
    filteredCruises = filteredCruises.filter((cruise) =>
      cruise.departure.toLowerCase().includes("uk")
    );
  }

  // Filtrar por línea de crucero
  if (filters.cruiseLine.length > 0) {
    filteredCruises = filteredCruises.filter((cruise) => {
      return filters.cruiseLine.includes(cruise.operator);
    });
  }

  // Filtrar por barco
  if (filters.ship.length > 0) {
    filteredCruises = filteredCruises.filter((cruise) => {
      return filters.ship.includes(cruise.ship.name);
    });
  }

  // Filtrar por destino
  if (filters.destination.length > 0) {
    filteredCruises = filteredCruises.filter((cruise) => {
      return filters.destination.includes(cruise.region);
    });
  }

  // Filtrar por puerto
  if (filters.ports.length > 0) {
    filteredCruises = filteredCruises.filter((cruise) => {
      return cruise.itinerary.some((port) => filters.ports.includes(port));
    });
  }

  // Filtrar por duración
  if (filters.duration.length > 0) {
    filteredCruises = filteredCruises.filter((cruise) => {
      return filters.duration.some((duration) => {
        const [min, max] = duration.split("-").map(Number);
        return cruise.nights >= min && cruise.nights <= (max || 365);
      });
    });
  }

  return filteredCruises;
}
