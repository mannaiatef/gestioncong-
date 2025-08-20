package tn.schult.BackendSchult.services;


import lombok.AllArgsConstructor;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tn.schult.BackendSchult.entities.User;
import tn.schult.BackendSchult.repositories.UserRepo;


import java.util.Collections;


@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepo userRepo;

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user=userRepo.findByUsername(username);
//        if(user == null){
//            throw new UsernameNotFoundException("not found");
//        }
//        String role = user.getRole();
//        if (!role.startsWith("ROLE_")) {
//            role = "ROLE_" + role;
//        }
//        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(), Collections.singletonList(new SimpleGrantedAuthority(role)));
//    }




    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("User not found");
        }

        // Vérifier si le compte est actif
        if(!user.getIsActive()) {
            throw new DisabledException("User account is disabled");
        }

        String role = user.getRole();
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(role))
        );
    }



}
