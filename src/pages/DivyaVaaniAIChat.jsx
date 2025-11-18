import React from 'react'
import { divineEntities } from '../data/dinines'
import { Link } from 'react-router-dom'

/**
 * DivyaVaani AI Chat Page
 * Displays a list of divine entities for users to converse with.
 */
export default function DivyaVaaniAIChat() {
  const [apiData, setApiData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            method: 'GET',
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-extrabold text-gray-900'>
            Converse with the Divine Within
          </h2>
          <p className='mt-3 text-lg text-gray-600'>
            Choose a divine entity to start your spiritual conversation.
          </p>
        </div>
        <div className='mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {divineEntities.map((entity) => (
            <div
              key={entity.id}
              className='p-6 rounded-lg shadow-lg bg-amber-50 flex flex-col items-center text-center'
            >
              <img
                src={entity.image}
                alt={entity.name}
                className='h-24 w-24 rounded-full object-cover'
              />
              <h3 className='mt-4 text-xl font-semibold text-gray-900'>
                {entity.name}
              </h3>
              <p className='mt-2 text-base text-gray-700'>
                {entity.description}
              </p>
              {loading && <p className='mt-2 text-base text-gray-700'>Loading API data...</p>}
              {error && <p className='mt-2 text-base text-red-500'>Error: {error.message}</p>}
              {apiData && (
                <div className='mt-4 p-4 bg-gray-100 rounded-lg'>
                  <h4 className='text-lg font-semibold text-gray-800'>API Data:</h4>
                  <pre className='mt-2 text-sm text-gray-600 whitespace-pre-wrap'>{JSON.stringify(apiData, null, 2)}</pre>
                </div>
              )}
              <Link
                to={`/chat/${entity.id}`}
                className='mt-6 w-full px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700'
              >
                Chat with {entity.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
