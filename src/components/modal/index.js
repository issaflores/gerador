import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import * as Clipboard from 'expo-clipboard';
import useStorage from '../../hooks/useStorage';

export function ModalPassword({ password, hardleClose }) {
  const { saveItem } = useStorage();

  async function hardleCopyPassword() {
    try {
      await Clipboard.setStringAsync(password);
      await saveItem("@pass", password);
      alert("Senha copiada e salva com sucesso!");
      hardleClose();
    } catch (error) {
      console.error("Erro ao copiar/salvar senha:", error.message);
      alert("Erro ao copiar/salvar senha. Verifique se as permissões estão corretas.");
    }
  }

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Gerador de Senha</Text>
      <Text style={styles.modalTitle}>Senha gerada</Text>

      <Pressable style={styles.innerPassword} onLongPress={hardleCopyPassword}>
        <Text style={styles.text}>{password}</Text>
      </Pressable>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={hardleCopyPassword}>
          <Text style={styles.buttonSaveText}>Salvar senha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={hardleClose}>
          <Text style={styles.buttonBackText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  content: {
    backgroundColor: "#000",
    flex: 1,
    width: "85%",
    paddingTop: 30,
    paddingBottom: 75,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 80, // Ajuste o tamanho conforme necessário
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
    width: '100', // Isso faz o container ocupar a largura total
  },
  modalTitle: {
    fontSize: 55,  // Ajuste o tamanho conforme necessário
    fontWeight: 'bold',
    color: 'red', // Altere a cor conforme necessário
    marginBottom: 90, // Ajuste o espaçamento inferior conforme necessário
  },
  innerPassword: {
    backgroundColor: "#0e0e0e",
    width: "90%",
    padding: 13,
    borderRadius: 8,
  },
  text: {
    color: "#ffff",
    textAlign: "center",
  },
  buttonArea: {
    flexDirection: "row",
    width: "100%",
    marginTop: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 14,
    marginBottom: 14,
    padding: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  
  buttonBackText: {
    color: "#000", 
    fontSize: 20,
  },
  
  buttonSave: {
    backgroundColor: 'red',
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop:90,
    
    
  },
  buttonSaveText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
