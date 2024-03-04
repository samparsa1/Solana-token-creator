import React, { FC, useEffect, useCallback } from 'react';
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import { notify } from '../../utils/notifications';
import { AiOutlineClose } from 'react-icons/ai';

//INTERNAL IMPORT
import Branding from '../../components/Branding';

const AirdropView: FC = ({ setOpenAirdrop }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notifyUser;
    }
  });

  return <div>index</div>;
};

export default index;
