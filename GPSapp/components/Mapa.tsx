import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { StyleSheet } from 'react-native';

interface LocationCoords {
    latitude: number;
    longitude: number;
}

interface MapaProps {
    showsTraffic: boolean;
}

export function Mapa({showsTraffic}: MapaProps) {
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
            style={styles.container}
            region={{
            latitude: location?.coords.latitude || 37.78825,
            longitude: location?.coords.longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
            showsTraffic={showsTraffic}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        zIndex: 0,
    }
});