// App.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

export default function App() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [limite, setLimite] = useState(2500);
  const [estudante, setEstudante] = useState(false);

  return (
    <View style={styles.container}>
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

      <Button title="Abrir Conta" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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
});
