// bug.js
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View/>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{
      flex: 1,
    }}>
      <Camera style={{ flex: 1 }} type={type}>
        {/* Camera preview will be blank here if the bug occurs */}
      </Camera>
    </View>
  );
};

// bugSolution.js (Improved Camera Handling)
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Platform, View, Text } from 'react-native';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        setCameraError(error);
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View/>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (cameraError) {
    return <Text>Camera error: {cameraError.message}</Text>;
  }
  return (
    <View style={{
      flex: 1,
    }}>
      <Camera style={{ flex: 1 }} type={type} onError={(error) => setCameraError(error)}>
        </Camera>
    </View>
  );
};
export default App; 