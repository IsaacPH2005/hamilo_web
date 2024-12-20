import { defineStore } from 'pinia';

export const useBatchStore = defineStore('batchStore', {
  state: () => ({
    batchId: null,
  }),
  actions: {
    setBatchId(id) {
      this.batchId = id;
    },
  },
});