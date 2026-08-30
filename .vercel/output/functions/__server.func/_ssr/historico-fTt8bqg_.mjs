import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useNotebook, S as useAppMutations, f as formatDate, n as Card, p as hiveCount, t as Button, v as nucCount, w as yearlyHistory, x as todayISO } from "./card-DB5tenPa.mjs";
import { i as Textarea, n as Field, r as Input, t as EmptyState } from "./empty-state-BaXmf9Aa.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-RujvsrY-.mjs";
import { a as PRODUCT_LABEL, c as formatKg, o as PRODUCT_ORDER } from "./labels-HshktK0A.mjs";
import { t as PageHeader } from "./page-header-Cl0AWdC8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/historico-fTt8bqg_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function YearCloseDialog({ open, onOpenChange, year, defaultHives, defaultNucs, onSubmit }) {
	const [hives, setHives] = (0, import_react.useState)(String(defaultHives));
	const [nucs, setNucs] = (0, import_react.useState)(String(defaultNucs));
	const [notes, setNotes] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setHives(String(defaultHives));
		setNucs(String(defaultNucs));
		setNotes("");
	}, [
		open,
		defaultHives,
		defaultNucs
	]);
	async function handleSubmit(event) {
		event.preventDefault();
		setBusy(true);
		try {
			await onSubmit({
				hives: Number(hives),
				nucs: Number(nucs),
				notes: notes.trim() || void 0
			});
			onOpenChange(false);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Cerrar ", year] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
			"Guarda el número de colmenas y núcleos de ese año. No uses las cifras actuales si el censo ya ha cambiado. Hoy es ",
			todayISO(),
			"."
		] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4",
			onSubmit: (event) => void handleSubmit(event),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Colmenas",
						htmlFor: "close-hives",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "close-hives",
							type: "number",
							min: 0,
							step: 1,
							inputMode: "numeric",
							value: hives,
							onChange: (event) => setHives(event.target.value),
							required: true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Núcleos",
						htmlFor: "close-nucs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "close-nucs",
							type: "number",
							min: 0,
							step: 1,
							inputMode: "numeric",
							value: nucs,
							onChange: (event) => setNucs(event.target.value),
							required: true
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Notas",
					htmlFor: "close-notes",
					hint: "Opcional",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "close-notes",
						value: notes,
						onChange: (event) => setNotes(event.target.value),
						rows: 2
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy,
					children: "Guardar cierre"
				})] })
			]
		})] })
	});
}
function HistoryPage() {
	const { data } = useNotebook();
	const { saveYearClose } = useAppMutations();
	const [closingYear, setClosingYear] = (0, import_react.useState)(null);
	const rows = yearlyHistory(data);
	const hasAnything = data.production.length > 0 || data.yearCloses.length > 0 || data.colonies.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Histórico",
			description: "Comparación por años. El censo de colmenas de un año cerrado no se inventa a partir de las colmenas actuales."
		}),
		!hasAnything ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Todavía no hay histórico",
			description: "Cuando registres producción o un cierre anual, los años aparecerán aquí."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-medium tracking-tight",
							children: row.year
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: row.isCurrent ? "Año en curso · censo actual" : row.closed ? `Cierre ${formatDate(row.closed.closedAt)}` : "Sin cierre anual"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
							label: "Colmenas",
							value: row.hives
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
							label: "Núcleos",
							value: row.nucs
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-5",
						children: PRODUCT_ORDER.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs tracking-wide text-muted-foreground uppercase",
							children: PRODUCT_LABEL[product]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-medium tabular-nums",
							children: row.products[product] > 0 ? formatKg(row.products[product]) : "—"
						})] }, product))
					}),
					row.closed?.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: row.closed.notes
					}) : null,
					!row.isCurrent && !row.closed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-4",
						size: "sm",
						variant: "outline",
						onClick: () => setClosingYear(row.year),
						children: ["Cerrar ", row.year]
					}) : null
				]
			}, row.year))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearCloseDialog, {
			open: closingYear !== null,
			onOpenChange: (open) => {
				if (!open) setClosingYear(null);
			},
			year: closingYear ?? (/* @__PURE__ */ new Date()).getFullYear(),
			defaultHives: hiveCount(data),
			defaultNucs: nucCount(data),
			onSubmit: async (values) => {
				if (closingYear === null) return;
				await saveYearClose.mutateAsync({
					year: closingYear,
					hives: values.hives,
					nucs: values.nucs,
					notes: values.notes,
					closedAt: todayISO()
				});
				toast.success(`Cierre de ${closingYear} guardado`);
				setClosingYear(null);
			}
		})
	] });
}
function Count({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs tracking-wide text-muted-foreground uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "font-display text-2xl font-medium tabular-nums",
		children: value === null ? "—" : value
	})] });
}
//#endregion
export { HistoryPage as component };
