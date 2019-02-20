  function store(data) {
           
             a=[];
            if(localStorage.getItem('users') !=null)
            { 
                a=JSON.parse(localStorage.users);  
            }
          
            if(! a.some(e=>e.email==data.email))
                {
                    alert("welcome "+data.userName);
            a.push(data);
            localStorage.setItem('users' , JSON.stringify( a));
                }
            else
                {
                    alert("you already have profile")
                }
             localStorage.setItem('img','blank-profile-picture-973460_960_720.png')
           }
       
          function regist()  {
             
            data={} ;
            var _userName= document.querySelector("input[type=text]").value;
            var _email = document.querySelector("input[type=email]").value;
            var _password= document.querySelector("input[type=password]").value;

            data.userName = _userName;
            data.email = _email ; 
            data.password = _password;
               store(data);
            
           }
         document.querySelector('form').addEventListener('submit',function(e){
            regist();
        });