/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-09-02 10:55
*****************************************************************************************/

import { useModalStore } from 'stores/modalStore';
import React from 'react'
import { Dialog } from 'radix-ui';

export const GlobalModal = () => {

    // ===== CONSTS =====
    const { isOpen, content, closeModal, showHiddenBtn } = useModalStore();

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeModal()}>
            {/* Add z-index to the overlay and background */}
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
            <Dialog.Content
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 w-full max-w-md shadow-lg z-[51]"
                onEscapeKeyDown={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
            >
                {content}

                {showHiddenBtn &&
                    <Dialog.Close
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        onClick={closeModal}
                    >
                        ✕
                    </Dialog.Close>
                }
            </Dialog.Content>
        </Dialog.Root>
    )
}