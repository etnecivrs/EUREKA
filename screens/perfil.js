import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { auth, database } from '../firebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { PerfilStyles } from '../styles/styles.js';

// Importar todas as imagens de avatar
const avatarImages = {
  'avataaars.png': require('../assets/avatars/avataaars.png'),
  'avataaars (1).png': require('../assets/avatars/avataaars1.png'),
  'avataaars (2).png': require('../assets/avatars/avataaars2.png'),
  'avataaars (3).png': require('../assets/avatars/avataaars3.png'),
  'avataaars (4).png': require('../assets/avatars/avataaars4.png'),
  'avataaars (5).png': require('../assets/avatars/avataaars5.png'),
};

// Array com os nomes dos arquivos para facilitar a seleção aleatória
const avatarKeys = Object.keys(avatarImages);

export default function Perfil({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingPhone, setEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [saving, setSaving] = useState(false);
  const [avatarKey, setAvatarKey] = useState('avataaars.png');
  const [stats, setStats] = useState({
    totalLists: 0,
    totalTasks: 0,
    completedTasks: 0,
  });

  const currentUser = auth.currentUser;

  // Função para gerar avatar aleatório local
  const generateRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatarKeys.length);
    const selectedAvatarKey = avatarKeys[randomIndex];
    console.log('Avatar selecionado:', selectedAvatarKey);
    return selectedAvatarKey;
  };

  // Gerar novo avatar aleatório
  const generateNewAvatar = async () => {
    try {
      const newAvatarKey = generateRandomAvatar();
      setAvatarKey(newAvatarKey);

      // Gravar a chave do avatar no Firebase
      if (currentUser) {
        await database.collection('users').doc(currentUser.uid).update({
          avatarKey: newAvatarKey,
          updatedAt: new Date().toISOString(),
        });
        console.log('Avatar gravado no Firebase:', newAvatarKey);
      }
    } catch (error) {
      console.log('Erro ao gerar novo avatar:', error);
      // Em caso de erro, usar o primeiro avatar como fallback
      setAvatarKey('avataaars.png');
    }
  };

  const fetchUserStats = async () => {
    try {
      if (!currentUser) return;

      console.log('UID atual:', currentUser.uid);

      const snapshot = await database.collection('listas').get();
      console.log('Total documentos em listas:', snapshot.size);

      let totalLists = 0;
      let totalTasks = 0;
      let completedTasks = 0;

      snapshot.forEach((doc) => {
        const list = doc.data();
        console.log('List document:', list);

        const isUserMatch = Array.isArray(list.userID)
          ? list.userID.includes(currentUser.uid)
          : list.userID === currentUser.uid;

        if (isUserMatch) {
          totalLists++;

          if (list.tarefas && Array.isArray(list.tarefas)) {
            list.tarefas.forEach((tarefa) => {
              totalTasks++;
              if (tarefa.done === true) {
                completedTasks++;
              }
            });
          }
        }
      });

      console.log({ totalLists, totalTasks, completedTasks });

      setStats({
        totalLists,
        totalTasks,
        completedTasks,
      });
    } catch (error) {
      console.log('Erro ao carregar estatísticas:', error);
      setStats({
        totalLists: 0,
        totalTasks: 0,
        completedTasks: 0,
      });
    }
  };

  // Função para recarregar dados do usuário
  const reloadUserData = async () => {
    try {
      if (currentUser) {
        const doc = await database
          .collection('users')
          .doc(currentUser.uid)
          .get();
        if (doc.exists) {
          const data = doc.data();
          const updatedData = {
            email: currentUser.email,
            phoneNumber: data.phoneNumber || '',
            username: data.username || '',
            avatarKey: data.avatarKey || 'avataaars.png', // Carregar chave do avatar salva
            ...data,
          };
          setUserData(updatedData);
          setNewPhone(data.phoneNumber || '');
          setNewName(data.username || '');

          // Definir o avatar baseado na chave salva
          if (data.avatarKey && avatarKeys.includes(data.avatarKey)) {
            setAvatarKey(data.avatarKey);
          } else {
            // Se não houver chave salva ou for inválida, gerar uma nova
            const newAvatarKey = generateRandomAvatar();
            setAvatarKey(newAvatarKey);
            // Salvar a nova chave no Firebase
            await database.collection('users').doc(currentUser.uid).update({
              avatarKey: newAvatarKey,
              updatedAt: new Date().toISOString(),
            });
          }

          return updatedData;
        }
      }
    } catch (error) {
      console.log('Erro ao recarregar dados do usuário:', error);
    }
    return null;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUser) {
          fetchUserStats();
          const doc = await database
            .collection('users')
            .doc(currentUser.uid)
            .get();
          if (doc.exists) {
            const data = doc.data();
            const initialData = {
              email: currentUser.email,
              phoneNumber: data.phoneNumber || '',
              username: data.username || '',
              avatarKey: data.avatarKey || '',
              ...data,
            };
            setUserData(initialData);
            setNewPhone(data.phoneNumber || '');
            setNewName(data.username || '');

            // Se houver chave de avatar salva e for válida, usar ela; senão gerar uma nova
            if (data.avatarKey && avatarKeys.includes(data.avatarKey)) {
              console.log('Avatar salvo encontrado:', data.avatarKey);
              setAvatarKey(data.avatarKey);
            } else {
              console.log('Nenhum avatar salvo válido, gerando novo...');
              await generateNewAvatar();
            }
          } else {
            // Se não existir documento, criar um básico com avatar aleatório
            console.log('Criando novo usuário com avatar...');
            const newAvatarKey = generateRandomAvatar();
            setAvatarKey(newAvatarKey);

            const basicData = {
              email: currentUser.email,
              phoneNumber: '',
              username: '',
              avatarKey: newAvatarKey,
              createdAt: new Date().toISOString(),
            };
            await database
              .collection('users')
              .doc(currentUser.uid)
              .set(basicData);
            setUserData(basicData);
            setNewPhone('');
            setNewName('');
          }
        }
      } catch (error) {
        console.log('Erro ao carregar dados do usuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do perfil');
        // Em caso de erro, usar o primeiro avatar como fallback
        setAvatarKey('avataaars.png');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleUpdatePhone = async () => {
    if (newPhone === userData.phoneNumber) {
      setEditingPhone(false);
      return;
    }

    // Validação básica do telefone
    if (
      newPhone &&
      !/^\+?[\d\s\-\(\)]{9,15}$/.test(newPhone.replace(/\s/g, ''))
    ) {
      Alert.alert('Erro', 'Formato de telefone inválido');
      return;
    }

    setSaving(true);
    try {
      const phoneToSave = newPhone.trim();

      // Atualizar no Firebase
      await database.collection('users').doc(currentUser.uid).update({
        phoneNumber: phoneToSave,
        updatedAt: new Date().toISOString(),
      });

      // Atualizar estado local imediatamente
      const updatedUserData = {
        ...userData,
        phoneNumber: phoneToSave,
        updatedAt: new Date().toISOString(),
      };

      setUserData(updatedUserData);
      setNewPhone(phoneToSave);
      setEditingPhone(false);

      // Recarregar dados do servidor para garantir sincronização
      setTimeout(() => {
        reloadUserData();
      }, 500);

      Alert.alert('Sucesso', 'Telefone atualizado com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            // Força uma nova renderização após o alerta
            setUserData((prev) => ({ ...prev }));
          },
        },
      ]);
    } catch (error) {
      console.log('Erro ao atualizar telefone:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o telefone');
      setNewPhone(userData.phoneNumber); // Reverter para o valor anterior
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setNewPhone(userData?.phoneNumber || '');
    setEditingPhone(false);
  };

  const handleUpdateName = async () => {
    if (newName === userData.username) {
      setEditingName(false);
      return;
    }

    // Validação básica do nome
    if (newName && newName.trim().length < 2) {
      Alert.alert('Erro', 'Nome deve ter pelo menos 2 caracteres');
      return;
    }

    setSaving(true);
    try {
      const nameToSave = newName.trim();

      // Atualizar no Firebase
      await database.collection('users').doc(currentUser.uid).update({
        username: nameToSave,
        updatedAt: new Date().toISOString(),
      });

      // Atualizar estado local imediatamente
      const updatedUserData = {
        ...userData,
        username: nameToSave,
        updatedAt: new Date().toISOString(),
      };

      setUserData(updatedUserData);
      setNewName(nameToSave);
      setEditingName(false);

      // Recarregar dados do servidor para garantir sincronização
      setTimeout(() => {
        reloadUserData();
      }, 500);

      Alert.alert('Sucesso', 'Nome atualizado com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            // Força uma nova renderização após o alerta
            setUserData((prev) => ({ ...prev }));
          },
        },
      ]);
    } catch (error) {
      console.log('Erro ao atualizar nome:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o nome');
      setNewName(userData.username || ''); // Reverter para o valor anterior
    } finally {
      setSaving(false);
    }
  };

  const handleCancelNameEdit = () => {
    setNewName(userData?.username || '');
    setEditingName(false);
  };

  // FUNÇÃO DE LOGOUT MODIFICADA
  const handleLogout = () => {
    Alert.alert('Confirmar Logout', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          try {
            await auth.signOut();

            // Navegar para a tela de Login
            navigation.navigate('Login');
          } catch (error) {
            console.log('Erro ao fazer logout:', error);
            Alert.alert('Erro', 'Não foi possível fazer logout');
          }
        },
      },
    ]);
  };

  const getInitials = (email) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <View style={PerfilStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#03f463" />
        <Text style={PerfilStyles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={PerfilStyles.container}>
      <View style={PerfilStyles.header}>
        <View style={PerfilStyles.avatarContainer}>
          <Image
            source={avatarImages[avatarKey]}
            style={PerfilStyles.avatar}
            onLoad={() =>
              console.log('Avatar carregado com sucesso:', avatarKey)
            }
            onError={(error) => {
              console.log('Erro ao carregar avatar:', error.nativeEvent.error);
              console.log('Chave que falhou:', avatarKey);
              // Fallback: usar o primeiro avatar disponível
              setAvatarKey('avataaars.png');
            }}
          />

          {/* Botão para gerar novo avatar aleatório */}
          <TouchableOpacity
            style={PerfilStyles.avatarEditBtn}
            onPress={generateNewAvatar}>
            <AntDesign name="reload1" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={PerfilStyles.nameEditContainer}
          onPress={() => setEditingName(true)}>
          <Text style={PerfilStyles.welcomeText}>
            Olá {userData?.username || userData?.email || 'Usuário'}!
          </Text>
          <AntDesign
            name="edit"
            size={20}
            color="#03f463"
            style={PerfilStyles.editIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={PerfilStyles.profileCard}>
        {/* Modal para editar nome */}
        <Modal
          visible={editingName}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setEditingName(false)}>
          <View style={PerfilStyles.modalOverlay}>
            <View style={PerfilStyles.modalContent}>
              <Text style={PerfilStyles.modalTitle}>Editar Nome</Text>
              <TextInput
                style={PerfilStyles.modalInput}
                value={newName}
                onChangeText={setNewName}
                placeholder="Digite seu nome"
                autoFocus={true}
                maxLength={50}
              />
              <View style={PerfilStyles.modalButtons}>
                <TouchableOpacity
                  style={[PerfilStyles.modalBtn, PerfilStyles.cancelBtn]}
                  onPress={handleCancelNameEdit}
                  disabled={saving}>
                  <Text style={PerfilStyles.cancelBtnText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[PerfilStyles.modalBtn, PerfilStyles.saveBtn]}
                  onPress={handleUpdateName}
                  disabled={saving}>
                  {saving ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={PerfilStyles.saveBtnText}>Gravar</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={PerfilStyles.infoSection}>
          <Text style={PerfilStyles.label}>Email</Text>
          <View style={PerfilStyles.infoRow}>
            <AntDesign name="mail" size={20} color="#666" />
            <Text style={PerfilStyles.infoText}>
              {userData?.email || 'Não disponível'}
            </Text>
          </View>
        </View>

        <View style={PerfilStyles.infoSection}>
          <View style={PerfilStyles.labelRow}>
            <Text style={PerfilStyles.label}>Telefone</Text>
            {!editingPhone && (
              <TouchableOpacity onPress={() => setEditingPhone(true)}>
                <AntDesign name="edit" size={18} color="#03f463" />
              </TouchableOpacity>
            )}
          </View>

          {editingPhone ? (
            <View style={PerfilStyles.editContainer}>
              <View style={PerfilStyles.editRow}>
                <AntDesign name="phone" size={20} color="#666" />
                <TextInput
                  style={PerfilStyles.phoneInput}
                  value={newPhone}
                  onChangeText={setNewPhone}
                  placeholder="Insira seu telefone"
                  keyboardType="phone-pad"
                  autoFocus={true}
                />
              </View>
              <View style={PerfilStyles.editButtons}>
                <TouchableOpacity
                  style={[PerfilStyles.editBtn, PerfilStyles.cancelBtn]}
                  onPress={handleCancelEdit}
                  disabled={saving}>
                  <Text style={PerfilStyles.cancelBtnText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[PerfilStyles.editBtn, PerfilStyles.saveBtn]}
                  onPress={handleUpdatePhone}
                  disabled={saving}>
                  {saving ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={PerfilStyles.saveBtnText}>Gravar</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={PerfilStyles.infoRow}>
              <AntDesign name="phone" size={20} color="#666" />
              <Text
                style={[
                  PerfilStyles.infoText,
                  { fontWeight: userData?.phoneNumber ? 'normal' : '300' },
                ]}>
                {userData?.phoneNumber || 'Não informado'}
              </Text>
            </View>
          )}
        </View>

        <View style={PerfilStyles.statsSection}>
          <Text style={PerfilStyles.label}>Estatísticas</Text>
          <View style={PerfilStyles.statsRow}>
            <View style={PerfilStyles.statItem}>
              <Text style={PerfilStyles.statNumber}>{stats.totalLists}</Text>
              <Text style={PerfilStyles.statLabel}>Listas</Text>
            </View>
            <View style={PerfilStyles.statItem}>
              <Text style={PerfilStyles.statNumber}>{stats.totalTasks}</Text>
              <Text style={PerfilStyles.statLabel}>Tarefas</Text>
            </View>
            <View style={PerfilStyles.statItem}>
              <Text style={PerfilStyles.statNumber}>{stats.completedTasks}</Text>
              <Text style={PerfilStyles.statLabel}>Concluídas</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={PerfilStyles.logoutBtn} onPress={handleLogout}>
        <AntDesign name="logout" size={20} color="white" />
        <Text style={PerfilStyles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}