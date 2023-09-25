import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system';

export default function App() {

  const [image, setImage] = useState("");

  const upload = async (uri) => {
    console.log("upload-F:", uri);

    var formdata = new FormData();
    formdata.append("photos", uri, "product.png");

    var ImageRequestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `http://192.168.8.118:3000/api/upload`,
      ImageRequestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
      upload(result.assets[0].uri);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <TouchableOpacity style={styles.imageHolder} onPress={pickImage}>
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.imageHolder} onPress={pickImage}>
            <AntDesign name="pluscircle" size={50} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: 250,
    backgroundColor: "#rrr",
    borderRadius: 10,
    elevation: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  imageHolder: {
    height: 200,
    width: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#rrr",
    borderRadius: 10,
    elevation: 5,
  },
});
