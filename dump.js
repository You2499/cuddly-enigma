socket.on('register', function( newScreenName, callback ) {
  // If a new screen name is posted
  if( typeof newScreenName !== 'undefined' ) {
    var newScreenName = newScreenName.trim();
    // If the new screen name is not an empty string
    if( newScreenName && typeof players[socket.id] === 'undefined' ) {
      var nameExists = false;
      for( var i in players ) {
        if( players[i].public.name && players[i].public.name == newScreenName ) {
          nameExists = true;
          break;
        }
      }
      if( !nameExists ) {
        // Creating the player object
        players[socket.id] = new Player( socket, newScreenName, 1000 );
        callback( { 'success': true, screenName: newScreenName, totalChips: players[socket.id].chips } );
      } else {
        callback( { 'success': false, 'message': 'This name is taken' } );
      }
    } else {
      callback( { 'success': false, 'message': 'Please enter your name' } );
    }
  } else {
    callback( { 'success': false, 'message': '' } );
  }
});
