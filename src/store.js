import { writable } from "svelte/store";

export const score = writable(0);
export const apiUrl = writable("");
export const numberOfQuestions = writable(10);
