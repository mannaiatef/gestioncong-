package tn.schult.BackendSchult.services;



import tn.schult.BackendSchult.entities.DemandeConge;

import java.util.List;

public interface IDemandeCongeService {


    public DemandeConge ajouterConge(DemandeConge demande);

    public List<DemandeConge> findAll();

    public DemandeConge findById(long id);

    public DemandeConge updateConge(long id, DemandeConge newConge);


    public String deleteConge(long id);

}
