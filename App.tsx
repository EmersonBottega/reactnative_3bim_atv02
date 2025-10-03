import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

export default function App() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [limite, setLimite] = useState(2500);
  const [estudante, setEstudante] = useState(false);

  const [dadosConfirmados, setDadosConfirmados] = useState<null | {
    nome: string;
    idade: string;
    sexo: string;
    limite: number;
    estudante: boolean;
  }>(null);

  function formularioValido() {
    const nomeValido = nome.trim().length > 0;
    const idadeNum = parseInt(idade);
    const idadeValida = idade && !isNaN(idadeNum) && idadeNum >= 18;
    const sexoValido = sexo !== '';
    return nomeValido && idadeValida && sexoValido;
  }

  function validarCampos() {
    if (!nome.trim()) {
      Alert.alert('Erro', 'O nome é obrigatório.');
      return;
    }

    const idadeNum = parseInt(idade);
    if (!idade || isNaN(idadeNum)) {
      Alert.alert('Erro', 'A idade deve ser um número válido.');
      return;
    }

    if (idadeNum < 18) {
      Alert.alert('Erro', 'Você deve ter 18 anos ou mais.');
      return;
    }

    if (!sexo) {
      Alert.alert('Erro', 'Selecione o sexo.');
      return;
    }

    const resumo = `
      Nome: ${nome}
      Idade: ${idadeNum}
      Sexo: ${sexo}
      Limite: R$ ${limite.toFixed(2)}
      Estudante: ${estudante ? 'Sim' : 'Não'}
    `;

    Alert.alert('Conta criada com sucesso!', resumo.trim());

    setDadosConfirmados({
      nome,
      idade,
      sexo,
      limite,
      estudante,
    });
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
        >
          <Picker.Item label="Selecione o sexo" value="" />
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Feminino" value="Feminino" />
          <Picker.Item label="Outro" value="Outro" />
        </Picker>
      </View>

      <Text style={styles.label}>Limite da conta: R$ {limite.toFixed(0)}</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
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

      <Button
        title="Abrir Conta"
        onPress={validarCampos}
        disabled={!formularioValido()}
      />

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
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    marginBottom: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    justifyContent: 'space-between',
  },
  resultado: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#00aa00',
    borderRadius: 8,
    backgroundColor: '#e8fbe8',
  },
  resultadoTitulo: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16,
  },
});
