package com.idweb.somatel_liebherr.config;

import com.idweb.somatel_liebherr.model.Permission;
import com.idweb.somatel_liebherr.model.Role;
import com.idweb.somatel_liebherr.model.User;
import com.idweb.somatel_liebherr.repository.PermissionRepository;
import com.idweb.somatel_liebherr.repository.RoleRepository;
import com.idweb.somatel_liebherr.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements ApplicationRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PermissionRepository permissionRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository,
                           UserRepository userRepository,
                           PermissionRepository permissionRepository,
                           PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.permissionRepository = permissionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        Permission pArticle     = seedPermission("Article",          "/article",          "description",       "Gestion des articles");
        Permission pGroupe      = seedPermission("Groupe",           "/groupe",           "category",          "Gestion des groupes");
        Permission pSousGroupe  = seedPermission("Sous-Groupe",      "/sous-groupe",      "account_tree",      "Gestion des sous-groupes");
        Permission pType        = seedPermission("Type",             "/type",             "label",             "Gestion des types");
        Permission pCfi         = seedPermission("CFI",              "/cfi",              "source",            "Gestion des CFI");
        Permission pPoste       = seedPermission("Poste de Travail", "/poste-travaille",  "work",              "Gestion des postes de travail");
        Permission pTravailleur = seedPermission("Travailleur",      "/travailleur",      "person",            "Gestion des travailleurs");
        Permission pEngin       = seedPermission("Engin",            "/engin",            "construction",      "Gestion des engins");
        Permission pOfIntern    = seedPermission("OF Interne",       "/of_intern",        "assignment",        "Ordres de fabrication internes");
        Permission pSuiviOfi    = seedPermission("Suivi OF Interne", "/suivi_of_intern",  "timeline",          "Suivi des OF internes");
        Permission pOfExtern    = seedPermission("OF Externe",       "/of_extern",        "assignment_return", "Ordres de fabrication externes");
        Permission pSuiviOfe    = seedPermission("Suivi OF Externe", "/suivi_of_extern",  "track_changes",     "Suivi des OF externes");
        Permission pSuiviProd   = seedPermission("Suivi Production", "/suivi_production", "bar_chart",         "Suivi de la production");

        Set<Permission> allPermissions = new HashSet<>();
        allPermissions.add(pArticle);
        allPermissions.add(pGroupe);
        allPermissions.add(pSousGroupe);
        allPermissions.add(pType);
        allPermissions.add(pCfi);
        allPermissions.add(pPoste);
        allPermissions.add(pTravailleur);
        allPermissions.add(pEngin);
        allPermissions.add(pOfIntern);
        allPermissions.add(pSuiviOfi);
        allPermissions.add(pOfExtern);
        allPermissions.add(pSuiviOfe);
        allPermissions.add(pSuiviProd);

        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                .orElseGet(() -> new Role("ROLE_ADMIN", "Administrator with full access"));
        adminRole.setPermissions(allPermissions);
        roleRepository.save(adminRole);

        roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> roleRepository.save(new Role("ROLE_USER", "Standard user")));

        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User("admin", passwordEncoder.encode("admin123"));
            admin.setRoles(Set.of(adminRole));
            userRepository.save(admin);
        }

        if (userRepository.findByUsername("user").isEmpty()) {
            Role userRole = roleRepository.findByName("ROLE_USER").orElseThrow();
            User user = new User("user", passwordEncoder.encode("user123"));
            user.setRoles(Set.of(userRole));
            userRepository.save(user);
        }
    }

    private Permission seedPermission(String name, String route, String icon, String description) {
        return permissionRepository.findByRoute(route)
                .orElseGet(() -> permissionRepository.save(new Permission(name, route, icon, description)));
    }
}
