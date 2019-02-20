renderHotel();

function renderHotel() {

    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('_id');
    price = urlParams.get('price');

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

    
    


}

$("#to-date").change(()=>{

    var from = $("#from-date").val(); 
    var to = $("#to-date").val(); 
    console.log(from  , to);

    var diffrence = Date.parse(to) - Date.parse(from);
    var diffrenceDay = diffrence /( 1000 *60*60*24) ; 
    pay = diffrenceDay *price+ " EGP";
    $("#roomCount").text(pay);   
    $("#reserve").removeAttr("disabled");        

})

$("#reserve").click(function () {
  

    users = JSON.parse(localStorage.users);
    userIndex = users.findIndex(u => u.email == localStorage.mail);
    if (userIndex == -1) {
        alert("please register first");
        window.location.replace("register.html");
    }
    else {
        var reserveD = { id: id, date: new Date() };
        users[userIndex].reservation == null ?
            users[userIndex].reservation = [reserveD] :
            users[userIndex].reservation.push(reserveD);
        localStorage.users = JSON.stringify(users);
        alert("" +pay )
        $("body").empty();
        $("body").text("redirect to home ...")
        setTimeout(() => {

            window.location.replace("pag1.html");

        }, 3000)
    }



});

