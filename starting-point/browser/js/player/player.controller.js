/* global juke */
'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

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

    $rootScope.$evalAsync();
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

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // var audio = document.createElement('audio');
  // audio.addEventListener('ended', function () {
  //   $scope.next();
  //   // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });
  // audio.addEventListener('timeupdate', function () {
  //    $scope.progress = 100 * PlayerFactory.getProgress();
  //    // $scope.$digest(); // re-computes current template only (this scope)
  //    $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });

  // state
  // $scope.currentSong;
  // $scope.playing = false;

  // main toggle
  // $scope.toggle = function (song) {
  //   if ($scope.playing) $rootScope.$broadcast('pause');
  //   else $rootScope.$broadcast('play', song);
  // };

  // incoming events (from Album or toggle)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);

  // functionality
  // function pause () {
  //   audio.pause();
  //   $scope.playing = false;
  // }
  // function play (event, song){
  //   // stop existing audio (e.g. other song) in any case
  //   pause();
  //   $scope.playing = true;
  //   // resume current song
  //   if (song === $scope.currentSong) return audio.play();
  //   // enable loading new song
  //   $scope.currentSong = song;
  //   audio.src = song.audioUrl;
  //   audio.load();
  //   audio.play();
  // }

  // outgoing events (to Album… or potentially other characters)
  // $scope.next = function () { pause(); $rootScope.$broadcast('next'); };
  // $scope.prev = function () { pause(); $rootScope.$broadcast('prev'); };

  // function seek (decimal) {
  //   audio.currentTime = audio.duration * decimal;
  // }

  // $scope.handleProgressClick = function (evt) {
  //   seek(evt.offsetX / evt.currentTarget.scrollWidth);
  // };

});
