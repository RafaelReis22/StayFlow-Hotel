-- Argus Hotel Management System - Configuração de Banco de Dados com Row Level Security (RLS)

-- 1. Cria as tabelas baseadas no schema do usuário (Otimizado para PostgreSQL)
CREATE TABLE IF NOT EXISTS reservas (
    id SERIAL PRIMARY KEY,
    data_entrada DATE NOT NULL,
    data_saida DATE NOT NULL,
    valor NUMERIC(12,2) NOT NULL,
    forma_pagamento VARCHAR(50) NOT NULL DEFAULT 'Dinheiro',
    tenant_id VARCHAR(50) NOT NULL -- Adicionado para RLS
);

CREATE TABLE IF NOT EXISTS hospedes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(25) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL DEFAULT 'N.I.',
    data_nasc DATE NOT NULL,
    nacionalidade VARCHAR(25) NOT NULL,
    telefone VARCHAR(25) NOT NULL,
    id_reserva INTEGER REFERENCES reservas(id) ON DELETE SET NULL,
    tenant_id VARCHAR(50) NOT NULL -- Adicionado para RLS
);

-- 2. Habilita o Row Level Security (RLS)
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospedes ENABLE ROW LEVEL SECURITY;

-- 3. Cria as Políticas de RLS
-- Política: Usuários só veem dados pertencentes ao seu 'tenant_id'
-- Assumimos que o tenant_id é passado via variável de sessão 'app.current_tenant'
CREATE POLICY tenant_isolation_reservas_policy ON reservas
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant'));

CREATE POLICY tenant_isolation_hospedes_policy ON hospedes
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant'));

-- 4. Cria um usuário restrito para a aplicação
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'hotel_app_user') THEN
        CREATE ROLE hotel_app_user WITH LOGIN PASSWORD 'argus_secure_pass';
    END IF;
END
$$;

GRANT ALL PRIVILEGES ON TABLE reservas TO hotel_app_user;
GRANT ALL PRIVILEGES ON TABLE hospedes TO hotel_app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO hotel_app_user;

-- 5. Função auxiliar para configurar o contexto do tenant (Chamada pelo Spring Boot)
CREATE OR REPLACE FUNCTION set_app_context(tenant_id_val TEXT) RETURNS VOID AS $$
BEGIN
    EXECUTE format('SET app.current_tenant = %L', tenant_id_val);
END;
$$ LANGUAGE plpgsql;
