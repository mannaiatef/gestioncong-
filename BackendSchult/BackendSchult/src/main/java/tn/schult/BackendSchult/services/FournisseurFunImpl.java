package tn.schult.BackendSchult.services;


import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tn.schult.BackendSchult.DAO.FournisseurRepository;
import tn.schult.BackendSchult.entities.Fournisseur;


import java.util.List;

@Slf4j
@Service
public class FournisseurFunImpl implements FournisseurFunctionality {
    private final FournisseurRepository fr;

    public FournisseurFunImpl(FournisseurRepository fr) {
        this.fr = fr;
    }

    public Fournisseur ajouterFournisseur(Fournisseur fournisseur) {
        log.debug("Ajout du fournisseur : {}", fournisseur);
        return fr.save(fournisseur);
    }

    public List<Fournisseur> findAll() {
        log.debug("Récupération de tous les fournisseurs");
        List<Fournisseur> fournisseurs = fr.findAll();
        log.debug("Nombre de fournisseurs récupérés : {}", fournisseurs.size());
        return fournisseurs;
    }

    public Fournisseur findById(long id) {
        return fr.findById(id)
                .orElseThrow(() -> new RuntimeException("Fournisseur non trouvé avec ID : " + id));
    }

    @Transactional
    public Fournisseur updateFournisseur(long id, Fournisseur newFournisseur) {
        return fr.findById(id).map(fournisseur -> {
            fournisseur.setName(newFournisseur.getName());
            fournisseur.setContact(newFournisseur.getContact());
            fournisseur.setNumtel(newFournisseur.getNumtel());
            return fr.save(fournisseur);
        }).orElseThrow(() -> new RuntimeException("Fournisseur non trouvé avec ID : " + id));
    }

    public boolean deleteFournisseur(long id) {
        if (fr.existsById(id)) {
            fr.deleteById(id);
            return true;
        }
        return false;
    }
}
