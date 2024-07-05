import Game from '@/components/game';
import TelegramDataTest from '@/components/telegram-data-test';

export default function Home() {
  return (
    <main className='h-full'>
      <Game />
      <TelegramDataTest />
    </main>
  );
}
