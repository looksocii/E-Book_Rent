import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SearchBookItem from "../components/SearchBookItem";
import axios from "axios";
import ipconfig from "../IPconfig";

const SearchScreen = (props) => {

  // รับค่า id ของ user (จากหน้าทุกหน้าที่เรียก หน้า Sign In)
  const id_user = props.navigation.state.params.id_user;

  const [books, setBooks] = useState([]);
  const [txt, setTxt] = useState('');

  // ฟังชั่นนี้จำทำงานเมื่อ Screen นี้ถูกเรียกใช้งาน ถูกสั่งใช้โดย useEffect
  const getBooks = () => {
    const URL_books = 'http://' + ipconfig + ':5000/mybooks';
    axios({
      method: "get",
      url: URL_books,
    }).then((res) => {
      const dataBook = res.data;
      setBooks(dataBook);
    }).catch((er) => console.log(er.message))
  }

  // เมื่อกดปุ่มค้นหาฟังชั่นนี้จะทำงาน
  const submitSearch = () => {
    if (txt == '') {
      getBooks();
    }
    setBooks(books.filter(book => book.title.toLowerCase().includes(txt.toLowerCase())));
  }

  useEffect(() => {
    getBooks();
    return () => { };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.Header}>Search</Text>
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
        <SearchBookItem navigation={props.navigation} books={books} setTxt={setTxt} submitSearch={submitSearch} />
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
export default SearchScreen;
