export interface Guardia {
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