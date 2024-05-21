import React from "react";
import { Redirect } from "expo-router";

const HomeScreen = () => {
  return <Redirect href={"/(auth)/login"} />;
  // return <Redirect href={"/(home)/(tabs)"} />;
};

export default HomeScreen;
