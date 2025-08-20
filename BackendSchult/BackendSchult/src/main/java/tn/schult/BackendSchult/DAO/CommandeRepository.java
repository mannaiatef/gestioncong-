package tn.schult.BackendSchult.DAO;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.schult.BackendSchult.entities.Commande;


@Repository
public interface CommandeRepository extends JpaRepository<Commande,Integer>  {
    // Ajout de la méthode findAll avec pagination
    Page<Commande> findAll(Pageable pageable);
}
