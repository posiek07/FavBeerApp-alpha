import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/emailAuth';
import Colors from '../constants/Colors';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      // const userData = await AsyncStorage.getItem('userData');
      auth().onAuthStateChanged(async (user) => {
        if (!user) {
          props.navigation.navigate('Auth');
          return;
        } else {
          const token = await auth().currentUser.getIdToken();
          const { uid, email, photoURL } = user;
          let authClient
          if (photoURL.includes('facebook')) {
            authClient = 'facebookSignIn'
          } else if (photoURL.includes('google')) {
            authClient = 'googleSignIn'
          } else {
            return
          }
          console.log(photoURL)
          dispatch(authActions.authenticate(email, uid, token, photoURL, authClient));
          props.navigation.navigate('Beers', {
            routeName: 'AllBeers',
          });
        }
      });
    };
    tryLogin().then(() => SplashScreen.hide());
  }, [dispatch]);

  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
