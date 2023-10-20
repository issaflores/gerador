import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { saveItem } from '../../hooks/useStorage';

// Defina a variável charset globalmente
const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function Home() {
  const [size, setSize] = useState(10);
  const [passwordValue, setPasswordValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordName, setPasswordName] = useState('');

  function generatePassword() {
    let password = '';

    for (let i = 0, n = charset.length; i < size; i++) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    setPasswordValue(password);
    setModalVisible(true);
  }

  async function handleSavePassword() {
    if (passwordName.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira um nome para a senha.');
      return;
    }

    await saveItem('@pass', `${passwordName}: ${passwordValue}`);
    setModalVisible(false);
    setPasswordName('');
    Alert.alert('Sucesso', 'Senha salva com sucesso!');
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <Text style={styles.title}>{size} Caracteres</Text>

      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={6}
          maximumValue={20}
          maximumTrackTintColor="#000"
          minimumTrackTintColor="#000"
          thumbTintColor="red"
          value={size}
          onValueChange={(value) => setSize(Math.max(6, value.toFixed(0)))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Gerador de Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da senha"
            onChangeText={(text) => setPasswordName(text)}
            value={passwordName}
          />
          <Text style={styles.modalText}>{passwordValue}</Text>

          {/* Contêiner de botões com flexDirection: 'row' */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSavePassword}>
              <Text style={styles.buttonTextSave}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonBackText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a9a9a9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 60,
  },
  area: {
    marginTop: 14,
    marginBottom: 14,
    width: '80%',
    backgroundColor: '#a9a9a9',
    borderRadius: 8,
    padding: 6,
  },
  button: {
    backgroundColor: '#0e0e0e',
    width: '80%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 18,
  },
  saveButton: {
    backgroundColor: '#0e0e0e',
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 60,
  },
  closeButton: {
    backgroundColor: '#fff',
    flex: 1,
    marginLeft: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  buttonBackText: {
    color: "#000", 
    fontSize: 20,
  },
  buttonTextSave: {
    color: '#fff',
    fontSize: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    width: '80%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  modalText: {
    backgroundColor: '#fff',
    fontSize: 20,
    marginVertical: 8,
  },
  input: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    width: '90%',
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
});
