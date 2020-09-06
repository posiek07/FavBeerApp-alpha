import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';

export const uploadImage = async (imageUri) => {
  if (imageUri) {
    const fileExtension = imageUri.split('.').pop();
    console.log('EXT: ' + fileExtension);

    const fileName = `image${
      Math.random().toFixed(5) * 1000000
    }.${fileExtension}`;
    console.log(fileName);

    const storageRef = storage().ref(`commentImages/${fileName}`);

    const task = storageRef.putFile(imageUri);

    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    const url = task.then(async () => {
      console.log('Image uploaded to the bucket!');
      const downloadUrl = await storageRef.getDownloadURL();
      return downloadUrl;
    });
    return url;
  } else {
    console.log('Skipping image upload');
  }
};

// export const deleteImage = async (imageName) => {
//   const storageRef = storage().ref(`commentImages/${imageName}`);

//   storageRef
//     .delete()
//     .then(() => {
//       console.log('deleted');
//       return;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
