import { create } from 'zustand';
import axios from 'axios';

interface Supplement {
  id: number;
  name: string;
  time?: string;
  memo?: string;
}

interface SupplementStore {
  supplements: Supplement[];
  fetchSupplements: () => void;
  deleteSupplement: (supplementId: number) => void;
}

export const useSupplementStore = create<SupplementStore>((set) => ({
  supplements: [],
  fetchSupplements: async () => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/api/supplements', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('API Response:', response.data);
      set({ supplements: Array.isArray(response.data) ? response.data : [] });
    } catch (error) {
      console.error('Error fetching supplements:', error);
      set({ supplements: [] });
    }
  },
  deleteSupplement: async (supplementId: number) => {

    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/supplements/schedules/${supplementId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        supplements: state.supplements.filter((supplement) => supplement.id !== supplementId),
      }));

      console.log(`Supplement with id ${supplementId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting supplement:', error);
    }
  },
}));
