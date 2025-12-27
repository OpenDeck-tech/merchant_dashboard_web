/**
 * API Client for Merchant Dashboard
 */
import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

class MerchantAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add API key to all requests
    this.client.interceptors.request.use((config) => {
      const apiKey = this.getApiKey();
      if (apiKey) {
        config.headers['X-API-Key'] = apiKey;
      }
      return config;
    });

    // Handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Unauthorized - clear API key and redirect to login
          this.clearApiKey();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private getApiKey(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('opendeck_api_key');
  }

  private clearApiKey(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('opendeck_api_key');
  }

  setApiKey(apiKey: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('opendeck_api_key', apiKey);
  }

  logout(): void {
    this.clearApiKey();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  // Dashboard endpoints
  async getDashboardOverview(period: string = 'month') {
    const { data } = await this.client.get(`/api/merchant/dashboard/overview?period=${period}`);
    return data;
  }

  async getDashboardStats(period: string = 'month') {
    const { data } = await this.client.get(`/api/merchant/dashboard/stats?period=${period}`);
    return data;
  }

  async getRealtimeStats() {
    const { data } = await this.client.get('/api/merchant/dashboard/realtime');
    return data;
  }

  // Transaction endpoints
  async getTransactions(params: {
    page?: number;
    page_size?: number;
    player_account_id?: string;
    transaction_type?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
  }) {
    const { data } = await this.client.get('/api/merchant/transactions', { params });
    return data;
  }

  async getTransaction(transactionId: string) {
    const { data } = await this.client.get(`/api/merchant/transactions/${transactionId}`);
    return data;
  }

  async exportTransactions(startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    
    const { data } = await this.client.get(`/api/merchant/transactions/export/csv?${params}`, {
      responseType: 'blob',
    });
    return data;
  }

  // Player endpoints
  async getPlayers(params: {
    page?: number;
    page_size?: number;
    search?: string;
    is_vip?: boolean;
    is_active?: boolean;
  }) {
    const { data } = await this.client.get('/api/merchant/players', { params });
    return data;
  }

  async getPlayer(playerId: string) {
    const { data } = await this.client.get(`/api/merchant/players/${playerId}`);
    return data;
  }

  async updatePlayerLimits(
    playerId: string,
    limits: {
      daily_limit?: number;
      weekly_limit?: number;
      monthly_limit?: number;
    }
  ) {
    const { data } = await this.client.patch(
      `/api/merchant/players/${playerId}/limits`,
      null,
      { params: limits }
    );
    return data;
  }
}

export const merchantAPI = new MerchantAPI();

