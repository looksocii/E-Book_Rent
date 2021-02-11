import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MyBookItem from "../components/MyBookItem";


const MyBookScreen = (props) => {

  // รับค่า id ของ user และ id ของ book (จากหน้า Home และ หน้า Payment)
  const id_user = props.navigation.state.params.id_user;
  const books = props.navigation.state.params.books;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.Header}>My books</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Profile", { "id_user": id_user });
          }}
        >
          <Image
            style={styles.logo}
            source={require("../images/Profile.jpg")}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <MyBookItem navigation={props.navigation} books={books} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191927",
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
  },
  logo: {
    width: 60,
    height: 60,
    borderTopLeftRadius: 160,
    borderTopRightRadius: 160,
    borderBottomLeftRadius: 160,
    borderBottomRightRadius: 160,
    marginVertical: 25,
    marginRight: 10,
  },
  Header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 30,
    marginTop: 30,
    paddingLeft: 20,
  },
});
export default MyBookScreen;
