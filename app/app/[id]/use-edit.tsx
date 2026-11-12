import { create } from "zustand";

type State = {
  isEditable: boolean;
  toggleEditable: () => void;
  setIsEditable: (isEditable: boolean) => void;
};

export const useEditContent = create<State>((set) => ({
  isEditable: false,
  toggleEditable: () => set((state) => ({ isEditable: !state.isEditable })),
  setIsEditable: (isEditable) => set({ isEditable }),
}));
