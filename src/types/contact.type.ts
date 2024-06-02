export interface ContactCreationType {
  phoneNumber: string | null;
  email: string | null;
  linkedId: number | null;
  linkPrecedence: "primary" | "secondary";
}

export interface ContactOptionalType {
  id?: number;
  phoneNumber?: string;
  email?: string;
  linkedId?: number;
  linkPrecedence?: "primary" | "secondary";
}

export interface SaveContactPayload {
  email: string | null;
  phoneNumber: string | null;
}