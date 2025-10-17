# Dooor ICP Canister

Central control point that Dooor uses to administer all Trusted Execution Environment (TEE) workloads across clouds. It is deployed as a canister on the Internet Computer (ICP) and offers a single, auditable API for provisioning, attestation, and lifecycle management of enclave‑based services.

---

## Table of Contents

Security Model

Remote attestation first: workloads are only marked Active after verify_attestation() passes.

Least privilege: cloud credentials are scoped to TEE provisioning only.

On‑chain audit trail: every state change emits an ICP event log entry.

</br>
</br>

We use the TEE sealing data function to store its own ICP private key, which will be used to interact with our vetKeys canister to encrypt sensitive data that is stored across Dooor's protocol. For that, we use vetKeys to hash important sensitive data that will be shared across TEE nodes in our Akash infrastructure, so in case a TEE goes down, we can retrieve the data by interacting with our ICP vetKeys decrypt canister.




