/* global juke */
'use strict';

juke.controller('SidebarCtrl', function($scope, $rootScope, AlbumFactory){
	$scope.viewAlbums = function(){
		AlbumFactory.viewAll();
	}
});