import {
  ApiParams,
  GetPendingShields,
  RedeemablePendingShield,
} from 'src/types';
import { computeSecret, getPXE, getPrivateKeys } from 'src/utils';

export const getRedeemablePendingShields = async (apiParams: ApiParams) => {
  const requestParams = apiParams.requestParams as GetPendingShields;

  const filter = {
    contractAddress: apiParams.aztec.AztecAddress.fromString(
      requestParams.token,
    ),
    storageSlot: new apiParams.aztec.Fr(5),
    owner: apiParams.aztec.AztecAddress.fromString(requestParams.from),
    status: 1, // not-read yet
  };

  const pxe = await getPXE();
  const notes = await pxe.getNotes(filter);

  let secrets: string[] = apiParams.state?.secrets as string[];
  let redeemablePendingShields: RedeemablePendingShield[] = [];

  if (notes.length == 0 && secrets.length == 0) {
    return [];
  } else if (notes.length == 0 && secrets.length != 0) {
    // any way to recover notes when notes in pxe are gone for some reason?
    // even if not, is it possible to find ps by brute-forcing..?
  } else if (notes.length != 0 && secrets.length == 0) {
    // recover secrets in case snap state gone
    const { signingPrivateKey } = await getPrivateKeys(apiParams);
    for (let i = 0; i < notes.length; i++) {
      secrets[i] = (
        await computeSecret(requestParams.token, signingPrivateKey, i)
      ).toString();
    }

    // TODO: should update snap state here
  }

  for (let i = 0; i < secrets.length; i++) {
    for (let j = 0; j < notes.length; j++) {
      const secretHashInNote = notes[j].note.items[1].toString();

      const secretHashFromState = apiParams.aztec.computeMessageSecretHash(
        apiParams.aztec.Fr.fromString(secrets[i]),
      );

      if (secretHashInNote == secretHashFromState.toString()) {
        redeemablePendingShields.push({
          from: notes[j].owner.toString(),
          token: notes[j].contractAddress.toString(),
          amount: parseInt(notes[j].note.items[0].toString(), 16),
          secretIndex: i,
        } as RedeemablePendingShield);
        break;
      }
    }
  }

  return redeemablePendingShields;
};