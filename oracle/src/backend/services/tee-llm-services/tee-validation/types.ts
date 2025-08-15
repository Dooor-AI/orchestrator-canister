export interface TEEValidationReport {
    valid: boolean
    summary: {
        trusted: boolean
        hardware: string
        project: string
        instance: string
        zone: string
        tee_authentic?: boolean
        firewall_secure?: boolean
        overall_trusted?: boolean
        whitelisted_domains?: number
        total_http_calls?: number
        last_updated?: string
        firewall_active?: boolean
    }
    claims?: Record<string, unknown> | null
    errors?: string[]
    warnings?: string[]
    securityErrors?: string[]
    securityWarnings?: string[]
    securityConfig?: {
        allowed_domains: string[]
    }
    jwt_validation?: {
        valid: boolean
        errors?: string[]
    }
    security_validation?: {
        valid: boolean
        errors?: string[]
        warnings?: string[]
    }
}