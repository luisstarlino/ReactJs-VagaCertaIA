/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-09-02 10:50
*****************************************************************************************/
import { create } from 'zustand';
import React from 'react';

interface ModalState {
    isOpen: boolean
    content: React.ReactNode | null
    openModal: (content: React.ReactNode) => void
    closeModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    content: null,
    openModal: (content) => set({ isOpen: true, content }),
    closeModal: () => set({ isOpen: false, content: null }),
}))
