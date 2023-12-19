import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { assertIsSendTxParams } from './types';
import { getAddress, getTx, sendTx } from './pxe';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  console.log('request: ', request);
  switch (request.method) {
    case 'azt_getAddress': // will be replaced by getAccount()
      return getAddress();

    case 'azt_getTransactions':
      return getTx();

    case 'azt_sendTx':
      assertIsSendTxParams(request.params);
      return sendTx(request.params);

    default:
      throw new Error('Method not found.');
  }
};
