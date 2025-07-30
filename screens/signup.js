import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { signUp } from '../services/firebaseAuth';
import { database } from '../firebaseConfig';
import {SignupStyles} from '../styles/styles';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Função para validar o telemóvel conforme pedido
  const isValidPhone = (phone) => {
    const regex = /^(91|92|93|96)\d{7}$/;
    return regex.test(phone);
  };

 
const handleSignUp = async () => {
  if (password !== confirmPassword) {
    Alert.alert('Erro', 'As passwords não correspondem.');
    return;
  }

  if (!phone.trim()) {
    Alert.alert('Erro', 'O número de telemóvel é obrigatório.');
    return;
  }

  if (!isValidPhone(phone.trim())) {
    Alert.alert(
      'Erro',
      'Número de telemóvel inválido. Deve ter 9 dígitos e começar por 91, 92, 93 ou 96.'
    );
    return;
  }

  try {
    // Faz o registo e obtém o userCredential com user.uid
    const userCredential = await signUp(email.trim(), password, phone.trim());

    // user.uid para usar como ID do documento no Firestore
    const uid = userCredential.user.uid;

    // Guarda os dados na coleção 'users'
    await database.collection('users').doc(uid).set({
      email: email.trim(),
      phoneNumber: phone.trim(),
      userID: uid,
      createdAt: new Date(),
    });

    Alert.alert('Bem-vindo', 'Registo criado com sucesso');
  } catch (error) {
    console.log(error.message);
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('Erro', 'Este email já está registado.');
    } else {
      Alert.alert('Erro', 'Falha no registo. Tente novamente.');
    }
  }
};

  return (
    <View style={SignupStyles.container}>
      <Text style={SignupStyles.header}>Registar</Text>

      <TextInput
        style={SignupStyles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Email"
        placeholderTextColor="#888"
      />

      <TextInput
        style={SignupStyles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="Número de telemóvel (ex: 912345678)"
        placeholderTextColor="#888"
        maxLength={9}
      />

      <TextInput
        style={SignupStyles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
        placeholderTextColor="#888"
      />

      <TextInput
        style={SignupStyles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholder="Confirmar Password"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={SignupStyles.button} onPress={handleSignUp}>
        <Text style={SignupStyles.buttonText}>Registar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={SignupStyles.linkText}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

