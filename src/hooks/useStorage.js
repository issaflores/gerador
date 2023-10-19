import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async (key) => {
  try {
    const passwords = await AsyncStorage.getItem(key);
    return JSON.parse(passwords) || [];
  } catch (error) {
    console.log("Erro ao buscar", error);
    return [];
  }
};

export const saveItem = async (key, value) => {
  try {
    let passwords = await getItem(key);

    passwords.push(value);

    await AsyncStorage.setItem(key, JSON.stringify(passwords));
    return passwords; // Você pode considerar retornar algo útil aqui
  } catch (error) {
    console.log("ERRO AO SALVAR", error);
    throw error; // Rejeita a promessa explicitamente
  }
};

export const removeItem = async (key, item) => {
  try {
    let passwords = await getItem(key);

    let myPasswords = passwords.filter((password) => {
      return password !== item;
    });

    await AsyncStorage.setItem(key, JSON.stringify(myPasswords));

    return myPasswords;
  } catch (error) {
    console.log("ERROR AO DELETAR", error);
  }
};