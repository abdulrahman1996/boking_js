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

 $('#hid').click(function(){
       if(localStorage.user)
           {
alert('thanks '+localStorage.user+' for your visit!');               
        localStorage.removeItem('user');
       localStorage.removeItem('logged');
       localStorage.removeItem('mail');
        window.open('pag1.html',"_self");
        localStorage.img='blank-profile-picture-973460_960_720.png'
           }
      
    });
