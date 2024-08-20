export interface UserCreate {
  us_nombres: string;
  us_apellidos: string;
  us_dni: string;
  us_telefono: string;
  us_zone: string;
}

export interface UserGet {
  us_id: number;
  us_nombres: string;
  us_apellidos: string;
  us_dni: string;
  us_telefono: string;
  us_zone: string;
  us_pago_confirmado: boolean;
  us_qrcode: string;
}
