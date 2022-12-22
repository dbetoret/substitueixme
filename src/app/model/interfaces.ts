export interface Guard {
    data: Date;
    // Horari: Si no és meu, no m'interessa.
    // Camps d'horari que interessen:
    dia: string;
    hora: string;
    espai: string;
    grup: string;
    materia: string;
    es_guardia: boolean;
    professor: string;
    // fi dels camps d'horari interessants.
    // absencia: si no és meua, em dóna igual
    substitut: string; // id o nom?
    feina: string;
}

export interface GuardJSON {
    data: string;
    // Horari: Si no és meu, no m'interessa.
    // Camps d'horari que interessen:
    dia: string;
    hora: string;
    professor: string;
    espai: string;
    grup: string;
    materia: string;
    es_guardia: boolean;
    // fi dels camps d'horari interessants.
    // absencia: si no és meua, em dóna igual
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
    guardies: Guard[];
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
    guardies: Guard[];
}