/* global juke */
'use strict';

juke.controller('AlbumsCtrl', function ($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory, $q) {

    AlbumFactory.fetchAll()
    .then(function(res) {
      return res.data;
    })
    .then(function(albums) {
      albums.forEach(function(album) {
        album.imageUrl = "/api/albums/" + album.id + '/image';
        album.duration = 0;
        StatsFactory.totalTime(album)
          .then(function(totalTime) {
            album.duration = formatTime(totalTime);
          })
          .catch($log.error);
      })
      $scope.albums = albums;
    })
    .catch($log.error)


  // AlbumFactory.fetchById(1)
  //   .then(function(res) {
  //     return res.data;
  //   })
  //   .then(function(album) {
  //     album.imageUrl = '/api/albums/' + album.id + '/image';
  //     album.songs.forEach(function (song, i) {
  //       song.audioUrl = '/api/songs/' + song.id + '/audio';
  //       song.albumIndex = i;
  //     });
  //     $scope.album = album;
  //     return StatsFactory.totalTime(album);
  //   })
  //   .then(function(totalTime) {
  //     $scope.album.duration = formatTime(totalTime);
  //   })
  //   .catch($log.error);

});

function formatTime(time){
  var returnTime;
  var minutes = Math.floor(time / 60);
  var seconds = (time - minutes * 60).toFixed(0);
  var hours = Math.floor(time / 3600);
  //time = time - hours * 3600;

  if (hours === 0){
    returnTime = minutes + ":" + seconds;
  } else {
    returnTime = hours + ":" + minutes + ":" + seconds; 
  }
  return returnTime;
}
