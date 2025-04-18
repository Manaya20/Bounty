import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home', () => {
  it('renders the main heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', {
      name: /Welcome to Bounty/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<Home />)
    const description = screen.getByText(/A platform for managing bounties/i)
    expect(description).toBeInTheDocument()
  })

  it('renders the Get Started button', () => {
    render(<Home />)
    const button = screen.getByRole('button', { name: /Get Started/i })
    expect(button).toBeInTheDocument()
  })
}) 