import './App.css';
import React from 'react';

import RandomBtn from './components/RandomBtn';
import RandomQuotePage from './pages/RandomQuotePage';
import AuthorQuotesPage from './pages/AuthorQuotesPage';

function App() {

  const [randomQuoteData, setRandomQuoteData] = React.useState({})
  const [isRandomQuote, setIsRandomQuote] = React.useState(true)

  React.useEffect(() => {
    getRandomQuote()
  }, [])

  const getRandomQuote = async () => {
    setIsRandomQuote(true)
    const resp = await fetch('https://quote-garden.herokuapp.com/api/v3/quotes/random')
    const data = await resp.json()
    setRandomQuoteData(() => data.data[0])
  }

  return (
    <div className="font-raleway grid place-items-center relative min-h-screen">
      <RandomBtn getRandomQuote={getRandomQuote} />
      <main className='mt-32 mb-10 md:mt-48 md:mb-20'>
        {
          isRandomQuote ?
            <RandomQuotePage 
              randomQuoteData={randomQuoteData}
              setIsRandomQuote={setIsRandomQuote} /> :
            <AuthorQuotesPage 
              author={randomQuoteData.quoteAuthor} 
            />
        }
      </main>
     
    </div>
  );
}

export default App;
