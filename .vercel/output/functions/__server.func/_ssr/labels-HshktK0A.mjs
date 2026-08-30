//#region node_modules/.nitro/vite/services/ssr/assets/labels-HshktK0A.js
var ACTION_TYPES = [
	{
		id: "inspection",
		label: "Inspección"
	},
	{
		id: "harvest",
		label: "Cosecha"
	},
	{
		id: "change_queen",
		label: "Cambio de reina"
	},
	{
		id: "add_frames",
		label: "Añadir cuadros"
	},
	{
		id: "remove_frames",
		label: "Retirar cuadros"
	},
	{
		id: "add_super",
		label: "Añadir alza"
	},
	{
		id: "remove_super",
		label: "Retirar alza"
	},
	{
		id: "treatment",
		label: "Tratamiento"
	},
	{
		id: "split",
		label: "Dividir colmena"
	},
	{
		id: "create_nuc",
		label: "Crear núcleo"
	},
	{
		id: "move",
		label: "Mover colmena"
	},
	{
		id: "note",
		label: "Nota"
	}
];
var ACTION_LABEL = Object.fromEntries(ACTION_TYPES.map((item) => [item.id, item.label]));
var FRAME_KIND_LABEL = {
	standard: "Normal",
	medium: "Media alza"
};
var PRODUCT_LABEL = {
	honey: "Miel",
	propolis: "Propóleo",
	pollen: "Polen",
	wax: "Cera",
	royal_jelly: "Jalea real"
};
var PRODUCT_PREFIX = {
	honey: "M",
	propolis: "PR",
	pollen: "P",
	wax: "C",
	royal_jelly: "JR"
};
var PRODUCT_ORDER = [
	"honey",
	"propolis",
	"pollen",
	"wax",
	"royal_jelly"
];
var COLONY_KIND_LABEL = {
	hive: "Colmena",
	nuc: "Núcleo"
};
function framesPhrase(kind, qty) {
	return `${qty} ${kind === "medium" ? "cuadros de media alza" : "cuadros normales"}`;
}
function actionSummary(action, state) {
	switch (action.type) {
		case "add_frames":
			if (!action.framesQty || !action.framesKind) return null;
			return `Añadió ${framesPhrase(action.framesKind, action.framesQty)}`;
		case "remove_frames":
			if (!action.framesQty || !action.framesKind) return null;
			return `Retiró ${framesPhrase(action.framesKind, action.framesQty)}`;
		case "add_super": return action.supersQty ? `Añadió ${action.supersQty} ${action.supersQty === 1 ? "alza" : "alzas"}` : "Añadió alza";
		case "remove_super": return action.supersQty ? `Retiró ${action.supersQty} ${action.supersQty === 1 ? "alza" : "alzas"}` : "Retiró alza";
		case "treatment": return action.treatmentProduct ? `Producto: ${action.treatmentProduct}` : null;
		case "harvest": return action.harvestQty != null ? `${formatKg(action.harvestQty)}` : null;
		case "move": {
			const dest = state.apiaries.find((item) => item.id === action.moveToApiaryId);
			return dest ? `Destino: ${dest.name}` : null;
		}
		case "change_queen": {
			const bits = [];
			if (action.queenRetireReason) bits.push(`Motivo: ${action.queenRetireReason}`);
			if (action.queenOrigin) bits.push(`Origen: ${action.queenOrigin}`);
			return bits.length ? bits.join(" · ") : null;
		}
		default: return null;
	}
}
function formatKg(value) {
	const abs = Math.abs(value);
	return `${abs >= 100 ? value.toFixed(0) : abs >= 10 ? trimNum(value, 1) : trimNum(value, 2)} kg`;
}
function trimNum(value, digits) {
	return value.toFixed(digits).replace(/\.?0+$/, "");
}
function suggestLot(product, date, existing) {
	const prefix = PRODUCT_PREFIX[product];
	const [year, month] = date.split("-");
	const base = `${prefix}${year}-${month}-`;
	let seq = 1;
	const used = new Set(existing);
	while (used.has(`${base}${String(seq).padStart(2, "0")}`)) seq += 1;
	return `${base}${String(seq).padStart(2, "0")}`;
}
//#endregion
export { PRODUCT_LABEL as a, formatKg as c, FRAME_KIND_LABEL as i, suggestLot as l, ACTION_TYPES as n, PRODUCT_ORDER as o, COLONY_KIND_LABEL as r, actionSummary as s, ACTION_LABEL as t };
