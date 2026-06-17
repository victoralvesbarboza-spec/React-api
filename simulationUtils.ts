// Interface que define os dados do formulário financeiro
export interface FormData {
  monthlyIncome: number;
  essentialExpenses: number;
  debts: number;
  goal: string;
  goalCost: number;
  goalMonths: number;
}

/**
 * Monta o texto do prompt estruturado que será enviado para o modelo GLM
 */
export function buildPrompt(data: FormData): string {
  const available = data.monthlyIncome - data.essentialExpenses - data.debts;
  const monthlyNeeded = Math.ceil(data.goalCost / data.goalMonths);
  const commitmentPct =
    data.monthlyIncome > 0
      ? Math.round(((data.essentialExpenses + data.debts) / data.monthlyIncome) * 100)
      : 0;

  return `Você é um educador financeiro experiente. Analise o planejamento financeiro abaixo e gere um relatório detalhado em português brasileiro.

Dados do usuário:
- Renda mensal: R$ ${data.monthlyIncome.toLocaleString('pt-BR')}
- Despesas essenciais: R$ ${data.essentialExpenses.toLocaleString('pt-BR')}
- Dívidas mensais: R$ ${data.debts.toLocaleString('pt-BR')}
- Valor disponível por mês: R$ ${available.toLocaleString('pt-BR')}
- Comprometimento da renda: ${commitmentPct}%

Objetivo financeiro:
- Sonho/objetivo: ${data.goal}
- Custo total: R$ ${data.goalCost.toLocaleString('pt-BR')}
- Prazo desejado: ${data.goalMonths} meses
- Economia mensal necessária: R$ ${monthlyNeeded.toLocaleString('pt-BR')}

Gere um relatório simplificado e direto abordando: Diagnóstico geral, Viabilidade da meta, Pontos de atenção, Estratégia de economia, Sugestões de investimento e uma Mensagem motivacional.`;
}

/**
 * Função assíncrona corrigida com Promise<string> e endpoint correto
 */
export async function fetchFinanceReport(data: FormData, apiKey: string): Promise<string> {
  const prompt = buildPrompt(data);

  const response = await fetch('https://bigmodel.cn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'glm-4.5-flash',
      max_tokens: 1500,
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || errorData.message || `Erro na API: ${response.status}`);
  }

  const json = await response.json();
  const text: string = json.choices?.[0]?.message?.content ?? '';
  return text;
}
