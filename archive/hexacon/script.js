$(document).ready(function () {

    var key = 'AIzaSyA-l94z3yUOghIWQybFB9VznYWc-sCbr-U';
    var playlistId = 'PLbzjvOb4WKQCCdfPnHDmeoFi6EG8nAOb_';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 8,
        playlistId: playlistId
    }

    loadVids();

    function loadVids() {
        $.getJSON(URL, options, function (data) {
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        });
    }

    function mainVid(id) {
        $('#video').html(`
					<iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				`);
    }

		
    function resultsLoop(data) {

        $.each(data.items, function (i, item) {

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var vid = item.snippet.resourceId.videoId;


            $('#playlist').append(`
							<article class="item" data-key="${vid}">

								<img src="${thumb}" alt="" class="thumb">
								<div class="details">
									<h4>${title}</h4>
								</div>

							</article>
						`);
        });
    }

		// CLICK EVENT
    $('#playlist').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });


});