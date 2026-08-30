import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { i as cn } from "./router-BtIBG_aH.mjs";
import { t as Button } from "./card-DB5tenPa.mjs";
import { i as Textarea, n as Field, r as Input } from "./empty-state-BaXmf9Aa.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-RujvsrY-.mjs";
import { r as COLONY_KIND_LABEL } from "./labels-HshktK0A.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/colony-kind-badge-B7puwLep.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ColonyFormDialog({ open, onOpenChange, kind, initial, onSubmit }) {
	const [number, setNumber] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const noun = COLONY_KIND_LABEL[kind].toLowerCase();
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setNumber(initial?.number ?? "");
		setNotes(initial?.notes ?? "");
	}, [open, initial]);
	async function handleSubmit(event) {
		event.preventDefault();
		if (!number.trim()) return;
		setBusy(true);
		try {
			await onSubmit({
				number: number.trim(),
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: initial ? `Editar ${noun}` : `Añadir ${noun}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: kind === "hive" ? "Las colmenas y los núcleos se registran por separado." : "Un núcleo no es una colmena. Queda identificado como tal en todo el historial." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4",
			onSubmit: (event) => void handleSubmit(event),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Número",
					htmlFor: "colony-number",
					hint: "Por ejemplo 24 o N1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "colony-number",
						value: number,
						onChange: (event) => setNumber(event.target.value),
						required: true,
						autoFocus: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Notas",
					htmlFor: "colony-notes",
					hint: "Opcional",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "colony-notes",
						value: notes,
						onChange: (event) => setNotes(event.target.value),
						rows: 3
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy || !number.trim(),
					children: initial ? "Guardar" : "Añadir"
				})] })
			]
		})] })
	});
}
var badgeVariants = cva("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground",
		secondary: "border-transparent bg-secondary text-secondary-foreground",
		outline: "border-border text-foreground",
		honey: "border-transparent bg-honey text-honey-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function ColonyKindBadge({ kind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: kind === "hive" ? "outline" : "secondary",
		children: COLONY_KIND_LABEL[kind]
	});
}
//#endregion
export { ColonyKindBadge as n, ColonyFormDialog as t };
