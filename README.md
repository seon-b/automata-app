# Automata App

This app is designed for students taking an undergraduate level theory of computation course. It enables users to create finite automata and test inputs based on a user defined alphabet. The app only supports deterministic finite automata currently.

## Getting Started

There are no installation requirements, no external libraries or dependencies are used.

## Features

There are three modules, automata.js, automataGraphics.js, and message.js. There is a global object that saves and modifies the current state of the app.

- automata.js - contains classes to create finite automatas and the methods to access and modify the finite automatas.

- automataGraphics.js - contains classes to create the graphical representation of a finite automata the user creates. There are methods to access and modify the automata graphics. The [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) is utilized for the graphics.

- message.js - contains functions to test for errors and an error object that stores error messages.

#### The appState Object :

This object tracks several important states of the application. Some of these states include the user input data, the name of the automata states, the state type, and it's transition values. The mode of the app, if it is in draw, edit, or erase mode.
