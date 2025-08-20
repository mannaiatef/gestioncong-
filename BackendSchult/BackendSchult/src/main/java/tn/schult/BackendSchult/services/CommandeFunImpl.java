package tn.schult.BackendSchult.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.schult.BackendSchult.DAO.CommandeRepository;
import tn.schult.BackendSchult.entities.Commande;


import java.util.List;

@Service
public class CommandeFunImpl implements CommandeFunctionality{
    @Autowired
    private CommandeRepository commandeRepository;

    @Override
    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }

    @Override
    public Commande getCommandeById(int id) {
        return commandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande not found with id: " + id));
    }

    @Override
    public Commande createCommande(Commande commande) {


      //commande.setId(1);
      return commandeRepository.save(commande);
    }

    @Override
    public Commande updateCommande(int id, Commande commandeDetails) {
        Commande commande = commandeRepository.findById(id).get();

        commande.setDate(commandeDetails.getDate());
        commande.setStatus(commandeDetails.getStatus());
        commande.setTotalAmount(commandeDetails.getTotalAmount());
        commande.setFournisseur(commandeDetails.getFournisseur());
        commande.setFactures(commandeDetails.getFactures());

        return commandeRepository.save(commande);
    }

    @Override
    public void deleteCommande(int id) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande not found with id: " + id));
        commandeRepository.delete(commande);
    }
}
