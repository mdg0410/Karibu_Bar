import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';

interface SummaryData {
  dailySales: number;
  monthlySales: number;
  totalUsers: number;
  totalProducts: number;
  totalSongs: number;
  activeTables: number;
  pendingOrders: number;
}

interface DashboardState {
  summary: SummaryData | null;
  recentOrders: any[];
  popularSongs: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  summary: null,
  recentOrders: [],
  popularSongs: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const [summaryRes, ordersRes, songsRes] = await Promise.all([
        api.get('/dashboard/summary'),
        api.get('/dashboard/recent-orders'),
        api.get('/dashboard/popular-songs')
      ]);
      
      return {
        summary: summaryRes.data,
        recentOrders: ordersRes.data,
        popularSongs: songsRes.data
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al cargar datos del dashboard');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearDashboard(state) {
      state.summary = null;
      state.recentOrders = [];
      state.popularSongs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.summary;
        state.recentOrders = action.payload.recentOrders;
        state.popularSongs = action.payload.popularSongs;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLoading, setError, clearDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;
