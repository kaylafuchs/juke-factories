'use strict';

juke.factory('ArtistFactory', function($q, $http, AlbumFactory, $rootScope){
	var artistObj = {};
	var view = null;

	artistObj.fetchAll = function(){
		return $http.get('/api/artists');
	}

	artistObj.fetchAlbums = function(id){
		return $http.get('/api/artists/' + id + '/albums');
	}

	artistObj.fetchById = function(id) {
		return $http.get('/api/artists/' + id);
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
		if(artist.id !== null) {
      		$rootScope.$broadcast("anArtist", view);
    	}
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

