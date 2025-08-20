package tn.schult.BackendSchult.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.schult.BackendSchult.DAO.FactureRepository;
import tn.schult.BackendSchult.entities.Facture;


import java.util.List;

@Service
public class FactureFunImpl implements FactureFunctionality {
    @Autowired
    private FactureRepository factureRepository;

    @Override
    public List<Facture> getAllFactures() {
        List<Facture> factures = factureRepository.findAll();
        factures.forEach(facture -> System.out.println("Facture trouvé : " + facture));
        return factures;
    }

    @Override
    public Facture getFactureById(int id) {
        return factureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Facture not found with id: " + id));
    }

    @Override
    public Facture createFacture(Facture facture) {
        return factureRepository.save(facture);
    }

    @Override
    public Facture updateFacture(int id, Facture factureDetails) {
        Facture facture = factureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Facture not found with id: " + id));

        facture.setDate(factureDetails.getDate());
        facture.setTotalAmount(factureDetails.getTotalAmount());
        facture.setCommande(factureDetails.getCommande());

        return factureRepository.save(facture);
    }

    @Override
    public void deleteFacture(int id) {
        Facture facture = factureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Facture not found with id: " + id));
        factureRepository.delete(facture);
    }

}
