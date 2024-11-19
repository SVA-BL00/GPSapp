import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

interface LocationCoords {
    latitude: number;
    longitude: number;
}

export function Mapa() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permiso de localización negado');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        })();
    }, []);

    return (
        <MapView
            style={{ flex: 1 }}
            region={{
            latitude: location?.coords.latitude || 37.78825,
            longitude: location?.coords.longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
        >
        {location && (
            <Marker
            coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }}
            title="Mi ubicación"
            />
        )}
        </MapView>
    );
};