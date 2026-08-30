import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { importBackup } from "./backup";
import { commitAction, commitHealth, removeHealth } from "./commands";
import {
  deleteApiaryCascade,
  deleteColonyCascade,
  deleteRecord,
  loadState,
  putRecord,
  replaceAll,
} from "./idb";
import { loadSampleData } from "./sample";
import { EMPTY_STATE, type AppState, type Colony, type HealthRecord, type Queen, type YearClose } from "./types";

export const APP_QUERY_KEY = ["app"] as const;

export function useAppState() {
  return useQuery({
    queryKey: APP_QUERY_KEY,
    queryFn: loadState,
    staleTime: Infinity,
    retry: false,
    placeholderData: EMPTY_STATE,
  });
}

/** Always returns a notebook, even while storage is still opening. */
export function useNotebook() {
  const query = useAppState();
  return {
    data: query.data ?? EMPTY_STATE,
    error: query.error,
    isFetching: query.isFetching,
  };
}

function useInvalidate() {
  const client = useQueryClient();
  return () => client.invalidateQueries({ queryKey: APP_QUERY_KEY });
}

export function useAppMutations() {
  const invalidate = useInvalidate();

  const saveApiary = useMutation({
    mutationFn: (row: AppState["apiaries"][number]) => putRecord("apiaries", row),
    onSuccess: invalidate,
  });

  const saveColony = useMutation({
    mutationFn: (row: Colony) => putRecord("colonies", row),
    onSuccess: invalidate,
  });

  const saveQueen = useMutation({
    mutationFn: (row: Queen) => putRecord("queens", row),
    onSuccess: invalidate,
  });

  const saveAction = useMutation({
    mutationFn: (row: AppState["actions"][number]) => commitAction(row),
    onSuccess: invalidate,
  });

  const saveProduction = useMutation({
    mutationFn: (row: AppState["production"][number]) => putRecord("production", row),
    onSuccess: invalidate,
  });

  const saveYearClose = useMutation({
    mutationFn: (row: YearClose) => putRecord("yearCloses", row),
    onSuccess: invalidate,
  });

  const saveHealth = useMutation({
    mutationFn: (row: HealthRecord) => commitHealth(row),
    onSuccess: invalidate,
  });

  const removeHealthRecord = useMutation({
    mutationFn: (id: string) => removeHealth(id),
    onSuccess: invalidate,
  });

  const removeApiary = useMutation({
    mutationFn: async (id: string) => {
      const current = await loadState();
      await deleteApiaryCascade(current, id);
    },
    onSuccess: invalidate,
  });

  const removeColony = useMutation({
    mutationFn: async (id: string) => {
      const current = await loadState();
      await deleteColonyCascade(current, id);
    },
    onSuccess: invalidate,
  });

  const removeProduction = useMutation({
    mutationFn: (id: string) => deleteRecord("production", id),
    onSuccess: invalidate,
  });

  const removeAction = useMutation({
    mutationFn: (id: string) => deleteRecord("actions", id),
    onSuccess: invalidate,
  });

  const loadSample = useMutation({
    mutationFn: loadSampleData,
    onSuccess: invalidate,
  });

  const restore = useMutation({
    mutationFn: importBackup,
    onSuccess: invalidate,
  });

  const resetAll = useMutation({
    mutationFn: () => replaceAll(EMPTY_STATE),
    onSuccess: invalidate,
  });

  return {
    saveApiary,
    saveColony,
    saveQueen,
    saveAction,
    saveProduction,
    saveYearClose,
    saveHealth,
    removeHealthRecord,
    removeApiary,
    removeColony,
    removeProduction,
    removeAction,
    loadSample,
    restore,
    resetAll,
  };
}
