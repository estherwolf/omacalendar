var pics = [];
var duration = 0;

d = new Date();
month_id = d.getMonth();

var _url = 'https://res.cloudinary.com/dse2nhyx3/image/list/'+month_id+'.json';
var ind = 0;
var init_data;

$.ajax({
        url: _url,
        async:false,
        success: function(data){
          init_data = data;
          var d = new Date();
          set_pic(init_data.resources[0].public_id);
          duration = ((init_data.resources.length)*30000)+1000;
        }
      });

var interval_id = setInterval(function(){
$(document).ready(function(){
      $.ajax({
        url: _url,
        success: function(data){
          var _data = data;
          var d = new Date();
          ind = d.getSeconds() % _data.resources.length;
          if((d.getHours() < 12 && d.getHours() >= 5) || (d.getHours() >= 4 && d.getHours()< 23)){
          set_pic(_data.resources[ind].public_id);}
        }else{}
        })
      });
    }, duration);

function set_pic(name){
  var d = new Date();
  var _url = "https://res.cloudinary.com/dse2nhyx3/image/upload/"+name;
    document.getElementById("monthImage").src = _url;}

document.getElementById("prev_image").onclick = function() {prev_picture(ind)};
document.getElementById("next_image").onclick = function() {next_picture(ind)};

function prev_picture(indx){
      clearInterval(interval_id);
      if(indx-1 < 0){
        indx = init_data.resources.length
      }
      set_pic(init_data.resources[(indx-1) % init_data.resources.length].public_id);
      ind = indx-1;
}

function next_picture(indx){
      clearInterval(interval_id);
      set_pic(init_data.resources[(indx+1) % init_data.resources.length].public_id);
      ind = indx+1;

}
