import { atomWithStorage } from "jotai/utils";

const notesAtom = atomWithStorage("notes", []);

export default notesAtom;
