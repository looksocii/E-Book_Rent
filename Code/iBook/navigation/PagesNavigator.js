import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs"
import LoginScreen from "../screens/LoginScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import IndexScreen from "../screens/IndexScreen";
import MyBookScreen from '../screens/MyBookScreen';
import SearchScreen from '../screens/SearchScreen';
import { Ionicons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import BookDetailScreen from "../screens/BookDetailScreen";
import PaymentScreen from "../screens/PaymentScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RentScreen from "../screens/RentScreen";
import ReadBookScreen from "../screens/ReadBookScreen";


const BookTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: IndexScreen,
      navigationOptions: {
        headerShown: false,
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="ios-home" size={20} color="white" />;
        },
      }
    },
    My_Book: {
      screen: MyBookScreen,
      navigationOptions: {
        tabBarLabel: 'My books',
        tabBarIcon: (tabInfo) => {
          return <AntDesign name="book" size={20} color="white" />;
        },
      },
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <MaterialCommunityIcons name="book-search-outline" size={20} color="white" />;
        },
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "white",
      labelStyle: { fontSize: 14, fontWeight: "bold" },
      style: { backgroundColor: "#000", height: 50, borderRadius: 15, marginBottom: -3, },
    },
  }
);

const CombineNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Payment: {
      screen: PaymentScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    BookDetail: {
      screen: BookDetailScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ReadBook: {
      screen: ReadBookScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
    Rent: {
      screen: RentScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
    Tabs: {
      screen: BookTabNavigator,
      navigationOptions: {
        headerShown: false,
      },
    },
  }
);

export default createAppContainer(CombineNavigator);