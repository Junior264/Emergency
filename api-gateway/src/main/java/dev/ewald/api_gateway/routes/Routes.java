package dev.ewald.api_gateway.routes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import dev.ewald.api_gateway.filter.AuthFilter;
import dev.ewald.api_gateway.filter.RequestFilter;
import dev.ewald.api_gateway.model.User;

@Configuration
public class Routes {
    @Autowired
    RequestFilter requestFilter;

    @Autowired
    AuthFilter authFilter;

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            // .route("userdetails_service", r -> r.path("/register")
            //     .and().method("POST")
            //     .and().readBody(User.class, user -> true).filters(f -> f.filters(requestFilter, authFilter)
            //     .uri("http://localhost:8080"))
            .route("first-microservice",r -> r.path("/first")
                .and().method("POST")
                .and().readBody(User.class, user -> true).filters(filter -> filter.filters(requestFilter, authFilter))
                .uri("http://localhost:8080"))
            .build();    
            // .route("first-microservice",r -> r.path("/first")
            //     .and().method("POST")
            //     .and().readBody(Student.class, s -> true).filters(f -> f.filters(requestFilter, authFilter))
            //     .uri("http://localhost:8081"))
            // .route("first-microservice",r -> r.path("/first")
            //     .and().method("GET").filters(f-> f.filters(authFilter))
            //     .uri("http://localhost:8081"))
            // .route("second-microservice",r -> r.path("/second")
            //     .and().method("POST")
            //     .and().readBody(Company.class, s -> true).filters(f -> f.filters(requestFilter, authFilter))
            //     .uri("http://localhost:8082"))
            // .route("second-microservice",r -> r.path("/second")
            //     .and().method("GET").filters(f-> f.filters(authFilter))
            //     .uri("http://localhost:8082"))
            // .route("auth-server",r -> r.path("/login")
            //     .uri("http://localhost:8088"))
            // .build();
           
    }
}
