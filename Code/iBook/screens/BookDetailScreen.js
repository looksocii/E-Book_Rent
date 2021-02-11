import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import ipconfig from "../IPconfig";
const DateDiff = require('date-diff');


const BookDetailScreen = (props) => {

  // รับค่า id ของ user และ id ของ book (ส่งมาจากหน้า Home และ หน้า My_Book)
  const id_user = props.navigation.state.params.id_user;
  const id_book = props.navigation.state.params.id_book;

  const [book, setBook] = useState([]);
  const [cheak, setCheak] = useState(false);

  // ฟังชั่นนี้จำทำงานเมื่อ Screen นี้ถูกเรียกใช้งาน ถูกสั่งใช้โดย useEffect
  // ฟังชั่นนี้จะดึงข้อมูลมาและเช็คว่าหนังสือเล่มนี้ ถูกเช่าแล้วและถ้ายังไม่หมดอายุก็จะแสดงปุ่ม Read, ถ้ายังไม่เคยเช่าหรือหมดอายุแล้วจะแสดงปุ่มให้เช่าใหม่ (Rent This Book)
  const getBook = () => {
    const URL_mybooks = 'http://' + ipconfig + ':5000/getmybooks';
    const URL_allbooks = 'http://' + ipconfig + ':5000/mybooks';
    const data = {
      "id_user": id_user,
    }
    axios.post(URL_mybooks, data)
      .then(res => {
        const books = res.data;
        if (books.find(book => book.book_id == id_book)) {

          // เมื่อเช็คเจอว่าเคยเช่าหนังสือเล่มนี้แล้ว
          setBook(books.find(book => book.book_id == id_book));
          const timeElapsed = Date.now();
          const date = new Date(timeElapsed);
          const diff = Math.trunc(new DateDiff(new Date(books.find(book => book.book_id == id_book).exp_date), date).days())

          // เช็คว่าหนังสือเล่มนั้นที่เคยเช่าหมดอายุแล้วหรือยัง
          if (diff > 0) {
            setCheak(true);
          } else {
            setCheak(false);
          }
        } else {

          // เมื่อเช็คแล้วไม่เจอว่าเคยเช่า
          axios({
            method: "get",
            url: URL_allbooks,
          }).then((res) => {
            const Allbooks = res.data;
            setBook(Allbooks.find(book => book.book_id == id_book));
            setCheak(false);
          }).catch((er) => console.log(er.message))
        }
      }).catch((er) => console.log(er.message))
  }

  useEffect(() => {
    getBook();
    return () => { };
  }, []);

  // ฟังชั่นนี้จะ return ปุ่ม Read,  Rent This Book
  const returnButtom = () => {
    if (cheak) {
      return (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            props.navigation.navigate("ReadBook", { "id_user": id_user, "id_book": book.book_id });
          }}
        >
          <Text style={styles.buttonText}>Read</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            props.navigation.navigate("Rent", { "id_user": id_user, "id_book": book.book_id });
          }}
        >
          <Text style={styles.buttonText}>Rent This Book</Text>
        </TouchableOpacity>
      );
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.Header}>About Book</Text>
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
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingVertical: 15,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: "white",
            alignItems: "center",
            flexGrow: 1,
            height: 900,
            justifyContent: "center",
            flex: 0.8,
            paddingBottom: 150,
          }}
        >
          <Ionicons
            name="ios-arrow-back"
            size={40}
            color="black"
            style={styles.iconBack}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
          <Image style={styles.book} source={{
            uri: book.img_book,
          }} />
          <Text style={styles.welcome}>{book.title}</Text>
          <Text style={styles.direct}> By {book.author}</Text>
          <Text style={styles.details}>
            {book.short_title}
          </Text>

          {/* เรียกใช้ฟังชั่น returnButtom โดยจะมีปุ่ม 2 แบบแต่จะแสดงแค่ปุ่มเดียว */}
          {returnButtom()}

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191927",
    paddingVertical: 0,

  },
  Header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 30,
    marginTop: 50,
    paddingLeft: 20,
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    marginTop: 60,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 40,
    borderTopLeftRadius: 160,
    borderTopRightRadius: 160,
    borderBottomLeftRadius: 160,
    borderBottomRightRadius: 160,
    marginVertical: 25,
    marginRight: 10,
  },
  details: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  direct: {
    fontWeight: "bold",
  },
  book: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 30,
    width: '100%',
    height: 400,
    resizeMode: "contain",
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
    fontSize: 36,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "black",
  },
  buttonContainer: {
    backgroundColor: "black",
    marginTop: 20,
    paddingVertical: 15,
    marginBottom: 20,
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
    paddingRight: 330,
    marginTop: 130,
    marginLeft: 20,
  },
});
export default BookDetailScreen;
