import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image
} from "react-native";
import ReadBook from "../components/ReadBook";
import axios from "axios";
import ipconfig from "../IPconfig";


const ReadBookScreen = (props) => {

  // รับค่า id ของ user และ id ของ book (ส่งมาจากหน้า BookDetail)
  const id_user = props.navigation.state.params.id_user;
  const id_book = props.navigation.state.params.id_book;

  const [book, setBook] = useState([]);

  // ฟังชั่นนี้จำทำงานเมื่อ Screen นี้ถูกเรียกใช้งาน ถูกสั่งใช้โดย useEffect
  const getBook = () => {
    const URL_books = 'http://' + ipconfig + ':5000/mybooks';
    axios.get(URL_books)
      .then((res) => {
        const books = res.data;
        setBook(books.find(bookk => bookk.book_id == id_book));
      }).catch((er) => console.log(er.message))
  }

  useEffect(() => {
    getBook();
    return () => { };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
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
      <ReadBook navigation={props.navigation} book={book} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191927",
  },
  headerContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  logo: {
    width: 60,
    marginTop: 90,
    height: 60,
    borderTopLeftRadius: 160,
    borderTopRightRadius: 160,
    borderBottomLeftRadius: 160,
    borderBottomRightRadius: 160,
    marginVertical: 25,
    marginRight: 10,
  },
});

export default ReadBookScreen;