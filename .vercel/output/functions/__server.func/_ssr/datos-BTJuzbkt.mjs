import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useNotebook, S as useAppMutations, a as backupFilename, c as copyBackup, d as downloadBackup, n as Card, t as Button } from "./card-DB5tenPa.mjs";
import { i as QueenSwatch, n as QUEEN_COLOR_META, t as QUEEN_COLOR_CYCLE } from "./queen-swatch-D350sr7H.mjs";
import { t as ConfirmDelete } from "./confirm-delete-B5gQOl1I.mjs";
import { t as PageHeader } from "./page-header-Cl0AWdC8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/datos-BTJuzbkt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DataPage() {
	const { data } = useNotebook();
	const { restore, loadSample, resetAll } = useAppMutations();
	const fileRef = (0, import_react.useRef)(null);
	const [importOpen, setImportOpen] = (0, import_react.useState)(false);
	const [pendingFile, setPendingFile] = (0, import_react.useState)(null);
	const [sampleOpen, setSampleOpen] = (0, import_react.useState)(false);
	const [resetOpen, setResetOpen] = (0, import_react.useState)(false);
	function onPickFile(event) {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			const text = String(reader.result ?? "");
			setPendingFile(text);
			setImportOpen(true);
		};
		reader.onerror = () => toast.error("No se pudo leer el archivo");
		reader.readAsText(file);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Datos",
			description: "Todo se guarda en este dispositivo. Una copia de seguridad no es opcional."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-medium",
							children: "Copia de seguridad"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Exporta un JSON con apiarios, colonias, reinas, acciones, producción y cierres anuales. Al importar, se sustituyen todos los datos actuales."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: () => {
										downloadBackup(data);
										toast.success("Descarga iniciada");
									},
									children: ["Exportar ", backupFilename()]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => void copyBackup(data).then(() => toast.success("JSON copiado")).catch(() => toast.error("No se pudo copiar")),
									children: "Copiar JSON"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => fileRef.current?.click(),
									children: "Importar copia"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileRef,
									type: "file",
									accept: "application/json,.json",
									className: "hidden",
									onChange: onPickFile
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-medium",
							children: "Este dispositivo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "mi-apiario funciona sin conexión. Puedes instalarla como aplicación desde el navegador (incluido iPad). Los datos no se envían a ningún servidor."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm tabular-nums text-muted-foreground",
							children: [
								data.apiaries.length,
								" apiarios · ",
								data.colonies.length,
								" colonias ·",
								" ",
								data.actions.length,
								" acciones · ",
								data.production.length,
								" lotes"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-medium",
							children: "Color de las reinas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Se calcula solo, según el último dígito del año de introducción. No se elige a mano."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 grid gap-2 sm:grid-cols-2",
							children: QUEEN_COLOR_CYCLE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueenSwatch, { color: item.color }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Años …",
									item.digits.replace(" y ", " y …"),
									" · ",
									QUEEN_COLOR_META[item.color].label
								] })]
							}, item.color))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-medium",
							children: "Ejemplo y vaciado"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "El ejemplo sustituye los datos actuales por un cuaderno de demostración. Úsalo para explorar; restaura tu copia después."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setSampleOpen(true),
								children: "Cargar ejemplo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setResetOpen(true),
								children: "Vaciar cuaderno"
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
			open: importOpen,
			onOpenChange: setImportOpen,
			title: "Importar copia",
			description: "Se sustituirán todos los datos actuales por el contenido del archivo.",
			confirmLabel: "Importar",
			onConfirm: async () => {
				if (!pendingFile) return;
				try {
					await restore.mutateAsync(pendingFile);
					toast.success("Copia restaurada");
				} catch (error) {
					toast.error(error instanceof Error ? error.message : "No se pudo importar");
				} finally {
					setPendingFile(null);
				}
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
			open: sampleOpen,
			onOpenChange: setSampleOpen,
			title: "Cargar datos de ejemplo",
			description: "Se sustituirán los datos actuales por un apiario de demostración.",
			confirmLabel: "Cargar ejemplo",
			onConfirm: async () => {
				await loadSample.mutateAsync();
				toast.success("Ejemplo cargado");
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
			open: resetOpen,
			onOpenChange: setResetOpen,
			title: "Vaciar el cuaderno",
			description: "Se eliminarán apiarios, colonias, historial y producción de este dispositivo.",
			confirmLabel: "Vaciar",
			onConfirm: async () => {
				await resetAll.mutateAsync();
				toast.success("Cuaderno vacío");
			}
		})
	] });
}
//#endregion
export { DataPage as component };
