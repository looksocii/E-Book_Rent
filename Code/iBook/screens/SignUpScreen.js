import React, { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import ipconfig from "../IPconfig";


const SignInScreen = (props) => {
  const [alluser, setAlluser] = useState([]);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLstname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [conpassword, setConpassword] = useState('');

  // ฟังชั่นนี้จะทำงานก็ต่อเมื่อกดปุ่ม Sign Up
  const SubmitSignUp = () => {
    if (firstname=="" && lastname=="" && username=="" && email=="" && phone=="" && password=="" && conpassword=="") {
      Alert.alert(
        "Please check required filed.",
        ""
        [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
    else if (password == conpassword) {
      if (firstname != "" &&
        lastname != "" &&
        email != "" &&
        phone != "" &&
        password != "" &&
        username != ""
      ) {
        if (alluser.filter(user => user.username == username).length > 0) {
          Alert.alert(
            "Please try another username.",
            ""
            [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
        } else {
          const data = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "phone": phone,
            "password": password,
            "username": username,
          }
          axios.post('http://' + ipconfig + ':5000/signup', data)
            .then(res => {
              Alert.alert(
                "Signup Success.",
                ""
                [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
              console.log('add complete');
              props.navigation.navigate("Login"); //เมื่อสมัครเสร็จจะเด้งไปหน้าแรกอีกครั้ง
            }).catch((er) => console.log(er.message))
        }
      } else {
        Alert.alert(
          "Please check required filed.",
          ""
          [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      }
    }
    else {
      Alert.alert(
        "Password don't match.",
        ""
        [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
  }

  // เพิ่มรูปภาพโปรไฟล์
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  }

  const getUserAll = () => {
    axios.get('http://' + ipconfig + ':5000/useraccount')
      .then((res) => {
        setAlluser(res.data);
      }).catch((er) => console.log(er.message))
  }

  useEffect(() => {
    getUserAll();
    return () => { };
  }, []);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../images/iBook.png")} />
        </View>
        <View
          style={{
            marginTop: 30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: "white",
            marginTop: -40,
            alignItems: "center",
            height: 720,
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <Ionicons name="ios-arrow-back" size={40} color="black" style={styles.iconBack}
            onPress={() => { props.navigation.popToTop() }}
          />
          <Text style={styles.welcome}>Create Account</Text>
          <TextInput
            placeholder="Firstname"
            placeholderTextColor="rgba(19, 15, 64,0.5)"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onChangeText={(text) => setFirstname(text)}
          />
          <TextInput
            placeholder="Lastname"
            placeholderTextColor="rgba(19, 15, 64,0.5)"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onChangeText={(text) => setLstname(text)}
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor="rgba(19, 15, 64,0.5)"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="rgba(19, 15, 64,0.5)"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="rgba(19, 15, 64,0.5)"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onChangeText={(text) => setPhone(text)}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(19, 15, 64,0.5)"
            returnKeyType="go"
            secureTextEntry
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            placeholder="ConfirmPassword"
            placeholderTextColor="rgba(19, 15, 64,0.5)"
            returnKeyType="go"
            secureTextEntry
            style={styles.input}
            onChangeText={(text) => setConpassword(text)}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={SubmitSignUp}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
            <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}></TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191927",
  },

  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    marginTop: 40,
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  input: {
    height: 50,
    fontWeight: "bold",
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 15,
    paddingHorizontal: 20,
    borderColor: "#191927",
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: 300,
    fontSize: 16,
  },
  welcome: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 30,
    color: "black",
    paddingRight: 50,
  },
  buttonContainer: {
    backgroundColor: "black",
    paddingVertical: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 300,
    marginBottom: 50,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  iconBack: {
    paddingRight: 275,
    marginBottom: 20,
    marginTop: 20,
    marginRight: 30,
  },
});
export default SignInScreen;