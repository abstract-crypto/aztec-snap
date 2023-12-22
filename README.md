# Metamask Snap on Aztec Sandbox

Built at ETHGlobal Istanbul: [project page](https://ethglobal.com/showcase/aztecsnap-prn4s).

Aztec Snap is the first MetaMask Snap on Aztec that enables private function calls to any Aztec contract.

AztecSnap deterministically derives private keys from the existing seed phrase managed by Metamask via Snap's api call `snap_getBip44Entropy` to offer great security and UX for ethereum users.

More specifically, it currently uses the derived private key from Metamask as a signing key for [`ECDSAAccountContract`](https://github.com/AztecProtocol/aztec-packages/tree/aztec-packages-v0.16.7/yarn-project/noir-contracts/src/contracts/ecdsa_account_contract/src), while the encryption key is the one reduced from the same private kye to a new value which is a valid grumpking scalar.

## Develop with AztecSnap

You can build frontend app by modifying ./packages/site.

1. clone this project

```shell
git clone git@github.com:porco-rosso-j/aztec-snap.git
```

2. set up AztecSandbox

```shell
/bin/bash -c "$(curl -fsSL 'https://sandbox.aztec.network')"
cd ~/.aztec && docker-compose up
```

For more information for running Sandbox, [see](https://docs.aztec.network/dev_docs/cli/sandbox-reference).

3. install packages

```shell
yarn start
```

4. run script to deploy token

```shell
aztec-cli...
```

### Packages

#### snap-dapp (./packages/site)

The current implementation is a app for managing snap wallet. But you can build any frontend dapp modifying this directory.

#### aztec-snap (./packages/snap)

This directory contains snap source code. `yarn start` should build and start serving snap at port 8081.

#### aztec-snap-lib (,/packages/lib)

aztec-snap-lib (./packages/lib) is a useful library to build frontend app that integrates AztecSnap.

It contains `SnapWallet` class that extends aztecjs's `SignerlessWallet` in a way that asks user to approve transaction on Metamask Flask pop-up and adds transaction signature to `txRequest` via Snap by asking.

example:

```javascript
const wallet = new SnapWallet(pxe);
const token = await TokenContract.at(
  AztecAddress.fromString(TOKEN_ADDRESS),
  wallet,
);

const sentTx: SentTx = await token.methods
  .transfer_public(
    AztecAddress.fromString(SANDBOX_ADDRESS1),
    AztecAddress.fromString(toAddress),
    Number(amount),
    0,
  )
  .send();

await sentTx.wait();
```

In the future, snap (./pakcages/snap) will be hosted externally and lib (./packages/lib) will be provided as a npm package.

### Reference

- [Aztec Developer Documentation](https://docs.aztec.network/dev_docs/getting_started/main)
- [Metamask Snap Doc](https://docs.metamask.io/snaps/)
