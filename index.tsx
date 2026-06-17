import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import SimulationCard from '../SimulationCard';
import type { FormData } from '../simulationUtils';

export default function HomeScreen() {
  // Estado para controlar se exibe o formulário ou o relatório da IA
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  // Estados dos campos do formulário
  const [goal, setGoal] = useState('');
  const [goalCost, setGoalCost] = useState('');
  const [goalMonths, setGoalMonths] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [essentialExpenses, setEssentialExpenses] = useState('');
  const [debts, setDebts] = useState('');

  // Função disparada ao clicar em "Gerar Relatório"
  const handleSubmit = () => {
    if (!goal || !goalCost || !goalMonths || !monthlyIncome) {
      alert('Por favor, preencha os campos obrigatórios!');
      return;
    }

    setSubmittedData({
      goal,
      goalCost: parseFloat(goalCost) || 0,
      goalMonths: parseInt(goalMonths) || 1,
      monthlyIncome: parseFloat(monthlyIncome) || 0,
      essentialExpenses: parseFloat(essentialExpenses) || 0,
      debts: parseFloat(debts) || 0,
    });
  };

  // Se o usuário já enviou os dados, exibe a tela do relatório da IA
  if (submittedData) {
    return (
      <SimulationCard 
        data={submittedData} 
        onReset={() => setSubmittedData(null)} 
      />
    );
  }

  // Caso contrário, exibe o formulário de entrada
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎯 Simulador de Metas</Text>
      <Text style={styles.subtitle}>Preencha seus dados para receber uma análise financeira com IA.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Qual é o seu objetivo/sonho? *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: Comprar um carro, Viagem" 
          value={goal} 
          onChangeText={setGoal}
        />

        <Text style={styles.label}>Quanto custa esse objetivo? (R$) *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: 20000" 
          keyboardType="numeric"
          value={goalCost} 
          onChangeText={setGoalCost}
        />

        <Text style={styles.label}>Em quantos meses deseja conquistar? *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: 12" 
          keyboardType="numeric"
          value={goalMonths} 
          onChangeText={setGoalMonths}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Sua renda mensal líquida (R$) *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: 5000" 
          keyboardType="numeric"
          value={monthlyIncome} 
          onChangeText={setMonthlyIncome}
        />

        <Text style={styles.label}>Despesas essenciais mensais (R$)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: 2500" 
          keyboardType="numeric"
          value={essentialExpenses} 
          onChangeText={setEssentialExpenses}
        />

        <Text style={styles.label}>Dívidas ou parcelas mensais (R$)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: 500" 
          keyboardType="numeric"
          value={debts} 
          onChangeText={setDebts}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>🚀 Gerar Relatório de Viabilidade</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginTop: 20,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#636366',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3A3A3C',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 16,
    color: '#1C1C1E',
  },
  button: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
