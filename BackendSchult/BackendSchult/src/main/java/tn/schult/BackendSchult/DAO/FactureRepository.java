package tn.schult.BackendSchult.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.schult.BackendSchult.entities.Facture;


@Repository
public interface FactureRepository  extends JpaRepository<Facture, Integer> {
}
