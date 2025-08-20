package tn.schult.BackendSchult.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tn.schult.BackendSchult.entities.Stock;
import tn.schult.BackendSchult.services.StockFunctionality;


import java.util.List;

@RestController
@RequestMapping("/stock")
@PreAuthorize("isAuthenticated()")
public class StockController {
    @Autowired
    private StockFunctionality stockFunctionality;

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockFunctionality.getAllStocks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Stock> getStockById(@PathVariable int id) {
        Stock stock = stockFunctionality.getStockById(id);
        if (stock == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
        return ResponseEntity.ok(stock);
    }


    @PostMapping("/add")
    public ResponseEntity<Stock> createStock(@RequestBody Stock stock) {
        System.out.println("Tentative de création de stock - Données reçues: " + stock);
        Stock createdStock = stockFunctionality.createStock(stock);
        return ResponseEntity.ok(createdStock);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Stock> updateStock(@PathVariable int id, @RequestBody Stock stockDetails) {
        Stock existingStock = stockFunctionality.getStockById(id);
        if (existingStock == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Stock updatedStock = stockFunctionality.updateStock(id, stockDetails);
        return ResponseEntity.ok(updatedStock);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStock(@PathVariable int id) {
        stockFunctionality.deleteStock(id);
        return ResponseEntity.ok("{\"message\": \"Stock supprimé avec succès !\"}");
    }

}
