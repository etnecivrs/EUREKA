import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { signIn } from '../services/firebaseAuth';
import { useAuth } from '../context/authContext';
import logo from '../assets/logo.png';
import {LoginStyles} from '../styles/styles'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAuth();

  const handleLogin = async () => {
    try {
      const result = await signIn(email, password);

      if (!result?.user) {
        throw new Error('Falha na autenticação');
      }
    } catch (error) {
      console.log("Erro no login:", error.message);
      Alert.alert("Erro ao efetuar login", "Username ou password incorretos.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={LoginStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={LoginStyles.innerContainer}>
        
        <Image source={logo} style={LoginStyles.logo} />

        <TextInput
          style={LoginStyles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email"
          placeholderTextColor="#888"
        />

        <TextInput
          style={LoginStyles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={LoginStyles.button} onPress={handleLogin}>
          <Text style={LoginStyles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={LoginStyles.linkText}>Não tem conta? Registar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

