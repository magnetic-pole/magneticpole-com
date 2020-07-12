// JavaScript Magnetics and Orbits
// Created January, 2002 by Peter Vasiliauskas
// Copyright 2002 by Peter Vasiliauskas.  All rights reserved.
// This script or portions of it may not be used without permission.

ns4 = (document.layers) ? true:false;
ns6 = (document.getElementById && !document.all) ? true:false;
ie4 = (document.all) ? true:false;

var timerID = null;
var timerRunning = false;
var timerSpeed = 30;              // ms timer
var timerStep = Math.PI / 1500;   // step around the orbit
var timerCurrent = 0;

var mouseX = 0;
var mouseY = 0;
var centerX = 100;
var centerY = 100;

var maxDistance = 1000;
var maxPull = 30;                // max magnetics in pixels

var linkBaseX = new Array();
var linkBaseY = new Array();
var linkRealX = new Array();
var linkRealY = new Array();
var linkWidth = new Array();
var linkHeight = new Array();
var linkOrbitScaleX = new Array();
var linkOrbitScaleY = new Array();
var linkOrbitSkew = new Array();
var linkOrbitRel = new Array();
var linkOrbitWidth = 100;
var linkOrbitHeight = 100;


if(!ie4)
  document.captureEvents(Event.MOUSEMOVE);
document.onmousemove = onMouseMove;




function getDocWidth() {
  var winW;
  if(ie4 || ns4 || ns6) {
    winW = (ns4 || ns6) ? window.innerWidth-16 : document.body.offsetWidth-20;
    }
  else {
    winW = 600;
    }
  return winW;
  }


function getDocHeight() {
  var winH;
  if(ie4 || ns4 || ns6) {
    winH = (ns4 || ns6) ? window.innerHeight : document.body.offsetHeight;
    }
  else {
    winH = 400;
    }
  return winH;
  }


function distance(x1, y1, x2, y2) {
  return Math.abs(Math.sqrt(((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1))));
  }


function onBodyLoad() {
  if(getDocWidth() > 800)
    document.body.style.backgroundImage = 'url(../images/planet800.jpg)';
  else if(getDocWidth() > 700)
    document.body.style.backgroundImage = 'url(../images/planet700.jpg)';
  else
    document.body.style.backgroundImage = 'url(../images/planet600.jpg)';

  maxDistance = distance(0, 0, getDocWidth(), getDocHeight());
  maxPull = getDocWidth() / 40;

  centerX = getDocWidth() / 2;
  centerY = getDocHeight() / 2;

  linkOrbitWidth = (getDocWidth() * 0.7) / 2;
  linkOrbitHeight = (getDocHeight() * 0.7) / 2;

  for(i=0; i<numLinks; i++) {
    strId = "link" + i;
    linkWidth[i] = 100;
    linkHeight[i] = 10;
    linkOrbitScaleX[i] = (Math.random() * 0.6) + 0.4;
    linkOrbitScaleY[i] = (Math.random() * 0.1) + 0.9;
    linkOrbitSkew[i] = (Math.random() * (Math.PI / 3)) - (Math.PI / 6);
    linkOrbitRel[i] = (i / numLinks) * (2 * Math.PI);
    }

  stepOrbit();
  moveLinks();

  for(i=0; i<numLinks; i++) {
    strId = "link" + i;
    document.getElementById(strId).style.display = '';
    linkWidth[i] = document.getElementById(strId).offsetWidth; 
    linkHeight[i] = document.getElementById(strId).offsetHeight; 
    }

  startClock();

  bodyLoaded = true;
  }


function onBodyUnload() {
  stopClock();
  }


function startClock() {
  stopClock();
  timerID = setInterval("onTimerTick();", timerSpeed);
  timerRunning = true;
  }


function stopClock() {
  if(timerRunning)
    clearInterval(timerID);
  timerRunning = false;
  }


function onMouseMove(e) {
  if(ie4) {
    mouseX = event.clientX + document.body.scrollLeft;
    mouseY = event.clientY + document.body.scrollTop;
    }
  else {
    mouseX = e.pageX;
    mouseY = e.pageY;
    }  

  if(!bodyLoaded)
    return true;

  moveLinks();
  return true;
  }


function onTimerTick() {
  stepOrbit();
  moveLinks();
  }


function stepOrbit() {
  timerCurrent += timerStep;
  if(timerCurrent >= (2*Math.PI))
    timerCurrent -= (2*Math.PI);

  for(i=0; i<numLinks; i++) {
    linkBaseX[i] = ((Math.cos(timerCurrent + linkOrbitRel[i] + linkOrbitSkew[i])) * linkOrbitScaleX[i] * linkOrbitWidth) + centerX - (linkWidth[i] / 2);
    linkBaseY[i] = ((Math.sin(timerCurrent + linkOrbitRel[i])) * linkOrbitScaleY[i] * linkOrbitHeight) + centerY - (linkHeight[i] / 2);
    }
  }


function moveLinks() {
  for(i=0; i<numLinks; i++) {
    strId = "link" + i;
    cx = linkBaseX[i] + (linkWidth[i] / 2);
    cy = linkBaseY[i] + (linkHeight[i] / 2);

    dist = distance(mouseX, mouseY, cx, cy);
    pull = maxPull - (((dist*dist*dist) / (maxDistance*maxDistance*maxDistance)) * maxPull);
    if(pull >= dist) {
      linkRealX[i] = mouseX - (linkWidth[i] / 2);
      linkRealY[i] = mouseY - (linkHeight[i] / 2);
      }
    else {
      linkRealX[i] = ((pull / dist) * (mouseX - cx)) + linkBaseX[i];
      linkRealY[i] = ((pull / dist) * (mouseY - cy)) + linkBaseY[i];
      }
    
    document.getElementById(strId).style.left = linkRealX[i];
    document.getElementById(strId).style.top = linkRealY[i];
    }
  }
