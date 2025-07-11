# Dooor ICP Canister

Central control point that Dooor uses to administer all Trusted Execution Environment (TEE) workloads across clouds. It is deployed as a canister on the Internet Computer (ICP) and offers a single, auditable API for provisioning, attestation, and lifecycle management of enclave‑based services.

---

## Table of Contents
6. Security Model

Remote attestation first: workloads are only marked Active after verify_attestation() passes.

Least privilege: cloud credentials are scoped to TEE provisioning only.

On‑chain audit trail: every state change emits an ICP event log entry.
