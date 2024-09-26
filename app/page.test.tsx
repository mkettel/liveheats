import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RaceDetails from './races/[id]/page';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock localStorage
const localStorageMock = (function() {
  // create a local storage object to store data
  let store: { [key: string]: string } = {};
  // return an object with the following methods
  return {
    getItem: function(key: string) {
      return store[key] || null;
    },
    setItem: function(key: string, value: string) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();

// Mock localStorage on the window object
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// describe makes a test suite that groups together related tests
describe('RaceDetails', () => {
  const mockRace = {
    id: '1',
    name: 'Test Race',
    students: [
      { name: 'Timmy', lane: 1, place: 0 },
      { name: 'Bob', lane: 2, place: 0 },
    ],
  };

  // beforeEach runs before each test and this will set the localStorage to have the mockRace
  beforeEach(() => {
    localStorage.setItem('races', JSON.stringify([mockRace]));
  });

  // afterEach runs after each test and this will clear the localStorage
  it('renders race details', () => {
    render(<RaceDetails params={{ id: '1' }} />);
    
    // this will check if the text is in the document
    expect(screen.getByText('Race Details')).toBeInTheDocument();
    expect(screen.getByText('Timmy')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('updates student place when input changes', () => {
    render(<RaceDetails params={{ id: '1' }} />);
    
    const firstPlaceInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(firstPlaceInput, { target: { value: '1' } });
    
    const updatedRaces = JSON.parse(localStorage.getItem('races') || '[]');
    expect(updatedRaces[0].students[0].place).toBe(1);
  });

  it('highlights first place with green background', () => {
    render(<RaceDetails params={{ id: '1' }} />);
    
    const firstPlaceInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(firstPlaceInput, { target: { value: '1' } });
    
    const firstRow = screen.getAllByRole('row')[1]; // First row after header
    expect(firstRow).toHaveClass('bg-green-100');
  });
});