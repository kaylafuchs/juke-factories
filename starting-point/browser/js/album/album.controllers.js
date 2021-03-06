/* global juke */
'use strict';

juke.controller('AlbumCtrl', function ($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

  //For next step...
  // AlbumFactory.fetchAll()
  //   .then(function(res) {
  //     return res.data;
  //   })
  //   .then(function(albums) {

  //   })
  //   .catch($log.error)

  $rootScope.$on("anAlbum", function(anAlbum,payload){
     $scope.gotoId(payload);
  })

  $scope.gotoId = function(anId) {
    AlbumFactory.fetchById(anId)
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
  } 

  // main toggle
  $scope.toggle = function (song, trackList) {
    if (song === PlayerFactory.getCurrentSong()) {
      if(PlayerFactory.isPlaying()) {
        PlayerFactory.pause();
      } else {
        PlayerFactory.resume();
      }
    } else {
      PlayerFactory.start(song, trackList);
    }

    // $rootScope.$evalAsync();
  };


  $scope.currentlyPlaying = function(){
    return PlayerFactory.isPlaying();
  }

  $scope.currentSong = function(){
    return PlayerFactory.getCurrentSong();
  }

  $scope.nextSong = function(){
    PlayerFactory.next();
  }

  $scope.previousSong = function(){
    PlayerFactory.previous();
  }

  $scope.getCurView = function(){
    return typeof AlbumFactory.curView() === "number";
  }

  // // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);

  // // functionality
  // function pause () {
  //   $scope.playing = false;
  // }
  // function play (event, song) {
  //   $scope.playing = true;
  //   $scope.currentSong = song;
  // }

  // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num % m) + m) % m; }

  // // jump `interval` spots in album (negative to go back, default +1)
  // function skip (interval) {
  //   if (!$scope.currentSong) return;
  //   var index = $scope.currentSong.albumIndex;
  //   index = mod( (index + (interval || 1)), $scope.album.songs.length );
  //   $scope.currentSong = $scope.album.songs[index];
  //   if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  // }
  // function next () { skip(1); }
  // function prev () { skip(-1); }

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
