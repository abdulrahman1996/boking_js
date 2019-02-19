renderHotel();

function renderHotel() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('_id');

    requestHotel(id);
}
function requestHotel(id) {

    $.ajax(
        {
            url: 'data.json',
            success: function (data) {

                hotel = data.find(e => e._id == id);
                renderDetails(hotel);
                // renderGalary(hotel); abeer
            }
        }
    )
}

function renderDetails(hotel) {

    jQuery('<div/>', {

        class: 'hotel-name',

    }).appendTo('.hotel-details .cr').text(hotel.name)
    jQuery('<div/>', {

        class: 'hotel-description',

    }).appendTo('.hotel-details .cr').text(hotel.discription + hotel.discription)

    // enable only avilable dates 
    var startDate = "2014-06-15", // some start date
        endDate = "2014-06-21",  // some end date
        dateRange = [];           // array to hold the range

    // populate the array
    for (var d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 1)) {
        dateRange.push($.datepicker.formatDate('yy-mm-dd', d));
    }

    // use this array 
    beforeShowDay: function s (date) {
        var dateString = jQuery.datepicker.formatDate('yy-mm-dd', date);
        return [dateRange.indexOf(dateString) == -1];
    }
}

