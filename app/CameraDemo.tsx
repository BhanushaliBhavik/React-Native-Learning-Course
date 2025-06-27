import { Camera, CameraView } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const [cameraType, setCameraType] = useState("back");
  const [flashMode, setFlashMode] = useState("off");
  const [mirrorMode, setMirrorMode] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      // console.log(cameraRef.current);
      
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
      
      setPhotoUri(photo.uri);
      setShowCamera(false); // close camera after taking photo
     
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!showCamera ? (
        <>
          <TouchableOpacity onPress={() => setShowCamera(true)} style={styles.button}>
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>

          {photoUri && (
            <Image source={ {uri: photoUri} } style={styles.imagePreview} />
          )}
        </>
      ) : (
        <CameraView style={styles.camera} ref={cameraRef} facing={cameraType} flash={flashMode} barcodeScannerSettings={{
    barcodeTypes: ["qr"],
  }} mirror={mirrorMode}
>
          <View style={styles.cameraControls}>
            <TouchableOpacity onPress={takePhoto} style={styles.button}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCameraType((prevType) => (prevType === 'back' ? 'front' : 'back'));
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Switch Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                
                setFlashMode((prevMode) => (prevMode === 'off' ? 'on' : 'off'));
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Toggle Flash</Text>
            </TouchableOpacity>
            {cameraType === 'front' && (
              <TouchableOpacity
                onPress={() => {
                  setMirrorMode((prevMode) => !prevMode);
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Toggle Mirror</Text>
              </TouchableOpacity>
            )}
            
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
