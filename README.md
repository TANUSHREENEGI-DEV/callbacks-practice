# Callbacks in Node.js — Practice Notes

## Overview

This repository contains my practice work on Callbacks in Node.js, part of my ongoing full stack development learning during my internship. It covers the core callback patterns used in asynchronous JavaScript, along with the common problems they cause and how modern JavaScript solves them.

All examples are built around a single theme — playing a song (Reflections by The Neighbourhood) — to keep the logic consistent across all six callback patterns covered here.

## Patterns Covered

1. Basic callback
2. Error-first callback
3. Nested callbacks (callback hell)
4. Named functions as a fix
5. Promises with `.then()`
6. async/await

All code is available in `callbacks-practice.js` and can be run using `node callbacks-practice.js`.

## 1. Basic Callback

```javascript
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
```

**Output:**
```
Opening Spotify
Searching for a song
Typed: Reflections
Loading Reflections by The Neighbourhood
Now playing: Reflections - The Neighbourhood
```

## 2. Error-First Callback

```javascript
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
```

**Output:**
```
Now playing: Reflections
```

## 3. Nested Callbacks — Callback Hell

```javascript
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
```

**Output:**
```
Connecting earphones
Adjusting volume
Playing track
Enjoy the music!
```

This example demonstrates callback hell — each step is nested inside the callback of the previous step. As more steps are added, the code shifts further to the right, becoming difficult to read and harder to manage in terms of error handling.

## 4. Fix — Named Functions

```javascript
function connect() { console.log("Earphones connected"); setVolume(); }
function setVolume() { console.log("Volume set"); startTrack(); }
function startTrack() { console.log("Track started"); finish(); }
function finish() { console.log("Music flowing now!"); }

connect(); // <-- one call starts the chain
```

**Output:**
```
Earphones connected
Volume set
Track started
Music flowing now!
```

Here, the same sequence of steps is written without nesting. Each function completes its task and calls the next one directly, keeping the code flat and readable.

## 5. Fix — Promises

```javascript
function likeSong() {
    return new Promise(function(resolve) {
        resolve("Added Reflections to favorites");
    });
}

likeSong().then(function(result) { // <-- calling it
    console.log(result);
});
```

**Output:**
```
Added Reflections to favorites
```

Promises allow chaining with `.then()` instead of nesting, and errors can be handled in a single `.catch()` block rather than at every level.

## 6. Fix — async/await

```javascript
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
```

**Output:**
```
Shared Reflections with a friend
```

async/await allows asynchronous code to be written and read like standard synchronous code, using `await` to pause execution until the Promise resolves. This is generally the preferred approach for writing new asynchronous code.

## Summary — What is Callback Hell

Callback hell occurs when callbacks are nested inside other callbacks across multiple levels, as shown in the nested example above. This results in code that grows sideways rather than downward, making it difficult to follow the execution flow and to manage errors at each level.

Named functions resolve this issue by removing deep nesting and allowing each function to call the next directly. Promises improve the flow by allowing .then() chaining, with centralized error handling using .catch(). async/await makes asynchronous code easier to read by allowing it to be written in a linear, synchronous-like structure, with error handling using try/catch.

---

~tanushree🪼
