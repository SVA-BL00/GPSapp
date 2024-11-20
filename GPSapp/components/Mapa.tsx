import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface LocationCoords {
    latitude: number;
    longitude: number;
}

interface MapaProps {
    showsTraffic: boolean;
}

interface Restaurant {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}  

export function Mapa({showsTraffic}: MapaProps){
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);

    const GOOGLE_PLACES_API_KEY = "";
    
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted'){
                console.log('Permiso de localización negado');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            if(location){
                const { latitude, longitude } = location.coords;
                const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${GOOGLE_PLACES_API_KEY}`;
        
                try {
                    const response = await axios.get(url);
                    const results = response.data.results;
                    const mappedRestaurants = results.map((place: any) => ({
                        id: place.place_id,
                        name: place.name,
                        latitude: place.geometry.location.lat,
                        longitude: place.geometry.location.lng,
                    }));
                    setRestaurants(mappedRestaurants);
                    } catch (error){
                    console.error("Error fetching restaurants:", error);
                    } finally {
                    setLoading(false);
                }
            }
            })();
        }, []);
        if(loading){
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
    
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
            {restaurants.map((restaurant) => (
                <Marker
                    key={restaurant.id}
                    coordinate={{
                        latitude: restaurant.latitude,
                        longitude: restaurant.longitude,
                    }}
                    title={restaurant.name}
                />
            ))}
        </MapView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        zIndex: 0,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});