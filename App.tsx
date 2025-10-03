import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

export default function App() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [limite, setLimite] = useState(2500);
  const [estudante, setEstudante] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const [dadosConfirmados, setDadosConfirmados] = useState<null | {
    nome: string;
    idade: string;
    sexo: string;
    limite: number;
    estudante: boolean;
  }>(null);

  function validarCampos() {
    const idadeNum = parseInt(idade);
  
    const resumo = `
      Nome: ${nome}
      Idade: ${idadeNum}
      Sexo: ${sexo}
      Limite: R$ ${limite.toFixed(2)}
      Estudante: ${estudante ? 'Sim' : 'Não'}
    `;
  
    setDadosConfirmados({
      nome,
      idade,
      sexo,
      limite,
      estudante,
    });
  }

  function formularioValido() {
    const nomeValido = nome.trim().length > 0;
    const idadeNum = parseInt(idade);
    const idadeValida = idade && !isNaN(idadeNum) && idadeNum >= 18;
    const sexoValido = sexo !== '';
    return nomeValido && idadeValida && sexoValido;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Idade:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua idade"
        keyboardType="numeric"
        value={idade}
        onChangeText={setIdade}
      />

      <Text style={styles.label}>Sexo:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sexo}
          onValueChange={(itemValue) => setSexo(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o sexo" value="" />
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Feminino" value="Feminino" />
          <Picker.Item label="Outro" value="Outro" />
        </Picker>
      </View>

      <Text style={styles.label}>Limite da conta: R$ {limite.toFixed(0)}</Text>
      <Slider
        style={[styles.slider, Platform.OS === 'web' ? { cursor: 'pointer' } : null]}
        minimumValue={500}
        maximumValue={10000}
        step={100}
        value={limite}
        onValueChange={setLimite}
        minimumTrackTintColor="#00f"
        maximumTrackTintColor="#000"
        thumbTintColor="#000"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Estudante?</Text>
        <Switch
          value={estudante}
          onValueChange={setEstudante}
        />
      </View>

      <Pressable
        onPress={validarCampos}
        disabled={!formularioValido()}
        style={({ pressed }) => [
          styles.botao,
          pressed || isHovering ? styles.botaoHover : null,
          !formularioValido() ? styles.botaoDesabilitado : null,
        ]}
        onHoverIn={() => setIsHovering(true)}
        onHoverOut={() => setIsHovering(false)}
      >
        <Text style={styles.textoBotao}>Abrir Conta</Text>
      </Pressable>

      {dadosConfirmados && (
        <View style={styles.resultado}>
          <Text style={styles.resultadoTitulo}>Dados Confirmados:</Text>
          <Text>Nome: {dadosConfirmados.nome}</Text>
          <Text>Idade: {dadosConfirmados.idade}</Text>
          <Text>Sexo: {dadosConfirmados.sexo}</Text>
          <Text>Limite: R$ {dadosConfirmados.limite.toFixed(2)}</Text>
          <Text>Estudante: {dadosConfirmados.estudante ? 'Sim' : 'Não'}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    minHeight: '100%',
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    alignSelf: 'center',
  },
  input: {
    width: 300,
    height: 44,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  pickerContainer: {
    width: 300,
    height: 44,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 12,
  },
  picker: {
    width: '100%',
    height: '100%',
  },
  slider: {
    width: 300,
    height: 44,
    marginBottom: 20,
  },
  switchContainer: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  botao: {
    width: 300,
    height: 50,
    backgroundColor: '#0066cc',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  botaoHover: {
    transform: [{ scale: 1.05 }],
  },
  botaoDesabilitado: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#00aa00',
    borderRadius: 8,
    backgroundColor: '#e8fbe8',
    width: 300,
  },
  resultadoTitulo: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16,
  },
});
