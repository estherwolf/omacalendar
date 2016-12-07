$(document).ready(function() {

  $('#calendar').fullCalendar({
    theme: false,
    header: {
      left: 'prev, next',
      center: '',
      right: 'title'
    },

    displayEventTime: false, // don't show the time column in list view

    // THIS KEY WON'T WORK IN PRODUCTION!!!
    // To make your own Google API key, follow the directions here:
    // http://fullcalendar.io/docs/google_calendar/
    googleCalendarApiKey: 'AIzaSyCYdmBoCOgcPTLMG7UCsbCSIE_uruL4yW0',
    // US Holidays
    eventSources:[
    {
      googleCalendarId: 'ommiecalendar@gmail.com',
      color: '#ff9999'
    },
    {
      googleCalendarId: 'en.usa#holiday@group.v.calendar.google.com',
      color: '#99b3ff'
    }],
    //events: 'en.usa#holiday@group.v.calendar.google.com',

    eventClick: function(event) {
      // opens events in a popup window
      window.open(event.url, 'gcalevent', 'width=700,height=600');
      return false;
    },

    loading: function(bool) {
      $('#loading').toggle(bool);
    }

  });

});
