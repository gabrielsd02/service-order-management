import { create } from "zustand";

type IsLoadingState = {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
};

export const useIsLoadingState = create<IsLoadingState>((set) => ({
    isLoading: false,
    setIsLoading: (value) => set({ isLoading: value }),
}));