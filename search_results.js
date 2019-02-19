function renderResult(resultsData) {




    if ($("#" + resultsData._id).length == 0) {

        jQuery('<form/>', {
            action :'result_details.html',
            class: 'result',
            id: resultsData._id,
        }).appendTo('.results')

        $('<input>', {
            type: 'hidden',
            value: resultsData._id , 
            name: '_id'
        }).appendTo('#' + resultsData._id);


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



        $('<div/>', {
            class: 'result-price',

        }).appendTo('#' + resultsData._id).text('from ' + resultsData.rooms[1].price + ' EGP for one night').append(
            $('<input>', {
                type: 'submit',
                value: 'show datails',
                class: 'result-button'
                
            })
        );

        // $('<input>', {
        //     type: 'submit',
        //     value: 'show ' , 
        //     class :'result-button'
        // }).appendTo('#' + resultsData._id)

    }
}




function filterBycity(hotel, city) {
    return hotel.city == city;
}


/// logic 
var filterArray = [];




function handelRequest() {

    const urlParams = new URLSearchParams(window.location.search);
    check_in = urlParams.get('checkIn');
    check_out = urlParams.get('checkOut');
    const city = urlParams.get('city');
    if (city)
        filterArray.push({
            function: filterBycity,
            parameter: city
        });


    if (check_in && check_out) {
        filterArray.push({
            function: filterByCheck,
            parameter: {
                check_in,
                check_out
            }
        });

    }

    const adults = urlParams.get('adults');
    const children = urlParams.get('children');
    const rooms = urlParams.get('rooms');
    if (adults || children) {
        filterArray.push({
            function: filterByAdChild,
            parameter: {
                adults,
                children,
                rooms
            }

        });
    }

    Array.from(document.querySelectorAll(".checked")).forEach(e => {
        e.addEventListener('change', r => {
            if (filterArray.find(e => e.parameter == r.target.value)) {
                var index = filterArray.findIndex(e => e.parameter == r.target.value);
                filterArray.splice(index, 1);
            }
            else
                filterArray.push({
                    function: filterByPrice,
                    parameter: r.target.value
                });

            showResults();
        });
    });




    showResults();

}

function filterByPrice(hotel, price) {
    return hotel.rooms.some(room => room.price < price);

}
function filterByCheck(hotel, check) {

    return hotel.rooms.some(room => Date.parse(room.avalible_from) < Date.parse(check.check_in) && Date.parse(room.avalible_to) > Date.parse(check.check_out));
}


function filterBycity(hotel, city) {
    return hotel.city == city;
}

function filterByAdChild(hotel, adChild) {

    var x = hotel.rooms.length;

    if (adChild.children == 0 && adChild.adults != 0)
        return hotel.rooms.some(room => adChild.adults == room.type.adults && adChild.rooms <= x);
    return hotel.rooms.some(room => adChild.adults == room.type.adults && adChild.children == room.type.children && adChild.rooms <= x);


}


handelRequest();

function showResults() {

    $.ajax({
        url: "data.json",

        success: function (data) {
            $('.results').empty();
            //           data = JSON.parse(data)
            filterdResults = data.filter(hotel => filterArray.every(condition => condition.function(hotel, condition.parameter) == true));

            filterdResults.forEach(element => {

                renderResult(element)
            })

        }
    })
}


var arr = [];
function ajax() {
    return $.ajax({
        method: "GET",
        url: "data.json",
        statusCode: {
            200: function (e) {
                for (i in e) {
                    arr.push(e[i].city);
                }
            }
        }
    });


};
$.when(ajax()).done(function () {
    let City = [...new Set(arr)]; $('#autocomplete').autocomplete(
        { lookup: City })
});