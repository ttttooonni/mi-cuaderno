import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useNotebook, S as useAppMutations, _ as nowIso, g as newId, m as honeyThisYear, n as Card, p as hiveCount, t as Button, u as currentYear, v as nucCount, y as productionOfYear } from "./card-DB5tenPa.mjs";
import { t as EmptyState } from "./empty-state-BaXmf9Aa.mjs";
import { t as ApiaryFormDialog } from "./apiary-form-XVjfPR8f.mjs";
import { a as PRODUCT_LABEL, c as formatKg, o as PRODUCT_ORDER } from "./labels-HshktK0A.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B6Ddb9qY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-3xl font-medium tracking-tight tabular-nums",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
function Home() {
	const { data, error } = useNotebook();
	const { saveApiary, loadSample } = useAppMutations();
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const year = currentYear();
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No se pueden leer los datos",
		description: error.message
	});
	const empty = data.apiaries.length === 0;
	const products = productionOfYear(data.production, year);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase",
			children: ["Temporada ", year]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-3xl font-medium tracking-tight",
			children: "Inicio"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 mb-6 max-w-xl text-sm text-muted-foreground",
			children: "Cuaderno de explotación. Lo importante, a mano."
		}),
		empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Todavía no hay apiarios",
			description: "Crea el primero o carga un ejemplo para ver cómo queda el cuaderno con datos reales.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => setCreateOpen(true),
				children: "Crear apiario"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				disabled: loadSample.isPending,
				onClick: () => {
					loadSample.mutateAsync().then(() => toast.success("Ejemplo cargado")).catch((err) => toast.error(err instanceof Error ? err.message : "No se pudo cargar"));
				},
				children: loadSample.isPending ? "Cargando…" : "Cargar ejemplo"
			})] })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Apiarios",
						value: data.apiaries.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Colmenas",
						value: hiveCount(data)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Núcleos",
						value: nucCount(data)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: `Miel ${year}`,
						value: formatKg(honeyThisYear(data))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-lg font-medium",
						children: ["Producción ", year]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/produccion",
						className: "text-sm text-primary hover:underline",
						children: "Registrar"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-5",
					children: PRODUCT_ORDER.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs tracking-wide text-muted-foreground uppercase",
						children: PRODUCT_LABEL[product]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-0.5 font-medium tabular-nums",
						children: products[product] > 0 ? formatKg(products[product]) : "—"
					})] }, product))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setCreateOpen(true),
						children: "Nuevo apiario"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/apiarios",
							children: "Ver apiarios"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/produccion",
							children: "Registrar producción"
						})
					})
				]
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiaryFormDialog, {
			open: createOpen,
			onOpenChange: setCreateOpen,
			onSubmit: async (values) => {
				await saveApiary.mutateAsync({
					id: newId(),
					...values,
					createdAt: nowIso(),
					updatedAt: nowIso()
				});
				toast.success("Apiario creado");
			}
		})
	] });
}
//#endregion
export { Home as component };
