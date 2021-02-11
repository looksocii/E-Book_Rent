import React, { useState } from "react";
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // เมื่อฟังชั่น SignIn() ทำงานและเมื่อเจอข้อมูล User ในฐานข้อมูลก็จะทำงานฟังชั่นนี้
  const getData = (user_id) => {
    const URL_mybooks = 'http://' + ipconfig + ':5000/getmybooks';
    const data = {
      "id_user": user_id,
    }
    axios.post(URL_mybooks, data)
      .then(Response => {
        const Allbooks = Response.data;

        // จะทำการส่งข้อมูล id ของ User ที่ sign in เข้ามา ส่งให้กับทุกหน้า
        // หน้า My_Book ส่ง หนังสือที่ User id นี้เคยเช่าแล้ว ไป
        props.navigation.navigate("My_Book", { "id_user": user_id, "books": Allbooks });
        props.navigation.navigate("Search", { "id_user": user_id });
        props.navigation.navigate("Home", { "id_user": user_id });

      }).catch((er) => console.log(er.message))
  }

  // เมื่อกดปุ่ม Sign In ฟังชั่นนี้จะทำงาน
  const SignIn = () => {
    if (username != '' && password != '') {
      axios.get('http://' + ipconfig + ':5000/useraccount')
        .then((res) => {
          const allUesr = res.data;
          const getUser = allUesr.filter(user => user.username == username && user.password == password);
          if (getUser.length > 0) {
            // และฟังชั่น getData() จะทำงาน
            getData(getUser[0].id);
            setUsername('');
            setPassword('');
          } else {
            Alert.alert(
              "Username or Password is Not correct.",
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
            console.log("Username or Password is Not correct.");
          }
        }).catch((er) => console.log(er.message))
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
      console.log("Username or Password is Not correct.");
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../images/iBook.png")} />
        </View>
        <View
          style={{
            paddingVertical: 30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: "white",
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="ios-arrow-back"
            size={40}
            color="black"
            style={styles.iconBack}
            onPress={() => {
              props.navigation.popToTop();
            }}
          />
          <Text style={styles.welcome}>Welcome</Text>
          <TextInput
            placeholder="Username"
            placeholderTextColor="rgba(19, 15, 64,0.5)"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(19, 15, 64,0.5)"
            returnKeyType="go"
            secureTextEntry
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={SignIn}
          >
            <Text style={styles.buttonText}>Sign In</Text>
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
    justifyContent: "center",
    marginBottom: 150,
    marginTop: 100,
  },
  logo: {
    width: 250,
    height: 250,
  },
  input: {
    height: 50,
    fontWeight: "bold",
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 30,
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
    marginRight: "30%",
  },
  buttonContainer: {
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
  iconBack: {
    marginRight: "70%",
    marginBottom: 4,
    marginLeft: 2,
  },
});
export default SignInScreen;
