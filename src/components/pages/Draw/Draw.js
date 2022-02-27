import React,{setState, useState} from 'react';
import {ethers}   from 'ethers';
import Lottery    from '../../../artifacts/contracts/lottery.sol/Lottery.json';
import { Button } from '../../Button';
import '../general.css';

import { LotteryAddress } from '../../../ContractAddress';

// const LotteryAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

function Draw() 
{

  const   lightBg       = false;
  const   lightText     = true;
  const   lightTextDesc = true;
  const   topLine       = 'Draw Page';
  const   headline      = 'This page is only for the owner of contract.';
  const   description   = 'Draw result will be shown here';
  const   buttonLabel   = 'Draw';
  const   imgStart      = '';
  const   img           = 'images/draw.png';
  const   alt           = 'Credit Card';

  let [message,setMessageValue] = useState(description);

  async function requestAccount()
  {
    await window.ethereum.request({method:'eth_requestAccounts'});    
  }

  async function Draw()
  {
    if(typeof window.ethereum !== 'undefined')
    {
      try
      {
        await requestAccount(); 
        const provider    = new ethers.providers.Web3Provider(window.ethereum);
        const signer      = provider.getSigner();
        const contract    = new ethers.Contract(LotteryAddress,Lottery.abi,signer);
        const transaction = await contract.pickWinner();
        await transaction.wait();
        const winner      = await contract.winner();
        let str = "Winner wallet:"+winner;
        setMessageValue(str);
      }
      catch(err)
      {
        setMessageValue(err.data.message);
      }
    }
    else
    {
      setMessageValue("This browser is not connected to Metamask.");
    }    
  }

  return (
    <>
      <div
        className={lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}
      >
        <div className='container'>
          <div
            className='row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
            }}
          >
            <div className='col'>
              <div className='home__hero-text-wrapper'>
                <div className='top-line'>{topLine}</div>
                <h1 className={lightText ? 'heading' : 'heading dark'}>
                  {headline}
                </h1>
                <p
                  className={
                    lightTextDesc
                      ? 'home__hero-subtitle'
                      : 'home__hero-subtitle dark'
                  }
                >

                {message}
                  
                </p>
                  <Button buttonSize='btn--wide' buttonColor='blue' onClick={Draw}>
                    {buttonLabel}
                  </Button>
              </div>
            </div>
            <div className='col'>
              <div className='home__hero-img-wrapper'>
                <img src={img} alt={alt} className='home__hero-img' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Draw;
