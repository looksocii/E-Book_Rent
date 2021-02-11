import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import axios from "axios";
import ipconfig from "../IPconfig";

const SignInScreen = (props) => {

  // รับค่า id ของ user และ id ของ book และค่าที่เลือกวัน (จากหน้า Rent)
  const id_user = props.navigation.state.params.id_user;
  const id_book = props.navigation.state.params.id_book;
  const selectedValue = props.navigation.state.params.selectedValue;
  const [book, setBook] = useState([]);

  // เมื่อกดปุ่ม My Books เพื่อดูหนังสือที่เช่ายืมไปแล้ว
  const getMyBooks = () => {
    const URL_mybooks = 'http://' + ipconfig + ':5000/getmybooks';
    const data = {
      "id_user": id_user,
    }
    axios.post(URL_mybooks, data)
      .then(res => {
        props.navigation.navigate("My_Book", { "id_user": id_user, "books": res.data })
      }).catch((er) => console.log(er.message))
  }

  // ฟังชั่นนี้จำทำงานเมื่อ Screen นี้ถูกเรียกใช้งาน ถูกสั่งใช้โดย useEffect
  const getBook = () => {
    const URL_books = 'http://' + ipconfig + ':5000/mybooks';
    axios({
      method: "get",
      url: URL_books,
    }).then((res) => {
      const books = res.data;
      setBook(books.find(book => book.book_id == id_book));
    }).catch((er) => console.log(er.message))
  }

  const onClickHome = () => {
    const URL_mybooks = 'http://' + ipconfig + ':5000/getmybooks';
    const data = {
      "id_user": id_user,
    }
    axios.post(URL_mybooks, data)
      .then(Response => {
        const Allbooks = Response.data;
        props.navigation.navigate("My_Book", { "id_user": id_user, "books": Allbooks });
        props.navigation.navigate("Home", { "id_user": id_user });
      }).catch((er) => console.log(er.message))
  }

  useEffect(() => {
    getBook();
    return () => { };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.logoContainer}>
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
      <View
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: "white",
          marginTop: -200,
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <Text style={styles.welcome}>Successfully</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image style={styles.book} source={{
            uri: book.img_book,
          }} />
          <View>
            <Text style={styles.direct}>{book.title}</Text>
            <Text style={styles.details}> By {book.author}</Text>
            <Text style={{ color: "red", fontWeight: "bold", marginTop: 10 }}>
              Available :
              <Text style={{ color: "black", fontWeight: "bold" }}>
                {selectedValue} Days
              </Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer2}
          onPress={getMyBooks}
        >
          <Text style={styles.buttonText2}>My Books</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={onClickHome}
        >
          <Text style={styles.buttonText1}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  },
  logo: {
    width: 70,
    height: 70,
    borderTopLeftRadius: 160,
    borderTopRightRadius: 160,
    borderBottomLeftRadius: 160,
    borderBottomRightRadius: 160,
    marginTop: -120,
    marginBottom: 10,
    left: 150,
  },
  details: {
    marginTop: 20,

    marginLeft: 0,
    marginRight: 0,
    fontWeight: "bold",
  },
  direct: {
    marginTop: 20,
    fontWeight: "bold",
    marginRight: 50,
    fontSize: 18,
  },
  book: {
    width: 100,
    height: 150,
    marginBottom: 50,
    marginRight: 30,
    marginLeft: 60,

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 50,
    color: "black",
  },
  buttonContainer2: {
    backgroundColor: "black",
    paddingVertical: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 300,
    marginTop: -30,
    marginBottom: 30,
  },
  buttonContainer: {
    backgroundColor: "black",
    paddingVertical: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 300,
    marginBottom: 120,
  },
  buttonText2: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonText1: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  iconBack: {
    marginTop: 70,
    paddingRight: 275,
    marginBottom: 30,
  },
});
export default SignInScreen;
