package tn.schult.BackendSchult.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.schult.BackendSchult.DAO.IDemandeConge;
import tn.schult.BackendSchult.entities.DemandeConge;
import tn.schult.BackendSchult.entities.StatusDemande;
import tn.schult.BackendSchult.entities.User;
import tn.schult.BackendSchult.repositories.UserRepo;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService{

    private final UserRepo userRepository;


    private final IDemandeConge idf;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepo userRepository, IDemandeConge idf) {
        this.userRepository = userRepository;
        this.idf=idf;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Integer id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null);
    }

    @Override
    public User createUser(User user) {

        if (user.getActive() == null) {
            user.setActive(true);
        }

        if (user.getPassword() != null && !user.getPassword().startsWith("$2a$")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Integer id, User user) {
      if (user.getActive() == null) {
        user.setActive(true);
      }
        if (userRepository.existsById(id)) {
            user.setId(id);
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    @Override
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }






//    public List<User> getEmployesByChef(int chefId) {
//        User chef = userRepository.findById(chefId).get();
//
//        return userRepository.findByChef(chef);
//    }






    public List<User> getEmployesByChef(int chefId) {
        try {
            // Utiliser la nouvelle méthode plus directe
            return userRepository.findEmployeesByChefId(chefId);
        } catch (Exception e) {
            // Fallback vers l'ancienne méthode si nécessaire
            try {
                User chef = userRepository.findById(chefId).orElse(null);
                if (chef != null) {
                    return userRepository.findByChef(chef);
                }
            } catch (Exception ex) {
                System.err.println("Error in fallback method: " + ex.getMessage());
            }
            return new ArrayList<>();
        }
    }








    public void assignerEmployeAuChef(int employeId, int chefId) {
        User employe = userRepository.findById(employeId).get();


        User chef = userRepository.findById(chefId).get();


        employe.setChef(chef);
        userRepository.save(employe);
    }

    public DemandeConge creerDemandeConge(int employeId, LocalDate dateDebut, LocalDate dateFin, String motif) {
        User employe = userRepository.findById(employeId).get();

        DemandeConge demande = new DemandeConge();
        demande.setEmploye(employe);
        demande.setDateDebut(dateDebut);
        demande.setDateFin(dateFin);
        demande.setMotif(motif);
        demande.setDateDemande(LocalDateTime.now());
        demande.setStatus(StatusDemande.EN_ATTENTE);

        return idf.save(demande);
    }

    public void desaffecterEmployeDuChef(int employeId) {
        User employe = userRepository.findById(employeId).get();

        employe.setChef(null);
        userRepository.save(employe);
    }

    public List<User> getAllChefs() {
        return userRepository.findAllChefs();
    }

    public List<User> getAllEmployes() {
        return userRepository.findAllEmployes();
    }


}
