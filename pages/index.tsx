import React, { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import client from '../lib/apollo-client';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Pokemon {
    id: string;
    number: string;
    name: string;
    types: string[];
    image: string;
}

const GET_POKEMONS = gql`
  query GetPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      types
      image
    }
  }
`;

export async function getStaticProps() {
    const { data } = await client.query<{ pokemons: Pokemon[] }>({
        query: GET_POKEMONS,
        variables: { first: 151 },
    });

    return {
        props: {
            initialPokemons: data.pokemons,
        },
        revalidate: 60,
    };
}

export default function Home({ initialPokemons }: { initialPokemons: Pokemon[] }) {
    const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons);
    const [typeFilter, setTypeFilter] = useState('');
    const [first, setFirst] = useState(151);
    const [isNumberDisabled, setIsNumberDisabled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchFilteredPokemons = async () => {
            const { data } = await client.query({
                query: GET_POKEMONS,
                variables: { first },
            });
            setPokemons(data.pokemons);
        };

        if (!isNumberDisabled) {
            fetchFilteredPokemons();
        }
    }, [first, isNumberDisabled]);

    useEffect(() => {
        if (typeFilter) {
            setIsNumberDisabled(true);
            setFirst(151);
        } else {
            setIsNumberDisabled(false);
        }
    }, [typeFilter]);

    const filteredPokemons = typeFilter
        ? pokemons.filter((pokemon) => pokemon.types.includes(typeFilter))
        : pokemons;

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link href="/" passHref>
                        <a className="navbar-brand">Pokémon App</a>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link href="/" passHref>
                                    <a className="nav-link">Home</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/search" passHref>
                                    <a className="nav-link">Search</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Filter */}
            <div className="container mt-4">
                <div className="d-flex justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <label htmlFor="selectFirst" className="form-label me-2">
                            Number of Pokémon:
                        </label>
                        <select
                            id="selectFirst"
                            className="form-select w-auto"
                            value={first}
                            onChange={(e) => setFirst(Number(e.target.value))}
                            disabled={isNumberDisabled}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="151">ALL</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center">
                        <label htmlFor="selectType" className="form-label me-2">
                            Filter by Type:
                        </label>
                        <select
                            id="selectType"
                            className="form-select w-auto"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <option value="">All Types</option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Electric">Electric</option>
                            <option value="Poison">Poison</option>
                            <option value="Flying">Flying</option>
                            <option value="Bug">Bug</option>
                            <option value="Normal">Normal</option>
                            <option value="Ground">Ground</option>
                            <option value="Rock">Rock</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Ice">Ice</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Dark">Dark</option>
                            <option value="Steel">Steel</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                    </div>
                </div>

                {/* Pokémon */}
                <h1 className="mb-4 text-center text-primary">Pokémon List</h1>
                <div className="row">
                    {filteredPokemons.map((pokemon) => (
                        <div key={pokemon.id} className="col-6 col-md-3 mb-4">
                            <div
                                className="card h-100 text-center"
                                onClick={() => router.push(`/search?name=${pokemon.name}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                    className="card-img-top"
                                    style={{ maxHeight: '150px', objectFit: 'contain' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{pokemon.name}</h5>
                                    <p className="card-text">Type: {pokemon.types.join(', ')}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}