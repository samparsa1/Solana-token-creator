import React, { FC, useState, useCallback } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { Metadata, PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { AiOutlineClose } from 'react-icons/ai';
import { ClipLoader } from 'react-spinners';
import { notify } from '../../utils/notifications';

import { InputView } from '../input';
import Branding from '../../components/Branding';
import Image from 'next/image';

export const TokenMetadata = ({ setOpenTokenMetaData }) => {
  const { connection } = useConnection();
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenMetadata, setTokenMetadata] = useState(null);
  const [logo, setLogo] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //function
  const getMetadata = useCallback(
    async (form) => {
      setIsLoading(true);
      try {
        const tokenMint = new PublicKey(form);
        const metadataPDA = PublicKey.findProgramAddressSync(
          [
            Buffer.from('metadata'),
            PROGRAM_ID.toBuffer(),
            tokenMint.toBuffer(),
          ],
          PROGRAM_ID
        )[0];

        const metadataAccount = await connection.getAccountInfo(metadataPDA);
        const [metadata, _] = await Metadata.deserialize(metadataAccount.data);
        console.log('metadata', metadata);

        let logoRes = await fetch(metadata.data.uri);
        let logoJson = await logoRes.json();
        let { image } = logoJson;

        console.log('image', logo);

        setTokenMetadata({ tokenMetadata, ...metadata.data });
        console.log('Token Metadata', tokenMetadata);
        setLogo(image);
        setIsLoading(false);
        console.log('Loaded');
        setLoaded(true);
        setTokenAddress('');
        notify({
          type: 'success',
          message: 'Successfully fetched token',
        });
      } catch (error: any) {
        notify({
          type: 'error',
          message: 'Token Metadata Failed',
        });
        setIsLoading(false);
        console.log('Loaded Error');
        console.log(error);
      }
    },
    [tokenAddress]
  );

  const CloseModal = () => {
    return (
      <a
        onClick={() => setOpenTokenMetaData(false)}
        className='group mt-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20
    backdrop-blur-2xl transition-all duration-500 hover:bg-blue-600/60'
      >
        <i className='text-2xl text-white group-hover:text-white'>
          <AiOutlineClose />
        </i>
      </a>
    );
  };

  return (
    <>
      {isLoading && (
        <div className='absolute top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black/[.3] backdrop-blur-[10px]'>
          <ClipLoader />
        </div>
      )}

      <section className='flex w-full items-center py-6 px-0 lg:h-screen lg:p-10'>
        <div className='container'>
          <div className='bg-default-950/40 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl'>
            <div className='grid gap-10 lg:grid-cols-2'>
              {/* FIRST */}
              <Branding
                image='auth-img'
                title='To Build your solana token Creator'
                message='Try and create your first ever solana project, and if you want to master blockchain development'
              />
              {/* SECOND */}

              {!loaded ? (
                <div className='lg:ps-0 flex h-full flex-col p-10'>
                  <div className='pb-10'>
                    <a className='flex'>
                      <img
                        src='assets/images/logo1.png'
                        alt=''
                        className='h-10'
                      />
                    </a>
                  </div>

                  <div className='my-auto pb-6 text-center'>
                    <h4 className='mb-4 text-2xl font-bold text-white'>
                      Link your new token
                    </h4>
                    <p className='text-default-300 mx-auto mb-5 max-w-sm'>
                      Your Solana token is successfully created, Check now
                      explorer
                    </p>
                    <div className='flex items-start justify-center'>
                      <Image
                        src={'/assets/images/logout.svg'}
                        alt=''
                        className='h-40'
                        width={200}
                        height={200}
                      />
                    </div>

                    <div className='mt-5 w-full text-center'>
                      <p className='text-default-300 text-base font-medium leading-6'></p>
                      <InputView
                        name={'Token Address'}
                        placeholder='address'
                        clickhandle={(e) => setTokenAddress(e.target.value)}
                      />

                      <div className='mb-6 text-center'>
                        <button
                          onClick={() => getMetadata(tokenAddress)}
                          className='bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center
                          justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500'
                        >
                          <span className='fw-bold'>Get Token Metadata</span>
                        </button>
                      </div>
                      <CloseModal />
                    </div>
                  </div>
                </div>
              ) : (
                <div className='lg:ps-0 flex h-full flex-col p-10'>
                  <div className='pb-10'>
                    <a className='flex'>
                      <img
                        src='/assets/images/logo1.png'
                        alt=''
                        className='h-10'
                      />
                    </a>
                  </div>

                  <div className='my-auto pb-6 text-center'>
                    <div className='flex items-start justify-center'>
                      <Image
                        src={logo}
                        alt=''
                        className='h-40'
                        width={200}
                        height={200}
                      />
                    </div>

                    <div className='mt-5 w-full text-center'>
                      <p className='text-default-300 text-base font-medium leading-6'></p>
                      <InputView
                        name={'Token Address'}
                        placeholder={tokenMetadata?.name}
                      />
                      <InputView
                        name={'Symbol'}
                        placeholder={tokenMetadata?.symbol || 'undefined'}
                      />
                      <InputView
                        name={'Token URI'}
                        placeholder={tokenMetadata?.uri}
                      />

                      <div className='mb-6 text-center'>
                        <a
                          href={tokenMetadata?.uri}
                          className='bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center
                          justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500'
                        >
                          <span className='fw-bold'>OPEN URI</span>
                        </a>
                      </div>

                      <CloseModal />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
