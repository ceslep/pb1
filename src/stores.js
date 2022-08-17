import { writable } from "svelte/store";

export const URL=writable("");
export const Periodos = writable([]);
export const Asignacion = writable([]);

export const Docentes=writable([])
export const Docente=writable("");
export const NombresDocente=writable("");

export const Periodo=writable("");
export const CAsignacion=writable("");


export const MAESTRO=writable(false);

export let Asignatura=writable("");
export let Grado = writable("");
export let Nivel = writable("");
export let Numero = writable("");

