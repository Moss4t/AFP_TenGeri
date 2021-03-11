package hu.tengeri.backend.config;

import hu.tengeri.backend.BackendApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

    @EnableSwagger2
    @ComponentScan(basePackageClasses = BackendApplication.class)
    @Configuration
    public class SwaggerConfig {

        private static final String SWAGGER_API_VERSION = "1.0.5";
        private static final String LICENSE_TEXT = "License";
        private static final String title="Restaurant REST API";
        private static final String description = "RESTFUL API for Restaurant Web Application";
        //Path: http://localhost:8081/swagger-ui.html#/

        private ApiInfo apiInfo()
        {
            return new ApiInfoBuilder()
                    .title(title)
                    .description(description)
                    .license(LICENSE_TEXT)
                    .version(SWAGGER_API_VERSION)
                    .build();
        }

        @Bean
        public Docket RestaurantApi()
        {
            return new Docket(DocumentationType.SWAGGER_2)
                    .apiInfo(apiInfo())
                    .pathMapping("/")
                    .select()
                    .paths(PathSelectors.regex("/.*"))
                    .build();
        }
    }
