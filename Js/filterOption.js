$(document).ready(function () {
  $.ajax({
    url: "./Json/filterOption.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      GenerateFilter("filterContainer", data.searchFilters);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error loading JSON:", textStatus, errorThrown);
    },
  });

  $(".dropdown-menu input").on("change", function () {
    const selectedOptions = [];
    $(`input[name="${$(this).attr("name")}"]:checked`).each(function () {
      selectedOptions.push($(this).val());
    });

    // Realizar alguna acción con las opciones seleccionadas
    console.log("Selected options:", selectedOptions);
  });

  $("#filter-container-btn").on('click', function(){
    $("#filterContainer").toggle('filter-active');
  });

  
});

function GenerateFilter(elementId, searchFilters) {
  const filterContainer = $("#" + elementId);

  const filterCloseBtn = `
  <div class="filter-mobile-btn d-flex justify-content-end p-2">
    <button id="close-filter-btn" type="button" class="filter-mobile-btn btn btn-danger text-center rounded-0 border-0 ms-1">X</button>                      
  </div>
  `;
  filterContainer.append(filterCloseBtn);

  $("#close-filter-btn").on('click', function(){
    $("#filterContainer").toggle('filter-active');
  });

  $.each(searchFilters, function (key, filter) {
    if (filter.type === "text") {
      const textInput = `
                <div class="filter-date-piker d-flex flex-column p-2">
                    <label for="${filter.id}" class="form-label p-0 m-0 border-bottom mb-1">${filter.label}</label>
                    <input type="text" id="${filter.id}" class="form-control rounded-0 border-0" readonly="readonly" autocomplete="off" placeholder="${filter.placeholder}">
                </div>
            `;
      filterContainer.append(textInput);

      setDatePicker(filter.id);
    } else if (filter.type === "select") {
      if (filter.id === "departing_uk") {
        let radioButtons = `
                    <div class="filter-bool d-flex flex-column p-2">
                        <label for="${filter.id}" class="form-label p-0 m-0 border-bottom mb-1">${filter.label}</label>
                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                `;

        $.each(filter.options, function (i, option) {
          radioButtons += `
                        <input type="radio" class="btn-check" name="fromUk" id="${
                          option.value
                        }" autocomplete="off" ${
            filter.default === option.value ? "checked" : ""
          }>
                        <label class="btn btn-outline-primary rounded-0 border-0" for="${
                          option.value
                        }">${option.text}</label>
                    `;
        });

        radioButtons += `
                        </div>
                    </div>
                `;
        filterContainer.append(radioButtons);
      } else {
        const cruiseLineSelect = createSelectField(filter);
        filterContainer.append(cruiseLineSelect);
        const selectedOptions = new Set();

        SetEventClickOnSelect(filter, selectedOptions);
        removeButtonLabel(filter, selectedOptions);
      }
    }
  });

  const clearAllBtn = `
    <div class="filter-btn d-flex justify-content-between p-2">
        <button id="clearAllBtn" type="button" class="btn btn-primary text-center rounded-0 border-0 w-50 me-1">
                            Clear All
                        </button>
                        <button id="applyChange" type="button" class="btn btn-success text-center rounded-0 border-0 w-50 ms-1">
                            Apply
                        </button>
                    </div>
    `;
  filterContainer.append(clearAllBtn);
}

function setDatePicker(elementId) {
  const dateRange = $("#" + elementId);
  if (dateRange) {
    dateRange
      .daterangepicker({
        withPortal: true,
        withFullScreenPortal: false,
        block: true,
        showDropdowns: true,
        autoUpdateInput: false,
        minDate: moment().format("DD/MM/YYYY").toString(),
        locale: {
          format: "DD/MM/YYYY",
          cancelLabel: "Clear",
        },
        linkedCalendars: false,
      })
      .on("apply.daterangepicker", function (e, picker) {
        picker.element.val(
          picker.startDate.format(picker.locale.format) +
            " - " +
            picker.endDate.format(picker.locale.format)
        );
      })
      .on("cancel.daterangepicker", function (ev, picker) {
        $(this).val("");
      });
  }
}

function createSelectField(config) {
  const selectField = `
        <div class="custom-dropdown d-flex flex-column p-2 pt-0 btn-group w-100">
            <label for="${config.id}" class="form-label p-0 m-0 border-bottom mb-1">${config.label}</label>
            <button type="button" class="btn btn-light text-start rounded-0 border-0 p-1 d-flex align-content-center flex-wrap" data-bs-toggle="dropdown" aria-expanded="false" id="${
              config.id
            }_button">
                ${config.label}
            </button>
            <ul class="dropdown-menu w-100 p-0 rounded-0 border-1" id="${
              config.id
            }_list">
                ${config.options
                  .map(
                    (option) => `
                    <li class="dropdown-item m-0 p-2" data-value="${option.value}">
                        ${option.text}
                    </li>
                `
                  )
                  .join("")}
            </ul>
        </div>
    `;

  return selectField;
}

function SetEventClickOnSelect(filter, selectedOptions) {
  $(`#${filter.id}_list`).on("click", "li", function () {
    const value = $(this).data("value");
    const text = $(this).text();

    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      selectedOptions.delete(value);
    } else {
      $(this).addClass("active");
      selectedOptions.add(value);
    }

    updateButtonLabel(filter.id, selectedOptions, filter.options);
  });
}

function updateButtonLabel(id, selectedOptions, options) {
  const button = $(`#${id}_button`);
  const selectedLabels = Array.from(selectedOptions).map((value) => {
    const option = options.find((opt) => opt.value == value);
    return `
    <div class="btn btn-primary btn-remove-container m-1 p-0 rounded-0 border-0 d-flex align-items-center">
        <a type="button" class="btn btn-light p-0 px-2 rounded-0 border-0 bg-danger text-white remove-option">x</a>
        <p class="p-0 m-0 px-3" data-value="${value}">${option.text}</p>
    </div>
    `;
  });

  if (selectedLabels.length) {
    button.html(selectedLabels.join(""));
  } else {
    button.text(searchFilters.cruiseLine.label);
  }
}

function removeButtonLabel(filter, selectedOptions) {
  $("#filters-container").on("click", ".remove-option", function (e) {
    e.stopPropagation();
    const value = $(this).data("value");

    selectedOptions.delete(value);
    $(
      `#${filter.id}_list li[data-value="${value}"]`
    ).removeClass("active");
    updateButtonLabel(filter.id, selectedOptions, filter.options);
  });
}
