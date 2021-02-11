import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";


const SearchBookItem = (props) => {
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
        <View style={{ flex: 1, flexDirection: "row", alignItems: "baseline" }}>
          <TextInput
            placeholder="Search..."
            placeholderTextColor="rgba(19, 15, 64,0.5)"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onChangeText={(text) => props.setTxt(text)}
          />
          <TouchableOpacity onPress={props.submitSearch}>
            <FontAwesome
              name="search"
              size={30}
              color="gray"
              style={{ flex: 0.1 }}
            />
          </TouchableOpacity>
        </View>
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
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("BookDetail", { "id_user": props.navigation.state.params.id_user, "id_book": book.book_id });
                    }}
                  >
                    <View style={styles.SelectContainer}>
                      <Text style={styles.Select}>Select</Text>
                      <Ionicons
                        name="ios-arrow-forward"
                        size={20}
                        color="white"
                        style={{ marginTop: 2 }}
                      />
                    </View>
                  </TouchableOpacity>
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
  input: {
    height: 50,
    fontWeight: "bold",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: 15,
    borderColor: "#191927",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 300,
    fontSize: 16,
    flex: 0.9,
    marginRight: 10,
  },
});
export default SearchBookItem;
