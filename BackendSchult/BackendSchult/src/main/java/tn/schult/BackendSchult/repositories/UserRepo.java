package tn.schult.BackendSchult.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.schult.BackendSchult.entities.User;


import java.util.List;


public interface UserRepo extends JpaRepository<User, Integer> {


    User findByUsername(String username);
   // User findByEmail(String email);
//code zedtou ena ---->
    List<User> findByChef(User chef);

//    @Query("SELECT DISTINCT u.chef FROM User u WHERE u.chef IS NOT NULL")
//    List<User> findAllChefs();



    @Query("SELECT u FROM User u WHERE u.role = 'CHEF'")
    List<User> findAllChefs();


    @Query("SELECT u FROM User u WHERE u.role = 'EMPLOYE'")
    List<User> findAllEmployes();

   // List<User>findByEmployeIn(List<User> employes);

    @Query("SELECT u FROM User u WHERE u.chef.id = :chefId AND u.role = 'EMPLOYE'")
    List<User> findEmployeesByChefId(@Param("chefId") Integer chefId);





    // List<User>findByEmployeIn(List<User> employes);








}
