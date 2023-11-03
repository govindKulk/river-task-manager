import { create } from "zustand";


interface EditModalInterface {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useEditModal = create<EditModalInterface>((set) => {
    return {
        isOpen: false,
        onOpen: () => {
            console.log("clicked");
            set({
                isOpen: true
            })
        },
        onClose: () => set({
            isOpen: false
        })
    }
}) 

export default useEditModal