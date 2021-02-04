import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";

export default function LogoutButton({ navigation }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("@fifatoken");
    navigation.navigate("Login");
  };
  return (
    <Button
      type="clear"
      title="Voltar"
      color="#333"
      onPress={() => handleLogout()}
    />
  );
}
