package tn.schult.BackendSchult.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.schult.BackendSchult.entities.DemandeConge;
import tn.schult.BackendSchult.entities.User;


import java.util.List;

@Repository
public interface IDemandeConge extends JpaRepository<DemandeConge,Long> {
    // Récupérer les demandes de congé d'une liste d'employés
    List<DemandeConge> findByEmployeIn(List<User> employes);
}
