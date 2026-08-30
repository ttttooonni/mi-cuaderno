import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { f as Check, l as ChevronRight, s as Ellipsis } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as cn } from "./router-BtIBG_aH.mjs";
import { C as useNotebook, S as useAppMutations, _ as nowIso, g as newId, n as Card, p as hiveCount, t as Button, v as nucCount } from "./card-DB5tenPa.mjs";
import { t as EmptyState } from "./empty-state-BaXmf9Aa.mjs";
import { t as ApiaryFormDialog } from "./apiary-form-XVjfPR8f.mjs";
import { t as ConfirmDelete } from "./confirm-delete-B5gQOl1I.mjs";
import { t as PageHeader } from "./page-header-Cl0AWdC8.mjs";
import { a as Portal2, c as SubTrigger2, i as ItemIndicator2, l as Trigger, n as Content2, o as Root2, r as Item2, s as Separator2, t as CheckboxItem2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/apiarios-Cd_-giUF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-[90] min-w-44 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-[var(--shadow-border)]", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-2.5 text-sm outline-none focus:bg-accent data-disabled:pointer-events-none data-disabled:opacity-50", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-border", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-pointer select-none items-center rounded-md px-2 py-2.5 text-sm outline-none focus:bg-accent", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto size-4" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-pointer select-none items-center rounded-md py-2.5 pr-2 pl-8 text-sm outline-none focus:bg-accent", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex size-4 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
function ApiariesPage() {
	const { data } = useNotebook();
	const { saveApiary, removeApiary } = useAppMutations();
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [deleting, setDeleting] = (0, import_react.useState)(null);
	const apiaries = [...data.apiaries].sort((a, b) => a.name.localeCompare(b.name, "es"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Apiarios",
			description: "Cada apiario tiene su ficha, con colmenas y núcleos por separado.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => {
					setEditing(null);
					setFormOpen(true);
				},
				children: "Nuevo apiario"
			})
		}),
		apiaries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Sin apiarios",
			description: "Crea el primero para empezar a registrar colmenas.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => {
					setEditing(null);
					setFormOpen(true);
				},
				children: "Crear apiario"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-3 sm:grid-cols-2",
			children: apiaries.map((apiary) => {
				const hives = hiveCount(data, apiary.id);
				const nucs = nucCount(data, apiary.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "relative p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/apiarios/$apiaryId",
						params: { apiaryId: apiary.id },
						className: "block pr-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-medium tracking-tight",
								children: apiary.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: apiary.location || "Sin ubicación"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm tabular-nums",
								children: [
									hives,
									" ",
									hives === 1 ? "colmena" : "colmenas",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mx-2 text-border",
										children: "·"
									}),
									nucs,
									" ",
									nucs === 1 ? "núcleo" : "núcleos"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-3 right-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Acciones",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/apiarios/$apiaryId",
										params: { apiaryId: apiary.id },
										children: "Abrir"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									onSelect: () => {
										setEditing(apiary);
										setFormOpen(true);
									},
									children: "Editar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									className: "text-destructive",
									onSelect: () => setDeleting(apiary),
									children: "Eliminar"
								})
							]
						})] })
					})]
				}) }, apiary.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiaryFormDialog, {
			open: formOpen,
			onOpenChange: setFormOpen,
			initial: editing,
			onSubmit: async (values) => {
				const now = nowIso();
				await saveApiary.mutateAsync({
					id: editing?.id ?? newId(),
					createdAt: editing?.createdAt ?? now,
					updatedAt: now,
					...values
				});
				toast.success(editing ? "Apiario actualizado" : "Apiario creado");
				setEditing(null);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
			open: Boolean(deleting),
			onOpenChange: (open) => {
				if (!open) setDeleting(null);
			},
			title: `Eliminar ${deleting?.name ?? "apiario"}`,
			description: "Se eliminarán también sus colmenas, núcleos y todo el historial asociado. Esta acción no se puede deshacer.",
			onConfirm: async () => {
				if (!deleting) return;
				await removeApiary.mutateAsync(deleting.id);
				toast.success("Apiario eliminado");
				setDeleting(null);
			}
		})
	] });
}
//#endregion
export { ApiariesPage as component };
