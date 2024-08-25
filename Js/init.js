loadHTML("http://cruise118.kankit.es/Layout/header.html");
loadHTML("http://cruise118.kankit.es/Layout/nav.html");
function loadHTML(file) {
  $.ajax({
    url: file,
    method: "GET",
    success: function (data) {
      $("body").prepend(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error loading JSON:", textStatus, errorThrown);
    },
  });
}
$.ajax({
  url: "http://cruise118.kankit.es/Layout/footer.html",
  method: "GET",
  success: function (data) {
    $("body").append(data);
  },
  error: function (xhr, status, error) {
    console.error("Error en la petición AJAX:", error);
  },
});

$(function () {
  setDatePicker("daterange");
});


function setDatePicker(elementId) {
  const dateRange = $("#"+ elementId);
  if (dateRange.length > 0){
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