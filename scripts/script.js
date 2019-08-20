//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
// TouchGestureModule - https://developers.facebook.com/docs/ar-studio/reference/classes/touchgesturesmodule/ 
//==============================================================================


const Scene = require('Scene');
const TouchGestures = require('TouchGestures');

const interaction = Scene.root.find('interaction');
const interactionTransform = interaction.transform;

// PAN to move position
TouchGestures.onPan(interaction).subscribe(function (gesture) {
    // Translate the position of the finger on the screen to the plane's
    // co-ordinate system
    const gestureTransform = Scene.unprojectToFocalPlane(gesture.location);  
    // Update the position of the plane
    interactionTransform.x = gestureTransform.x.div(2);
    interactionTransform.y = gestureTransform.y.div(2);
  
  });

// Pinch to scale 

// Subscribe to pinch gestures on the plane
TouchGestures.onPinch(interaction).subscribe(function (gesture) {

    // Store the last known x and y-axis scale values of the plane
    const lastScaleX = interactionTransform.scale.x.pinLastValue();
    const lastScaleY = interactionTransform.scale.y.pinLastValue();
  
    // Update the scale of the plane by multiplying the last known scale with the
    // scale returned by the gesture
    interactionTransform.scaleX = gesture.scale.mul(lastScaleX);
    interactionTransform.scaleY = gesture.scale.mul(lastScaleY);
  
  });

  // Rotate 
  TouchGestures.onRotate(interaction).subscribe(function (gesture) {

    // Store the last known z-axis rotation value of the plane
    const lastRotationX = interactionTransform.rotationX.pinLastValue();
    const lastRotationY = interactionTransform.rotationY.pinLastValue();
    const lastRotationZ = interactionTransform.rotationZ.pinLastValue();
  
    // Update the z-axis rotation of the plane by adding the gesture rotation and
    // multiply it by -1 to have it rotate in the correct direction
    interactionTransform.rotationX = gesture.rotation.mul(-1).add(lastRotationX);
    interactionTransform.rotationY = gesture.rotation.mul(-1).add(lastRotationY);
    interactionTransform.rotationZ = gesture.rotation.mul(-1).add(lastRotationZ);
  
  });