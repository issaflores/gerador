// Passwords.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, Pressable, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { PasswordItem } from "../components/passworditem";
import Clipboard from 'expo-clipboard';  // Importação correta
import { getItem, removeItem } from "../../hooks/useStorage";

export function Passwords() {
  const [listPasswords, setListPasswords] = useState([]);
  const focused = useIsFocused();

  useEffect(() => {
    async function loadPasswords() {
      const passwords = await getItem("@pass");
      setListPasswords(passwords || []);
    }

    loadPasswords();
  }, [focused]);

  async function handleCopyPassword(item) {
    await Clipboard.setStringAsync(item);
    Alert.alert("Sucesso", "Senha copiada com sucesso!");
  }

  async function handleDeletePassword(item) {
    await removeItem("@pass", item);
    const updatedPasswords = listPasswords.filter(password => password !== item);
    setListPasswords(updatedPasswords);
    Alert.alert("Sucesso", "Senha removida com sucesso!");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas senhas</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          style={{ flex: 1, paddingTop: 14 }}
          data={listPasswords}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <PasswordItem
              data={item}
              removePassword={() => handleDeletePassword(item)}
              copyPassword={() => handleCopyPassword(item)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000",  
    paddingTop: 58,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  title: {
    fontSize: 30,
    color: "#a9a9a9",
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
  },
});
