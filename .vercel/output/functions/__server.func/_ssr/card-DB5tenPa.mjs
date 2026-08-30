import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as Slot, N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as string, i as object, r as number, s as unknown, t as array } from "../_libs/zod.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as cn } from "./router-BtIBG_aH.mjs";
import { n as parseISO, r as format, t as es } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-DB5tenPa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,opacity,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			outline: "border border-border bg-card text-foreground hover:bg-secondary shadow-[var(--shadow-border)]",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-md px-3 text-sm",
			lg: "h-12 rounded-lg px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function todayISO() {
	const now = /* @__PURE__ */ new Date();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	return `${now.getFullYear()}-${month}-${day}`;
}
function currentYear() {
	return (/* @__PURE__ */ new Date()).getFullYear();
}
function formatDate(iso) {
	try {
		return format(parseISO(iso), "d MMM yyyy", { locale: es });
	} catch {
		return iso;
	}
}
function yearOf(iso) {
	return Number.parseInt(iso.slice(0, 4), 10);
}
function newId() {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
	return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 11)}`;
}
function nowIso() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
var LS_KEY = "mi-apiario:v1";
var STORE_KEYS = {
	apiaries: "apiaries",
	colonies: "colonies",
	queens: "queens",
	actions: "actions",
	production: "production",
	yearCloses: "yearCloses"
};
var cache = emptyClone();
var hydrated = false;
function emptyClone() {
	return {
		apiaries: [],
		colonies: [],
		queens: [],
		actions: [],
		production: [],
		yearCloses: []
	};
}
function cloneState(state) {
	return JSON.parse(JSON.stringify(state));
}
function loadFromLocalStorage() {
	if (typeof window === "undefined") return emptyClone();
	try {
		const raw = window.localStorage.getItem(LS_KEY);
		if (!raw) return emptyClone();
		const parsed = JSON.parse(raw);
		return {
			apiaries: parsed.apiaries ?? [],
			colonies: parsed.colonies ?? [],
			queens: parsed.queens ?? [],
			actions: parsed.actions ?? [],
			production: parsed.production ?? [],
			yearCloses: parsed.yearCloses ?? []
		};
	} catch {
		return emptyClone();
	}
}
function persist() {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(LS_KEY, JSON.stringify(cache));
	} catch {}
}
function hydrate() {
	if (hydrated) return;
	hydrated = true;
	cache = loadFromLocalStorage();
}
async function loadState() {
	hydrate();
	return cloneState(cache);
}
async function replaceAll(state) {
	hydrate();
	cache = cloneState(state);
	persist();
}
async function putRecord(store, row) {
	hydrate();
	const keyName = store === "yearCloses" ? "year" : "id";
	const list = cache[STORE_KEYS[store]];
	const key = row[keyName];
	const index = list.findIndex((item) => item[keyName] === key);
	if (index >= 0) list[index] = row;
	else list.push(row);
	persist();
}
async function deleteRecord(store, id) {
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
		case "production":
			cache.production = cache.production.filter((item) => item.id !== id);
			break;
		case "yearCloses": cache.yearCloses = cache.yearCloses.filter((item) => item.year !== id);
	}
	persist();
}
async function deleteApiaryCascade(_state, apiaryId) {
	hydrate();
	const colonyIds = new Set(cache.colonies.filter((item) => item.apiaryId === apiaryId).map((item) => item.id));
	cache.apiaries = cache.apiaries.filter((item) => item.id !== apiaryId);
	cache.colonies = cache.colonies.filter((item) => item.apiaryId !== apiaryId);
	cache.queens = cache.queens.filter((item) => !colonyIds.has(item.colonyId));
	cache.actions = cache.actions.filter((item) => !colonyIds.has(item.colonyId));
	persist();
}
async function deleteColonyCascade(_state, colonyId) {
	hydrate();
	cache.colonies = cache.colonies.filter((item) => item.id !== colonyId);
	cache.queens = cache.queens.filter((item) => item.colonyId !== colonyId);
	cache.actions = cache.actions.filter((item) => item.colonyId !== colonyId);
	persist();
}
var EMPTY_STATE = {
	apiaries: [],
	colonies: [],
	queens: [],
	actions: [],
	production: [],
	yearCloses: []
};
var APP_ID = "mi-apiario";
var BackupSchema = object({
	app: string(),
	version: number(),
	exportedAt: string(),
	data: object({
		apiaries: array(unknown()),
		colonies: array(unknown()),
		queens: array(unknown()),
		actions: array(unknown()),
		production: array(unknown()),
		yearCloses: array(unknown()).optional()
	})
});
function buildBackup(state) {
	return {
		app: APP_ID,
		version: 1,
		exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		data: state
	};
}
function backupFilename() {
	return `mi-apiario-backup-${todayISO()}.json`;
}
function backupJson(state) {
	return JSON.stringify(buildBackup(state), null, 2);
}
function downloadBackup(state) {
	const payload = backupJson(state);
	const blob = new Blob([payload], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = backupFilename();
	document.body.appendChild(link);
	link.click();
	link.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
async function copyBackup(state) {
	const payload = backupJson(state);
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(payload);
		return;
	}
	throw new Error("El portapapeles no está disponible");
}
function parseBackup(raw) {
	let json;
	try {
		json = JSON.parse(raw);
	} catch {
		throw new Error("El archivo no es un JSON válido.");
	}
	const parsed = BackupSchema.safeParse(json);
	if (!parsed.success) throw new Error("El archivo no tiene el formato de una copia de mi-apiario.");
	if (parsed.data.app !== "mi-apiario") throw new Error("El archivo no pertenece a mi-apiario.");
	const data = parsed.data.data;
	return {
		apiaries: data.apiaries,
		colonies: data.colonies,
		queens: data.queens,
		actions: data.actions,
		production: data.production,
		yearCloses: data.yearCloses ?? []
	};
}
async function importBackup(raw) {
	await replaceAll(parseBackup(raw));
}
function sortColonies(colonies) {
	return [...colonies].sort((a, b) => a.number.localeCompare(b.number, "es", {
		numeric: true,
		sensitivity: "base"
	}));
}
function coloniesOf(state, apiaryId) {
	return sortColonies(state.colonies.filter((item) => item.apiaryId === apiaryId));
}
function hiveCount(state, apiaryId) {
	return state.colonies.filter((item) => item.kind === "hive" && (apiaryId ? item.apiaryId === apiaryId : true)).length;
}
function nucCount(state, apiaryId) {
	return state.colonies.filter((item) => item.kind === "nuc" && (apiaryId ? item.apiaryId === apiaryId : true)).length;
}
function currentQueen(state, colonyId) {
	return state.queens.find((queen) => queen.colonyId === colonyId && !queen.retiredAt);
}
function queenHistory(state, colonyId) {
	return [...state.queens].filter((queen) => queen.colonyId === colonyId).sort((a, b) => b.introducedAt.localeCompare(a.introducedAt));
}
function actionsOf(state, colonyId) {
	return [...state.actions].filter((action) => action.colonyId === colonyId).sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));
}
function lastAction(state, colonyId) {
	return actionsOf(state, colonyId)[0];
}
function apiaryOf(state, id) {
	return state.apiaries.find((item) => item.id === id);
}
function productionOfYear(records, year) {
	const totals = emptyProductTotals();
	for (const record of records) {
		if (yearOf(record.date) !== year) continue;
		totals[record.product] += record.quantity;
	}
	return totals;
}
function emptyProductTotals() {
	return {
		honey: 0,
		propolis: 0,
		pollen: 0,
		wax: 0,
		royal_jelly: 0
	};
}
function honeyThisYear(state) {
	return productionOfYear(state.production, currentYear()).honey;
}
function yearlyHistory(state) {
	const yearNow = currentYear();
	const years = /* @__PURE__ */ new Set([yearNow]);
	for (const record of state.production) years.add(yearOf(record.date));
	for (const close of state.yearCloses) years.add(close.year);
	const closes = new Map(state.yearCloses.map((item) => [item.year, item]));
	return [...years].sort((a, b) => b - a).map((year) => {
		const closed = closes.get(year) ?? null;
		const isCurrent = year === yearNow;
		return {
			year,
			hives: isCurrent ? hiveCount(state) : closed?.hives ?? null,
			nucs: isCurrent ? nucCount(state) : closed?.nucs ?? null,
			closed,
			isCurrent,
			products: productionOfYear(state.production, year)
		};
	});
}
/** Persists an action and applies the side effects (reina, traslado). */
async function commitAction(action) {
	const state = await loadState();
	if (action.type === "change_queen") {
		const current = currentQueen(state, action.colonyId);
		if (current) await putRecord("queens", {
			...current,
			retiredAt: action.date,
			retireReason: action.queenRetireReason
		});
		await putRecord("queens", {
			id: newId(),
			colonyId: action.colonyId,
			introducedAt: action.queenIntroducedAt || action.date,
			origin: action.queenOrigin
		});
	}
	if (action.type === "move" && action.moveToApiaryId) {
		const colony = state.colonies.find((item) => item.id === action.colonyId);
		if (colony) await putRecord("colonies", {
			...colony,
			apiaryId: action.moveToApiaryId,
			updatedAt: nowIso()
		});
	}
	await putRecord("actions", action);
}
function iso(stamp) {
	return `${stamp}T09:00:00.000Z`;
}
/** Datos de ejemplo realistas para explorar la aplicación. */
function sampleState() {
	return {
		apiaries: [{
			id: "apiary-dehesa",
			name: "La Dehesa",
			location: "Valencia de Alcántara, Cáceres",
			notes: "Encinas y jarales. Floración principal en mayo.",
			createdAt: iso("2024-03-12"),
			updatedAt: iso("2026-04-02")
		}, {
			id: "apiary-relumbrar",
			name: "El Relumbrar",
			location: "Villarrobledo, Albacete",
			notes: "Romero y tomillo. Acceso por pista en buen estado.",
			createdAt: iso("2025-02-18"),
			updatedAt: iso("2026-06-11")
		}],
		colonies: [
			hive("c-1", "apiary-dehesa", "1", "2024-03-12"),
			hive("c-2", "apiary-dehesa", "2", "2024-03-12"),
			hive("c-4", "apiary-dehesa", "4", "2024-04-03"),
			hive("c-7", "apiary-dehesa", "7", "2025-04-19"),
			hive("c-8", "apiary-dehesa", "8", "2025-04-19"),
			hive("c-11", "apiary-dehesa", "11", "2026-03-28"),
			nuc("c-n1", "apiary-dehesa", "N1", "2026-04-12"),
			nuc("c-n2", "apiary-dehesa", "N2", "2026-05-03"),
			hive("c-12", "apiary-relumbrar", "12", "2025-02-18"),
			hive("c-14", "apiary-relumbrar", "14", "2025-02-18"),
			hive("c-18", "apiary-relumbrar", "18", "2025-03-09"),
			hive("c-21", "apiary-relumbrar", "21", "2025-06-02"),
			hive("c-24", "apiary-relumbrar", "24", "2026-03-21"),
			nuc("c-n3", "apiary-relumbrar", "N3", "2026-04-26")
		],
		queens: [
			queen("q-1a", "c-1", "2024-03-12", "2026-04-02", "Reina vieja, postura irregular", "Criadero propio"),
			queen("q-1b", "c-1", "2026-04-02", void 0, void 0, "Núcleo N1"),
			queen("q-2", "c-2", "2025-04-08", void 0, void 0, "Compra"),
			queen("q-4", "c-4", "2024-04-03", void 0, void 0, "Enjambrazón"),
			queen("q-7", "c-7", "2025-04-19", void 0, void 0, "División"),
			queen("q-8", "c-8", "2025-04-19", void 0, void 0, "División"),
			queen("q-11", "c-11", "2026-03-28", void 0, void 0, "Núcleo invernado"),
			queen("q-n1", "c-n1", "2026-04-12", void 0, void 0, "Realera de la 4"),
			queen("q-n2", "c-n2", "2026-05-03", void 0, void 0, "Realera de la 7"),
			queen("q-12", "c-12", "2025-02-18", void 0, void 0, "Compra"),
			queen("q-14", "c-14", "2025-02-18", void 0, void 0, "Compra"),
			queen("q-18", "c-18", "2025-03-09", void 0, void 0, "Criadero propio"),
			queen("q-21", "c-21", "2025-06-02", void 0, void 0, "Enjambrazón"),
			queen("q-24", "c-24", "2026-03-21", void 0, void 0, "Núcleo invernado"),
			queen("q-n3", "c-n3", "2026-04-26", void 0, void 0, "Realera de la 18")
		],
		actions: [
			action("a-1", "c-1", "inspection", "2026-03-15", "Limpieza de piquera. Reserva suficiente."),
			action("a-2", "c-1", "change_queen", "2026-04-02", "Introducida en jaula.", {
				queenIntroducedAt: "2026-04-02",
				queenOrigin: "Núcleo N1",
				queenRetireReason: "Reina vieja, postura irregular"
			}),
			action("a-3", "c-1", "add_frames", "2026-04-18", void 0, {
				framesKind: "standard",
				framesQty: 2
			}),
			action("a-4", "c-1", "add_super", "2026-05-12", "Inicio de mielada.", { supersQty: 1 }),
			action("a-5", "c-1", "harvest", "2026-07-22", "Alza de primavera.", { harvestQty: 18 }),
			action("a-6", "c-2", "inspection", "2026-04-18", "Cría compacta. Buena población."),
			action("a-7", "c-2", "add_frames", "2026-04-18", void 0, {
				framesKind: "standard",
				framesQty: 3
			}),
			action("a-8", "c-4", "create_nuc", "2026-04-12", "Núcleo N1 con dos cuadros de cría y realera."),
			action("a-9", "c-7", "treatment", "2026-08-08", "Tras la cosecha.", { treatmentProduct: "Ácido oxálico sublimado" }),
			action("a-10", "c-12", "inspection", "2026-03-21", "Invernada correcta. Consumo de reserva bajo."),
			action("a-11", "c-12", "add_frames", "2026-04-09", void 0, {
				framesKind: "medium",
				framesQty: 4
			}),
			action("a-12", "c-18", "split", "2026-04-26", "División para núcleo N3."),
			action("a-13", "c-24", "inspection", "2026-06-11", "Núcleo pasado a colmena. Aceptó bien el alza."),
			action("a-14", "c-24", "add_super", "2026-06-11", void 0, { supersQty: 1 }),
			action("a-15", "c-14", "harvest", "2026-07-28", void 0, { harvestQty: 12 }),
			action("a-16", "c-n1", "inspection", "2026-05-20", "Reina en postura. Subir a colmena en otoño si cierra bien.")
		],
		production: [
			rec("p-1", "honey", "2025-08-12", 210, "M2025-08-01", "Cosecha de primavera-verano."),
			rec("p-2", "wax", "2025-08-13", 6.4, "C2025-08-01"),
			rec("p-3", "pollen", "2025-07-04", 9.2, "P2025-07-01"),
			rec("p-4", "propolis", "2025-09-02", .7, "PR2025-09-01"),
			rec("p-5", "honey", "2026-07-22", 95, "M2026-07-01", "Primera extracción. Romero y encina."),
			rec("p-6", "honey", "2026-08-18", 40, "M2026-08-01", "Segunda extracción."),
			rec("p-7", "pollen", "2026-07-10", 3.5, "P2026-07-01"),
			rec("p-8", "propolis", "2026-08-18", .8, "PR2026-08-01"),
			rec("p-9", "wax", "2026-08-19", 2.1, "C2026-08-01")
		],
		yearCloses: [{
			year: 2025,
			hives: 10,
			nucs: 2,
			closedAt: "2025-12-31",
			notes: "Cierre de temporada. Dos núcleos invernados."
		}]
	};
}
function hive(id, apiaryId, number, created) {
	return {
		id,
		apiaryId,
		kind: "hive",
		number,
		createdAt: iso(created),
		updatedAt: iso(created)
	};
}
function nuc(id, apiaryId, number, created) {
	return {
		id,
		apiaryId,
		kind: "nuc",
		number,
		createdAt: iso(created),
		updatedAt: iso(created)
	};
}
function queen(id, colonyId, introducedAt, retiredAt, retireReason, origin) {
	return {
		id,
		colonyId,
		introducedAt,
		retiredAt,
		retireReason,
		origin
	};
}
function action(id, colonyId, type, date, notes, extra) {
	return {
		id,
		colonyId,
		type,
		date,
		notes,
		createdAt: iso(date),
		...extra
	};
}
function rec(id, product, date, quantity, lot, notes) {
	return {
		id,
		product,
		date,
		quantity,
		lot,
		notes,
		createdAt: iso(date)
	};
}
async function loadSampleData() {
	await replaceAll(sampleState());
}
var APP_QUERY_KEY = ["app"];
function useAppState() {
	return useQuery({
		queryKey: APP_QUERY_KEY,
		queryFn: loadState,
		staleTime: Infinity,
		retry: false,
		placeholderData: EMPTY_STATE
	});
}
/** Always returns a notebook, even while storage is still opening. */
function useNotebook() {
	const query = useAppState();
	return {
		data: query.data ?? EMPTY_STATE,
		error: query.error,
		isFetching: query.isFetching
	};
}
function useInvalidate() {
	const client = useQueryClient();
	return () => client.invalidateQueries({ queryKey: APP_QUERY_KEY });
}
function useAppMutations() {
	const invalidate = useInvalidate();
	return {
		saveApiary: useMutation({
			mutationFn: (row) => putRecord("apiaries", row),
			onSuccess: invalidate
		}),
		saveColony: useMutation({
			mutationFn: (row) => putRecord("colonies", row),
			onSuccess: invalidate
		}),
		saveQueen: useMutation({
			mutationFn: (row) => putRecord("queens", row),
			onSuccess: invalidate
		}),
		saveAction: useMutation({
			mutationFn: (row) => commitAction(row),
			onSuccess: invalidate
		}),
		saveProduction: useMutation({
			mutationFn: (row) => putRecord("production", row),
			onSuccess: invalidate
		}),
		saveYearClose: useMutation({
			mutationFn: (row) => putRecord("yearCloses", row),
			onSuccess: invalidate
		}),
		removeApiary: useMutation({
			mutationFn: async (id) => {
				await deleteApiaryCascade(await loadState(), id);
			},
			onSuccess: invalidate
		}),
		removeColony: useMutation({
			mutationFn: async (id) => {
				await deleteColonyCascade(await loadState(), id);
			},
			onSuccess: invalidate
		}),
		removeProduction: useMutation({
			mutationFn: (id) => deleteRecord("production", id),
			onSuccess: invalidate
		}),
		removeAction: useMutation({
			mutationFn: (id) => deleteRecord("actions", id),
			onSuccess: invalidate
		}),
		loadSample: useMutation({
			mutationFn: loadSampleData,
			onSuccess: invalidate
		}),
		restore: useMutation({
			mutationFn: importBackup,
			onSuccess: invalidate
		}),
		resetAll: useMutation({
			mutationFn: () => replaceAll(EMPTY_STATE),
			onSuccess: invalidate
		})
	};
}
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-2xl bg-card text-card-foreground shadow-[var(--shadow-border)]", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col gap-1.5 p-5", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
	ref,
	className: cn("font-display text-lg font-medium leading-snug tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-5 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-5 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
//#endregion
export { useNotebook as C, useAppMutations as S, nowIso as _, backupFilename as a, queenHistory as b, copyBackup as c, downloadBackup as d, formatDate as f, newId as g, lastAction as h, apiaryOf as i, currentQueen as l, honeyThisYear as m, Card as n, buttonVariants as o, hiveCount as p, actionsOf as r, coloniesOf as s, Button as t, currentYear as u, nucCount as v, yearlyHistory as w, todayISO as x, productionOfYear as y };
