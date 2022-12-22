export interface Centre {
    centre: string;
    auth_key: string;
}
export interface Franja_horaria {
    id: number;
    dia_setmana: string;
    ndia_setmana: number;
    hinici: string;
    hfinal: string;
    es_pati: boolean;
}
export interface Espai {
    id: number;
    codi_aula: string;
}
export interface Grup {
    id: number;
    grup: string;
}
export interface Materia {
    id: number;
    materia: string;
}
export interface Horari {
    id_franja: number;
    dia_setmana: string;
    hora: string;
    espai_id: number;
    grup_id: number;
    materia_id: number;
    es_guardia: boolean;
}
export interface DadesMestres {
    // usuari
    usuari_id: number;
    usuari_nom: string;
    centre_id: number;
    centre_nom: string;
    // Els usuaris venen assignats 
    // a les absències, no cal carregar-los
    // usuaris: [number, string][]; 
    // espais
    espais: Array<Espai>;
    // grups
    grups: Array<Grup>;
    // materies
    materies: Array<Materia>;
    // Franges horaries
    franges_horaries: Array<Franja_horaria>;
    // Horaris
    horari: Array<Horari>;
}