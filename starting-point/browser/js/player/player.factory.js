'use strict';

juke.factory('PlayerFactory', function(){
	var currentSong;
	var playing = false;

	function skip(interval) {
		if(!currentSong) return;
		var index = currentSong.albumIndex;
		index = mod( (index + (interval || 1)), album.songs.length );
		currentSong = album.songs[index];
		if(playing) play(currentSong);
	}

	var tools = {
		pause: function() {
			audio.pause();
			playing = false;
		},
		start: function(content) {
			audio.src = content.audioUrl;
			audio.load();
			audio.play();
		},
		resume: function(song) {
			playing = true;
			audio.play();
		},
		isPlaying: function() {
			return playing;
		},
		getCurrentSong: function() {
			return currentSong;
		},
		next: function() {
			skip(1);
		},
		previous: function() {
			skip(-1);
		},
		getProgress: function(decimal) {
			return audio.duration * decimal;
		}
	}

	return tools;

});




/*
,
		getProgress: function() {
			return(audio.duration * decimal);
		}

  function skip (interval) {
    if (!$scope.currentSong) return;
    var index = $scope.currentSong.albumIndex;
    index = mod( (index + (interval || 1)), $scope.album.songs.length );
    $scope.currentSong = $scope.album.songs[index];
    if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  }
*/

// /* global juke */
// 'use strict';

// juke.controller('PlayerCtrl', function ($scope, $rootScope) {

//   // initialize audio player (note this kind of DOM stuff is odd for Angular)
//   var audio = document.createElement('audio');
//   audio.addEventListener('ended', function () {
//     $scope.next();
//     // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
//     $scope.$evalAsync(); // likely best, schedules digest if none happening
//   });
//   audio.addEventListener('timeupdate', function () {
//     $scope.progress = 100 * audio.currentTime / audio.duration;
//     // $scope.$digest(); // re-computes current template only (this scope)
//     $scope.$evalAsync(); // likely best, schedules digest if none happening
//   });

//   // state
//   $scope.currentSong;
//   $scope.playing = false;

//   // main toggle
//   $scope.toggle = function (song) {
//     if ($scope.playing) $rootScope.$broadcast('pause');
//     else $rootScope.$broadcast('play', song);
//   };

//   // incoming events (from Album or toggle)
//   $scope.$on('pause', pause);
//   $scope.$on('play', play);

//   // functionality
//   function pause () {
//     audio.pause();
//     $scope.playing = false;
//   }
//   function play (event, song){
//     // stop existing audio (e.g. other song) in any case
//     pause();
//     $scope.playing = true;
//     // resume current song
//     if (song === $scope.currentSong) return audio.play();
//     // enable loading new song
//     $scope.currentSong = song;
//     audio.src = song.audioUrl;
//     audio.load();
//     audio.play();
//   }

//   // outgoing events (to Album… or potentially other characters)
//   $scope.next = function () { pause(); $rootScope.$broadcast('next'); };
//   $scope.prev = function () { pause(); $rootScope.$broadcast('prev'); };

//   function seek (decimal) {
//     audio.currentTime = audio.duration * decimal;
//   }

//   $scope.handleProgressClick = function (evt) {
//     seek(evt.offsetX / evt.currentTarget.scrollWidth);
//   };

// });
