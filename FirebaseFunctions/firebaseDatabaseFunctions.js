import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push, set, serverTimestamp } from "firebase/database";
import { firebaseApp } from "./firebaseConfig";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";

export const uploadImageWithTag = async (imageURI, tag) => {
  try {
    // Fetch the image as a blob
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

    const fileRef = ref(getStorage(firebaseApp), uuidv4());
    await uploadBytes(fileRef, blob);
    blob.close();

    downloadURL1 = await getDownloadURL(fileRef);

    // Save the download URL and the tag to your database
    const database = getDatabase(firebaseApp);
    const auth = getAuth();
    user = auth.currentUser();

    set(ref(database, "user" + user + "images/" + tag), {
      uri: downloadURL1,
      tag: tag,
    });

    console.log("Image uploaded successfully. Download URL:", downloadURL);
    console.log("Tag:", tag);
    console.log("Image data saved to the database.");

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
