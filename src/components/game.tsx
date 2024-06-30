'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import GameLoading from '@/components/game-loading';

const Phaser = dynamic(() => import('@/components/phaser'), {
  ssr: false,
  loading: GameLoading,
});

export default function Game() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  const [lastClickTime, setLastClickTime] = useState<Date | null>(null);

  const handleClick = () => {
    if (isAnimating || isReloading) return;

    setLastClickTime(new Date());
    setIsAnimating(true);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <div className='w-full max-w-3xl px-4'>
      <Phaser onGameClick={handleClick} onAnimationEnd={handleAnimationEnd} />
    </div>
  );

  // return (
  //   <main className='min-h-screen w-full pb-24 flex flex-col items-center justify-center bg-gradient-to-t from-black to-rose-950'>
  //     <div className='absolute top-8 left-8'>
  //       <span className='text-4xl md:text-7xl font-jonwik text-red-700'>
  //         Jon Wik
  //       </span>
  //     </div>
  //     <div className='p-2 w-full flex justify-center items-center text-white'>
  //       <span className='text-2xl md:text-5xl font-jonwik'>{}</span>
  //       <Image
  //         src='/images/CoinHud.png'
  //         alt='Coin Hud'
  //         width={250}
  //         height={100}
  //         className='ml-2 md:ml-4'
  //       />
  //     </div>
  //     <div className='w-full max-w-3xl px-4'>
  //       <Phaser onGameClick={handleClick} onAnimationEnd={handleAnimationEnd} />
  //     </div>
  //     <div className='w-full max-w-md flex flex-col items-center relative mt-4'>
  //       <div
  //         className={`relative ${'animate-recoil'} ${
  //           isReloading ? 'animate-reload' : ''
  //         }`}
  //       >
  //         <div className='relative'>
  //           {bullets.map((bullet) => (
  //             <div
  //               key={bullet.id}
  //               className={`absolute ${bullet.className}`}
  //               style={{
  //                 transformOrigin: 'center',
  //                 top: '27%',
  //                 left: '45%',
  //                 transform: 'translate(-50%, 0%)',
  //               }}
  //             >
  //               <Image
  //                 src='/images/bullet.png'
  //                 alt='Bullet Cartridge'
  //                 width={20}
  //                 height={20}
  //               />
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //       <div className='flex items-center justify-center space-x-4 mt-4'>
  //         <div>
  //           <Image
  //             src='/images/Ammo.png'
  //             alt='Ammunition'
  //             width={150}
  //             height={150}
  //             className='object-contain'
  //           />
  //         </div>
  //         <div>
  //           <Image
  //             src='/images/IncreaseAmmo.png'
  //             alt='Increase Ammo'
  //             width={125}
  //             height={125}
  //             className='object-contain'
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </main>
  // );
}
