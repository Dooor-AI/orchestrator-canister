# API Documentation - VetKD Demo

## Candid Interface

```candid
type Blob = blob;

service : {
  bls_public_key : ()                    -> (record { pk         : Blob });
  sign_caller    : (Blob, Blob)          -> (record { signature  : Blob });
                              //  ^payload  ^transport_pubkey
}
```

## Endpoints

### 🔑 `bls_public_key`

**Description**: Returns the BLS12-381 public key from the VetKD subnet.

**Parameters**: None

**Return**:
```candid
record { pk : blob }
```

**Usage example**:
```bash
dfx canister call vetkeys_demo bls_public_key '( )'
```

**Expected response**:
```
(
  record {
    pk = blob "\91\e9\98\ac\5b\dc\38\b1\27\98\88\c1\38\97\b3\0d\2a\3e\64\71\39\28\4b\a4\c0\bb\ae\65\a0\95\8d\f6\27\52\fd\5e\01\d6\78\04\72\a9\3e\5f\63\8a\80\13\18\c3\a3\d3\2b\07\59\21\d6\89\c1\bc\0b\c9\e9\94\55\59\bf\22\83\17\d4\c6\4f\3b\bd\27\12\45\0d\fe\10\4b\85\07\28\cb\54\ba\ae\fd\b1\ec\08\49\96\ae";
  },
)
```

### ✍️ `sign_caller`

**Description**: Signs data using the caller's principal and a transport key.

**Parameters**:
- `payload` (blob): Data to be signed
- `transport_public_key` (blob): Transport public key (32 or 48 bytes)

**Return**:
```candid
record { signature : blob }
```

**Usage example**:
```bash
dfx canister call vetkeys_demo sign_caller '( vec {1;2;3}, vec {149;31;167;74;45;217;113;136;77;124;168;203;7;103;149;217;75;152;46;77;238;23;66;51;63;125;122;212;211;7;206;93;14;247;83;94;59;22;21;98;88;199;157;214;6;241;31;114} )'
```

**Expected response**:
```
(
  record {
    signature = blob "\b0\ed\f6\4e\22\e4\fb\43\e3\af\71\c3\96\d7\63\2c\50\56\19\8b\c0\70\4e\22\09\09\7b\07\3f\a5\cb\72\24\d1\91\f0\22\9c\de\b2\fd\c1\f1\b2\d6\bc\09\83\a9\78\ae\3b\c0\fd\72\c5\5a\d0\52\40\35\f2\6a\27\88\60\82\3c\dd\d9\77\e1\99\b7\af\2e\8a\bc\7a\91\20\e4\2a\54\4b\f4\1b\1f\f7\04\71\d6\ef\cd\84\89\19\7f\d2\67\8d\bd\e5\99\1c\6b\38\5b\5d\31\22\1c\ad\06\69\b3\df\28\58\e1\b6\f7\73\22\34\44\68\b1\4d\4d\a1\f9\7d\b3\59\73\e9\03\8a\f5\02\54\a7\27\b3\cf\71\27\90\4b\e0\fd\04\01\e5\5f\0e\7a\9e\dc\4f\67\4d\f5\ca\f4\21\5c\63\48\36\0b\ca\f4\da\30\3b\40\c7\6f\dd\75\02\93\5e\0c\08\51\e7\f8\97\4f";
  },
)
```

## Technical Specifications

### Transport Key
- **X25519**: 32 bytes
- **BLS-G1**: 48 bytes

### Signature Context
The context is built as: `[len(DS)] || DS || principal-bytes`
- `DS = "bls_demo"` (application domain)
- `principal-bytes`: caller principal bytes

### Elliptic Curve
- **BLS12-381**: Elliptic curve used for signatures
- **G1**: Group used for signatures
- **G2**: Group used for public keys

## Testing

### Local Test
```bash
# Generate public key
dfx canister call vetkeys_demo bls_public_key '( )'

# Sign data
dfx canister call vetkeys_demo sign_caller '( vec {1;2;3}, vec {149;31;167;74;45;217;113;136;77;124;168;203;7;103;149;217;75;152;46;77;238;23;66;51;63;125;122;212;211;7;206;93;14;247;83;94;59;22;21;98;88;199;157;214;6;241;31;114} )'
```

### Mainnet Test
```bash
# Generate public key
dfx canister --network ic call vetkeys_demo bls_public_key '( )'

# Sign data
dfx canister --network ic call vetkeys_demo sign_caller '( vec {1;2;3}, vec {149;31;167;74;45;217;113;136;77;124;168;203;7;103;149;217;75;152;46;77;238;23;66;51;63;125;122;212;211;7;206;93;14;247;83;94;59;22;21;98;88;199;157;214;6;241;31;114} )'
```

## Signature Verification

Use the included JavaScript scripts:

```bash
# Verify signatures
npm run check

# Generate transport keys
npm run generate-key
```

The scripts implement complete cryptographic verification and key generation using BLS12-381 elliptic curves.

For more details, see `scripts/README.md`. 