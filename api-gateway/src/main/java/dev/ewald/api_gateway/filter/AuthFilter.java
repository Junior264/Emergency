package dev.ewald.api_gateway.filter;

import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import dev.ewald.api_gateway.utils.JWTUtil;
import reactor.core.publisher.Mono;

@Component
@RefreshScope
public class AuthFilter implements GatewayFilter {

    @Autowired
    private JWTUtil jwtUtil;

    @Value("${authentication.enabled}")
    private boolean authEnabled;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        if(!authEnabled) {
            System.out.println("Authentication is disabled. To enable it, make \"authentication.enabled\" property as true");
            return chain.filter(exchange);
        }

        ServerHttpRequest request = exchange.getRequest();

        if (!request.getHeaders().containsKey("Authorization")) {
            return this.onError(exchange, "No Authorization Header", HttpStatus.UNAUTHORIZED);
        }

        String authHeader = request.getHeaders().getFirst("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return this.onError(exchange, "Invalid Authorization Header", HttpStatus.UNAUTHORIZED);
        }

        String token = authHeader.substring(7);

        if (jwtUtil.isInvalid(token)) {
            return this.onError(exchange, "Invalid or Expired Token", HttpStatus.UNAUTHORIZED);
        }

        return chain.filter(this.getMutatedExchange(exchange, token));
    }

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);
        return response.setComplete();
    }

    private ServerWebExchange getMutatedExchange(ServerWebExchange exchange, String token) {
        Claims claims = jwtUtil.getALlClaims(token);
        String userId = claims.getSubject(); 

        ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
            .header("id", userId)
            .header("role", String.valueOf(claims.get("role")))
            .build();

        return exchange.mutate().request(mutatedRequest).build();
    }
}