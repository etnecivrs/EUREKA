import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from './context/ThemeContext';

import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import HomeScreen from './screens/home';
import EditarLista from './screens/editarLista';
import Perfil from './screens/perfil';
import Definicoes from './screens/definicoes';
import { AuthProvider, useAuth } from './context/authContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Minhas Listas') {
            return <Ionicons name="list" size={size} color={color} />;
          } else if (route.name === 'Perfil') {
            return <AntDesign name="user" size={size} color={color} />;
          } else if (route.name === 'Definições') {
            return <Ionicons name="settings" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        headerTitleAlign: 'center',
      })}
    >
      <Tab.Screen name="Minhas Listas" component={HomeScreen} />
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="Definições" component={Definicoes} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Voltar" component={Tabs} />
            <Stack.Screen
              name="EditarLista"
              component={EditarLista}
              options={{ headerShown: true, title: 'Editar Lista' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ title: 'Registo' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
    </ThemeProvider>
  );
}
