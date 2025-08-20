package tn.schult.BackendSchult.services;






import tn.schult.BackendSchult.entities.Commande;

import java.util.List;

public interface CommandeFunctionality {
    List<Commande> getAllCommandes();
    Commande getCommandeById(int id);
    Commande createCommande(Commande commande);
    Commande updateCommande(int id, Commande commandeDetails);
    void deleteCommande(int id);
}
