import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as cn } from "./router-BtIBG_aH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queen-swatch-D350sr7H.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Código internacional de marcado de reinas.
* Se usa el año de introducción (o nacimiento) y el último dígito:
*
*   1 y 6 → blanco
*   2 y 7 → amarillo
*   3 y 8 → rojo
*   4 y 9 → verde
*   5 y 0 → azul
*
* Ciclo de cinco colores, convención usada internacionalmente.
* El color NUNCA lo elige el usuario: se calcula a partir del año.
*/
function queenColorForYear(year) {
	const digit = (year % 10 + 10) % 10;
	if (digit === 1 || digit === 6) return "white";
	if (digit === 2 || digit === 7) return "yellow";
	if (digit === 3 || digit === 8) return "red";
	if (digit === 4 || digit === 9) return "green";
	return "blue";
}
function queenColorFromDate(isoDate) {
	const year = Number.parseInt(isoDate.slice(0, 4), 10);
	if (!Number.isFinite(year)) return queenColorForYear((/* @__PURE__ */ new Date()).getFullYear());
	return queenColorForYear(year);
}
var QUEEN_COLOR_META = {
	white: {
		label: "Blanco",
		fill: "#F4F1E8",
		stroke: "#8A8376",
		onFill: "#1F1A14"
	},
	yellow: {
		label: "Amarillo",
		fill: "#D4A017",
		stroke: "#8A6A0A",
		onFill: "#1F1A14"
	},
	red: {
		label: "Rojo",
		fill: "#B83A2A",
		stroke: "#7A241C",
		onFill: "#FAF7F0"
	},
	green: {
		label: "Verde",
		fill: "#2F7A4A",
		stroke: "#1C4F30",
		onFill: "#FAF7F0"
	},
	blue: {
		label: "Azul",
		fill: "#2B5A9A",
		stroke: "#1A3C6B",
		onFill: "#FAF7F0"
	}
};
var QUEEN_COLOR_CYCLE = [
	{
		digits: "1 y 6",
		color: "white"
	},
	{
		digits: "2 y 7",
		color: "yellow"
	},
	{
		digits: "3 y 8",
		color: "red"
	},
	{
		digits: "4 y 9",
		color: "green"
	},
	{
		digits: "5 y 0",
		color: "blue"
	}
];
function QueenSwatch({ date, color, size = "md", className }) {
	const meta = QUEEN_COLOR_META[color ?? (date ? queenColorFromDate(date) : "white")];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-block shrink-0 rounded-full border", size === "sm" ? "size-3.5" : size === "lg" ? "size-8" : "size-5", className),
		style: {
			backgroundColor: meta.fill,
			borderColor: meta.stroke
		},
		title: meta.label,
		"aria-label": meta.label
	});
}
function QueenColorCaption({ date }) {
	const year = date.slice(0, 4);
	const meta = QUEEN_COLOR_META[queenColorFromDate(date)];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-2 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueenSwatch, { date }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			year,
			" · ",
			meta.label
		] })]
	});
}
//#endregion
export { queenColorFromDate as a, QueenSwatch as i, QUEEN_COLOR_META as n, QueenColorCaption as r, QUEEN_COLOR_CYCLE as t };
