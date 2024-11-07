import { bank, code } from "@/types";
import { create } from "zustand";

export type ModalType = "addCode";

interface ModalData {
  bank?: bank;
  bankId?: string;
  code?: code;
  fetching?: boolean;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  isFetching: (data?: ModalData) => void;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  isFetching: (data = {}) => set({ data }),
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
