import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { i as cn, n as Route } from "./_ssr/router-BtIBG_aH.mjs";
import { C as useNotebook, S as useAppMutations, _ as nowIso, b as queenHistory, f as formatDate, g as newId, i as apiaryOf, l as currentQueen, n as Card, r as actionsOf, t as Button, x as todayISO } from "./_ssr/card-DB5tenPa.mjs";
import { i as Textarea, n as Field, r as Input, t as EmptyState } from "./_ssr/empty-state-BaXmf9Aa.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./_ssr/dialog-RujvsrY-.mjs";
import { i as FRAME_KIND_LABEL, n as ACTION_TYPES, r as COLONY_KIND_LABEL, s as actionSummary, t as ACTION_LABEL } from "./_ssr/labels-HshktK0A.mjs";
import { a as queenColorFromDate, i as QueenSwatch, n as QUEEN_COLOR_META, r as QueenColorCaption } from "./_ssr/queen-swatch-D350sr7H.mjs";
import { n as ColonyKindBadge, t as ColonyFormDialog } from "./_ssr/colony-kind-badge-B7puwLep.mjs";
import { t as ConfirmDelete } from "./_ssr/confirm-delete-B5gQOl1I.mjs";
import { t as PageHeader } from "./_ssr/page-header-Cl0AWdC8.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-Msnfhv-V.mjs";
import { t as Root } from "./_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_colonyId-CK-t2JDY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ActionFormDialog({ open, onOpenChange, state, colonyId, presetType, onSubmit }) {
	const [type, setType] = (0, import_react.useState)(presetType ?? "inspection");
	const [date, setDate] = (0, import_react.useState)(todayISO());
	const [notes, setNotes] = (0, import_react.useState)("");
	const [framesKind, setFramesKind] = (0, import_react.useState)("standard");
	const [framesQty, setFramesQty] = (0, import_react.useState)("2");
	const [supersQty, setSupersQty] = (0, import_react.useState)("1");
	const [treatmentProduct, setTreatmentProduct] = (0, import_react.useState)("");
	const [harvestQty, setHarvestQty] = (0, import_react.useState)("");
	const [moveToApiaryId, setMoveToApiaryId] = (0, import_react.useState)("");
	const [queenOrigin, setQueenOrigin] = (0, import_react.useState)("");
	const [queenRetireReason, setQueenRetireReason] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const colony = state.colonies.find((item) => item.id === colonyId);
	const queen = currentQueen(state, colonyId);
	const otherApiaries = state.apiaries.filter((item) => item.id !== colony?.apiaryId);
	const queenColor = QUEEN_COLOR_META[queenColorFromDate(date)];
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setType(presetType ?? "inspection");
		setDate(todayISO());
		setNotes("");
		setFramesKind("standard");
		setFramesQty("2");
		setSupersQty("1");
		setTreatmentProduct("");
		setHarvestQty("");
		setMoveToApiaryId(otherApiaries[0]?.id ?? "");
		setQueenOrigin("");
		setQueenRetireReason("");
	}, [
		open,
		presetType,
		colonyId
	]);
	const needsFrames = type === "add_frames" || type === "remove_frames";
	const needsSuper = type === "add_super" || type === "remove_super";
	const notesRequired = type === "note";
	const canSubmit = (0, import_react.useMemo)(() => {
		if (!date) return false;
		if (needsFrames && (!framesQty || Number(framesQty) < 1)) return false;
		if (needsSuper && (!supersQty || Number(supersQty) < 1)) return false;
		if (type === "treatment" && !treatmentProduct.trim()) return false;
		if (type === "move" && !moveToApiaryId) return false;
		if (type === "change_queen" && queen && !queenRetireReason.trim()) return false;
		if (notesRequired && !notes.trim()) return false;
		return true;
	}, [
		date,
		needsFrames,
		framesQty,
		needsSuper,
		supersQty,
		type,
		treatmentProduct,
		moveToApiaryId,
		queen,
		queenRetireReason,
		notesRequired,
		notes
	]);
	async function handleSubmit(event) {
		event.preventDefault();
		if (!canSubmit) return;
		setBusy(true);
		try {
			const action = {
				id: newId(),
				colonyId,
				type,
				date,
				notes: notes.trim() || void 0,
				createdAt: nowIso()
			};
			if (needsFrames) {
				action.framesKind = framesKind;
				action.framesQty = Number(framesQty);
			}
			if (needsSuper) action.supersQty = Number(supersQty);
			if (type === "treatment") action.treatmentProduct = treatmentProduct.trim();
			if (type === "harvest" && harvestQty) action.harvestQty = Number(harvestQty);
			if (type === "move") action.moveToApiaryId = moveToApiaryId;
			if (type === "change_queen") {
				action.queenIntroducedAt = date;
				action.queenOrigin = queenOrigin.trim() || void 0;
				action.queenRetireReason = queenRetireReason.trim() || void 0;
			}
			await onSubmit(action);
			onOpenChange(false);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Registrar acción" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Elige una acción habitual. El texto libre queda para lo que no encaje en el menú." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4",
			onSubmit: (event) => void handleSubmit(event),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Acción",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: type,
						onValueChange: (value) => setType(value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ACTION_TYPES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: item.id,
							children: item.label
						}, item.id)) })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Fecha",
					htmlFor: "action-date",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "action-date",
						type: "date",
						value: date,
						onChange: (event) => setDate(event.target.value),
						required: true
					})
				}),
				needsFrames ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tipo de cuadro",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: framesKind,
							onValueChange: (value) => setFramesKind(value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.entries(FRAME_KIND_LABEL).map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: id,
								children: label
							}, id)) })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Cantidad",
						htmlFor: "frames-qty",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "frames-qty",
							type: "number",
							min: 1,
							step: 1,
							inputMode: "numeric",
							value: framesQty,
							onChange: (event) => setFramesQty(event.target.value),
							required: true
						})
					})]
				}) : null,
				needsSuper ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Número de alzas",
					htmlFor: "supers-qty",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "supers-qty",
						type: "number",
						min: 1,
						step: 1,
						inputMode: "numeric",
						value: supersQty,
						onChange: (event) => setSupersQty(event.target.value),
						required: true
					})
				}) : null,
				type === "treatment" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Producto",
					htmlFor: "treatment",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "treatment",
						value: treatmentProduct,
						onChange: (event) => setTreatmentProduct(event.target.value),
						placeholder: "Ácido oxálico sublimado",
						required: true
					})
				}) : null,
				type === "harvest" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Cantidad (kg)",
					htmlFor: "harvest-qty",
					hint: "Opcional. La producción de sala se registra aparte.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "harvest-qty",
						type: "number",
						min: 0,
						step: "0.1",
						inputMode: "decimal",
						value: harvestQty,
						onChange: (event) => setHarvestQty(event.target.value)
					})
				}) : null,
				type === "move" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Apiario de destino",
					children: otherApiaries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Crea otro apiario antes de registrar un traslado."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: moveToApiaryId,
						onValueChange: setMoveToApiaryId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecciona apiario" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: otherApiaries.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: item.id,
							children: item.name
						}, item.id)) })]
					})
				}) : null,
				type === "change_queen" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 rounded-xl bg-muted/60 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "El color se calcula solo a partir del año de introducción."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueenSwatch, { date }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Color ",
								date.slice(0, 4),
								" · ",
								queenColor.label
							] })]
						}),
						queen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Motivo del cambio",
							htmlFor: "queen-reason",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "queen-reason",
								value: queenRetireReason,
								onChange: (event) => setQueenRetireReason(event.target.value),
								placeholder: "Reina vieja, postura irregular…",
								required: true
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Origen de la reina",
							htmlFor: "queen-origin",
							hint: "Opcional",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "queen-origin",
								value: queenOrigin,
								onChange: (event) => setQueenOrigin(event.target.value),
								placeholder: "Criadero propio, compra, realera…"
							})
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: notesRequired ? "Nota" : "Observaciones",
					htmlFor: "action-notes",
					hint: notesRequired ? void 0 : "Opcional",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "action-notes",
						value: notes,
						onChange: (event) => setNotes(event.target.value),
						rows: 3,
						required: notesRequired
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy || !canSubmit,
					children: "Guardar acción"
				})] })
			]
		})] })
	});
}
function QueenFormDialog({ open, onOpenChange, onSubmit }) {
	const [introducedAt, setIntroducedAt] = (0, import_react.useState)(todayISO());
	const [origin, setOrigin] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const color = QUEEN_COLOR_META[queenColorFromDate(introducedAt)];
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setIntroducedAt(todayISO());
		setOrigin("");
	}, [open]);
	async function handleSubmit(event) {
		event.preventDefault();
		setBusy(true);
		try {
			await onSubmit({
				introducedAt,
				origin: origin.trim() || void 0
			});
			onOpenChange(false);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Registrar reina" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "El color de marcado se asigna automáticamente según el año de introducción." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4",
			onSubmit: (event) => void handleSubmit(event),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Fecha de introducción",
					htmlFor: "queen-date",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "queen-date",
						type: "date",
						value: introducedAt,
						onChange: (event) => setIntroducedAt(event.target.value),
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-xl bg-muted/60 px-3 py-2.5 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueenSwatch, {
						date: introducedAt,
						size: "lg"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-medium",
						children: [
							introducedAt.slice(0, 4),
							" · ",
							color.label
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Código internacional de marcado"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Origen",
					htmlFor: "queen-origin",
					hint: "Opcional",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "queen-origin",
						value: origin,
						onChange: (event) => setOrigin(event.target.value),
						placeholder: "Criadero propio, compra, realera…"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy || !introducedAt,
					children: "Registrar"
				})] })
			]
		})] })
	});
}
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
	...props
}));
Separator.displayName = Root.displayName;
function ColonyPage() {
	const { colonyId } = Route.useParams();
	const navigate = useNavigate();
	const { data } = useNotebook();
	const { saveColony, saveQueen, saveAction, removeColony, removeAction } = useAppMutations();
	const [actionOpen, setActionOpen] = (0, import_react.useState)(false);
	const [presetType, setPresetType] = (0, import_react.useState)();
	const [queenOpen, setQueenOpen] = (0, import_react.useState)(false);
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const [deleteOpen, setDeleteOpen] = (0, import_react.useState)(false);
	const [deletingAction, setDeletingAction] = (0, import_react.useState)(null);
	const colony = data.colonies.find((item) => item.id === colonyId);
	if (!colony) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No encontrada",
		description: "Esta colmena o núcleo ya no existe.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/apiarios",
				children: "Volver a apiarios"
			})
		})
	});
	const apiary = apiaryOf(data, colony.apiaryId);
	const queen = currentQueen(data, colony.id);
	const previous = queenHistory(data, colony.id).filter((item) => item.retiredAt);
	const logs = actionsOf(data, colony.id);
	const noun = COLONY_KIND_LABEL[colony.kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: `${noun} ${colony.number}`,
			description: apiary?.name,
			backTo: apiary ? `/apiarios/${apiary.id}` : "/apiarios",
			backLabel: apiary?.name ?? "Apiarios",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						setPresetType("inspection");
						setActionOpen(true);
					},
					children: "Registrar acción"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setEditOpen(true),
					children: "Editar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setDeleteOpen(true),
					children: "Eliminar"
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColonyKindBadge, { kind: colony.kind }), apiary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/apiarios/$apiaryId",
				params: { apiaryId: apiary.id },
				className: "text-sm text-muted-foreground hover:text-foreground",
				children: [apiary.name, apiary.location ? ` · ${apiary.location}` : ""]
			}) : null]
		}),
		colony.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-5 max-w-2xl text-sm text-muted-foreground",
			children: colony.notes
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-6 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-medium",
					children: "Reina"
				}), queen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueenColorCaption, { date: queen.introducedAt }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Introducida el ",
							formatDate(queen.introducedAt),
							queen.origin ? ` · ${queen.origin}` : ""
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Sin reina registrada."
				})] }), queen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => {
						setPresetType("change_queen");
						setActionOpen(true);
					},
					children: "Cambiar reina"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => setQueenOpen(true),
					children: "Registrar reina"
				})]
			}), previous.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase",
					children: "Reinas anteriores"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-3",
					children: previous.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueenSwatch, {
							date: item.introducedAt,
							className: "mt-1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [formatDate(item.introducedAt), item.retiredAt ? ` — ${formatDate(item.retiredAt)}` : ""] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground",
							children: [item.retireReason || "Sin motivo indicado", item.origin ? ` · ${item.origin}` : ""]
						})] })]
					}, item.id))
				})
			] }) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-medium",
				children: "Historial"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				onClick: () => {
					setPresetType(void 0);
					setActionOpen(true);
				},
				children: "Nueva acción"
			})]
		}), logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Aún no hay acciones. Usa el menú de acciones habituales para llevar un registro homogéneo."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-border)]",
			children: logs.map((action) => {
				const summary = actionSummary(action, data);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start justify-between gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: ACTION_LABEL[action.type]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: formatDate(action.date)
							}),
							summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: summary
							}) : null,
							action.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: action.notes
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-xs text-muted-foreground hover:text-destructive",
						onClick: () => setDeletingAction(action.id),
						children: "Quitar"
					})]
				}, action.id);
			})
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionFormDialog, {
			open: actionOpen,
			onOpenChange: setActionOpen,
			state: data,
			colonyId: colony.id,
			presetType,
			onSubmit: async (action) => {
				await saveAction.mutateAsync(action);
				toast.success("Acción guardada");
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueenFormDialog, {
			open: queenOpen,
			onOpenChange: setQueenOpen,
			onSubmit: async (values) => {
				await saveQueen.mutateAsync({
					id: newId(),
					colonyId: colony.id,
					...values
				});
				toast.success("Reina registrada");
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColonyFormDialog, {
			open: editOpen,
			onOpenChange: setEditOpen,
			kind: colony.kind,
			initial: colony,
			onSubmit: async (values) => {
				await saveColony.mutateAsync({
					...colony,
					...values,
					updatedAt: (/* @__PURE__ */ new Date()).toISOString()
				});
				toast.success("Datos actualizados");
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
			open: deleteOpen,
			onOpenChange: setDeleteOpen,
			title: `Eliminar ${noun.toLowerCase()} ${colony.number}`,
			description: "Se eliminará el historial de acciones y de reinas de esta colonia.",
			onConfirm: async () => {
				const parent = colony.apiaryId;
				await removeColony.mutateAsync(colony.id);
				toast.success("Eliminada");
				await navigate({
					to: "/apiarios/$apiaryId",
					params: { apiaryId: parent }
				});
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
			open: Boolean(deletingAction),
			onOpenChange: (open) => {
				if (!open) setDeletingAction(null);
			},
			title: "Quitar esta acción",
			description: "El registro desaparecerá del historial. Un cambio de reina ya aplicado no se revierte.",
			confirmLabel: "Quitar",
			onConfirm: async () => {
				if (!deletingAction) return;
				await removeAction.mutateAsync(deletingAction);
				setDeletingAction(null);
			}
		})
	] });
}
//#endregion
export { ColonyPage as component };
