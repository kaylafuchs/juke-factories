/* global juke */
'use strict';

juke.controller('ArtistsController', function($scope, $rootScope, ArtistFactory){

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
})