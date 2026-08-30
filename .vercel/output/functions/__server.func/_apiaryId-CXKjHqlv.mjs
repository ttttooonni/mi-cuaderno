import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { r as Route$1 } from "./_ssr/router-BtIBG_aH.mjs";
import { C as useNotebook, S as useAppMutations, _ as nowIso, f as formatDate, g as newId, h as lastAction, l as currentQueen, s as coloniesOf, t as Button } from "./_ssr/card-DB5tenPa.mjs";
import { t as EmptyState } from "./_ssr/empty-state-BaXmf9Aa.mjs";
import { t as ApiaryFormDialog } from "./_ssr/apiary-form-XVjfPR8f.mjs";
import { t as ACTION_LABEL } from "./_ssr/labels-HshktK0A.mjs";
import { i as QueenSwatch } from "./_ssr/queen-swatch-D350sr7H.mjs";
import { n as ColonyKindBadge, t as ColonyFormDialog } from "./_ssr/colony-kind-badge-B7puwLep.mjs";
import { t as ConfirmDelete } from "./_ssr/confirm-delete-B5gQOl1I.mjs";
import { t as PageHeader } from "./_ssr/page-header-Cl0AWdC8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_apiaryId-CXKjHqlv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ApiaryDetailPage() {
	const { apiaryId } = Route$1.useParams();
	const navigate = useNavigate();
	const { data } = useNotebook();
	const { saveApiary, saveColony, removeApiary } = useAppMutations();
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const [deleteOpen, setDeleteOpen] = (0, import_react.useState)(false);
	const [colonyKind, setColonyKind] = (0, import_react.useState)("hive");
	const [colonyOpen, setColonyOpen] = (0, import_react.useState)(false);
	const apiary = data.apiaries.find((item) => item.id === apiaryId);
	if (!apiary) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Apiario no encontrado",
		description: "Puede que lo hayas eliminado.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/apiarios",
				children: "Volver a apiarios"
			})
		})
	});
	const colonies = coloniesOf(data, apiary.id);
	const hives = colonies.filter((item) => item.kind === "hive");
	const nucs = colonies.filter((item) => item.kind === "nuc");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: apiary.name,
			description: apiary.location || void 0,
			backTo: "/apiarios",
			backLabel: "Apiarios",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => setEditOpen(true),
				children: "Editar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => setDeleteOpen(true),
				children: "Eliminar"
			})] })
		}),
		apiary.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-5 max-w-2xl text-sm text-muted-foreground",
			children: apiary.notes
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColonySection, {
			title: "Colmenas",
			empty: "Todavía no hay colmenas en este apiario.",
			actionLabel: "Añadir colmena",
			colonies: hives,
			onAdd: () => {
				setColonyKind("hive");
				setColonyOpen(true);
			},
			renderItem: (colony) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColonyRow, {
				colony,
				state: data
			}, colony.id)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColonySection, {
			title: "Núcleos",
			empty: "Todavía no hay núcleos en este apiario.",
			actionLabel: "Añadir núcleo",
			colonies: nucs,
			onAdd: () => {
				setColonyKind("nuc");
				setColonyOpen(true);
			},
			renderItem: (colony) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColonyRow, {
				colony,
				state: data
			}, colony.id)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiaryFormDialog, {
			open: editOpen,
			onOpenChange: setEditOpen,
			initial: apiary,
			onSubmit: async (values) => {
				await saveApiary.mutateAsync({
					...apiary,
					...values,
					updatedAt: nowIso()
				});
				toast.success("Apiario actualizado");
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColonyFormDialog, {
			open: colonyOpen,
			onOpenChange: setColonyOpen,
			kind: colonyKind,
			onSubmit: async (values) => {
				await saveColony.mutateAsync({
					id: newId(),
					apiaryId: apiary.id,
					kind: colonyKind,
					number: values.number,
					notes: values.notes,
					createdAt: nowIso(),
					updatedAt: nowIso()
				});
				toast.success(colonyKind === "hive" ? "Colmena añadida" : "Núcleo añadido");
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
			open: deleteOpen,
			onOpenChange: setDeleteOpen,
			title: `Eliminar ${apiary.name}`,
			description: "Se eliminarán las colmenas, los núcleos y todo su historial.",
			onConfirm: async () => {
				await removeApiary.mutateAsync(apiary.id);
				toast.success("Apiario eliminado");
				await navigate({ to: "/apiarios" });
			}
		})
	] });
}
function ColonySection({ title, empty, actionLabel, colonies, onAdd, renderItem }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "font-display text-lg font-medium",
				children: [title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 text-sm font-sans font-normal text-muted-foreground tabular-nums",
					children: colonies.length
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				onClick: onAdd,
				children: actionLabel
			})]
		}), colonies.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: empty
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-2",
			children: colonies.map(renderItem)
		})]
	});
}
function ColonyRow({ colony, state }) {
	const queen = currentQueen(state, colony.id);
	const action = lastAction(state, colony.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/colonias/$colonyId",
		params: { colonyId: colony.id },
		className: "flex items-center justify-between gap-3 rounded-xl bg-card px-4 py-3 shadow-[var(--shadow-border)] transition-colors hover:bg-secondary/60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg font-medium tabular-nums",
					children: colony.number
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColonyKindBadge, { kind: colony.kind }),
				queen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueenSwatch, { date: queen.introducedAt }) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "truncate text-xs text-muted-foreground",
			children: action ? `${ACTION_LABEL[action.type]} · ${formatDate(action.date)}` : "Sin acciones"
		})]
	}) });
}
//#endregion
export { ApiaryDetailPage as component };
