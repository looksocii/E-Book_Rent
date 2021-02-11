import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import BookItem from "../components/BookItem";
import axios from "axios";
import ipconfig from "../IPconfig";

const IndexScreen = (props) => {
  const id_user = props.navigation.state.params.id_user; // รับ id ของ user ที่ sing in เข้ามา (ถูกส่งมาจากหน้า Sign In)
  const [allBook, setAllBook] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  // ฟังชั่นนี้จำทำงานเมื่อ Screen นี้ถูกเรียกใช้งาน ถูกสั่งใช้โดย useEffect
  const getData = () => {
    const URL_books = 'http://' + ipconfig + ':5000/mybooks';
    const URL_categorys = 'http://' + ipconfig + ':5000/category';

    // ดึงข้อมูลหนังสือทั้งหมด
    axios({
      method: "get",
      url: URL_books,
    }).then((res) => {
      setAllBook(res.data);
    }).catch((er) => console.log(er.message))

    // ดึงข้อมูลประเภทหนังสือทั้งหมด
    axios({
      method: "get",
      url: URL_categorys,
    }).then((res) => {
      setAllCategory(res.data);
    }).catch((er) => console.log(er.message))
  }

  useEffect(() => {
    getData();
    return () => { };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.Header}>Select your books</Text>
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
        {/* ส่งข้อมูลหนังสือและประเภทหนังสือทั้งหมดไปให้ BookItem (Component) mapping และ rander ออกมา*/}
        <BookItem navigation={props.navigation} books={allBook} Category={allCategory} />
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
    marginTop: 35,
    flexDirection: "row",
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

export default IndexScreen;
