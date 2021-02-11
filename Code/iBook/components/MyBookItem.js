import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const DateDiff = require('date-diff');


const MyBookItem = (props) => {

  // กำหนดวันที่ปัจจุบันเพื่อเอาไปเปรียบเทียบกับข้อมูล
  const timeElapsed = Date.now();
  const date = new Date(timeElapsed);

  // ถ้าเช็คแล้วยังสามารถอ่านได้ก็จะแสดงปุ่ม Read
  const returnButtom = (book_id) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("ReadBook", { "id_user": props.navigation.state.params.id_user, "id_book": book_id });
        }}
      >
        <View style={styles.SelectContainer}>
          <Text style={styles.Select}>Read</Text>
          <Ionicons
            name="ios-arrow-forward"
            size={20}
            color="white"
            style={{ marginTop: 2 }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.bodyContainer}>
      <Ionicons
        name="ios-arrow-back"
        size={40}
        color="black"
        style={styles.iconBack}
        onPress={() => {
          props.navigation.navigate("Home");
        }}
      />
      <View style={{ alignItems: "center" }}>
        {
          props.books.map(book => {
            return (
              <View style={styles.itemContainer}>
                <Image
                  style={styles.frontBook}
                  source={{
                    uri: book.img_book,
                  }}
                />
                <View style={styles.detail}>
                  <Text style={styles.Title}>{book.title}</Text>
                  {
                    // แสดงวันที่เหลือที่สามารถอ่านหนังสือเล่นนี้ได้ หรือ แสดงว่าหมดอายุแล้ว (Expired)
                    Math.trunc(new DateDiff(new Date(book.exp_date), date).days()) > 0 ?
                      <Text style={styles.Available}>Available: {(Math.trunc(new DateDiff(new Date(book.exp_date), date).days()) + 1)}day left</Text> :
                      <Text style={styles.Available}>Expired.</Text>
                  }
                  {
                    // ถ้าหนังสือยังไม่หมดอายุอ่านก็จะทำงาน returnButtom()
                    Math.trunc(new DateDiff(new Date(book.exp_date), date).days()) > 0 ? returnButtom(book.book_id) : <Text style={styles.Available}></Text>
                  }
                </View>
              </View>
            )
          })
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    width: 300,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: "black",
    marginLeft: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  frontBook: {
    flex: 0.6,
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 15,
  },
  Title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  bodyContainer: {
    paddingVertical: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",
    flexGrow: 1,
  },
  iconBack: {
    paddingLeft: 20,
    marginBottom: 5,
  },
  detail: {
    flex: 0.4,
    flexDirection: "column",
    marginLeft: 5,
    marginTop: 60,
  },
  Available: {
    color: "white",
    fontSize: 12,
  },
  Select: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginRight: 10,
  },
  SelectContainer: {
    marginLeft: 20,
    marginTop: 40,
    flexDirection: "row",
  },
});
export default MyBookItem;
