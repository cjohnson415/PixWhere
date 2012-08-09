// The URL of the Singly API endpoint
var apiBaseUrl = 'https://api.singly.com';
var photosUrl = 'http://localhost:8043/photos.json';

// A small wrapper for getting data from the Singly API
var singly = {
   get: function(url, options, callback) {
      if (options === undefined ||
         options === null) {
         options = {};
      }

      options.access_token = accessToken;

      $.getJSON(apiBaseUrl + url, options, callback);
   }
};

// Runs after the page has loaded
$(function() {
   // If there was no access token defined then return
   if (accessToken === 'undefined' ||
      accessToken === undefined) {
      return;
   }

   $('#access-token').val(accessToken);
   $('#access-token-wrapper').show();

   // Get the user's profiles
   singly.get('/profiles', null, function(profiles) {
      _.each(profiles.all, function(profile) {
         $('#profiles').append(sprintf('<li><strong>Linked profile:</strong> %s</li>', profile));
      });
   });

   function getPhotos() {
      $.getJSON(photosUrl, function(js) {
        console.log('inside');
        console.log(js);
        $('#photos').append('<img id="theImg" src="'+js.link+'" />')
      })
      .error(function (err) {
         console.log(err);
      });
   }

  $('#get').click(function () {
    console.log('getting photos');
    getPhotos();
  }); 
});
