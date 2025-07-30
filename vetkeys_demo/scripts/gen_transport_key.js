/**
 * Transport Key Generator for VetKD
 *
 * This script generates BLS12-381 G1 key pairs for use as
 * transport keys in the VetKD system. These keys are used
 * to encrypt derived VetKD keys within the Internet Computer.
 *
 * @author Dooor Team
 * @version 1.0.0
 * @license MIT
 */

const { bls12_381 } = require('@noble/curves/bls12-381');
const { randomBytes } = require('crypto');

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

const bls = bls12_381;

// -----------------------------------------------------------------------------
// Key Generation
// -----------------------------------------------------------------------------

// Generate a 32-byte random secret key
const sk = randomBytes(32);

// Derive the corresponding public key (48 bytes, BLS12-381 G1)
const pk = bls.getPublicKey(sk);

// -----------------------------------------------------------------------------
// Output
// -----------------------------------------------------------------------------

console.log('\n🔑 Transport Secret Key (hex, 64 bytes):');
console.log(Buffer.from(sk).toString('hex'));

console.log('\n📢 Transport Public Key (48 bytes) – use in DFX calls:');
console.log('vec {' + [...pk].join(';') + '}');

console.log('\n📊 Key Information:');
console.log(`   Secret Key Length   : ${sk.length} bytes`);
console.log(`   Public Key Length   : ${pk.length} bytes`);
console.log('   Curve               : BLS12-381 G1');
console.log('   Usage               : Transport key for VetKD');

// -----------------------------------------------------------------------------
// Canister Call Example
// -----------------------------------------------------------------------------

console.log('\n💡 Example DFX usage:');
console.log(`dfx canister call vetkeys_demo sign_caller '( vec {1;2;3}, vec {${[...pk].join(';')} } )'`);

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

try {
  const g1Point = bls.G1.ProjectivePoint.fromHex(pk);
  const isValid = g1Point.equals(g1Point.clearCofactor());

  console.log('\n✅ Public Key Validation:');
  console.log('   Valid Curve Point    :', isValid);
  console.log('   Coordinates Valid    :', g1Point.isValid());

} catch (error) {
  console.error('\n❌ Public Key Validation Error:', error.message);
}

console.log('\n🎯 Key pair successfully generated.');
console.log('   Use the public key in your canister calls.');
console.log('   Keep the secret key private and secure.');
