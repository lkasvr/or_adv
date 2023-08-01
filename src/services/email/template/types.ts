interface Template extends Record<string, unknown> {
  from_name: string;
  email: string;
  phone: string;
  area: string;
  message: string;
}

export interface ContactTemplate extends Template {
  personNumberRegister?: string;
}

export interface ProbonoTemplate extends Template {
  identityNumber: string;
  personNumberRegister: string;
  incomeRange: string;
}
