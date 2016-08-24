/* global juke */
'use strict';

juke.controller('SidebarCtrl', function($scope, $rootScope, AlbumFactory, ArtistFactory){
	$scope.viewAlbums = function(){
		AlbumFactory.viewAll();
		ArtistFactory.viewOne({id:null});
	}

	$scope.viewAllArtists = function(){
		ArtistFactory.switchToArtistView()
		console.log("called switchToArtistView")
	}
});