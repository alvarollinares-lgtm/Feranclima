
export type Brand = 'Panasonic' | 'Fujitsu' | 'Daitsu' | 'Hiyasu' | 'General' | 'Gree';

export type DeviceType = 'Split Pared' | 'Conductos' | 'Cassette' | 'Aerotermia' | 'Multi-Split' | 'Otro';

export type TimePreference = 'Mañanas (9-14h)' | 'Tardes (16-19h)' | 'Indiferente';

export interface Aviso {
  id: string;
  fechaEntrada: string;
  nombre: string;
  telefono1: string;
  telefono2?: string;
  email: string;
  direccion: string;
  portalPiso?: string;
  codigoPostal: string;
  poblacion: string;
  marca: Brand;
  tipoAparato: DeviceType;
  descripcion: string;
  preferenciaHoraria: TimePreference;
  estado: 'Pendiente' | 'Asignado' | 'Finalizado';
}

export const OFFICIAL_BRANDS: Brand[] = ['Panasonic', 'Fujitsu', 'Daitsu', 'Hiyasu', 'General', 'Gree'];

export const DEVICE_TYPES: DeviceType[] = ['Split Pared', 'Conductos', 'Cassette', 'Aerotermia', 'Multi-Split', 'Otro'];

export const TIME_PREFERENCES: TimePreference[] = ['Mañanas (9-14h)', 'Tardes (16-19h)', 'Indiferente'];
