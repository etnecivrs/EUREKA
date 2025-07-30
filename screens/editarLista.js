import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { database, auth } from '../firebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import {EditarListaStyles} from '../styles/styles';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function EditarLista({ route, navigation }) {
  const { listaId } = route.params;
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [saving, setSaving] = useState(false);
  const [userIDs, setUserIDs] = useState([]);
  const [usersAdicionados, setUsersAdicionados] = useState([]);
  const [novoUser, setNovoUser] = useState('');
  const [notasVisiveis, setNotasVisiveis] = useState({});
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchLista = async () => {
      try {
        const doc = await database.collection('listas').doc(listaId).get();
        if (doc.exists) {
          const data = doc.data();
          setTitle(data.title || '');
          setUserIDs(data.userID || []);
          const tarefasData = (data.tarefas || []).map(t =>
            typeof t === 'string'
              ? { text: t, done: false, nota: '' }
              : { ...t, nota: t.nota || '' }
          );
          setTarefas(tarefasData);
          
          // Mostrar notas automaticamente se tiverem conteúdo
          const notasIniciais = {};
          tarefasData.forEach((tarefa, index) => {
            if (tarefa.nota && tarefa.nota.trim()) {
              notasIniciais[index] = true;
            }
          });
          setNotasVisiveis(notasIniciais);
        } else {
          Alert.alert('Erro', 'Lista não encontrada');
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro ao carregar lista');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    fetchLista();
  }, [listaId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (userIDs.length === 0) {
          setUsersAdicionados([]);
          return;
        }

        const usersData = await Promise.all(
          userIDs.map(async (uid) => {
            const doc = await database.collection('users').doc(uid).get();
            if (doc.exists) {
              return { uid, ...doc.data() };
            }
            return { uid };
          })
        );

        setUsersAdicionados(usersData);
      } catch (error) {
        console.log('Erro ao buscar utilizadores:', error);
      }
    };

    fetchUsers();
  }, [userIDs]);

  const adicionarUserPorEmailOuTelefone = async () => {
    const valor = novoUser.trim();
    if (!valor) return;

    try {
      const querySnapshot = await database
        .collection('users')
        .where(valor.includes('@') ? 'email' : 'phone', '==', valor)
        .get();

      if (querySnapshot.empty) {
        Alert.alert('Erro', 'Utilizador não encontrado');
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const uid = userDoc.id;

      if (userIDs.includes(uid)) {
        Alert.alert('Aviso', 'Utilizador já adicionado');
        return;
      }

      const novaLista = [...userIDs, uid];
      setUserIDs(novaLista);
      await database.collection('listas').doc(listaId).update({ userID: novaLista });
      setNovoUser('');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao adicionar utilizador');
    }
  };

  const toggleDone = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].done = !novasTarefas[index].done;
    setTarefas(novasTarefas);
  };

  const handleTarefaChange = (text, index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].text = text;
    setTarefas(novasTarefas);
  };

  const handleNotaChange = (nota, index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].nota = nota;
    setTarefas(novasTarefas);
    
    // Se a nota ficar vazia, esconder automaticamente
    if (!nota.trim()) {
      setNotasVisiveis((prev) => ({
        ...prev,
        [index]: false,
      }));
    } else {
      // Se adicionar conteúdo e não estava visível, mostrar
      setNotasVisiveis((prev) => ({
        ...prev,
        [index]: true,
      }));
    }
  };

  const toggleNotaVisivel = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setNotasVisiveis((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const adicionarTarefa = () => {
    setTarefas([...tarefas, { text: '', done: false, nota: '' }]);
  };

  const apagarTarefa = (index) => {
    Alert.alert('Confirmar', 'Deseja apagar esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Apagar',
        style: 'destructive',
        onPress: () => {
          const novasTarefas = tarefas.filter((_, i) => i !== index);
          setTarefas(novasTarefas);
          
          // Remover a entrada de notasVisiveis para este índice e reajustar os índices
          const novasNotasVisiveis = {};
          Object.keys(notasVisiveis).forEach(key => {
            const idx = parseInt(key);
            if (idx < index) {
              novasNotasVisiveis[idx] = notasVisiveis[idx];
            } else if (idx > index) {
              novasNotasVisiveis[idx - 1] = notasVisiveis[idx];
            }
            // idx === index é removido (não copiado)
          });
          setNotasVisiveis(novasNotasVisiveis);
        },
      },
    ]);
  };

  const removerUtilizador = (uid) => {
    if (uid === currentUser.uid) {
      Alert.alert('Erro', 'Não pode remover-se da lista.');
      return;
    }

    Alert.alert(
      'Remover Utilizador',
      'Tem a certeza que deseja remover este utilizador?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            const novaListaIDs = userIDs.filter(id => id !== uid);
            setUserIDs(novaListaIDs);
            try {
              await database.collection('listas').doc(listaId).update({
                userID: novaListaIDs,
              });
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível remover o utilizador.');
            }
          },
        },
      ]
    );
  };

  const salvarAlteracoes = async () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'O título não pode estar vazio.');
      return;
    }

    const tarefasFiltradas = tarefas.filter(t => t.text.trim() !== '');
    if (tarefasFiltradas.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos uma tarefa.');
      return;
    }

    setSaving(true);
    try {
      await database.collection('listas').doc(listaId).update({
        title: title.trim(),
        tarefas: tarefasFiltradas,
        userID: userIDs,
      });
      Alert.alert('Sucesso', 'Lista atualizada!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar alterações.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={EditarListaStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#03f463" />
      </View>
    );
  }

  return (
    <View style={EditarListaStyles.container}>
      <Text style={EditarListaStyles.label}>Título da Lista:</Text>
      <TextInput
        style={EditarListaStyles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título da lista"
      />

      <Text style={[EditarListaStyles.label, { marginTop: 20 }]}>Tarefas:</Text>
      <FlatList
        data={tarefas}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={EditarListaStyles.tarefaContainer}>
            <TouchableOpacity
              onPress={() => toggleDone(index)}
              style={[EditarListaStyles.checkbox, item.done && EditarListaStyles.checkboxChecked]}
            >
              {item.done && <AntDesign name="check" size={18} color="white" />}
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <TextInput
                style={[EditarListaStyles.tarefaInput, item.done && EditarListaStyles.tarefaDone]}
                value={item.text}
                onChangeText={(text) => handleTarefaChange(text, index)}
                placeholder={`Item ${index + 1}`}
              />

              {notasVisiveis[index] ? (
                <TextInput
                  style={EditarListaStyles.notaInput}
                  value={item.nota}
                  onChangeText={(nota) => handleNotaChange(nota, index)}
                  placeholder="Nota da tarefa (opcional)"
                  multiline
                />
              ) : item.nota?.trim() ? (
                <Text style={EditarListaStyles.notaResumo}>
                  {item.nota.length > 40 ? item.nota.slice(0, 40) + '...' : item.nota}
                </Text>
              ) : null}

              <TouchableOpacity
                onPress={() => toggleNotaVisivel(index)}
                style={EditarListaStyles.toggleNotaBtn}
              >
                <Text style={EditarListaStyles.toggleNotaText}>
                  {notasVisiveis[index] ? 'Ocultar Nota' : 'Mostrar Nota'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => apagarTarefa(index)}>
              <AntDesign name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#999' }}>Sem tarefas.</Text>}
      />

      <TouchableOpacity style={EditarListaStyles.adicionarBtn} onPress={adicionarTarefa}>
        <AntDesign name="pluscircle" size={30} color="yellow" />
        <Text style={EditarListaStyles.adicionarText}>Adicionar tarefa</Text>
      </TouchableOpacity>

      <Text style={[EditarListaStyles.label, { marginTop: 25 }]}>Utilizadores com acesso:</Text>
      {usersAdicionados.length === 0 ? (
        <Text style={{ color: '#777', marginTop: 5 }}>Nenhum utilizador adicionado.</Text>
      ) : (
        usersAdicionados.map((user) => (
          <View key={user.uid} style={EditarListaStyles.userRow}>
            <Text style={EditarListaStyles.userText}>
              {user.uid === currentUser.uid
                ? `${user.email || user.phone || user.uid} (Você)`
                : user.email || user.phone || user.uid}
            </Text>
            {user.uid !== currentUser.uid && (
              <TouchableOpacity onPress={() => removerUtilizador(user.uid)}>
                <AntDesign name="closecircleo" size={20} color="gray" />
              </TouchableOpacity>
            )}
          </View>
        ))
      )}

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <TextInput
          style={[EditarListaStyles.input, { flex: 1 }]}
          value={novoUser}
          onChangeText={setNovoUser}
          placeholder="Email ou telefone do utilizador"
        />
        <TouchableOpacity onPress={adicionarUserPorEmailOuTelefone} style={{ marginLeft: 8, justifyContent: 'center' }}>
          <AntDesign name="pluscircle" size={28} color="#03f463" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[EditarListaStyles.salvarBtn, saving && { opacity: 0.6 }]}
        onPress={salvarAlteracoes}
        disabled={saving}
      >
        <Text style={EditarListaStyles.salvarText}>
          {saving ? 'Salvando...' : 'Gravar Alterações'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

