priceGlobal = 10000;
function renderResult(resultsData , room) {



    
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

        
        $('<input>', {
            type: 'hidden',
            value: room.room.price , 
            name: 'price'
        }).appendTo('#' + resultsData._id);


        $('<input>', {
            type: 'hidden',
            value: rooms , 
            name: 'Room'
        }).appendTo('#' + resultsData._id);

        $('<input>', {
            type: 'hidden',
            value: adults , 
            name: 'adults'
        }).appendTo('#' + resultsData._id);

        $('<input>', {
            type: 'hidden',
            name: 'children' , 
            value: children ,
        }).appendTo('#' + resultsData._id);

        $('<input>', {
            type: 'hidden',
            name: 'chick_in' , 
            value: check_in ,
        }).appendTo('#' + resultsData._id);

        $('<input>', {
            type: 'hidden',
            name: 'check_out' , 
            value: check_out ,
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

        }).appendTo('#' + resultsData._id).text('from ' + room.room.price + ' EGP for one night').append(
            $('<input>', {
                type: 'submit',
                value: 'show datails',
                class: 'result-button'
                
            })
        );

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

     adults = urlParams.get('adults');
     children = urlParams.get('children');
    rooms = urlParams.get('Room');
    console.log(check_in , check_out  , rooms , adults , children);
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
            {
                priceGlobal =  r.target.value ; 
                filterArray.push({
                    function: filterByPrice,
                    parameter: priceGlobal
                });
            }
                

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
            filterdResults = data.filter(hotel =>  filterArray.every(condition => condition.function(hotel, condition.parameter) == true) );
            filterRooms = [];
            filterdResults.forEach(r => filterRooms.push( { id: r._id   , room : r. rooms.find(room => room.price <=priceGlobal )}))

            filterdResults.forEach((element , i )=> {

                renderResult(element  , filterRooms[i] )
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

