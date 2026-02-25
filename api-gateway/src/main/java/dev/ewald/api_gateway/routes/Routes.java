package dev.ewald.api_gateway.routes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import dev.ewald.api_gateway.filter.AuthFilter;

@Configuration
public class Routes {
    @Autowired
    AuthFilter authFilter;

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("userdetails_service", r -> r
                .path("/register", "/login")
                .uri("lb://USERDETAILS"))
            .route("userdetails_service", r -> r
                .path("/delete/**")
                .filters(f -> f.filter(authFilter))
                .uri("lb://USERDETAILS"))
            .route("userdata_service", r -> r
                .path("/notifications")
                .filters(f -> f.filter(authFilter))
                .uri("lb://USERDATA"))
            .route("userdata_emergency", r -> r
                .path("/notifications/emergency")
                .filters(f -> f.filter(authFilter))
                .uri("lb://USERDATA"))
            .build();    
    }
}
