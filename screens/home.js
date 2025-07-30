import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { useAuth } from '../context/authContext';
import { database } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import {HomeStyles} from '../styles/styles';





export default function Home() {
  const { user } = useAuth();
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [tarefas, setTarefas] = useState(['']);
  const navigation = useNavigation();
  

  // Aqui usamos userID (singular) que é o array dos UIDs de users na lista
  const [userID, setUserID] = useState(user ? [user.uid] : []);
  const [usersAdded, setUsersAdded] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    setLoading(true);

    const unsubscribe = database
      .collection('listas')
      .where('userID', 'array-contains', user.uid)
      .onSnapshot(
        (snapshot) => {
          const lista = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setListas(lista);
          setLoading(false);
        },
        (error) => {
          console.error('Erro ao carregar listas:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [user?.uid]);

  // Buscar dados completos dos users baseados no array userID
  useEffect(() => {
    async function fetchUsers() {
      if (userID.length === 0) {
        setUsersAdded([]);
        return;
      }

      try {
        const promises = userID.map((uid) =>
          database.collection('users').doc(uid).get()
        );
        const docs = await Promise.all(promises);
        const usersData = docs
          .filter(doc => doc.exists)
          .map(doc => ({ uid: doc.id, ...doc.data() }));
        setUsersAdded(usersData);
      } catch (error) {
        console.error('Erro a buscar dados dos utilizadores:', error);
      }
    }

    fetchUsers();
  }, [userID]);

  const adicionarCampo = () => {
    setTarefas([...tarefas, '']);
  };

  const handleTarefaChange = (text, index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index] = text;
    setTarefas(novasTarefas);
  };

  const adicionarUsuarioPorEmailOuTelefone = async (input) => {
    if (!input.trim()) {
      Alert.alert('Erro', 'Insira um email ou número de telemóvel.');
      return;
    }

    try {
      const queryEmail = database.collection('users').where('email', '==', input.trim());
      const queryPhone = database.collection('users').where('phoneNumber', '==', input.trim());

      const [emailSnapshot, phoneSnapshot] = await Promise.all([queryEmail.get(), queryPhone.get()]);

      let userDoc = null;

      if (!emailSnapshot.empty) {
        userDoc = emailSnapshot.docs[0];
      } else if (!phoneSnapshot.empty) {
        userDoc = phoneSnapshot.docs[0];
      }

      if (!userDoc) {
        Alert.alert('Erro', 'Utilizador não encontrado.');
        return;
      }

      const uidToAdd = userDoc.id;

      if (userID.includes(uidToAdd)) {
        Alert.alert('Info', 'Utilizador já adicionado.');
        return;
      }

      setUserID([...userID, uidToAdd]);
      Alert.alert('Sucesso', 'Utilizador adicionado.');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao adicionar utilizador.');
    }
  };

  const criarLista = async () => {
    if (!tarefas[0].trim()) {
      Alert.alert('Erro', 'A primeira tarefa não pode estar vazia.');
      return;
    }

    if (!title.trim()) {
      Alert.alert('Erro', 'O título não pode estar vazio.');
      return;
    }

    const tarefasFiltradas = tarefas.filter((tarefa) => tarefa.trim() !== '');
    const data = {
      title: title.trim(),
      tarefas: tarefasFiltradas,
      userID: userID,  
      datetime: new Date(),
    };

    try {
      await database.collection('listas').add(data);
      setTitle('');
      setTarefas(['']);
      setUserID(user ? [user.uid] : []);
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar lista.');
    }
  };

  const apagarLista = async (id) => {
    try {
      await database.collection('listas').doc(id).delete();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao apagar lista.');
    }
  };

  const renderListas = ({ item }) => (
    <View style={HomeStyles.listaItem}>
      <TouchableOpacity onPress={() => navigation.navigate('EditarLista', { listaId: item.id })}>
        <Text style={HomeStyles.listaTitle}>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => apagarLista(item.id)}>
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const [inputUsuario, setInputUsuario] = useState('');

  return (
    <View style={HomeStyles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#03f463" style={{ marginTop: 20 }} />
      ) : (
        <FlatList data={listas} keyExtractor={(item) => item.id} renderItem={renderListas} />
      )}

      <TouchableOpacity style={HomeStyles.botaoNovaLista} onPress={() => setModalVisible(true)}>
        <Text style={HomeStyles.botaoTexto}>Nova lista</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView
          style={[
            HomeStyles.modalContainer,
            { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
          ]}
        >
          <TextInput
            style={HomeStyles.input}
            placeholder="Título da lista"
            value={title}
            onChangeText={setTitle}
          />

          {tarefas.map((tarefa, index) => (
            <TextInput
              key={index}
              style={HomeStyles.input}
              placeholder={`Item ${index + 1}`}
              value={tarefa}
              onChangeText={(text) => handleTarefaChange(text, index)}
            />
          ))}

          <TouchableOpacity onPress={adicionarCampo} style={HomeStyles.adicionarWrapper}>
            <AntDesign name="pluscircle" size={30} color="yellow" />
            <Text style={HomeStyles.adicionarText}>Adicionar tarefa</Text>
          </TouchableOpacity>

          <View style={{ marginVertical: 15 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Adicionar utilizador:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[HomeStyles.input, { flex: 1, marginRight: 10 }]}
                placeholder="Email ou telemóvel"
                value={inputUsuario}
                onChangeText={setInputUsuario}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <TouchableOpacity
                style={[HomeStyles.botaoNovaLista, { paddingVertical: 10, paddingHorizontal: 15 }]}
                onPress={() => {
                  adicionarUsuarioPorEmailOuTelefone(inputUsuario);
                  setInputUsuario('');
                }}
              >
                <Text style={HomeStyles.botaoTexto}>Adicionar</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Utilizadores adicionados:</Text>
              {usersAdded.length === 0 && <Text style={{ color: 'gray' }}>Nenhum utilizador adicionado</Text>}
              {usersAdded.map(({ uid, email }) => (
                <Text key={uid} style={{ marginBottom: 3, color: 'gray' }}>
                  {uid === user?.uid ? '' : email || uid}
                </Text>
              ))}
            </View>
          </View>

          <TouchableOpacity style={HomeStyles.botaoNovaLista} onPress={criarLista}>
            <Text style={HomeStyles.botaoTexto}>Criar Lista</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={{ color: 'red', marginTop: 20, textAlign: 'center' }}>Cancelar</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </View>
  );
}


