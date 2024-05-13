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

    // Transform data into the desired format
    const organizeData = Object.entries(userImages).map((entry) => ({
      tag: entry[0], // Accessing the tag directly from the first element of the entry
      images: entry[1].map((obj) => ({ uri: obj.url })),
    }));

    return organizeData;
  } catch (error) {
    console.log("Error fetching user tags:", error);
  }
};

//Credit: ChatGpt
//Helped organize all the tags instead of me manually doing it
const getCategory = (tag) => {
  switch (tag) {
    case "Beanie":
    case "Cap":
    case "Sun Hat":
    case "Hat":
      return "Hats";
    case "Scarf":
    case "Jewelry":
      return "Accessories/Jewelry";
    case "T-Shirt":
    case "Shirt":
    case "Blouse":
    case "Dress Shirt":
    case "Tank Top":
    case "Halter Top":
    case "Tube Top":
    case "Jersey":
    case "Jacket":
    case "Cardigan":
    case "Coat":
    case "Flannel":
    case "Sweatshirt":
    case "Crew Neck":
    case "Turtle Neck":
    case "Athletic Wear":
    case "Swimwear":
    case "Business Casual":
      return "Shirts";
    case "Pant":
    case "Dress Pant":
    case "Sweatpant":
    case "Short":
    case "Jeans":
    case "Leggings":
    case "Skirt":
      return "Pants";
    case "Sneakers":
    case "Dress Shoes":
    case "Heels":
    case "Flats":
    case "Boots":
    case "Flip Flops":
      return "Shoes";
    default:
      return "Other";
  }
};

const getImagesIntoCategory = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, auth.currentUser.email));
    const userImagesByCategory = {};
    const categorizedTags = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const { tag, url } = data;

      // Determine the category for the tag using the other function
      const category = getCategory(tag);

      if (!userImagesByCategory[category]) {
        userImagesByCategory[category] = [];
      }
      userImagesByCategory[category].push({ url });

      categorizedTags[tag] = true;
    });

    // Transform data into the desired format
    const organizedData = Object.entries(userImagesByCategory).map(([category, images]) => ({
      category,
      images,
    }));

    console.log("User images categorized successfully:", organizedData);
    return organizedData;
  } catch (error) {
    console.log("Error fetching user category images:", error);
  }
};

export { uploadImageWithTag, getUserTagsAndImages, getImagesIntoCategory };
