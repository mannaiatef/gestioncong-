package tn.schult.BackendSchult.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.schult.BackendSchult.entities.Fournisseur;
import tn.schult.BackendSchult.services.FournisseurFunImpl;


import java.util.List;


@RestController
//@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/fournisseur")
public class FournisseurController {
    private final FournisseurFunImpl fournisseurService;

    public FournisseurController(FournisseurFunImpl fournisseurService) {
        this.fournisseurService = fournisseurService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Fournisseur>> listFournisseur() {
        List<Fournisseur> fournisseurs = fournisseurService.findAll();
        return new ResponseEntity<>(fournisseurs, HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Fournisseur>> getAllFournisseurs() {
        List<Fournisseur> fournisseurs = fournisseurService.findAll();
        return new ResponseEntity<>(fournisseurs, HttpStatus.OK);
    }

    @PostMapping("/ajouter")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Fournisseur> createFournisseur(@RequestBody Fournisseur fournisseur) {
        Fournisseur newFournisseur = fournisseurService.ajouterFournisseur(fournisseur);
        return new ResponseEntity<>(newFournisseur, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fournisseur> updateFournisseur(@PathVariable Long id, @RequestBody Fournisseur fournisseur) {
        Fournisseur updatedFournisseur = fournisseurService.updateFournisseur(id, fournisseur);
        return ResponseEntity.ok(updatedFournisseur);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFournisseur(@PathVariable long id) {
        boolean isDeleted = fournisseurService.deleteFournisseur(id);
        if (isDeleted) {
            return ResponseEntity.ok("{\"message\": \"Fournisseur supprimé avec succès !\"}");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Fournisseur non trouvé !\"}");
        }
    }
}
