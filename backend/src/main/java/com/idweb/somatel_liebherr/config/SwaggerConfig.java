package com.idweb.somatel_liebherr.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    // Group for GroupController
    @Bean
    public GroupedOpenApi groupApi() {
        return GroupedOpenApi.builder()
                .group("Group_API")  // The name of the group
                .pathsToMatch("/api/v1/group/**")  // Paths related to EmployeeController
                .build();
    }

    // Group for TypeController
    @Bean
    public GroupedOpenApi typeApi() {
        return GroupedOpenApi.builder()
                .group("Type_API")  // The name of the group
                .pathsToMatch("/api/v1/type/**")  // Paths related to DepartmentController
                .build();
    }

    @Bean
    public GroupedOpenApi cfiApi() {
        return GroupedOpenApi.builder()
                .group("CFI_API")  // The name of the group
                .pathsToMatch("/api/v1/cfi/**")  // Paths related to DepartmentController
                .build();
    }

    @Bean
    public GroupedOpenApi workstationApi() {
        return GroupedOpenApi.builder()
                .group("Workstation_API")  // The name of the group
                .pathsToMatch("/api/v1/workstation/**")  // Paths related to DepartmentController
                .build();
    }

    @Bean
    public GroupedOpenApi travailleurApi() {
        return GroupedOpenApi.builder()
                .group("Travailleur_API")  // The name of the group
                .pathsToMatch("/api/v1/travailleur/**")  // Paths related to DepartmentController
                .build();
    }

    @Bean
    public GroupedOpenApi enginApi() {
        return GroupedOpenApi.builder()
                .group("Engin_API")  // The name of the group
                .pathsToMatch("/api/v1/engin/**")  // Paths related to DepartmentController
                .build();
    }

    @Bean
    public GroupedOpenApi articleApi() {
        return GroupedOpenApi.builder()
                .group("Article_API")  // The name of the group
                .pathsToMatch("/api/v1/article/**")  // Paths related to DepartmentController
                .build();
    }

    @Bean
    public GroupedOpenApi nomenclatureApi() {
        return GroupedOpenApi.builder()
                .group("Nomenclature_API")  // The name of the group
                .pathsToMatch("/api/v1/nomenclature/**")  // Paths related to DepartmentController
                .build();
    }

    @Bean
    public GroupedOpenApi gammeApi() {
        return GroupedOpenApi.builder()
                .group("Gamme_API")  // The name of the group
                .pathsToMatch("/api/v1/gamme/**")  // Paths related to DepartmentController
                .build();
    }

    @Bean
    public GroupedOpenApi GEDApi() {
        return GroupedOpenApi.builder()
                .group("GED_API")  // The name of the group
                .pathsToMatch("/api/v1/ged/**")  // Paths related to DepartmentController
                .build();
    }

    @Bean
    public GroupedOpenApi OFInternApi() {
        return GroupedOpenApi.builder()
                .group("OFIntern_API")  // The name of the group
                .pathsToMatch("/api/v1/of_intern/**")  // Paths related to DepartmentController
                .build();
    }

    @Bean
    public GroupedOpenApi SuiviOFApi() {
        return GroupedOpenApi.builder()
                .group("SuiviOF_API")  // The name of the group
                .pathsToMatch("/api/v1/of_suivi/**")  // Paths related to DepartmentController
                .build();
    }

    @Bean
    public GroupedOpenApi OFExternApi() {
        return GroupedOpenApi.builder()
                .group("OFextern_API")  // The name of the group
                .pathsToMatch("/api/v1/of_extern/**")  // Paths related to DepartmentController
                .build();
    }

    @Bean
    public GroupedOpenApi SuiviOFexternApi() {
        return GroupedOpenApi.builder()
                .group("SuiviOFExtern_API")
                .pathsToMatch("/api/v1/of_suivi_extern/**")
                .build();
    }

    @Bean
    public GroupedOpenApi SuiviOFTravailleurApi() {
        return GroupedOpenApi.builder()
                .group("SuiviOFTravailleur_API")
                .pathsToMatch("/api/v1/suivi_of_travailleur/**")
                .build();
    }
}