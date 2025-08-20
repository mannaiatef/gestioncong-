package tn.schult.BackendSchult.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.schult.BackendSchult.entities.Materials;


@Repository
public interface MaterialsRepository  extends JpaRepository<Materials,Long> {
}
