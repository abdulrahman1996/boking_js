$(function(){
    var images=["download%20(2).jpg","download%20(3).jpg","download%20(4).jpg","images.jpg","download%20(1).jpg"];
            console.log(images);

    $("#nextimg").click(function(){
        console.log(images);
       document.images[0].src=images[0];
       document.images[1].src=images[1];
       document.images[2].src=images[2];
        var x=images.splice(0,1);
       
        images.push(x.toString());
        
    });
  
      var arr=[];
            function ajax(){
             return $.ajax({
                  method:"GET",
                  url:"data.json",
                  statusCode:{200:function(e){
                  for(i in e)
                      { 
                          arr.push(e[i].city);
                      }
                  }}
              });
                
              
                   };
            $.when(ajax()).done(function(){  let City = [...new Set(arr)];$('#autocomplete').autocomplete(
                {lookup:City})});
                
});
