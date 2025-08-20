package tn.schult.BackendSchult.controllers;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.schult.BackendSchult.DAO.IDemandeConge;
import tn.schult.BackendSchult.entities.DemandeConge;
import tn.schult.BackendSchult.entities.DemandeCongeDTO;
import tn.schult.BackendSchult.entities.StatusDemande;
import tn.schult.BackendSchult.entities.User;
import tn.schult.BackendSchult.repositories.UserRepo;
import tn.schult.BackendSchult.services.IDemandeCongeService;
import tn.schult.BackendSchult.services.UserService;


import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/conge")
public class DemandeController {


    private final IDemandeCongeService rs;
    private final UserService us;
    private final UserRepo userRepo;
    private final IDemandeConge demandeCongeRepo;

    public DemandeController(IDemandeCongeService rs, UserService us, UserRepo userRepo, IDemandeConge demandeCongeRepo) {
        this.rs = rs;
        this.us = us;
        this.userRepo = userRepo;
        this.demandeCongeRepo = demandeCongeRepo;
    }


  @GetMapping("/chefs")
  public ResponseEntity<List<User>> getAllChefs() {
    List<User> chefs = us.getAllChefs();
    return new ResponseEntity<>(chefs, HttpStatus.OK);
  }





    @GetMapping("/all")
    public ResponseEntity<List<DemandeCongeDTO>> listDemande(){
        List<DemandeConge> demandes = rs.findAll();
        List<DemandeCongeDTO> dtos = demandes.stream().map(demande -> {
            DemandeCongeDTO dto = new DemandeCongeDTO();
            dto.setId(demande.getId());
            dto.setDateDebut(demande.getDateDebut());
            dto.setDateFin(demande.getDateFin());
            dto.setMotif(demande.getMotif());
            dto.setStatus(demande.getStatus());
            dto.setDateDemande(demande.getDateDemande());
            if (demande.getEmploye() != null) {
                dto.setEmployeUsername(demande.getEmploye().getUsername());
                if (demande.getEmploye().getChef() != null) {
                    dto.setChefUsername(demande.getEmploye().getChef().getUsername());
                }
            }
            return dto;
        }).toList();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }









    @PostMapping("/ajouter")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<DemandeConge> ajouterConger(@RequestBody DemandeConge conger) {
        return new ResponseEntity<>(rs.ajouterConge(conger), HttpStatus.OK);
    }
    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<DemandeConge> updateDemande(@PathVariable(value = "id") long id,
                                                  @RequestBody DemandeConge conge) {
        return new ResponseEntity<>(rs.updateConge(id, conge),
                HttpStatus.OK);
    }


    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> deleteConge(@PathVariable(value = "id") long id) {
        return new ResponseEntity<>(rs.deleteConge(id), HttpStatus.OK);
    }





    //codi zedtou ena


    //hedhi lee
    @GetMapping("/chef/{id}/employes")
    public List<User> getEmployes(@PathVariable int id) {
        return us.getEmployesByChef(id);
    }



    //hedhi temchi

    @PostMapping("/assigner")
    public ResponseEntity<String> assignerEmploye(@RequestParam int employeId, @RequestParam int chefId) {
        us.assignerEmployeAuChef(employeId, chefId);
        return ResponseEntity.ok("Employé assigné au chef");
    }

    @PostMapping("/desaffecter/{id}")
    public ResponseEntity<String> desaffecter(@PathVariable int id) {
        us.desaffecterEmployeDuChef(id);
        return ResponseEntity.ok("Employé désaffecté du chef");
    }
//hethi temchi
    @PostMapping("/creer")
    public ResponseEntity<DemandeConge> creerDemande(
            @RequestParam int employeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateDebut,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFin,
            @RequestParam String motif
    ) {
        DemandeConge demande = us.creerDemandeConge(employeId, dateDebut, dateFin, motif);
        return ResponseEntity.ok(demande);
    }

    @PutMapping("/valider/{id}")
    public ResponseEntity<DemandeConge> validerDemande(@PathVariable Long id) {
        DemandeConge demande = rs.findById(id);
        demande.setStatus(StatusDemande.ACCEPTEE);
        return ResponseEntity.ok(rs.ajouterConge(demande));
    }

    @GetMapping("/chef/{id}/demandes")
    public List<DemandeCongeDTO> getDemandesByChef(@PathVariable int id) {
        User chef = userRepo.findById(id).orElse(null);
        if (chef == null) return List.of();
        List<User> employes = userRepo.findByChef(chef);
        List<DemandeConge> demandes = demandeCongeRepo.findByEmployeIn(employes);
        return demandes.stream().map(demande -> {
            DemandeCongeDTO dto = new DemandeCongeDTO();
            dto.setId(demande.getId());
            dto.setDateDebut(demande.getDateDebut());
            dto.setDateFin(demande.getDateFin());
            dto.setMotif(demande.getMotif());
            dto.setStatus(demande.getStatus());
            dto.setDateDemande(demande.getDateDemande());
            if (demande.getEmploye() != null) {
                dto.setEmployeUsername(demande.getEmploye().getUsername());
                if (demande.getEmploye().getChef() != null) {
                    dto.setChefUsername(demande.getEmploye().getChef().getUsername());
                }
            }
            return dto;
        }).collect(Collectors.toList());
    }





    //kchjcnsdjhncsd
    @GetMapping("/admin")
    public ResponseEntity<List<User>> getAllUsers() {
      List<User> users = us. getAllUsers();
      return new ResponseEntity<>(users, HttpStatus.OK);
    }

  @GetMapping("/getUserById/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Integer id) {
    User user = us.getUserById(id);
    if (user != null) {
      return new ResponseEntity<>(user, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }



  @PostMapping("/addUser")
  public ResponseEntity<User> createUser(@RequestBody User user) {
    System.out.println("Tentative de création d'utilisateur: " + user.getUsername());
    User createdUser = us.createUser(user);
    return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
  }

  @PutMapping("/updateUser/{id}")
  public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User user) {
    User updatedUser = us.updateUser(id, user);
    if (updatedUser != null) {
      return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/deleteUser/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
    us.deleteUser(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }




}
