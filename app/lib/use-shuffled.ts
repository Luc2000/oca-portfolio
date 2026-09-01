import { useRef, useSyncExternalStore } from "react";

const subscribe = () => () => {};

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Server and hydration render the original order; the client then swaps in a
// per-visit shuffle without a hydration mismatch
export function useShuffled<T>(items: T[]): T[] {
  const shuffledRef = useRef<T[] | null>(null);
  return useSyncExternalStore(
    subscribe,
    () => (shuffledRef.current ??= shuffle(items)),
    () => items
  );
}
