import React from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
 
const ImageCapture = (props) => {
  const handleTakePhotoAnimationDone = (dataUri) => {
    // Do stuff with the photo...
    console.log('takePhoto');
    props.image(dataUri);
  }
  const handleCameraError = (error) => {
    console.log('handleCameraError', error);
  }
  return (
    <Camera
      onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
      onCameraError = { (error) => { handleCameraError(error); } }
      idealFacingMode = {FACING_MODES.ENVIRONMENT}
      idealResolution = {{width: 640, height: 480}}
      imageType = {IMAGE_TYPES.JPG}
      imageCompression = {0.97}
      isMaxResolution = {true}
      isImageMirror = {false}
      isSilentMode = {false}
      isDisplayStartCameraError = {true}
      isFullscreen = {false}
      sizeFactor = {1}
    />
  );
}
 
export default ImageCapture;