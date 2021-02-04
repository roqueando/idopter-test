import React, { useState } from "react";
import { View, ToastAndroid } from "react-native";
import { Header, Input, Text, Button } from "react-native-elements";
import { LoginView } from "./styled";
import api from "../../services/api";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("/login", {
        email,
        password,
      });

      await AsyncStorage.setItem("@fifatoken", data.Token);
      navigation.navigate("Winners");

      setLoading(false);
    } catch (error) {
      setLoading(false);

      return ToastAndroid.show(
        "Opa jogador, seu email e/ou senha estao errados.",
        ToastAndroid.SHORT
      );
    }
  };

  const checkIfAuthenticated = async () => {
    const token = await AsyncStorage.getItem("@fifatoken");
    if (token) {
      return navigation.navigate("Winners");
    }
  };
  useEffect(() => {
    checkIfAuthenticated();
  }, []);

  return (
    <View>
      <Header
        backgroundColor={"#badc58"}
        centerComponent={{
          text: "Fifawinners",
          style: {
            color: "#fff",
          },
        }}
      />

      <LoginView>
        <Text h1> Login</Text>
        <Input
          placeholder="Email"
          autoCompleteType="email"
          leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={(value) => setEmail(value)}
        />

        <Input
          placeholder="Senha"
          leftIcon={{ type: "font-awesome", name: "key" }}
          secureTextEntry
          onChangeText={(value) => setPassword(value)}
        />

        <Button
          title="Entrar"
          onPress={() => handleLogin()}
          buttonStyle={{
            backgroundColor: "#badc58",
          }}
          loading={loading}
          disabled={loading}
        />
      </LoginView>
    </View>
  );
}
