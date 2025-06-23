import { create } from 'zustand';

interface FilterState {
  type: string;
  city: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
  facilities: string[];
  favorites: number[];

  setType: (type: string) => void;
  setCity: (city: string) => void;
  setCategory: (category: string) => void;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  setBedrooms: (count: number) => void;
  setBathrooms: (count: number) => void;
  toggleFacility: (facility: string) => void;

  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (id: number) => void;

  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  type: '',
  city: '',
  category: '',
  minPrice: 250,
  maxPrice: 10000,
  bedrooms: 0,
  bathrooms: 0,
  facilities: [],
  favorites: [],

  setType: (type) => set({ type }),
  setCity: (city) => set({ city }),
  setCategory: (category) => set({ category }),
  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setBedrooms: (count) => set({ bedrooms: count }),
  setBathrooms: (count) => set({ bathrooms: count }),

  toggleFacility: (facility) => {
    const { facilities } = get();
    set({
      facilities: facilities.includes(facility)
        ? facilities.filter((f) => f !== facility)
        : [...facilities, facility],
    });
  },

  addFavorite: (id) => set((state) => ({ favorites: [...state.favorites, id] })),
  removeFavorite: (id) => set((state) => ({
    favorites: state.favorites.filter((f) => f !== id),
  })),
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id],
    })),

  resetFilters: () =>
    set({
      type: '',
      city: '',
      category: '',
      minPrice: 250,
      maxPrice: 10000,
      bedrooms: 0,
      bathrooms: 0,
      facilities: [],
    }),
}));
