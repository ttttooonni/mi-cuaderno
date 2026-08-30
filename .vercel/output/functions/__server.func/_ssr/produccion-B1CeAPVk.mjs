import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useNotebook, S as useAppMutations, _ as nowIso, f as formatDate, g as newId, n as Card, t as Button, x as todayISO } from "./card-DB5tenPa.mjs";
import { i as Textarea, n as Field, r as Input, t as EmptyState } from "./empty-state-BaXmf9Aa.mjs";
import { a as PRODUCT_LABEL, c as formatKg, l as suggestLot, o as PRODUCT_ORDER } from "./labels-HshktK0A.mjs";
import { t as ConfirmDelete } from "./confirm-delete-B5gQOl1I.mjs";
import { t as PageHeader } from "./page-header-Cl0AWdC8.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Msnfhv-V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produccion-B1CeAPVk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductionPage() {
	const { data } = useNotebook();
	const { saveProduction, removeProduction } = useAppMutations();
	const [product, setProduct] = (0, import_react.useState)("honey");
	const [date, setDate] = (0, import_react.useState)(todayISO());
	const [quantity, setQuantity] = (0, import_react.useState)("");
	const [lot, setLot] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [lotTouched, setLotTouched] = (0, import_react.useState)(false);
	const [deleting, setDeleting] = (0, import_react.useState)(null);
	const lots = (0, import_react.useMemo)(() => data.production.map((item) => item.lot), [data]);
	const suggested = (0, import_react.useMemo)(() => suggestLot(product, date, lots), [
		product,
		date,
		lots
	]);
	const records = [...data.production].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));
	async function handleSubmit(event) {
		event.preventDefault();
		const qty = Number(quantity);
		if (!Number.isFinite(qty) || qty <= 0) {
			toast.error("Indica una cantidad válida");
			return;
		}
		const resolvedLot = (lotTouched ? lot : suggested).trim();
		if (!resolvedLot) {
			toast.error("El lote es obligatorio");
			return;
		}
		await saveProduction.mutateAsync({
			id: newId(),
			product,
			date,
			quantity: qty,
			lot: resolvedLot,
			notes: notes.trim() || void 0,
			createdAt: nowIso()
		});
		toast.success("Producción registrada");
		setQuantity("");
		setNotes("");
		setLotTouched(false);
		setLot("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Producción",
			description: "Registro de lo obtenido en la sala de extracción. Independiente de apiarios y números de colmena."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-8 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-medium",
				children: "Nuevo registro"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 grid gap-4 sm:grid-cols-2",
				onSubmit: (event) => void handleSubmit(event),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Producto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: product,
							onValueChange: (value) => {
								setProduct(value);
								setLotTouched(false);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: PRODUCT_ORDER.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: item,
								children: PRODUCT_LABEL[item]
							}, item)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Fecha",
						htmlFor: "prod-date",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "prod-date",
							type: "date",
							value: date,
							onChange: (event) => {
								setDate(event.target.value);
								setLotTouched(false);
							},
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Cantidad (kg)",
						htmlFor: "prod-qty",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "prod-qty",
							type: "number",
							min: .01,
							step: "0.01",
							inputMode: "decimal",
							value: quantity,
							onChange: (event) => setQuantity(event.target.value),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Lote",
						htmlFor: "prod-lot",
						hint: "Obligatorio. Se sugiere a partir del producto y la fecha.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "prod-lot",
							value: lotTouched ? lot : suggested,
							onChange: (event) => {
								setLotTouched(true);
								setLot(event.target.value);
							},
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Notas",
							htmlFor: "prod-notes",
							hint: "Opcional",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "prod-notes",
								value: notes,
								onChange: (event) => setNotes(event.target.value),
								rows: 2
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Guardar registro"
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-display text-lg font-medium",
			children: "Registros"
		}),
		records.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Sin producción registrada",
			description: "Los lotes se guardan aquí, no en la ficha de cada colmena."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-2xl bg-card shadow-[var(--shadow-border)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[32rem] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "border-b border-border text-xs tracking-wide text-muted-foreground uppercase",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Producto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Fecha"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Cantidad"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Lote"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Acciones"
							})
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: records.map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: PRODUCT_LABEL[record.product]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted-foreground",
							children: formatDate(record.date)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 tabular-nums",
							children: formatKg(record.quantity)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-mono text-xs",
							children: record.lot
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-xs text-muted-foreground hover:text-destructive",
								onClick: () => setDeleting(record),
								children: "Eliminar"
							})
						})
					]
				}, record.id)) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
			open: Boolean(deleting),
			onOpenChange: (open) => {
				if (!open) setDeleting(null);
			},
			title: "Eliminar registro",
			description: deleting ? `Se quitará el lote ${deleting.lot} (${formatKg(deleting.quantity)}).` : "",
			onConfirm: async () => {
				if (!deleting) return;
				await removeProduction.mutateAsync(deleting.id);
				toast.success("Registro eliminado");
				setDeleting(null);
			}
		})
	] });
}
//#endregion
export { ProductionPage as component };
