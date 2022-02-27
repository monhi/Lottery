import React      from 'react';
import {ethers}   from 'ethers';
import Lottery    from '../../../artifacts/contracts/lottery.sol/Lottery.json';
import { Button } from '../../Button';
import { LotteryAddress } from '../../../ContractAddress';
import '../general.css';


                        
function Home() {

  async function requestAccount()
  {
    await window.ethereum.request({method:'eth_requestAccounts'});    
  }

  async function Enter()
  {
    if(typeof window.ethereum !== 'undefined')
    {
      await requestAccount(); 
      const provider    = new ethers.providers.Web3Provider(window.ethereum);
      const signer      = provider.getSigner();

      const contract    = new ethers.Contract(LotteryAddress,Lottery.abi,signer);
      const price       = ethers.utils.parseUnits('0.011', 'ether')
      console.log(price.toString());
      const transaction = await contract.enter({value:price.toString()});
      await transaction.wait();
    }    
  }

  const   lightBg       = false;
  const   lightText     = true;
  const   lightTextDesc = true;
  const   topLine       = 'Lottery';
  const   headline      = 'Up your chance of winning Lottery';
  const   description   = 'Just by clicking following button, you get involved in a lottery that may make you rich, your lucky future is knocking the door';
  const   buttonLabel   = 'Take part';
  const   imgStart      = '';
  const   img           = 'images/Lottery.jpg';
  const   alt           = 'Credit Card';

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
                  {description}
                </p>
                  <Button buttonSize='btn--wide' buttonColor='blue' onClick={Enter}>
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

export default Home;