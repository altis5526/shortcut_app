import Head from 'next/head';
import TextExpander from './textexpander';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Text Expander App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to the Text Expander App</h1>
        <TextExpander />
      </main>
    </div>
  );
};

export default Home;