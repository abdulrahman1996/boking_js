
$(function(){
      

      $('#log').click(function(){
           var users = JSON.parse(localStorage.users);
       var emailTxt =$('#mail').val();
        var passwordTxt = $("#pass").val();
       var u=users.find(e=>e.email == emailTxt && e.password==passwordTxt)
               if(u)
                {
                   localStorage.setItem('logged',"true");
                    localStorage.setItem('user',u.userName);
                   localStorage.setItem('mail',u.email);
                alert ("hello "+u.userName); 
                 window.open("pag1.html","_self");
                    
                }
               else
                   {
                       localStorage.img='blank-profile-picture-973460_960_720.png';
               
                        localStorage.removeItem('logged');
                       localStorage.removeItem('user');
                     alert("please register first");  
                     window.open("register.html","_self");
                   }
      });
  });