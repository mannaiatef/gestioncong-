package tn.schult.BackendSchult.services;

import org.springframework.stereotype.Service;
import tn.schult.BackendSchult.DAO.IDemandeConge;
import tn.schult.BackendSchult.entities.DemandeConge;
import tn.schult.BackendSchult.repositories.UserRepo;


import java.util.List;

@Service
public class DemandeCongeService implements IDemandeCongeService{


    private final IDemandeConge dc;
    private final UserRepo us;

    public DemandeCongeService(IDemandeConge dc,UserRepo us) {
        this.dc = dc;
        this.us = us;
    }

    public DemandeConge ajouterConge(DemandeConge demande) {

        return dc.save(demande);
    }

    public List<DemandeConge> findAll() {

        List<DemandeConge> conges = dc.findAll();

        return conges;
    }

    public DemandeConge findById(long id) {
        return dc.findById(id).get();
    }

    public DemandeConge updateConge(long id, DemandeConge newConge) {
        if (dc.findById(id).isPresent()) {
            DemandeConge conge = dc.findById(id).get();
            conge.setDateDemande(newConge.getDateDemande());
            conge.setDateDebut(newConge.getDateDebut());
            conge.setMotif(newConge.getMotif());
            conge.setDateFin(newConge.getDateFin());
            conge.setStatus(newConge.getStatus());


            return dc.save(conge);
        } else
            return null;
    }



    public String deleteConge(long id) {
        if (dc.findById(id).isPresent()) {
            dc.deleteById(id);
            return "Congé supprimé";
        } else
            return "Congé non supprimé";
    }




    //zedtou ena
//    public List<DemandeConge> getDemandesParChef(String chefUsername) {
//        User chef = us.findByUsername(chefUsername);
//
//
//        List<User> employes = chef.getEmployes(); // si tu as une relation OneToMany
//        return dc.findByEmployeIn(employes);
//    }


}
