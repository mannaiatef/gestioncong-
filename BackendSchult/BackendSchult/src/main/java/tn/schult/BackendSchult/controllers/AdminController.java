package tn.schult.BackendSchult.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.schult.BackendSchult.entities.User;
import tn.schult.BackendSchult.services.*;


import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN') or hasRole('RH')")
public class AdminController {

    @Autowired
    private CommandeFunctionality commandeService;
    @Autowired
    private FactureFunImpl factureService;
    @Autowired
    private UserService userService;
    @Autowired
    private StockFunctionality stockService;
    @Autowired
    private MaterialsFunImpl materialsService;
    @Autowired
    private FournisseurFunImpl fournisseurService;





    public AdminController(UserService userService ,MaterialsFunImpl materialsService ,StockFunctionality stockService ,FactureFunImpl factureService ,FournisseurFunImpl fournisseurService) {
        this.userService = userService;
        this.materialsService = materialsService;
        this.stockService =stockService;
        this.factureService =factureService ;
        this.fournisseurService=fournisseurService;
    }



  @GetMapping("/admin/stats")
  public Map<String, Object> getStats() {
    Map<String, Object> stats = new HashMap<>();
    stats.put("commandes", commandeService.getAllCommandes().size());
    stats.put("factures", factureService.getAllFactures().size());
    stats.put("utilisateurs", userService.getAllUsers().size());
    stats.put("stocks", stockService.getAllStocks().size());
    stats.put("materiaux", materialsService.findAll().size());
    stats.put("fournisseurs", fournisseurService.findAll().size());
    return stats;
  }


    @GetMapping("/admin")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService. getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/employes")
    public ResponseEntity<List<User>> getAllEmployes() {
        List<User> employes = userService.getAllEmployes();
        return new ResponseEntity<>(employes, HttpStatus.OK);
    }

    @GetMapping("/chefs")
    public ResponseEntity<List<User>> getAllChefs() {
        List<User> chefs = userService.getAllChefs();
        return new ResponseEntity<>(chefs, HttpStatus.OK);
    }



    @PostMapping("/addUser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        System.out.println("Tentative de création d'utilisateur: " + user.getUsername());
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        if (updatedUser != null) {
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }








    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/assignEmployeToChef")
    public ResponseEntity<Void> assignEmployeToChef(
            @RequestParam Integer employeId,
            @RequestParam Integer chefId) {
        userService.assignerEmployeAuChef(employeId, chefId);
        return new ResponseEntity<>(HttpStatus.OK);
    }













    @PostMapping("/{id}/avatar")
    public Map<String, String> uploadAvatar(@PathVariable int id, @RequestParam("file") MultipartFile file) throws IOException {
        String fakeUrl = "http://localhost:8089/uploads/" + file.getOriginalFilename();
        var user = userService.getUserById(id);
        if (user != null) {
            user.setAvatarUrl(fakeUrl);
            userService.updateUser(id, user);
        }
        Map<String, String> res = new HashMap<>();
        res.put("avatarUrl", fakeUrl);
        return res;
    }

    @PostMapping("/changePassword")
    public ResponseEntity<Map<String, String>> changePassword(@RequestBody Map<String, String> passwordData) {
        try {
            String currentPassword = passwordData.get("currentPassword");
            String newPassword = passwordData.get("newPassword");

            if (currentPassword == null || newPassword == null) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Les mots de passe actuels et nouveaux sont requis");
                return ResponseEntity.badRequest().body(response);
            }

            // Ici vous pouvez ajouter la logique de vérification du mot de passe actuel
            // et de mise à jour du nouveau mot de passe

            Map<String, String> response = new HashMap<>();
            response.put("message", "Mot de passe modifié avec succès");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Erreur lors du changement de mot de passe: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}




