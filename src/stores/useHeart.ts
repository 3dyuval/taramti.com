import {defineStore} from 'pinia'
import { ref, computed, watch } from 'vue';

const localStorageKey = 'heart';

export const useHeart = defineStore('heartStore', () => {

const hearts = ref(getHeartedItems());


function getHeartedItems(): string[] {
  const savedItems = localStorage.getItem("heart");
  return savedItems ? JSON.parse(savedItems) : [];
}

function add(value: string): void {
    if (!value || hearts.value.includes(value)) return;
    hearts.value = [...hearts.value, value];
  localStorage.setItem("heart", JSON.stringify(hearts.value));
}

function remove (key: number): void {
  hearts.value.splice(key, 1);
  localStorage.setItem("heart", JSON.stringify(hearts.value));
}

function isHeart(value: string): boolean {
  return hearts.value.includes(value);
}


return {
    hearts,
    add,
    isHeart,
    remove
}

})