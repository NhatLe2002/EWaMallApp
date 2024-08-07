// uploadImage.ts
import {storage} from '../config/FirbaseConfig';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';

// Hàm chọn ảnh từ thư viện
export const pickImage = async (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          reject('User cancelled image picker');
        } else if (response.errorCode) {
          reject(response.errorCode);
        } else if (response.assets && response.assets.length > 0) {
          const {uri} = response.assets[0];
          resolve(uri || null);
        } else {
          reject('Unknown error occurred');
        }
      },
    );
  });
};
export const uploadImagToFirebase = async (
  uris: string[],
  coverImageId: string,
): Promise<string[]> => {
  const downloadURLs: string[] = [];
  console.log('id', coverImageId);

  try {
    for (const uri of uris) {
      if (!uri) {
        throw new Error('URI is required');
      }

      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const storageRef = ref(storage, `products/${coverImageId}/${filename}`);

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      downloadURLs.push(downloadURL);
      console.log('Uploaded image: ', downloadURL);
    }
  } catch (error) {
    console.error('Failed to upload image to Firebase:', error);
    // Handle error if needed
  }

  return downloadURLs;
};
