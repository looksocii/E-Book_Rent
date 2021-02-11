import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";


const BookItem = (props) => {
  return (
    <View style={styles.bodyContainer}>
      {
        // map ครั้งแรกโดย map จากข้อมูลประเภทหนังสือออกมา
        props.Category.map(cat => {
          return (
            <View>
              <Text style={styles.categoryHeader}>{cat.content}</Text>
              <View style={styles.categoryContainer}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={200}
                  decelerationRate="fast"
                  pagingEnabled
                >
                  {
                    // map ครั้งสองโดย map จากข้อมูลหนังสือทั้งหมดออกมา
                    // และ filter เอาแต่หนังสือที่มีประเภทหนังสือตรงกับ ประเภทหนังสือที่ map ครั้งแรกมา
                    props.books.filter(book => book.content.includes(cat.content)).map(book => {
                      return (
                        <TouchableOpacity
                          onPress={() => { props.navigation.navigate("BookDetail", { "id_user": props.navigation.state.params.id_user, "id_book": book.book_id }); }}
                        >
                          <View style={styles.itemContainer}>
                            <Image
                              style={styles.frontBook}
                              source={{
                                uri: book.img_book,
                              }}
                            />
                            <Text style={styles.Title}>{book.title}</Text>
                          </View>
                        </TouchableOpacity>
                      )
                    })
                  }
                </ScrollView>
              </View>
            </View>
          );
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  categoryHeader: {
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
    paddingLeft: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "nowrap",
  },
  itemContainer: {
    width: 200,
    paddingVertical: 22,
    borderRadius: 20,
    backgroundColor: "black",
    marginLeft: 15,
    marginBottom: 15,
  },
  frontBook: {
    width: '100%',
    height: 250,
    resizeMode: "contain",
    marginBottom: 15,
  },
  Title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  bodyContainer: {
    paddingVertical: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",
    flexGrow: 1,
  },
});
export default BookItem;