function playSong(callback) {
    console.log("Opening Spotify");
    console.log("Searching for a song");
    console.log("Typed: Reflections");
    console.log("Loading Reflections by The Neighbourhood");
    callback();
}

playSong(function() { // <-- calling it
    console.log("Now playing: Reflections - The Neighbourhood");
});
function findSong(name, callback) {
    if (!name) {
        return callback("No song name given"); // error first
    }
    callback(null, "Now playing: " + name); // null = no error, then result
}

findSong("Reflections", function(error, result) { // <-- calling it
    if (error) {
        console.log("Error:", error);
    } else {
        console.log(result);
    }
});
function connectEarphones(cb) { console.log("Connecting earphones"); cb(); }
function adjustVolume(cb) { console.log("Adjusting volume"); cb(); }
function playTrack(cb) { console.log("Playing track"); cb(); }

connectEarphones(function() { // <-- calling, nested
    adjustVolume(function() {
        playTrack(function() {
            console.log("Enjoy the music!");
        });
    });
});
function connect() { console.log("Earphones connected"); setVolume(); }
function setVolume() { console.log("Volume set"); startTrack(); }
function startTrack() { console.log("Track started"); finish(); }
function finish() { console.log("Music flowing now!"); }

connect(); // <-- one call starts the chain
function likeSong() {
    return new Promise(function(resolve) {
        resolve("Added Reflections to favorites");
    });
}

likeSong().then(function(result) { // <-- calling it
    console.log(result);
});
function shareSong() {
    return new Promise(function(resolve) {
        resolve("Shared Reflections with a friend");
    });
}

async function sendShare() {
    const result = await shareSong();
    console.log(result);
}

sendShare(); // <-- calling it