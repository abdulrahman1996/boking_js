function renderResult(resultsData) {


    if ($("#" + resultsData._id).length == 0) {
        jQuery('<div/>', {
            class: 'result',
            id: resultsData._id,
        }).appendTo('.results');



        $('<img>', {
            class: 'result-img',
            src: resultsData.images[0],
        }).appendTo('#' + resultsData._id);

        $('<div/>', {
            class: 'result-body',
            id: resultsData._id + "body"
        }).appendTo('#' + resultsData._id);



        $('<div/>', {
            class: 'result-title',

        }).appendTo('#' + resultsData._id + 'body').text(resultsData.name);

        $('<div/>', {
            class: 'result-location',

        }).appendTo('#' + resultsData._id + 'body')
            .append('<a href="https://www.google.com/maps/@' + resultsData.latitude + ',' + resultsData.longitude + ' ">' + resultsData.city + ' , ' + resultsData.location + '</a>');

        $('<div/>', {
            class: 'result-discription',

        }).appendTo('#' + resultsData._id + 'body').text(resultsData.discription);
    }



}


/// logic 
var filterArray = [];




function handelRequest() {

    const urlParams = new URLSearchParams(window.location.search);
     check_in = urlParams.get('checkIn');
     check_out = urlParams.get('checkOut');


    const city = urlParams.get('city');
    if(city)
    filterArray.push({ function: filterBycity, parameter: city });


    if(check_in && check_out)
    filterArray.push({ function: filterByCheck, parameter: { check_in, check_out } });

    showResults();

}


function filterByCheck(hotel, check) {
   
    return hotel.rooms.some(room => Date.parse(room.avalible_from) > Date.parse(check.check_in) && Date.parse(room.avalible_to) >Date.parse(check.check_out));
}


function filterBycity(hotel, city) {
    return hotel.city == city;
}



//filter by type 
/// filter by price 
// filter by stars /
// filter  date 
//1- filterarray.push 
//2- f


handelRequest();

function showResults() {
    $.ajax({
        url: "data.json",

        success: function (data) {

            
        filterdResults = data.filter(hotel => filterArray.every(condition => condition.function(hotel, condition.parameter) == true));
            filterdResults.forEach(element => {
                renderResult(element);
            });

        }
    })
}








