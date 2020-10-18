import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';

export const uploadImage = async (imageUri) => {
  if (imageUri) {
    const fileExtension = imageUri.split('.').pop();

    const fileName = `image${
      Math.random().toFixed(5) * 1000000
    }.${fileExtension}`;

    const storageRef = storage().ref(`commentImages/${fileName}`);

    const task = storageRef.putFile(imageUri);

    task.on('state_changed', (taskSnapshot) => {
      
    });

    const url = task.then(async () => {
      const downloadUrl = await storageRef.getDownloadURL();
      return downloadUrl;
    });
    return url;
  } else {
  }
};

// export const deleteImage = async (imageName) => {
//   const storageRef = storage().ref(`commentImages/${imageName}`);

//   storageRef
//     .delete()
//     .then(() => {
//       return;
//     })
//     .catch((err) => {
//     });
// };
