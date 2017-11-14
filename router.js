import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Restaurants from './restaurants';
import RestaurantDetails from './restaurantdetails';
import Dishes from './dishes';

export const RestaurantsStack = StackNavigator({
  Restaurants: {
    screen: Restaurants,
    navigationOptions: {
      title: 'Restaurants',
    },
  },
  Details: {
    screen: RestaurantDetails,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name
    }),
  },
});

export const DishesStack = StackNavigator({
  Dishes: {
    screen: Dishes,
    navigationOptions: {
      title: 'Dishes',
    },
  }, 
});

export const Tabs = TabNavigator({
  Restaurants: {
    screen: RestaurantsStack,
    navigationOptions: {
      tabBarLabel: 'Restaurants',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Dishes: {
    screen: DishesStack,
    navigationOptions: {
      tabBarLabel: 'Dishes',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});