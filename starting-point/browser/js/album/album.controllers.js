/* global juke */
'use strict';

juke.controller('AlbumCtrl', function ($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory) {

  //For next step...
  // AlbumFactory.fetchAll()
  //   .then(function(res) {
  //     return res.data;
  //   })
  //   .then(function(albums) {

  //   })
  //   .catch($log.error)


  AlbumFactory.fetchById(1)
    .then(function(res) {
      return res.data;
    })
    .then(function(album) {
      album.imageUrl = '/api/albums/' + album.id + '/image';
      album.songs.forEach(function (song, i) {
        song.audioUrl = '/api/songs/' + song.id + '/audio';
        song.albumIndex = i;
      });
      $scope.album = album;
      return StatsFactory.totalTime(album);
    })
    .then(function(totalTime) {
      $scope.album.duration = formatTime(totalTime);
    })
    .catch($log.error);






  // main toggle
  $scope.toggle = function (song) {
    if ($scope.playing && song === $scope.currentSong) {
      $rootScope.$broadcast('pause');
    } else {
      $rootScope.$broadcast('play', song);
    }
  };

  // incoming events (from Player, toggle, or skip)
  $scope.$on('pause', pause);
  $scope.$on('play', play);
  $scope.$on('next', next);
  $scope.$on('prev', prev);

  // functionality
  function pause () {
    $scope.playing = false;
  }
  function play (event, song) {
    $scope.playing = true;
    $scope.currentSong = song;
  }

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; }

  // jump `interval` spots in album (negative to go back, default +1)
  function skip (interval) {
    if (!$scope.currentSong) return;
    var index = $scope.currentSong.albumIndex;
    index = mod( (index + (interval || 1)), $scope.album.songs.length );
    $scope.currentSong = $scope.album.songs[index];
    if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  }
  function next () { skip(1); }
  function prev () { skip(-1); }

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
