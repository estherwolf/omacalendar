var pics = [];
var duration = 0;

$.ajax({
        url: 'http://res.cloudinary.com/dse2nhyx3/image/list/hello.json',
        async:false,
        success: function(data){
          var _data = data;
          var d = new Date();
          set_pic(_data.resources[0].public_id);
          duration = ((_data.resources.length)*3000)+1000;
        }
      });


setInterval(function(){
$(document).ready(function(){
      $.ajax({
        url: 'http://res.cloudinary.com/dse2nhyx3/image/list/hello.json',
        success: function(data){
          var _data = data;
          var d = new Date();
          var ind = d.getSeconds() % _data.resources.length;
          set_pic(_data.resources[ind].public_id);}

        })
      });
    }, duration);

function set_pic(name){
  var d = new Date();
  var _url = "http://res.cloudinary.com/dse2nhyx3/image/upload/"+name;
    document.getElementById("monthImage").src = _url;}
