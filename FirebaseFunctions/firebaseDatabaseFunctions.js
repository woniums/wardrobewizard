import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot, getDocs } from "firebase/firestore";
import { firebaseApp, storage, db, auth } from "./firebaseConfig";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const uploadImageWithTag = async (imageURI, fileType, tag) => {
  try {
    // Fetch the image as a blob
    // Work around since easy way was broken with expo
    // Credit: sjchmiela
    // Source: https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageURI, true);
      xhr.send(null);
    });

    // CREDIT TO: Code with Beto, absolute goat
    // Source https://www.youtube.com/watch?v=cq5TGA6sBQQ
    const storageRef = ref(storage, "images/" + uuidv4());
    const uploadImage = uploadBytesResumable(storageRef, blob);
    uploadImage.on(
      "state_change",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Progress", progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then(async (downloadURl) => {
          console.log("File available at", downloadURl);
          await saveImageWithTag(fileType, downloadURl, tag);
        });
      }
    );
  } catch (error) {
    console.log("Error uploading image:", error);
  }
};

const saveImageWithTag = async (fileType, url, tag) => {
  try {
    //This will change the path of the database
    // Can thus be used to list out all a users images under a tag
    const docRef = await addDoc(collection(db, auth.currentUser.email), {
      fileType,
      tag,
      url,
    });
    console.log("Document saved correctly", docRef.id);
  } catch (error) {
    console.log(error);
  }
};
const getUserTagsAndImages = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, auth.currentUser.email));
    const userImages = {};
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const { tag, url } = data;
      if (!userImages[tag]) {
        userImages[tag] = [];
      }
      userImages[tag].push({ url });
    });
    return userImages;
  } catch (error) {
    console.log("Error fetching user tags:", error);
  }
};

export { uploadImageWithTag, getUserTagsAndImages };
