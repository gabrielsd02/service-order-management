import { create } from "zustand";

type NetworkState = {
    isConnectedInternet: boolean;
    setIsConnectedInternet: (value: boolean) => void;
};

export const useNetworkStore = create<NetworkState>((set) => ({
    isConnectedInternet: true,
    setIsConnectedInternet: (value) => set({ isConnectedInternet: value }),
}));