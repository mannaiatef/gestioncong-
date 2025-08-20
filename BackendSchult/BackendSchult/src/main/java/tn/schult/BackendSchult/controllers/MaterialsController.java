package tn.schult.BackendSchult.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.schult.BackendSchult.entities.Materials;
import tn.schult.BackendSchult.services.MaterialsFunImpl;


import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/materials")
@Slf4j
public class MaterialsController {

    private final MaterialsFunImpl materialsService;

    public MaterialsController(MaterialsFunImpl materialsService) {
        this.materialsService = materialsService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Materials>> listMaterials() {
        log.info("Récupération de la liste des matériaux");
        List<Materials> materials = materialsService.findAll();
        return ResponseEntity.ok(materials);


    }
    @GetMapping("/getAll")
    public ResponseEntity<List<Materials>> getAllMaterials() {
        log.info("Début de l'exécution de getAllMaterials");
        List<Materials> materials = materialsService.findAll();
        log.info("Nombre de matériaux trouvés: {}", materials.size());
        log.info("Matériaux trouvés: {}", materials); // Affiche la liste complète
        return new ResponseEntity<>(materials, HttpStatus.OK);
    }

    @PostMapping(value = "/ajouter")
    public ResponseEntity<Materials> createMaterials(@RequestBody Materials materials) {
        if (materials == null) {
            log.error("Tentative d'ajout d'un matériel null.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        log.info("Nom reçu : {}", materials.getName());
        log.info("Quantité reçue : {}", materials.getQuantity());
        log.info("Prix unitaire reçu : {}", materials.getUnitPrice());
        log.info("Catégorie reçue : {}", materials.getCategorie());

        Materials nouveauMaterial = materialsService.ajouterMaterials(materials);
        return ResponseEntity.status(HttpStatus.CREATED).body(nouveauMaterial);
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Materials> updateMaterials(@PathVariable(value = "id") long id,
                                                     @RequestBody Materials materials) {
        log.info("Mise à jour du matériel avec ID: {}", id);
        Optional<Materials> updatedMaterial = Optional.ofNullable(materialsService.updateMaterials(id, materials));

        return updatedMaterial.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteMaterials(@PathVariable(value = "id") long id) {
        log.info("Suppression du matériel avec ID: {}", id);
        boolean deleted = materialsService.deleteMaterials(id);

        if (deleted) {
            return ResponseEntity.ok("{\"message\": \"Matériau supprimé avec succès !\"}");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"message\": \"Matériau non trouvé, suppression impossible.\"}");
        }
    }
}
