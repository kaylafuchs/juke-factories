/* global juke */
'use strict';


juke.controller('ArtistCtrl', function($scope, $rootScope, ArtistFactory, AlbumFactory, $log){
  
  $rootScope.$on("anArtist", function(anArtist,payload){
     $scope.gotoId(payload);
  })

  $scope.gotoId = function(anId) {
    ArtistFactory.fetchById(anId)
    .then(function(res) {
      return res.data;
    })
    .then(function(artist) {
	  $scope.artist = artist;
      return ArtistFactory.fetchAlbums(artist.id);
    })
    .then(function(res2) {
    	return res2.data;
    })
    .then(function(artistAlbums) {
    	artistAlbums.forEach(function(album) {
    		album.imageUrl = '/api/albums/' + album.id + '/image';
    	})
    	$scope.artist.albums = artistAlbums;
    })
    .catch($log.error);
  } 

  $scope.goToAlbum = function(album) {
    ArtistFactory.viewOne({id: null});
  	AlbumFactory.viewOne(album); 
  }

  $scope.getCurView = function() {
  	return typeof ArtistFactory.curView() === "number";
  }


})