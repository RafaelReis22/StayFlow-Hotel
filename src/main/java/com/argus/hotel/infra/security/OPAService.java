package com.argus.hotel.infra.security;

import org.springframework.stereotype.Service;

/**
 * Serviço de Autorização OPA desativado para simplificação do projeto.
 */
@Service
public class OPAService {
    public boolean isAuthorized(String user, String method, String path) {
        // Retornar true para permitir tudo na versão simples
        return true;
    }
}
