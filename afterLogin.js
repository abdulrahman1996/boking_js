  if(localStorage.getItem('logged')=="true")
        {
            $('.btn').hide();
           $('#wel').text(localStorage.user);
            $('#hid').show();
       
        }
    else
        {
            $('.btn').show();
            $('#wel').hide();
            $('#hid').hide();

        }



 $('#wel').click(function(){
        window.open("profilepage.html","_self");
    });