import { Guardia } from './guardia';

export interface Absencia {
    id: number;
    data: Date;
    data_fi: Date;
    hora_ini: Date;
    hora_fi: Date;
    dia_complet: boolean;
    extraescolar: boolean;
    justificada: boolean;
    guardies: Guardia[];
}

export interface AbsenciaS {
    id: number;
    data: string;
    data_fi: string;
    hora_ini: string;
    hora_fi: string;
    dia_complet: boolean;
    extraescolar: boolean;
    justificada: boolean;
    guardies: Guardia[];
}