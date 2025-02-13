import { BASE_URL } from "@/main";
import { fetchWithAuth } from './api.service';

export interface Expense {
  _id?: string;
  title: string;
  amount: number;
  date: string;
  people: string[];
  category: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PieChartData {
  category: string;
  amount: number;
}

export interface MonthlyExpenseData {
  month: string;
  earning: number;
  expense: number;
}

export const expenseService = {
  async getExpenses(): Promise<Expense[]> {
    const response = await fetchWithAuth(`${BASE_URL}/expenses`);
    return response.json();
  },

  async createExpense(expenseData: Omit<Expense, '_id' | 'createdAt' | 'updatedAt'>): Promise<Expense> {
    const response = await fetchWithAuth(`${BASE_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    });
    return response.json();
  },

  async updateExpense(id: string, expenseData: Partial<Expense>): Promise<Expense> {
    const response = await fetchWithAuth(`${BASE_URL}/expenses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    });
    return response.json();
  },

  async deleteExpense(id: string): Promise<void> {
    await fetchWithAuth(`${BASE_URL}/expenses/${id}`, {
      method: 'DELETE',
    });
  },

  async getPieChartData(): Promise<PieChartData[]> {
    const response = await fetchWithAuth(`${BASE_URL}/charts/pie`);
    return response.json();
  },

  async getExpenseGraphData(): Promise<MonthlyExpenseData[]> {
    const response = await fetchWithAuth(`${BASE_URL}/charts/expense-graph`);
    return response.json();
  }
};