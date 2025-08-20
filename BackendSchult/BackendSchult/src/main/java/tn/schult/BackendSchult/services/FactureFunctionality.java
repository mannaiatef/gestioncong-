package tn.schult.BackendSchult.services;







import tn.schult.BackendSchult.entities.Facture;

import java.util.List;

public interface FactureFunctionality {
    List<Facture> getAllFactures();
    Facture getFactureById(int id);
    Facture createFacture(Facture facture);
    Facture updateFacture(int id, Facture factureDetails);
    void deleteFacture(int id);
}
