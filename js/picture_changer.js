//initialize variables
var pics = [];
var duration = 0;

d = new Date();
//gets the current month (does not update unless page refreshes)
month_id = d.getMonth();

//initially set the url to the json for month tag.
var _url = 'https://res.cloudinary.com/dse2nhyx3/image/list/'+month_id+'month.json';
var ind = 0;
var success = false;
var init_data;
var interval_id;

//wait for DOM to be ready
$(document).ready(function() {
  initialize(_url);
  handle_change_pic(_url);
});

//Button click function for FullCalendar next button
$('body').on('click', 'button.fc-next-button', function() {
  //advance the month
  month_id = (month_id+1) % 12;
  _url = 'https://res.cloudinary.com/dse2nhyx3/image/list/'+month_id+'month.json';
  clearInterval(interval_id);
  //hack to prevent asynchronous calls from making unwanted photos appear
  duration = 0;
  //stop the ajax calls
  xhr.abort();
  //grab new photos
  initialize(_url);
  handle_change_pic(_url);
});

//Button click function for FullCalendar previous button
$('body').on('click', 'button.fc-prev-button', function() {
  //case where the month would be negative if we subtract 1
  if (month_id == 0) month_id = 12;
  if (month_id != 0){
    //decrement month
    month_id = (month_id-1) % 12;
  }
  _url = 'https://res.cloudinary.com/dse2nhyx3/image/list/'+month_id+'month.json';
  clearInterval(interval_id);
  //hack to prevent asynchronous calls from making unwanted photos appear
  duration = 0;
  //stop the ajax calls
  xhr.abort();
  //grab new photos
  initialize(_url);
  handle_change_pic(_url);
});

function initialize(_url){
  //set the initial photos and duration
  xhr = $.ajax({
          url:_url,
          async:false,
          success: function(data){
          init_data = data;
          var d = new Date();
          set_pic(init_data.resources[0].public_id);
          //duration between each photo (in milliseconds)
          //caveat: this is set to work with the mod function for calculating ind in handle_change_pic
          duration = ((init_data.resources.length)*500000)+1000;
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
                  //trick to change indices dynamically
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

    //set up the previous and next image buttons
    document.getElementById("prev_image").onclick = function() {prev_picture(ind)};
    document.getElementById("next_image").onclick = function() {next_picture(ind)};
}

function set_default_pic(name){
    clearInterval(interval_id);
    document.getElementById("monthImage").src = 'images/'+name+'.png';
    //hack to prevent asynchronous calls from making unwanted photos appear
    duration = 0;
    //stop the ajax calls
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
