import '@testing-library/jest-dom';

// Mock data for Pokémon
const mockPokemons = [
  {
    name: 'Bulbasaur',
    types: ['Grass', 'Poison'],
  },
  {
    name: 'Charmander',
    types: ['Fire'],
  },
  {
    name: 'Squirtle',
    types: ['Water'],
  },
];

describe('Pokémon Type Tests', () => {
  it('Bulbasaur should be of type Grass', () => {
    const bulbasaur = mockPokemons.find((pokemon) => pokemon.name === 'Bulbasaur');
    expect(bulbasaur?.types).toContain('Grass');
  });

  it('Charmander should be of type Fire', () => {
    const charmander = mockPokemons.find((pokemon) => pokemon.name === 'Charmander');
    expect(charmander?.types).toContain('Fire');
  });

  it('Squirtle should be of type Water', () => {
    const squirtle = mockPokemons.find((pokemon) => pokemon.name === 'Squirtle');
    expect(squirtle?.types).toContain('Water');
  });
});
