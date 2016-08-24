'use strict';

juke.factory('PlayerFactory', function($rootScope){
	var audio = document.createElement('audio');
	audio.addEventListener('ended', function() {
		tools.next();
		$rootScope.$evalAsync();
	})

	var progress = 0;
	audio.addEventListener('timeupdate', function () {
		if(audio.duration) {
	   		progress = 100 * (audio.currentTime / audio.duration);
	   	}
	    $rootScope.$evalAsync();
	});


	var currentSong = null;
	var playing = false;
	var list = [];

	function edgeCase(myPos, anInterval) {
		var nextPos;
		if(myPos + anInterval >= list.length) {
			nextPos = 0;
		} else {
			if(myPos + anInterval < 0) {
				nextPos = list.length - 1;
			} else {
				return myPos + anInterval;
			}
		}
		return nextPos;
	}

	function skip(interval) {
		if (!currentSong) return;
		var index = currentSong.albumIndex;
		index = edgeCase(index, interval);
		console.log(index);
		console.log(list);
		currentSong = list[index];
		if (playing) tools.start(currentSong);
	}



	var tools = {
		pause: function() {
			audio.pause();
			playing = false;
		},
		start: function(content, songList) {
			if (songList){
				songList.forEach(function(song, index){
					song.albumIndex = index;
					list.push(song);
				})
			} else {
				if(list.indexOf(content) === -1) {
					content.albumIndex = 0;
					list = [];
					list.push(content);
				}
			}
			this.pause();
			audio.src = content.audioUrl;
			currentSong = content;
			playing = true;
			audio.load();
			audio.play();
		},
		resume: function() {
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
		getProgress: function() {
			return progress;
		},
		moveProgress: function(blah) {
			audio.currentTime = audio.duration * (blah);
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
