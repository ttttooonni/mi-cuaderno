import type { AppState, YearClose } from "./types";

const LS_KEY = "mi-apiario:v1";

export const STORE_NAMES = [
  "apiaries",
  "colonies",
  "queens",
  "actions",
  "health",
  "production",
  "yearCloses",
] as const;

type StoreName = (typeof STORE_NAMES)[number];

const STORE_KEYS: Record<StoreName, keyof AppState> = {
  apiaries: "apiaries",
  colonies: "colonies",
  queens: "queens",
  actions: "actions",
  health: "health",
  production: "production",
  yearCloses: "yearCloses",
};

let cache: AppState = emptyClone();
let hydrated = false;

function emptyClone(): AppState {
  return {
    apiaries: [],
    colonies: [],
    queens: [],
    actions: [],
    health: [],
    production: [],
    yearCloses: [],
  };
}

function cloneState(state: AppState): AppState {
  return JSON.parse(JSON.stringify(state)) as AppState;
}

function loadFromLocalStorage(): AppState {
  if (typeof window === "undefined") return emptyClone();
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return emptyClone();
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      apiaries: parsed.apiaries ?? [],
      colonies: parsed.colonies ?? [],
      queens: parsed.queens ?? [],
      actions: parsed.actions ?? [],
      health: parsed.health ?? [],
      production: parsed.production ?? [],
      yearCloses: parsed.yearCloses ?? [],
    };
  } catch {
    return emptyClone();
  }
}

function persist(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(cache));
  } catch {
    // Private mode / iframe quota: keep working from memory.
  }
}

function hydrate(): void {
  if (hydrated) return;
  hydrated = true;
  cache = loadFromLocalStorage();
}

export function isIndexedDbAvailable(): boolean {
  return false;
}

export async function loadState(): Promise<AppState> {
  hydrate();
  return cloneState(cache);
}

export async function replaceAll(state: AppState): Promise<void> {
  hydrate();
  cache = cloneState(state);
  persist();
}

export async function putRecord<T>(store: StoreName, row: T): Promise<void> {
  hydrate();
  const keyName = store === "yearCloses" ? "year" : "id";
  const list = cache[STORE_KEYS[store]] as unknown as Array<Record<string, unknown>>;
  const key = (row as Record<string, unknown>)[keyName];
  const index = list.findIndex((item) => item[keyName] === key);
  if (index >= 0) list[index] = row as Record<string, unknown>;
  else list.push(row as Record<string, unknown>);
  persist();
}

export async function deleteRecord(store: StoreName, id: IDBValidKey): Promise<void> {
  hydrate();
  switch (store) {
    case "apiaries":
      cache.apiaries = cache.apiaries.filter((item) => item.id !== id);
      break;
    case "colonies":
      cache.colonies = cache.colonies.filter((item) => item.id !== id);
      break;
    case "queens":
      cache.queens = cache.queens.filter((item) => item.id !== id);
      break;
    case "actions":
      cache.actions = cache.actions.filter((item) => item.id !== id);
      break;
    case "health":
      cache.health = cache.health.filter((item) => item.id !== id);
      break;
    case "production":
      cache.production = cache.production.filter((item) => item.id !== id);
      break;
    case "yearCloses":
      cache.yearCloses = cache.yearCloses.filter((item) => item.year !== id);
      break;
  }
  persist();
}

export async function deleteApiaryCascade(_state: AppState, apiaryId: string): Promise<void> {
  hydrate();
  const colonyIds = new Set(
    cache.colonies.filter((item) => item.apiaryId === apiaryId).map((item) => item.id),
  );
  cache.apiaries = cache.apiaries.filter((item) => item.id !== apiaryId);
  cache.colonies = cache.colonies.filter((item) => item.apiaryId !== apiaryId);
  cache.queens = cache.queens.filter((item) => !colonyIds.has(item.colonyId));
  cache.actions = cache.actions.filter((item) => !colonyIds.has(item.colonyId));
  cache.health = cache.health.filter((item) => !colonyIds.has(item.colonyId));
  persist();
}

export async function deleteColonyCascade(_state: AppState, colonyId: string): Promise<void> {
  hydrate();
  cache.colonies = cache.colonies.filter((item) => item.id !== colonyId);
  cache.queens = cache.queens.filter((item) => item.colonyId !== colonyId);
  cache.actions = cache.actions.filter((item) => item.colonyId !== colonyId);
  cache.health = cache.health.filter((item) => item.colonyId !== colonyId);
  persist();
}

export async function upsertYearClose(row: YearClose): Promise<void> {
  await putRecord("yearCloses", row);
}
