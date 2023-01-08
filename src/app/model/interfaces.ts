// Incorporem tant les guàrdies que cal cobrir
// com les meues. Necessitem la data per agrupar
// i tota la informació en text, ja que no són editables.
// L'únic que podem fer és assignar un professor o editar
// la feina o comentaris, i amb el ID de la guàrdia es prou.
export interface Guard {
    id: string;
    id_absencia: string;
    data: Date;
    hora: string;
    id_professor: number;
    professor: string; // Jo o un altre
    espai: string;
    grup: string;
    materia: string;
    es_guardia: boolean;
    // fi dels camps d'horari interessants.
    // absencia: si no és meua, em dóna igual
    id_substitut: number;
    substitut: string; // nom
    feina: string;
}

export interface GuardJSON { 
    id: string;
    id_absencia: string;
    data: string;
    hora: string;
    // Horari: Si no és meu, no m'interessa.
    // Camps d'horari que interessen:
    id_professor: number;
    professor: string;
    espai: string;
    grup: string;
    materia: string;
    es_guardia: boolean;
    // fi dels camps d'horari interessants.
    // absencia: si no és meua, em dóna igual
    id_substitut: number;
    substitut: string; // id o nom?
    feina: string;
}

export interface Absence {
    id: number;
    data: Date;
    data_fi: Date;
    hora_ini: Date;
    hora_fi: Date;
    dia_complet: boolean;
    extraescolar: boolean;
    justificada: boolean;
}

export interface AbsenceJSON {
    id: number;
    data: string;
    data_fi: string;
    hora_ini: string;
    hora_fi: string;
    dia_complet: boolean;
    extraescolar: boolean;
    justificada: boolean;
}