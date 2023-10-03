import { IStorage } from './../../server/repository'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { CookieStorage } from '@/helpers/cookieStore'

export const useHeart = defineStore('heartStore', () => {

  const repo: IStorage = new CookieStorage()

  const hearts = ref([])

  function add(value: string): void {
    if (!value || hearts.value.includes(value)) return
    hearts.value = [...hearts.value, value]
  }

  function toggle(value): void {
    if (!value) return
    if (isHeart(value)) {
      remove(value)
    } else {
      add(value)
    }
  }

  function remove(value: number): void {
    hearts.delete(value)
  }

  function removeAll(): void {
    hearts.value.clear()
  }

  function isHeart(value: string): boolean {
    return hearts.value.includes(value)
  }

  watch(hearts, (value) => {
    repo.save(value)
  })


  return {
    hearts,
    add,
    isHeart,
    remove,
    removeAll,
    toggle
  }

})