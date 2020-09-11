import React, {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator, AsyncStorage} from 'react-native';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/emailAuth';
import Colors from '../constants/Colors';
import SplashScreen from 'react-native-splash-screen';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');

      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData);
      const {token, userId, expirationDate, email} = transformedData;
      const expiryDate = new Date(expirationDate);
      if (expiryDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }

      const expirationTime = expiryDate.getTime() - new Date().getTime();
      props.navigation.navigate('Beers', {
        routeName: 'AllBeers',
      });
      dispatch(authActions.authenticate(email, userId, token, expirationTime));
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
