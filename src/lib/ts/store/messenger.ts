import { writable } from "svelte/store";

interface MessageData {
  id: number,
  user: string,
  message: string
}

export const messenger = writable<MessageData | null>()