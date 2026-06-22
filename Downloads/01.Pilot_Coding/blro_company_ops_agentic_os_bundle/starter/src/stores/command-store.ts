import { create } from "zustand";

type CommandState = {
  prompt: string;
  setPrompt: (prompt: string) => void;
};

export const useCommandStore = create<CommandState>((set) => ({
  prompt: "",
  setPrompt: (prompt) => set({ prompt }),
}));
