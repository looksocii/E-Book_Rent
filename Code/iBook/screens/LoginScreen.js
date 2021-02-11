import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

const LoginScreen = (props) => {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View
        style={
          styles.logoContainer}
      >
        <Image style={styles.logo} source={require("../images/iBook.png")} />
      </View>
      <View
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: "white",

        }}
      >
        <View
          style={
            styles.buttonSignUP
          }
        >
          <TouchableOpacity
            onPress={() => { props.navigation.navigate("SignUp"); }}
          >
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
            >
              Sign Up
              </Text>
          </TouchableOpacity>
        </View>
        <View
          style={
            styles.buttonSignIn}
        >
          <TouchableOpacity
            onPress={() => { props.navigation.navigate("SignIn") }}
          >
            <Text
              style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
            >
              Sign In
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191927",
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
  buttonSignUP: {
    backgroundColor: "#191927",
    height: 70,
    marginHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  buttonSignIn: {
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
    borderWidth: 3,
    borderColor: "#191927",
    marginBottom: 50,
  },
});
export default LoginScreen;