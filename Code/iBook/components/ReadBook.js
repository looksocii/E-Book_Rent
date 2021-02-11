import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";


const ReadBook = (props) => {
  return (
    <ScrollView style={styles.bodyContainer}>
      <Ionicons
        name="ios-arrow-back"
        size={40}
        color="black"
        style={styles.iconBack}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles.detail}>
        <Text style={styles.title}>{props.book.title}</Text>
        <Image style={styles.book} source={{
          uri: props.book.img_book,
        }} />
      </View>
      <View style={styles.prev_next}>
        <TouchableOpacity>
          <View style={styles.prev_nextContainer}>
            <Ionicons name="ios-arrow-back" size={32} color="black" />
            <Text style={styles.prev_text}>previous</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.prev_nextContainer}>
            <Text style={styles.next_text}>next</Text>
            <Ionicons name="ios-arrow-forward" size={32} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    paddingVertical: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",
    flexGrow: 1,
    flex: 1,
  },
  iconBack: {
    paddingLeft: 20,
    flex: 0.1,
  },
  detail: {
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 0.8,
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 15,
  },
  book: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
  },
  prev_next: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  next_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginRight: 10,
    marginTop: 2,
  },
  prev_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
    marginTop: 2,
  },
  prev_nextContainer: {
    marginHorizontal: 20,
    marginTop: 30,
    flexDirection: "row",
    flex: 0.05,
  },
});
export default ReadBook;