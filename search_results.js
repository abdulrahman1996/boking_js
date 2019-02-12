function renderResult(resultsData) {
           

           
    jQuery('<div/>', {
        class: 'result',
        id:  resultsData._id,
    }).appendTo('.results');



    $('<img>' , {
        class: 'result-img' , 
        src: resultsData.images[0] ,
    }).appendTo('#'+resultsData._id);

    $('<div/>' , {
        class: 'result-body' , 
        id:resultsData._id+"body"
    }).appendTo('#'+resultsData._id);

   

   $('<div/>' , {
        class: 'result-title' , 

    }).appendTo('#'+resultsData._id+'body').text(resultsData.name);

    $('<div/>' , {
        class: 'result-location' , 

    }).appendTo('#'+resultsData._id+'body')
    .append('<a href="https://www.google.com/maps/@' +resultsData.latitude+','+resultsData.longitude + ' ">' +resultsData.city+' , '+ resultsData.location +'</a>');

    $('<div/>' , {
        class: 'result-discription' , 

    }).appendTo('#'+resultsData._id+'body').text(resultsData.discription);

   
   

}

$.ajax({
    url: "data.json",

    success: function (data) {

        

        var filterBycity = data.filter(e => e.city =="cairo");
        filterBycity.forEach(element => {
            renderResult(element);
        });
        // bydate = data.some( hotel=>hotel.rooms.filter(room => room.Date.parse(avalible_from))  ) 

    }
    
})