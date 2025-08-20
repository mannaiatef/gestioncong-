package tn.schult.BackendSchult.DAO;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.schult.BackendSchult.entities.Fournisseur;


@Repository
public interface FournisseurRepository extends JpaRepository<Fournisseur,Long> {
}
