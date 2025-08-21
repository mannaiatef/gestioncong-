import { User } from "./user.model";

export enum StatusDemande {
  EN_ATTENTE = 'EN_ATTENTE',
  ACCEPTEE = 'ACCEPTEE',
  REFUSEE = 'REFUSEE'
}

export interface DemandeConge {
  id: number;
  dateDemande?: string;
  dateDebut: string;
  dateFin: string;
  motif: string;
  status?: StatusDemande;
  employe?: User;
  employeUsername?: string;
  chefUsername?: string;
}
