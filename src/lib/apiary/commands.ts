import { currentQueen } from "./selectors";
import { loadState, putRecord, deleteRecord } from "./idb";
import { newId, nowIso } from "./dates";
import { isLegacyHealthId, legacyActionId } from "./health";
import type { ColonyAction, HealthRecord, Queen } from "./types";

/** Persists an action and applies the side effects (reina, traslado, sanidad). */
export async function commitAction(action: ColonyAction): Promise<void> {
  const state = await loadState();

  if (action.type === "change_queen") {
    const current = currentQueen(state, action.colonyId);
    if (current) {
      const retired: Queen = {
        ...current,
        retiredAt: action.date,
        retireReason: action.queenRetireReason,
      };
      await putRecord("queens", retired);
    }
    const next: Queen = {
      id: newId(),
      colonyId: action.colonyId,
      introducedAt: action.queenIntroducedAt || action.date,
      origin: action.queenOrigin,
    };
    await putRecord("queens", next);
  }

  if (action.type === "move" && action.moveToApiaryId) {
    const colony = state.colonies.find((item) => item.id === action.colonyId);
    if (colony) {
      await putRecord("colonies", {
        ...colony,
        apiaryId: action.moveToApiaryId,
        updatedAt: nowIso(),
      });
    }
  }

  if (action.type === "treatment") {
    const already = (state.health ?? []).some((row) => row.actionId === action.id);
    if (!already) {
      const health: HealthRecord = {
        id: newId(),
        colonyId: action.colonyId,
        topic: "varroa",
        kind: "treatment",
        date: action.date,
        product: action.treatmentProduct,
        notes: action.notes,
        actionId: action.id,
        createdAt: action.createdAt,
      };
      await putRecord("health", health);
    }
  }

  await putRecord("actions", action);
}

export async function commitHealth(row: HealthRecord): Promise<void> {
  let record = row;
  if (row.kind === "treatment" && !row.actionId) {
    const actionId = newId();
    record = { ...row, actionId };
    const action: ColonyAction = {
      id: actionId,
      colonyId: row.colonyId,
      type: "treatment",
      date: row.date,
      notes: row.notes,
      treatmentProduct: row.product,
      createdAt: row.createdAt,
    };
    await putRecord("actions", action);
  }
  await putRecord("health", record);
}

export async function removeHealth(id: string): Promise<void> {
  if (isLegacyHealthId(id)) {
    await deleteRecord("actions", legacyActionId(id));
    return;
  }
  const state = await loadState();
  const row = (state.health ?? []).find((item) => item.id === id);
  await deleteRecord("health", id);
  if (row?.actionId) await deleteRecord("actions", row.actionId);
}
