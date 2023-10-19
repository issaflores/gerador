// PasswordItem.js
import React from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';

export function PasswordItem({ data, removePassword, copyPassword }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => copyPassword(data)}>
        <Text style={styles.text}>{data}</Text>
      </Pressable>
      <Pressable onPress={() => removePassword(data)} style={styles.trashIconContainer}>
        <Text style={styles.trashIcon}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 14,
    width: "100%",
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    color: "#fff"
  },
  trashIconContainer: {
    marginLeft: 10,
  },
  trashIcon: {
    fontSize: 20,
  },
});
