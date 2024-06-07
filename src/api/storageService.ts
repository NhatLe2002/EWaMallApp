import AsyncStorage from '@react-native-async-storage/async-storage';
const storageService = {
  async setRole(role: string) {
    try {
      return await AsyncStorage.setItem('role', role);
    } catch (error) {
      console.error('Failed to save the role', error);
    }
  },
  async setSearchKey(key: string[]) {
    try {
      return await AsyncStorage.setItem('searchKey', JSON.stringify(key));
    } catch (error) {
      console.error('Failed to save the searchKey', error);
    }
  },
  async getSearchKey() {
    try {
      var json = await AsyncStorage.getItem('searchKey');
      if(json != null){
        return JSON.parse(json)
      }
      return null;
    } catch (error) {
      console.error('Failed to save the searchKey', error);
    }
  },
  async getRole() {
    let role;
    try {
      role = await AsyncStorage.getItem('role');
      return role;
    } catch (error) {
      console.error('Failed to get the role', error);
    }
  },
  async setId(id: number) {
    try {
      return await AsyncStorage.setItem('id', id.toString());
    } catch (error) {
      console.error('Failed to save the Id', error);
    }
  },
  async getId() {
    let id 
    try {
      id =  await AsyncStorage.getItem('id');
      return  id
    } catch (error) {
      console.error('Failed to get the role', error);
    }
  },
  async setUserName(name: string) {
    try {
      await AsyncStorage.setItem('name', name);
    } catch (error) {
      console.error('Failed to name the role', error);
    }
  },
  async getUserName() {
    let userName
    try {
      userName = await AsyncStorage.getItem('name');
      return userName
    } catch (error) {
      console.error('Failed to get the Name', error);
    }
  },

  async removeInfo() {
    const keys = ['role', 'name', 'id'];
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Failed to Remover the role', error);
    }
  },
  async removeSearch() {
    try {
      await AsyncStorage.removeItem("searchKey");
    } catch (error) {
      console.error('Failed to Remover the role', error);
    }
  },
};

export default storageService;
