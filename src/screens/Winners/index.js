import React, { useEffect, useState } from "react";
import { FlatList, ToastAndroid, SafeAreaView } from "react-native";
import { ListItem, Header } from "react-native-elements";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogoutButton from "../../components/LogoutButton";

export default function Winners({ navigation }) {
  const [winners, setWinners] = useState([]);

  const keyExtractor = (_item, index) => index.toString();
  const fetchWinners = async () => {
    try {
      const token = await AsyncStorage.getItem("@fifatoken");
      const { data } = await api.get("/winners", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWinners(data.winners);
    } catch (err) {
      navigation.navigate("Login");
      return ToastAndroid.show(
        "Opa jogador, necessario fazer login novamente",
        ToastAndroid.SHORT
      );
    }
  };

  const renderWinner = (winner) => {
    return (
      <ListItem
        containerStyle={{
          marginBottom: 10,
        }}
      >
        <ListItem.Content>
          <ListItem.Title>Team {winner.item.country} </ListItem.Title>
          <ListItem.Subtitle> at {winner.item.year} </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };
  useEffect(() => {
    fetchWinners();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Header
        backgroundColor={"#badc58"}
        leftComponent={<LogoutButton navigation={navigation} />}
      />
      <FlatList
        keyExtractor={keyExtractor}
        data={winners}
        renderItem={renderWinner}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
