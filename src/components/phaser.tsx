'use client';

import React, { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';

type PhaserGameProps = {
  onGameClick: () => void;
  onAudioLoaded?: (audio: Phaser.Sound.BaseSound) => void;
  onAnimationEnd: () => void;
};

const PhaserGame: React.FC<PhaserGameProps> = ({
  onGameClick,
  onAudioLoaded,
  onAnimationEnd,
}) => {
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const gunRef = useRef<Phaser.GameObjects.Sprite | null>(null);

  useEffect(() => {
    console.log('phaser init useEffect');

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: '175%',
      height: '175%',
      transparent: true,
      parent: 'phaser-container',
      scene: {
        preload,
        create,
        update,
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      fps: {
        target: 60,
        forceSetTimeOut: true,
      },
    };
    phaserGameRef.current = new Phaser.Game(config);

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
      }
    };
  }, []);

  function preload(this: Phaser.Scene) {
    console.log('Preloading assets...');
    this.load.atlas(
      'gunFire',
      '/images/spritesheet/spritesheet.png',
      '/images/spritesheet/spritesheet.json',
    );
    this.load.audio('desertEagle', ['/sounds/desert-eagle.mp3']);
  }

  function create(this: Phaser.Scene) {
    console.log('Creating scene...');
    gunRef.current = this.add
      .sprite(this.scale.width / 2, this.scale.height / 2, 'gunFire', '1.png')
      .setScale(1);

    this.anims.create({
      key: 'fire',
      frames: this.anims.generateFrameNames('gunFire', {
        start: 1,
        end: 42,
        zeroPad: 0,
        prefix: '',
        suffix: '.png',
      }),
      frameRate: 60,
      repeat: 0,
    });

    console.log('Sprite created:', gunRef.current);

    const audio = this.sound.add('desertEagle');
    if (onAudioLoaded) {
      onAudioLoaded(audio);
    }

    this.input.on('pointerdown', () => {
      if (gunRef.current) {
        console.log('Playing animation...');

        onGameClick();

        if (audio) {
          audio.play();
        }

        gunRef.current.play('fire');
        gunRef.current.once('animationcomplete', () => {
          gunRef.current?.setTexture('gunFire', '1.png');
          onAnimationEnd();
        });
      }
    });

    // Call the callback to pass the audio instance to the parent component
  }

  function update(this: Phaser.Scene) {
    // Update logic if needed
  }

  return <div id='phaser-container' className='w-full h-72'></div>;
};

export default PhaserGame;
