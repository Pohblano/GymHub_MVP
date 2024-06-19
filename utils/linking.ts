import { Platform} from "react-native";
import * as Linking from "expo-linking"

export  const openPhoneApp = async (phoneNumber: string) => {
    console.log(phoneNumber)
    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${phoneNumber}`);
      return;
    }

    if (Platform.OS === 'ios') {
      Linking.openURL(`telprompt:${phoneNumber}`)
      return;
    }
  }

export const openWhatsApp = async (phoneNumber: string)=>{
	Linking.openURL(`https://wa.me/${phoneNumber}`)
}

export const openSocial = async (url: string) => {
	Linking.openURL(url)
}

export const getBlobFromUri = async (uri: string) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  return blob;
};