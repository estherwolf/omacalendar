$(document).ready(function() {

  $('#eventList').fullCalendar({

    header: {
      left: '',
      center: 'title',
      right: ''
    },

    height: parent,
    displayEventTime: true, // don't show the time column in list view

    // THIS KEY WON'T WORK IN PRODUCTION!!!
    // To make your own Google API key, follow the directions here:
    // http://fullcalendar.io/docs/google_calendar/
    googleCalendarApiKey: 'AIzaSyCYdmBoCOgcPTLMG7UCsbCSIE_uruL4yW0',
    //googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',
    // US Holidays
    eventSources:[
    {
      googleCalendarId: 'ommiecalendar@gmail.com'
    },
    {
      googleCalendarId: 'en.usa#holiday@group.v.calendar.google.com',
    }],
    //events: 'en.usa#holiday@group.v.calendar.google.com',
		//defaultView: 'listWeek',

    views: {threeDayView:{
      type:'list',
      duration:{days: 3},
    }

  },

    defaultView: 'threeDayView',


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
