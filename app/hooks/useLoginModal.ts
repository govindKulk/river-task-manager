import { create } from 'zustand'

interface LoginModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLoginModal = create<LoginModalStore>(
    (set) => {
        return {
            isOpen: false,
            onOpen: () => {
                console.log("clicked")
                set({ isOpen: true })},
            onClose: () => set({ isOpen: false })
            }
    }
)

export default useLoginModal