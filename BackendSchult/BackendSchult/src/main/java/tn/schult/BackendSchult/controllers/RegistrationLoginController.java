package tn.schult.BackendSchult.controllers;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tn.schult.BackendSchult.entities.User;
import tn.schult.BackendSchult.repositories.UserRepo;
import tn.schult.BackendSchult.services.JwtUtil;


import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class RegistrationLoginController {


    private final UserRepo userRepo;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;
    // private EmailService emailService;
    // private EmailRequest emailRequest;

    // Blacklist pour les tokens invalidés
    private static final Set<String> blacklistedTokens = new HashSet<>();

    // Méthode pour vérifier si un token est blacklisté
    public static boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepo.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("user name alrady exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        //String mail=user.getEmail();
//        EmailRequest mailreq=new EmailRequest(mail,"Activation Mail","click the link to active your account ");
//        emailService.sendMail(mailreq);

        return ResponseEntity.ok(userRepo.save(user));
    }


//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody User user){
//        try{
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
//            String token = jwtUtil.generateToken(user.getUsername());
//            return ResponseEntity.ok(token);
//        }catch(Exception e){
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("hhhhhhh ghalet ");
//        }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );

            String token = jwtUtil.generateToken(user.getUsername());

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "message", "Login successful",
                    "status", true
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "message", "Login failed",
                    "status", false,
                    "error", e.getMessage()
            ));
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            // Ajouter le token à la blacklist
            blacklistedTokens.add(token);
            return ResponseEntity.ok("Logout successful");
        }
        return ResponseEntity.badRequest().body("Invalid authorization header");
    }


}


