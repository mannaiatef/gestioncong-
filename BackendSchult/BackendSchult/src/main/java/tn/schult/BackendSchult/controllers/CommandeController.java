package tn.schult.BackendSchult.controllers;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.schult.BackendSchult.entities.Commande;
import tn.schult.BackendSchult.services.CommandeFunctionality;


import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping("/commande")
public class CommandeController {
    @Autowired
    private CommandeFunctionality commandeFunctionality;

    @GetMapping
    public ResponseEntity<List<Commande>> getAllCommandes() {
        List<Commande> commandes = commandeFunctionality.getAllCommandes();
        System.out.println("Commandes récupérées : " + commandes.size()); // Log du nombre de commandes
        if (commandes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(commandes);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Commande> getCommandeById(@PathVariable int id) {
        Commande commande = commandeFunctionality.getCommandeById(id);
        return ResponseEntity.ok(commande);
    }

    // Ajoutez des logs pour déboguer
    @PostMapping("/add")
    public ResponseEntity<Commande> createCommande(@RequestBody Commande commande, HttpServletRequest request) {
        // Log pour déboguer
        System.out.println("Headers de la requête:");
        Collections.list(request.getHeaderNames()).forEach(headerName -> {
            System.out.println(headerName + ": " + request.getHeader(headerName));
        });

        Commande createdCommande = commandeFunctionality.createCommande(commande);
        return ResponseEntity.ok(createdCommande);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Commande> updateCommande(@PathVariable int id, @RequestBody Commande commandeDetails) {
        Commande updatedCommande = commandeFunctionality.updateCommande(id, commandeDetails);
        return ResponseEntity.ok(updatedCommande);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCommande(@PathVariable int id) {
        commandeFunctionality.deleteCommande(id);
        return ResponseEntity.ok("{\"message\": \"Commande supprimée avec succès !\"}");
    }

}
