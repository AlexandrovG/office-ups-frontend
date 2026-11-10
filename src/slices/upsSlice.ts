import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';
import { MOCK_DATA } from '../mock';
import type { UpsItem } from '../mock';

interface UpsState {
  items: UpsItem[];
  loading: boolean;
  filterMinCapacity: number;
  filterMaxCapacity: number;
}

const initialState: UpsState = {
  items: [],
  loading: false,
  filterMinCapacity: 0,
  filterMaxCapacity: 0,
};

export const fetchUpsList = createAsyncThunk(
  'ups/fetchUpsList',
  async (_, { getState }) => {
    const state = getState() as { ups: UpsState };
    try {
      const response = await api.uninterruptiblePowerSupplies.uninterruptiblePowerSuppliesList({
        min_capacity: state.ups.filterMinCapacity || undefined,
        max_capacity: state.ups.filterMaxCapacity || undefined,
      });
      return { items: response.data, source: 'api' as const };
    } catch (error) {
      return { items: MOCK_DATA, source: 'mock' as const };
    }
  }
);

const upsSlice = createSlice({
  name: 'ups',
  initialState,
  reducers: {
    setFilterMin: (state, action: PayloadAction<number>) => { state.filterMinCapacity = action.payload; },
    setFilterMax: (state, action: PayloadAction<number>) => { state.filterMaxCapacity = action.payload; },
    resetFilters: (state) => { state.filterMinCapacity = 0; state.filterMaxCapacity = 0; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpsList.pending, (state) => { state.loading = true; })
      .addCase(fetchUpsList.fulfilled, (state, action) => {
        state.loading = false;
        
        if (action.payload.source === 'mock') {
          state.items = action.payload.items;
        } else {
          state.items = action.payload.items.map((item: any) => {
            const formatUrl = (url: string) => {
              if (!url) return "";
              if (url.startsWith("http")) {
                return url.replace("http://localhost:9000", "/s3");
              }
              return `/s3/ups-media/${url}`;
            };

            return {
              id: item.id,
              ups_name: item.ups_name,
              description: item.description,
              capacity: item.capacity,
              max_current: item.max_current,
              image_url: formatUrl(item.image_url),
              video_url: formatUrl(item.video_url),
              likes_count: item.likes_count || 0,
              attributes: item.attributes ? item.attributes.map((a: any) => ({
                id: a.id,
                name: a.attribute ? a.attribute.name : (a.name || 'Без названия'),
                value: a.value || ""
              })) : []
            };
          });
        }
      })
      .addCase(fetchUpsList.rejected, (state) => { state.loading = false; });
  },
});

export const { setFilterMin, setFilterMax, resetFilters } = upsSlice.actions;
export default upsSlice.reducer;