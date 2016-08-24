'use strict';

juke.factory('ArtistFactory', function($q, $http, AlbumFactory){
	var artistObj = {};
	var view = null;

	artistObj.fetchAll = function(){
		return $http.get('/api/artists');
	}

	artistObj.resetView = function(){
		AlbumFactory.viewOne({id: null});
		console.log("reset album factory view")
	}

	artistObj.viewAll = function(){
		view = "allArtists";
	}

	artistObj.viewOne = function(artist){
		view = artist.id;
	}

	artistObj.curView = function(){
		return view;
	}

	artistObj.switchToArtistView = function(){
		if (view != "allArtists"){
			this.viewAll();
			this.resetView();
		}
	}


	return artistObj;

})

