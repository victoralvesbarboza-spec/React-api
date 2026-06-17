import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchFinanceReport, type FormData } from './simulationUtils';

interface Props {
  data: FormData;
  onReset: () => void;
}

const SimulationCard: React.FC<Props> = ({ data, onReset }) => {
  const [report, setReport] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getReport = async () => {
      setLoading(true);
      setError('');
      setReport('');

      try {
        // Substitua pela sua chave real gerada no painel Z.ai
        const apiKey = '94476bf1d2304bb894b39dcf1b54ae7c.NmePmkaJabElkDdJ'; 
        
        if (!apiKey || apiKey === '94476bf1d2304bb894b39dcf1b54ae7c.NmePmkaJabElkDdJ') {
          throw new Error('Configure uma chave de API válida no arquivo SimulationCard.tsx');
        }

        const text = await fetchFinanceReport(data, apiKey);
        setReport(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido ao gerar relatório.');
      } finally {
        setLoading(false);
      }
    };

    getReport();
  }, [data]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📈 Viabilidade Financeira</Text>
        <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
          <Text style={styles.resetBtnText}>Nova Simulação</Text>
        </TouchableOpacity>
      </View>

      {/* Resumo do Objetivo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Objetivo Definido</Text>
        <Text style={styles.text}><Text style={styles.bold}>Meta:</Text> {data.goal}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Valor:</Text> R$ {data.goalCost.toLocaleString('pt-BR')}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Prazo:</Text> {data.goalMonths} meses</Text>
      </View>

      {/* Estado de Carregamento */}
      {loading && (
        <View style={[styles.card, styles.center]}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>🤖 Consultando GLM-4.5-Flash e estruturando seu relatório...</Text>
        </View>
      )}

      {/* Estado de Erro */}
      {error ? (
        <View style={[styles.card, styles.errorCard]}>
          <Text style={styles.errorText}>❌ Ocorreu um erro:</Text>
          <Text style={styles.text}>{error}</Text>
        </View>
      ) : null}

      {/* Exibição do Relatório Retornado */}
      {!loading && !error && report ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🤖 Relatório de Inteligência</Text>
          <Text style={styles.reportText}>{report}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

// Estilização nativa para o app mobile
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  resetBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  resetBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1C1C1E',
  },
  text: {
    fontSize: 14,
    color: '#3A3A3C',
    marginBottom: 6,
  },
  bold: {
    fontWeight: 'bold',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  errorCard: {
    borderColor: '#FF3B30',
    borderWidth: 1,
  },
  errorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 6,
  },
  reportText: {
    fontSize: 14,
    color: '#1C1C1E',
    lineHeight: 22,
  },
});

export default SimulationCard;
