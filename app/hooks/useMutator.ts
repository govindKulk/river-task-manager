import { create } from 'zustand'


interface MutatorStore {
    shouldMutate: boolean;
    yesMutate: () => void;
    noMutate: () => void;
}

const useMutator = create<MutatorStore>(
    (set) => {
        return {
            shouldMutate: false,
            yesMutate: () => set({ shouldMutate: true }),
            noMutate: () => set({ shouldMutate: false })
        }
    }
)

export default useMutator