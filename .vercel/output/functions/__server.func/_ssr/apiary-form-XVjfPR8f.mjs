import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./card-DB5tenPa.mjs";
import { i as Textarea, n as Field, r as Input } from "./empty-state-BaXmf9Aa.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-RujvsrY-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/apiary-form-XVjfPR8f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ApiaryFormDialog({ open, onOpenChange, initial, onSubmit }) {
	const [name, setName] = (0, import_react.useState)("");
	const [location, setLocation] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setName(initial?.name ?? "");
		setLocation(initial?.location ?? "");
		setNotes(initial?.notes ?? "");
	}, [open, initial]);
	async function handleSubmit(event) {
		event.preventDefault();
		if (!name.trim()) return;
		setBusy(true);
		try {
			await onSubmit({
				name: name.trim(),
				location: location.trim(),
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: initial ? "Editar apiario" : "Nuevo apiario" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: initial ? "Actualiza el nombre o la ubicación." : "Cada apiario agrupa colmenas y núcleos." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4",
			onSubmit: (event) => void handleSubmit(event),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Nombre",
					htmlFor: "apiary-name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "apiary-name",
						value: name,
						onChange: (event) => setName(event.target.value),
						placeholder: "La Dehesa",
						required: true,
						autoFocus: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Ubicación",
					htmlFor: "apiary-location",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "apiary-location",
						value: location,
						onChange: (event) => setLocation(event.target.value),
						placeholder: "Valencia de Alcántara, Cáceres"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Notas",
					htmlFor: "apiary-notes",
					hint: "Opcional",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "apiary-notes",
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
					disabled: busy || !name.trim(),
					children: initial ? "Guardar" : "Crear apiario"
				})] })
			]
		})] })
	});
}
//#endregion
export { ApiaryFormDialog as t };
