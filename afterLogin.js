  if(localStorage.getItem('logged')=="true")
        {
            $('.btn').hide();
           $('#wel').text(localStorage.user);
       
        }
    else
        {
            $('.btn').show();
            $('#wel').hide();
        }


 $('#wel').click(function(){
        window.open("profilepage.html","_self");
    });