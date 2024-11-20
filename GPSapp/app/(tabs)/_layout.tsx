import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { Mapa } from '@/components/Mapa';

export default function TabLayout() {
  const [showTraffic, setShowTraffic] = useState(false);

  return (
    <View style={styles.container}>
      <Mapa showsTraffic={showTraffic} />
      
      <TouchableOpacity
        onPress={() => setShowTraffic(!showTraffic)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {showTraffic ? "Disable Traffic" : "Enable Traffic"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    zIndex: 1,
    backgroundColor: '#5b5bc2',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});