package tn.schult.BackendSchult.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.schult.BackendSchult.entities.Stock;


@Repository
public interface StockRepository  extends JpaRepository<Stock,Integer> {
}
