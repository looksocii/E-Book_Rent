import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';


const ProfileUser = (props) => {
  let [selectedImage, setSelectedImage] = React.useState(null);
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  return (
    <View style={styles.bodyContainer}>
      <Ionicons
        name="ios-arrow-back"
        size={40}
        color="black"
        style={styles.iconBack}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={{ alignItems: "center" }}>
        <Image source={selectedImage === null ? {
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzCb4DonWw5pT1-A3Su9HzG6TTN4nMOmj7tg&usqp=CAU'
        } : { uri: selectedImage.localUri }
        } style={styles.logo} />
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.buttonContainer1}>
          <Text style={styles.buttonText1}>Add photo</Text>
        </TouchableOpacity>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Name: {props.user.firstname} {props.user.lastname}</Text>
          <Text style={styles.detailText}>Phone: {props.user.phone}</Text>
          <Text style={styles.detailText}>Email: {props.user.email}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Home");
          }}
        >
          <View style={styles.buttonContainer2}>
            <Text style={styles.buttonText}>
              Save
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("SignIn");
          }}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  bodyContainer: {
    paddingVertical: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",
    flexGrow: 1,
  },
  iconBack: {
    paddingLeft: 20,
    marginBottom: 5,
  },
  logo: {
    width: 280,
    height: 250,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  thumbnail: {
    width: 300,
    height: 300,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  ImageProfile: {
    width: "50%",
    height: 250,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
  },
  buttonContainer: {
    backgroundColor: "black",
    paddingVertical: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 20,
    width: 300,
  },
  buttonContainer1: {
    backgroundColor: "#9B908E",
    paddingVertical: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 30,
    width: 100,
  },
  buttonContainer2: {
    backgroundColor: "black",
    paddingVertical: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 300,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonText1: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
  },
  detail: {
    textAlign: 'left',
    alignContent: "space-between",
    flexDirection: "column",
    paddingVertical: 50,
  },
  detailText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
  }
});
export default ProfileUser;
