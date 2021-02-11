import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar
} from "react-native";
import ProfileUser from "../components/ProfileUser";
import axios from "axios";
import ipconfig from "../IPconfig";


const ProfileScreen = (props) => {

  // รับค่า id ของ user (จากหน้าทุกหน้าที่เรียก หน้า Profile)
  const id_user = props.navigation.state.params.id_user;
  const [dataUser, setDataUser] = useState([]);

  // ฟังชั่นนี้จำทำงานเมื่อ Screen นี้ถูกเรียกใช้งาน ถูกสั่งใช้โดย useEffect
  const getUser = () => {
    const URL_users = 'http://' + ipconfig + ':5000/useraccount';
    axios({
      method: "get",
      url: URL_users,
    }).then((res) => {
      const allUesr = res.data;
      setDataUser(allUesr.find(user => user.id == id_user));
    }).catch((er) => console.log(er.message))
  }

  useEffect(() => {
    getUser();
    return () => { };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.Header}>My profile</Text>
      </View>
      <ProfileUser navigation={props.navigation} user={dataUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191927",
  },
  headerContainer: {
    marginTop: 40,
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
export default ProfileScreen;
