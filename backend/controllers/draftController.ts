
import { Draft } from '../models';

const STORAGE_KEY = 'hair_aura_drafts';

const initStorage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  }
};

export const DraftController = {
  getAll: (): Draft[] => {
    initStorage();
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  getByType: (type: 'product' | 'blog'): Draft[] => {
    const drafts = DraftController.getAll();
    return drafts.filter(d => d.type === type);
  },

  save: (type: 'product' | 'blog', content: any, id?: string): Draft => {
    const drafts = DraftController.getAll();
    const now = new Date().toISOString();
    
    let draft: Draft;

    if (id) {
      const index = drafts.findIndex(d => d.id === id);
      if (index !== -1) {
        drafts[index] = { ...drafts[index], content, updatedAt: now };
        draft = drafts[index];
      } else {
         // Create new if ID not found (fallback)
         draft = { id: Date.now().toString(), type, content, updatedAt: now };
         drafts.push(draft);
      }
    } else {
      draft = {
        id: Date.now().toString(),
        type,
        content,
        updatedAt: now
      };
      drafts.push(draft);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    return draft;
  },

  delete: (id: string): void => {
    const drafts = DraftController.getAll();
    const filtered = drafts.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
