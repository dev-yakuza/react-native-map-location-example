import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import Styled from 'styled-components/native';
import Geolocation from 'react-native-geolocation-service';

import MapView from 'react-native-maps';

const Container = Styled.View`
  flex: 1;
`;

const Button = Styled.TouchableOpacity`
  position: absolute;
  background-color: red;
  bottom: 100px;
  left: 100px;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;
const Label = Styled.Text`
  color: white;
  font-weight: bold;
`;

interface ILocation {
  latitude: number;
  longitude: number;
}

const App = () => {
  const [location, setLocation] = useState<ILocation | undefined>(undefined);

  const setCurrentLocation = (): void => {
    Geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
  }, []);

  return (
    <Container>
      <MapView style={{flex: 1}} region={location} />
      <Button onPress={setCurrentLocation}>
        <Label>Test</Label>
      </Button>
    </Container>
  );
};

export default App;
