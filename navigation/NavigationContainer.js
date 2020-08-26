import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import BeerNavigator from './BeerNavigator';

const NavigationContainer = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const navRef = useRef();
  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(NavigationActions.navigate({routeName: 'Auth'}));
    }
  }, [isAuth]);

  return <BeerNavigator ref={navRef} />;
};

export default NavigationContainer;
