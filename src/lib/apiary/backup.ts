import { z } from "zod";
import { todayISO } from "./dates";
import { replaceAll } from "./idb";
import { APP_ID, DATA_VERSION, type AppState, type BackupFile } from "./types";

export type BackupSaveResult = "saved" | "downloaded" | "copied" | "cancelled";

const BackupSchema = z.object({
  app: z.string(),
  version: z.number(),
  exportedAt: z.string(),
  data: z.object({
    apiaries: z.array(z.unknown()),
    colonies: z.array(z.unknown()),
    queens: z.array(z.unknown()),
    actions: z.array(z.unknown()),
    health: z.array(z.unknown()).optional(),
    production: z.array(z.unknown()),
    yearCloses: z.array(z.unknown()).optional(),
  }),
});

type SavePicker = (options: {
  suggestedName?: string;
  types?: { description: string; accept: Record<string, string[]> }[];
}) => Promise<{
  createWritable: () => Promise<{
    write: (data: string) => Promise<void>;
    close: () => Promise<void>;
  }>;
}>;

export function buildBackup(state: AppState): BackupFile {
  return {
    app: APP_ID,
    version: DATA_VERSION,
    exportedAt: new Date().toISOString(),
    data: state,
  };
}

export function backupFilename(): string {
  return `mi-apiario-backup-${todayISO()}.json`;
}

export function backupJson(state: AppState): string {
  return JSON.stringify(buildBackup(state), null, 2);
}

function inEmbeddedFrame(): boolean {
  try {
    return typeof window !== "undefined" && window.self !== window.top;
  } catch {
    return true;
  }
}

function isAbort(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

function triggerDownload(payload: string, filename: string): void {
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function tryFilePicker(payload: string, filename: string): Promise<boolean> {
  const picker = (window as Window & { showSaveFilePicker?: SavePicker }).showSaveFilePicker;
  if (!picker) return false;
  const handle = await picker({
    suggestedName: filename,
    types: [
      {
        description: "Copia de mi-apiario",
        accept: { "application/json": [".json"] },
      },
    ],
  });
  const writable = await handle.createWritable();
  await writable.write(payload);
  await writable.close();
  return true;
}

export function downloadBackup(state: AppState): void {
  triggerDownload(backupJson(state), backupFilename());
}

export async function copyBackup(state: AppState): Promise<void> {
  const payload = backupJson(state);
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(payload);
    return;
  }
  throw new Error("El portapapeles no está disponible");
}

/** Save a JSON copy onto the device. Falls back to clipboard inside an iframe. */
export async function saveBackupLocally(state: AppState): Promise<BackupSaveResult> {
  const payload = backupJson(state);
  const filename = backupFilename();

  try {
    if (await tryFilePicker(payload, filename)) return "saved";
  } catch (error) {
    if (isAbort(error)) return "cancelled";
  }

  try {
    triggerDownload(payload, filename);
    if (inEmbeddedFrame()) {
      try {
        await copyBackup(state);
        return "copied";
      } catch {
        return "downloaded";
      }
    }
    return "downloaded";
  } catch {
    await copyBackup(state);
    return "copied";
  }
}

export function parseBackup(raw: string): AppState {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    throw new Error("El archivo no es un JSON válido.");
  }
  const parsed = BackupSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error("El archivo no tiene el formato de una copia de mi-apiario.");
  }
  if (parsed.data.app !== APP_ID) {
    throw new Error("El archivo no pertenece a mi-apiario.");
  }
  const data = parsed.data.data;
  return {
    apiaries: data.apiaries as AppState["apiaries"],
    colonies: data.colonies as AppState["colonies"],
    queens: data.queens as AppState["queens"],
    actions: data.actions as AppState["actions"],
    health: (data.health ?? []) as AppState["health"],
    production: data.production as AppState["production"],
    yearCloses: (data.yearCloses ?? []) as AppState["yearCloses"],
  };
}

export async function importBackup(raw: string): Promise<void> {
  const state = parseBackup(raw);
  await replaceAll(state);
}
