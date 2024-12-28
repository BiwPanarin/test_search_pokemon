import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { gql, useLazyQuery } from '@apollo/client';
import client from '../lib/apollo-client';

// GraphQL Query
const GET_POKEMON = gql`
  query GetPokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      image
      types
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      attacks {
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        name
        image
      }
    }
  }
`;

interface Pokemon {
  id: string;
  number: string;
  name: string;
  image: string;
  types: string[];
  weight: { minimum: string; maximum: string };
  height: { minimum: string; maximum: string };
  classification: string;
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  attacks: { special: { name: string; type: string; damage: number }[] };
  evolutions?: { id: string; name: string; image: string }[];
}

export default function Search() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [fetchPokemon, { loading, data, error }] = useLazyQuery<{ pokemon: Pokemon }>(GET_POKEMON, { client });

  // Fetch Pokémon เมื่อ query parameters เปลี่ยน
  useEffect(() => {
    if (router.query.name) {
      setQuery(router.query.name as string);
      fetchPokemon({ variables: { name: router.query.name as string } });
    } else if (router.query.id) {
      setQuery(router.query.id as string);
      fetchPokemon({ variables: { id: router.query.id as string } });
    }
  }, [router.query.name, router.query.id]);

  const handleSearch = () => {
    const variables = query.startsWith('UG9rZW1vbj') ? { id: query } : { name: query };

    fetchPokemon({ variables });

    if (variables.id) {
      router.push(`/search?id=${variables.id}`);
    } else if (variables.name) {
      router.push(`/search?name=${variables.name}`);
    }
  };

  const pokemon = data?.pokemon;

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">Pokémon App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/search">Search</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Search */}
      <div className="container mt-4">
        <h1 className="text-center text-primary">Pokémon</h1>
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Pokémon Name or ID"
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">{error.message}</p>}
        {pokemon && (
          <div className="card mx-auto" style={{ maxWidth: '600px' }}>
            <img src={pokemon.image} className="card-img-top" alt={pokemon.name} />
            <div className="card-body">
              <h2 className="card-title text-center">{pokemon.name}</h2>
              <p className="card-text"><strong>Id:</strong> {pokemon.id}</p>
              <p className="card-text"><strong>Number:</strong> {pokemon.number}</p>
              <p className="card-text"><strong>Classification:</strong> {pokemon.classification}</p>
              <p className="card-text"><strong>Types:</strong> {pokemon.types.join(', ')}</p>
              <p className="card-text"><strong>Weight:</strong> {pokemon.weight.minimum} - {pokemon.weight.maximum}</p>
              <p className="card-text"><strong>Height:</strong> {pokemon.height.minimum} - {pokemon.height.maximum}</p>
              <h3>Resistant</h3>
              <ul>{pokemon.resistant.map((res) => <li key={res}>{res}</li>)}</ul>
              <h3>Weaknesses</h3>
              <ul>{pokemon.weaknesses.map((weak) => <li key={weak}>{weak}</li>)}</ul>
              <h3>Special Attacks</h3>
              <ul>{pokemon.attacks.special.map((attack) => (
                <li key={attack.name}>{attack.name} ({attack.type}) - {attack.damage} damage</li>
              ))}</ul>
              <h3>Evolutions</h3>
              {pokemon.evolutions ? (
                <ul className="list-group">
                  {pokemon.evolutions.map((evo) => (
                    <li key={evo.id} className="list-group-item">
                      <a href={`/search?name=${evo.name}`} className="text-decoration-none">{evo.name}</a>
                    </li>
                  ))}
                </ul>
              ) : <p>No Evolutions</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}