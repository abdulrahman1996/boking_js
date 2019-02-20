 document.getElementById('iamgbtn').addEventListener('change', readURL, true);

    function readURL() {
        var file = document.getElementById("iamgbtn").files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            document.getElementById('imgdiv').style.backgroundImage = "url(" + reader.result + ")";
            localStorage.img = reader.result;
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    
    $('#us').text(localStorage.user);
    $('#mai').text(localStorage.mail);
    var users = JSON.parse(localStorage.users);
    var u=users.find(e=>e.email == localStorage.mail && e.userName==localStorage.user);
    if(localStorage.user)
    {  
    u.reservation.forEach(e=>{
           $("#revTableBody").append("<tr><td>" + e.name + "</td><td>" + e.pay+ " </td></tr>")
           
       });
    }
    if( ! localStorage.user)
        {
            $("#res").hide();
        }
    