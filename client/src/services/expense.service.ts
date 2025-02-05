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
  }
};