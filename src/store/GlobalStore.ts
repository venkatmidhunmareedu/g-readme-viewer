import { create } from 'zustand'


interface StoreState {
    markdown: string,
    setMarkdown: (markdown: string) => void;
}

const useStore = create<StoreState>((set) => ({
    markdown: '',
    setMarkdown: (markdown: string) => set({ markdown }),
}))


export default useStore