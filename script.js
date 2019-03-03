var json;
var app = {
  giphyURL: "https://api.giphy.com/v1/gifs/search?api_key=DvzuK96UqRD9z1BCPkPH1NVt9JvVqFLW&q=",


  initialize: function() {

    //spotify token: Start the auth procuess by using my id and secret to get an access token
    app.getToken();
  },

  getToken: function(word) {
    var id = '174bb61ac14e4cb8818995d5c54bd4d3';
    var secret = 'd29300baa4074277a35f70087a90d588';
    //this base encodes your id and secret to pass to the spotify server
    var encoded = btoa(id + ':' + secret);
    $.ajax({
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        'Authorization': 'Basic ' + encoded
      },
      data: {
        'grant_type': 'client_credentials'
      },
      success: function(result) {


        //enter a new searchTerm for spotify
        $("#sideA").click(function() {
          // $('#sideA').attr('id', 'sideA-animation');
          $(this).addClass('on');
          $(this).one('animationend', function(event) {
            $(this).removeClass('on');
            $(this).hide();
            $("#sideB").show();
            $(".lyrics").show()
          });
          // $('#sideA-animation').attr('id', 'sideA');
          console.log("Clicked search");

          var newSearchTerm = "higher brothers type 3";
          console.log(newSearchTerm);
          app.searchTracks(result.access_token, newSearchTerm)

        });

        $("#sideB").click(function() {
          // $('#sideA').attr('id', 'sideA-animation');
          $(this).addClass('on');
          $(this).one('animationend', function(event) {
            $(this).removeClass('on');
            $(this).hide();
            $("#sideA").show();
            $(".lyrics").show()
          });
          // $('#sideA-animation').attr('id', 'sideA');
          console.log("Clicked search");

          var newSearchTerm = "higher brothers type 3";
          console.log(newSearchTerm);
          app.searchTracks(result.access_token, newSearchTerm)

        });

        // $("#sideB").click(function() {
        //   console.log("Clicked search");
        //
        //   var newSearchTerm = "higher brothers type 3";
        //   console.log(newSearchTerm);
        //   app.searchTracks(result.access_token, newSearchTerm)
        //
        // });



      },
    });
  },


  searchTracks: function(token, searchTerm, json) {

    $.ajax({

      method: "GET",
      url: "https://api.spotify.com/v1/search?q=" + searchTerm + "&type=track",
      dataType: "json",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      success: function(data) {
        // debugger;
        console.log(data);

        var index = Math.floor(Math.random() * data.tracks.items.length) + 0;
        // return index;
        console.log(index);
        var trackName = data.tracks.items[index].name;
        // var artistGif = "higher brothers";
        // var artistGif = artists[index];
        // console.log(artistGif);
        var songurl = data.tracks.items[index].preview_url;

        console.log(trackName);
        // debugger;

        // app.searchGif(artistGif);

        var audioElement = document.createElement('audio');
        audioElement.src = data.tracks.items[index].preview_url;
        audioElement.autoplay = 'true';
        audioElement.controls = 'true';

        $('.title').html("<span>" + trackName + "</span>");
        $('.the-track').html(audioElement);

        json = $.getJSON("lyrics.json", function(data) {

          console.log(data);
          $('.lyrics').html(data.songs[index].lyrics);
          // this will show the info it in firebug console
        })
        console.log(json);


      },

      error: function() {
        console.log("Error retrieving spotify API");
      }
    });
  },

  //   searchGif: function(gifSearchTerm) {
  //   $.ajax({
  //     url: this.giphyURL + gifSearchTerm + "&limit=30&offset=0&rating=G&lang=en",
  //     type: 'GET',
  //     dataType: 'json',
  //     error: function(data) {
  //       console.log("We got problems");
  //       //console.log(data.status);
  //     },
  //     success: function(data) {
  //
  //       console.log("WooHoo!");
  //       //Check the browser console to see the returned data
  //       console.log(data);
  //       //debugger;
  //   var i = Math.floor(Math.random() * data.data.length) + 0;
  //       // for (var i = 0; i < data.data.length; i++) {
  //
  //         var resultURL = data.data[i].images.downsized_medium.url;
  //
  //         var newImg = $("<img>");
  //         newImg.attr("src", resultURL);
  //         $(".resultsTarget").append(newImg);
  //         // debugger;
  //         //   $(".resultsTarget img:last-child").remove();
  //         //Use jQuery's append() function to add the searchResults to the DOM
  //
  //       // $(".resultsTarget").remove();
  //     }
  //   });
  // }



};
