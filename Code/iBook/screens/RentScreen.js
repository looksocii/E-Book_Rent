import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import ipconfig from "../IPconfig";

const RentScreen = (props) => {

  // รับค่า id ของ user และ id ของ book (ส่งมาจากหน้า Home และ หน้า My_Book)
  const id_user = props.navigation.state.params.id_user;
  const id_book = props.navigation.state.params.id_book;

  const [book, setBook] = useState([]);

  // เลือกวันที่จะเช่า ถูกตั้งค่าไว้ว่า เช่า 7 วัน
  const [selectedValue, setSelectedValue] = useState("7");

  // ฟังชั่นนี้จะทำงานก็ต่อเมื่อกดปุ่ม Rent Book
  const SubmitRent = () => {
    // ฟังชั่นที่ใช้บวกเพิ่มวันที่
    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }

    // ดึงวันที่ปัจจุบันมา
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const exp_dateNew = today.addDays(parseInt(selectedValue));

    // คำนวณราคาทั้งหมดที่เช่าถ้าเลือกวันอื่นราคาก็จะเปลี่ยนไปด้วย
    const total_price = parseInt(book.price_rent) * parseInt(selectedValue);
    const data = {
      "date_time": today,
      "exp_date": exp_dateNew,
      "total_price": total_price,
      "useraccount_id": id_user,
      "booklist_id": id_book
    }
    axios.post('http://' + ipconfig + ':5000/rentbook', data)
      .then(res => {
        // เมื่อเพิ่มข้อมูลการเช่าหนังสือไปแล้วจะเด้งไปหน้า Payment และส่งค่าที่เลือกไปด้วย
        props.navigation.navigate("Payment", { "id_user": id_user, "id_book": id_book, "selectedValue": selectedValue });
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

  useEffect(() => {
    getBook();
    return () => { };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.Header}>Payment</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Profile", { "id_user": id_user });
          }}
        >
          <Image style={styles.logo} source={require("../images/Profile.jpg")} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: "white",
          marginTop: 0,
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <Ionicons name="ios-arrow-back" size={40} color="black" style={styles.iconBack}
          onPress={() => { props.navigation.navigate("BookDetail", { "id_user": id_user, "id_book": id_book }); }}
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Image style={styles.book} source={{
            uri: book.img_book,
          }} />
          <View>
            <Text style={styles.direct}>{book.title}</Text>
            <Text style={styles.details}> By {book.author}</Text>
            <Text style={{ color: 'red', fontWeight: "bold", marginTop: 70, }}>
              Available :
        </Text>
            <Picker
              selectedValue={selectedValue}
              style={styles.pickerContainer}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="7 Day" value="7" />
              <Picker.Item label="10 Day" value="10" />
              <Picker.Item label="30 Day" value="30" />
            </Picker>
            <Text style={{ color: 'red', fontWeight: "bold", marginTop: -20, }}>
              Total Price :{" "}
              <Text style={{ color: 'black', fontWeight: "bold" }}>
                {parseInt(book.price_rent) * parseInt(selectedValue)} Baht.
        </Text>
            </Text>
          </View>
        </View>
        <View>
        </View>
        <Text style={styles.welcome}>Choose payment</Text>
        <View style={{ flex: 1, flexDirection: 'row', paddingTop: 50, }}>
          <Image style={styles.payment1} source={require("../images/paypal.png")} />
          <View>
            <Image style={styles.payment2} source={require("../images/master.png")} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={SubmitRent}
        >
          <Text style={styles.buttonText}>Rent Book</Text>
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
  Header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 10,
    marginTop: 60,
    paddingLeft: 20,
  },
  headerContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  logo: {
    width: 60,
    height: 60,
    borderTopLeftRadius: 160,
    borderTopRightRadius: 160,
    borderBottomLeftRadius: 160,
    borderBottomRightRadius: 160,
    marginTop: 50,
    marginVertical: 25,
    marginRight: 10,
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
    marginTop: 20,
    marginBottom: 150,
    marginLeft: 40,
    marginRight: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  payment1: {
    width: 80,
    height: 80,
    margin: 35,
    marginBottom: 50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  payment2: {
    width: 120,
    height: 80,
    margin: 35,
    marginBottom: 50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
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
    fontSize: 21,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 170,
    marginBottom: -30,
    color: "black",
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
    marginTop: 40,
    paddingRight: 275,
    marginBottom: 30,
  },
  pickerContainer: {
    marginTop: -115,
    marginLeft: 60,
  },
});
export default RentScreen;