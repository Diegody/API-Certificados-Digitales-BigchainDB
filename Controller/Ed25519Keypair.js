// Copyright BigchainDB GmbH and BigchainDB contributors
// SPDX-License-Identifier: (Apache-2.0 AND CC-BY-4.0)
// Code is Apache-2.0 and docs are CC-BY-4.0

import base58 from 'bs58'
import { sign } from 'tweetnacl'

/**
 * @public
 * Ed25519 keypair in base58 (as BigchainDB expects base58 keys)
 * @type {Object}
 * @param {Buffer} [seed] A seed that will be used as a key derivation function
 * @property {string} publicKey
 * @property {string} privateKey
 */
export default function Ed25519Keypair(seed) {
    const keyPair = seed ? sign.keyPair.fromSeed(seed) : sign.keyPair()
    this.publicKey = base58.encode(Buffer.from(keyPair.publicKey))
    // tweetnacl's generated secret key is the secret key + public key (resulting in a 64-byte buffer)
    this.privateKey = base58.encode(Buffer.from(keyPair.secretKey.slice(0, 32)))
}