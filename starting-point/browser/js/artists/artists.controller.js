/* global juke */
'use strict';

juke.controller('ArtistsCtrl', function($scope, $rootScope, ArtistFactory, AlbumFactory){

	ArtistFactory.fetchAll()
	.then(function(res){
		return res.data;
	})
	.then(function(artists){
		console.log(artists);
		$scope.artists = artists;
	})


	$scope.getCurView = function(){
		return ArtistFactory.curView() === "allArtists";
	}

	$scope.viewOneArtist = function(artist) {
		ArtistFactory.viewOne(artist);
	}
})