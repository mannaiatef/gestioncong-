package tn.schult.BackendSchult.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.schult.BackendSchult.entities.Facture;
import tn.schult.BackendSchult.services.FactureFunctionality;


import java.util.List;


@RestController
@RequestMapping("/facture")
public class FactureController {
    @Autowired
    private FactureFunctionality factureFunctionality;

    @GetMapping
    public List<Facture> getAllFactures() {
        return factureFunctionality.getAllFactures();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Facture> getFactureById(@PathVariable int id) {
        Facture facture = factureFunctionality.getFactureById(id);
        return ResponseEntity.ok(facture);
    }

    @PostMapping
    public ResponseEntity<Facture> createFacture(@RequestBody Facture facture) {
        Facture createdFacture = factureFunctionality.createFacture(facture);
        return ResponseEntity.ok(createdFacture);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Facture> updateFacture(@PathVariable int id, @RequestBody Facture factureDetails) {
        Facture updatedFacture = factureFunctionality.updateFacture(id, factureDetails);
        return ResponseEntity.ok(updatedFacture);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFacture(@PathVariable int id) {
        factureFunctionality.deleteFacture(id);
        return ResponseEntity.ok("{\"message\": \"Facture supprimée avec succès !\"}");
    }

}
