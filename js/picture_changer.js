var pics = [];
var duration = 0;

d = new Date();
month_id = d.getMonth();

var _url = 'https://res.cloudinary.com/dse2nhyx3/image/list/'+month_id+'month.json';
var ind = 0;
var success = false;
var init_data;
var interval_id;


initialize(_url);
handle_change_pic(_url);


$('body').on('click', 'button.fc-next-button', function() {
  month_id = (month_id+1) % 12;
  _url = 'https://res.cloudinary.com/dse2nhyx3/image/list/'+month_id+'month.json';
  initialize(_url);
  handle_change_pic(_url);
});

$('body').on('click', 'button.fc-prev-button', function() {
  if (month_id == 0) month_id = 12;
  if (month_id != 0){
  month_id = (month_id-1) % 12;
  }
  _url = 'https://res.cloudinary.com/dse2nhyx3/image/list/'+month_id+'month.json';
  initialize(_url);
  handle_change_pic(_url);

});

function initialize(_url){
$.ajax({
        url:_url,
        async:false,
        success: function(data){
          init_data = data;
          var d = new Date();
          set_pic(init_data.resources[0].public_id);
          duration = ((init_data.resources.length)*10000)+1000;
        },
        error: function (request, status, error) {
          set_default_pic(month_id);
      }
      });
}

function handle_change_pic(_url){
 interval_id = setInterval(function(){
      xhr = $.ajax({
        url: _url,
        success: function(data){
          var _data = data;
          var d = new Date();
          ind = d.getSeconds() % _data.resources.length;
          if((d.getHours() < 12 && d.getHours() >= 5) || (d.getHours() >= 4 && d.getHours()< 23)){
          set_pic(_data.resources[ind].public_id);}
          set_pic(_data.resources[ind].public_id);

        },
        error: function (request, status, error) {
          set_default_pic(month_id);
        }
        })
    }, duration);

document.getElementById("prev_image").onclick = function() {prev_picture(ind)};
document.getElementById("next_image").onclick = function() {next_picture(ind)};
}

function set_default_pic(name){
    clearInterval(interval_id);
    document.getElementById("monthImage").src = 'images/'+name+'.jpg';
    duration = 0;
    xhr.abort();

}

function set_pic(name){
  var d = new Date();
  var _url = "https://res.cloudinary.com/dse2nhyx3/image/upload/"+name;
    document.getElementById("monthImage").src = _url;}

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
