package tn.schult.BackendSchult.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.schult.BackendSchult.entities.User;
import tn.schult.BackendSchult.services.UserService;


import java.util.List;

@RestController
@RequestMapping("/chef")
@PreAuthorize("isAuthenticated()")
public class ChefController {

    @Autowired
    private UserService userService;

    @GetMapping("/{chefId}/employees")
    public ResponseEntity<List<User>> getEmployeesByChef(@PathVariable Integer chefId) {
        List<User> employees = userService.getEmployesByChef(chefId);
        return ResponseEntity.ok(employees);
    }
}
