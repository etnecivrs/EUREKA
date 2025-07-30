import { StyleSheet } from 'react-native';

// Compilação de todos os estilos dos componentes
export const styles = StyleSheet.create({
  
  // ===== DEFINIÇÕES SCREEN =====
  definicoes_container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  definicoes_label: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
    
  },
  definicoes_darkBackground: {
    backgroundColor: '#121212',
  },
  definicoes_darkText: {
    color: '#fff',
  },
  definicoes_deleteButton: {
    marginTop: 40,
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
  },
  definicoes_deleteText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  // ===== EDITAR LISTA SCREEN =====
  editarLista_loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  editarLista_container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  editarLista_label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  editarLista_input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 8,
  },
  editarLista_tarefaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
  },
  editarLista_checkbox: {
    width: 28,
    height: 28,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#03f463',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 10,
  },
  editarLista_checkboxChecked: {
    backgroundColor: '#03f463',
  },
  editarLista_tarefaInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
  },
  editarLista_tarefaDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  editarLista_notaInput: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    padding: 8,
    marginTop: 5,
    fontSize: 13,
    color: '#333',
  },
  editarLista_notaResumo: {
    fontStyle: 'italic',
    color: '#666',
    marginTop: 5,
  },
  editarLista_toggleNotaBtn: {
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  editarLista_toggleNotaText: {
    fontSize: 12,
    color: '#007bff',
  },
  editarLista_adicionarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    
  },
  editarLista_adicionarText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  editarLista_salvarBtn: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 30,
  },
  editarLista_salvarText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editarLista_userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  editarLista_userText: {
    fontSize: 14,
    color: '#444',
  },

  // ===== HOME SCREEN =====
  home_container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  home_botaoNovaLista: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 10,
  },
  home_botaoTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  home_input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  home_modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  home_listaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  home_listaTitle: {
    fontSize: 18,
  },
  home_adicionarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  home_adicionarText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },

  // ===== LOGIN SCREEN =====
  login_container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  login_innerContainer: {
    // alignItems: 'center', // se quiser centralizar horizontalmente
  },
  login_input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  login_button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 15,
  },
  login_buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  login_linkText: {
    color: 'red',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  login_logo: {
    width: 400,
    height: 300,
    marginBottom: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  // ===== PERFIL SCREEN =====
  perfil_container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  perfil_loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  perfil_loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  perfil_header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  perfil_avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  perfil_avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#03f463',
  },
  perfil_avatarEditBtn: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#03f463',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  perfil_welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  perfil_nameEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(3, 244, 99, 0.1)',
    marginBottom: 10,
  },
  perfil_editIcon: {
    marginLeft: 8,
    opacity: 0.7,
  },
  perfil_modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  perfil_modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  perfil_modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  perfil_modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  perfil_modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  perfil_modalBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  perfil_refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#f0f9ff',
  },
  perfil_refreshText: {
    color: '#03f463',
    fontSize: 12,
    marginLeft: 5,
    fontWeight: '600',
  },
  perfil_profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  perfil_infoSection: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  perfil_labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  perfil_label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  perfil_infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  perfil_infoText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
    flex: 1,
  },
  perfil_editContainer: {
    marginTop: 5,
  },
  perfil_editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  perfil_phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginLeft: 10,
    fontSize: 16,
  },
  perfil_editButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  perfil_editBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 10,
  },
  perfil_cancelBtn: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  perfil_saveBtn: {
    backgroundColor: '#03f463',
  },
  perfil_cancelBtnText: {
    color: '#666',
    fontWeight: '600',
  },
  perfil_saveBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  perfil_statsSection: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  perfil_statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  perfil_statItem: {
    alignItems: 'center',
  },
  perfil_statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#03f463',
  },
  perfil_statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  perfil_logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ff4757',
  },
  perfil_logoutText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },

  // ===== SIGNUP SCREEN =====
  signup_container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  signup_header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
  },
  signup_input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  signup_button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 15,
  },
  signup_buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signup_linkText: {
    color: 'red',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 14,
  },

  // ===== ESTILOS COMUNS/GLOBAIS =====
  // Cores principais da aplicação
  primaryColor: '#03f463',
  secondaryColor: 'red',
  backgroundColor: '#fff',
  textColor: '#333',
  grayColor: '#666',
  lightGrayColor: '#f8f9fa',
  borderColor: '#ccc',
  
  // Sombras comuns
  commonShadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  // Botões comuns
  primaryButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  // Inputs comuns
  commonInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  
  // Containers comuns
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Textos comuns
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  
  bodyText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  
  // Loading states
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
});

// Exportar também estilos específicos por componente para uso direto
export const DefinicoesStyles = {
  container: styles.definicoes_container,
  label: styles.definicoes_label,
  darkBackground: styles.definicoes_darkBackground,
  darkText: styles.definicoes_darkText,
  deleteButton: styles.definicoes_deleteButton,
  deleteText: styles.definicoes_deleteText,
};

export const EditarListaStyles = {
  loadingContainer: styles.editarLista_loadingContainer,
  container: styles.editarLista_container,
  label: styles.editarLista_label,
  input: styles.editarLista_input,
  tarefaContainer: styles.editarLista_tarefaContainer,
  checkbox: styles.editarLista_checkbox,
  checkboxChecked: styles.editarLista_checkboxChecked,
  tarefaInput: styles.editarLista_tarefaInput,
  tarefaDone: styles.editarLista_tarefaDone,
  notaInput: styles.editarLista_notaInput,  
  notaResumo: styles.editarLista_notaResumo,
  toggleNotaBtn: styles.editarLista_toggleNotaBtn,
  toggleNotaText: styles.editarLista_toggleNotaText,
  adicionarBtn: styles.editarLista_adicionarBtn,
  adicionarText: styles.editarLista_adicionarText,
  salvarBtn: styles.editarLista_salvarBtn,
  salvarText: styles.editarLista_salvarText,
  userRow: styles.editarLista_userRow,
  userText: styles.editarLista_userText,
};

export const HomeStyles = {
  container: styles.home_container,
  botaoNovaLista: styles.home_botaoNovaLista,
  botaoTexto: styles.home_botaoTexto,
  input: styles.home_input,
  modalContainer: styles.home_modalContainer,
  listaItem: styles.home_listaItem,
  listaTitle: styles.home_listaTitle,
  adicionarWrapper: styles.home_adicionarWrapper,
  adicionarText: styles.home_adicionarText,
};

export const LoginStyles = {
  container: styles.login_container,
  innerContainer: styles.login_innerContainer,
  input: styles.login_input,
  button: styles.login_button,
  buttonText: styles.login_buttonText,
  linkText: styles.login_linkText,
  logo: styles.login_logo,
};

export const PerfilStyles = {
  container: styles.perfil_container,
  loadingContainer: styles.perfil_loadingContainer,
  loadingText: styles.perfil_loadingText,
  header: styles.perfil_header,
  avatarContainer: styles.perfil_avatarContainer,
  avatar: styles.perfil_avatar,
  avatarEditBtn: styles.perfil_avatarEditBtn,
  welcomeText: styles.perfil_welcomeText,
  nameEditContainer: styles.perfil_nameEditContainer,
  editIcon: styles.perfil_editIcon,
  modalOverlay: styles.perfil_modalOverlay,
  modalContent: styles.perfil_modalContent,
  modalTitle: styles.perfil_modalTitle,
  modalInput: styles.perfil_modalInput,
  modalButtons: styles.perfil_modalButtons,
  modalBtn: styles.perfil_modalBtn,
  refreshBtn: styles.perfil_refreshBtn,
  refreshText: styles.perfil_refreshText,
  profileCard: styles.perfil_profileCard,
  infoSection: styles.perfil_infoSection,
  labelRow: styles.perfil_labelRow,
  label: styles.perfil_label,
  infoRow: styles.perfil_infoRow,
  infoText: styles.perfil_infoText,
  editContainer: styles.perfil_editContainer,
  editRow: styles.perfil_editRow,
  phoneInput: styles.perfil_phoneInput,
  editButtons: styles.perfil_editButtons,
  editBtn: styles.perfil_editBtn,
  cancelBtn: styles.perfil_cancelBtn,
  saveBtn: styles.perfil_saveBtn,
  cancelBtnText: styles.perfil_cancelBtnText,
  saveBtnText: styles.perfil_saveBtnText,
  statsSection: styles.perfil_statsSection,
  statsRow: styles.perfil_statsRow,
  statItem: styles.perfil_statItem,
  statNumber: styles.perfil_statNumber,
  statLabel: styles.perfil_statLabel,
  logoutBtn: styles.perfil_logoutBtn,
  logoutText: styles.perfil_logoutText,
};

export const SignupStyles = {
  container: styles.signup_container,
  header: styles.signup_header,
  input: styles.signup_input,
  button: styles.signup_button,
  buttonText: styles.signup_buttonText,
  linkText: styles.signup_linkText,
};

// Constantes de cores para uso global
export const Colors = {
  primary: '#03f463',
  secondary: 'red',
  background: '#fff',
  backgroundLight: '#f8f9fa',
  text: '#333',
  textSecondary: '#666',
  textLight: '#888',
  border: '#ccc',
  borderLight: '#eee',
  error: '#ff4757',
  success: '#03f463',
  warning: '#ffa500',
};

// Constantes de tamanhos
export const Sizes = {
  padding: 20,
  paddingSmall: 10,
  paddingLarge: 30,
  borderRadius: 8,
  borderRadiusSmall: 6,
  borderRadiusLarge: 12,
  fontSizeSmall: 12,
  fontSizeMedium: 16,
  fontSizeLarge: 18,
  fontSizeXLarge: 24,
};

export default styles;