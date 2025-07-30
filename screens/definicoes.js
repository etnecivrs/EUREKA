import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { auth, database } from '../firebaseConfig';
import { DefinicoesStyles } from '../styles/styles';

export default function DefinicoesScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const loadSettings = async () => {
      const storedNotif = await AsyncStorage.getItem('notifications');
      setNotificationsEnabled(storedNotif === 'enabled');
    };
    loadSettings();
  }, []);

  const toggleNotifications = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    await AsyncStorage.setItem('notifications', newValue ? 'enabled' : 'disabled');

    if (newValue) {
      // Agenda uma notificação local às 9h todos os dias
      await Notifications.cancelAllScheduledNotificationsAsync();

      const trigger = {
        hour: 9,
        minute: 0,
        repeats: true,
      };

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Tarefas pendentes',
          body: 'Verifique as tarefas por realizar hoje.',
        },
        trigger,
      });
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  const apagarConta = () => {
    Alert.alert(
      'Apagar conta',
      'Tem a certeza que deseja apagar a sua conta? Esta ação é irreversível.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar', style: 'destructive', onPress: async () => {
            try {
              await database.collection('users').doc(currentUser.uid).delete();
              await auth.currentUser.delete();
              navigation.navigate('Login');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível apagar a conta.');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={DefinicoesStyles.container}>
      <Text style={DefinicoesStyles.label}>Notificações</Text>
      <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />

      <TouchableOpacity style={DefinicoesStyles.deleteButton} onPress={apagarConta}>
        <Text style={DefinicoesStyles.deleteText}>Apagar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}