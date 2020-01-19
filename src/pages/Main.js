import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";

export default function Main() {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    const loadInitialPosition = async () => {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    };

    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <MapView initialRegion={currentRegion} style={styles.map}>
      <Marker coordinate={{ latitude: -23.6374516, longitude: -46.6995227 }}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://avatars1.githubusercontent.com/u/19496542?v=4"
          }}
        />

        <Callout>
          <View style={styles.callout}>
            <Text style={styles.devName}>Luisito</Text>
            <Text style={styles.devBio}>
              In love with Engineering, Science🧪 and Math🧮
            </Text>
            <Text style={styles.devTechs}>ReactJS, React Native, Node.js</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#7d40e7"
  },

  callout: {
    width: 260
  },

  devName: {
    fontWeight: "bold",
    fontSize: 16
  },

  devBio: {
    color: "#666",
    marginTop: 5
  },

  devTechs: {
    marginTop: 5
  }
});
