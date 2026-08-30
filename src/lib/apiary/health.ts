import { yearOf } from "./dates";
import { sortColonies } from "./selectors";
import type {
  AppState,
  Colony,
  HealthKind,
  HealthRecord,
  HealthTopic,
} from "./types";

export const HEALTH_TOPIC_LABEL: Record<HealthTopic, string> = {
  varroa: "Varroa",
  nosema: "Nosema",
  foulbrood: "Loque",
  chalkbrood: "Pollo escayolado",
  hornet: "Avispa asiática",
  surveillance: "Vigilancia",
  other: "Otro",
};

export const HEALTH_TOPIC_ORDER: HealthTopic[] = [
  "varroa",
  "nosema",
  "foulbrood",
  "chalkbrood",
  "hornet",
  "surveillance",
  "other",
];

export const HEALTH_KIND_LABEL: Record<HealthKind, string> = {
  treatment: "Tratamiento",
  observation: "Observación",
  sampling: "Muestreo",
};

export const VARROA_PRODUCTS = [
  "Ácido oxálico sublimado",
  "Ácido oxálico goteado",
  "Ácido fórmico",
  "Amitraz (tiras)",
  "Flumetrina (tiras)",
  "Timol",
  "Tau-fluvalinato",
] as const;

const LEGACY_PREFIX = "hlth-";

export function isLegacyHealthId(id: string): boolean {
  return id.startsWith(LEGACY_PREFIX);
}

export function legacyActionId(healthId: string): string {
  return healthId.slice(LEGACY_PREFIX.length);
}

/** Health store plus old "tratamiento" actions that were never copied over. */
export function unifiedHealth(state: AppState): HealthRecord[] {
  const stored = state.health ?? [];
  const linked = new Set(
    stored.flatMap((row) => (row.actionId ? [row.actionId] : [])),
  );
  const fromActions: HealthRecord[] = state.actions
    .filter((action) => action.type === "treatment" && !linked.has(action.id))
    .filter((action) => !stored.some((row) => row.id === `${LEGACY_PREFIX}${action.id}`))
    .map((action) => ({
      id: `${LEGACY_PREFIX}${action.id}`,
      colonyId: action.colonyId,
      topic: "varroa" as const,
      kind: "treatment" as const,
      date: action.date,
      product: action.treatmentProduct,
      notes: action.notes,
      actionId: action.id,
      createdAt: action.createdAt,
    }));

  return [...stored, ...fromActions].sort(
    (a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt),
  );
}

export function healthOfColony(state: AppState, colonyId: string): HealthRecord[] {
  return unifiedHealth(state).filter((row) => row.colonyId === colonyId);
}

export function lastVarroaTreatment(state: AppState, colonyId: string): HealthRecord | undefined {
  return healthOfColony(state, colonyId).find(
    (row) => row.topic === "varroa" && row.kind === "treatment",
  );
}

export function varroaTreatedIds(state: AppState, year: number): Set<string> {
  const ids = new Set<string>();
  for (const row of unifiedHealth(state)) {
    if (row.topic !== "varroa" || row.kind !== "treatment") continue;
    if (yearOf(row.date) !== year) continue;
    ids.add(row.colonyId);
  }
  return ids;
}

export function coloniesMissingVarroa(state: AppState, year: number): Colony[] {
  const treated = varroaTreatedIds(state, year);
  return sortColonies(state.colonies.filter((colony) => !treated.has(colony.id)));
}

export function healthOfYear(state: AppState, year: number): HealthRecord[] {
  return unifiedHealth(state).filter((row) => yearOf(row.date) === year);
}

export function healthSummary(row: HealthRecord): string | null {
  const bits: string[] = [];
  if (row.kind !== "treatment") bits.push(HEALTH_KIND_LABEL[row.kind]);
  if (row.product) bits.push(row.product);
  return bits.length ? bits.join(" · ") : null;
}
