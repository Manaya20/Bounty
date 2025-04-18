import { render, screen } from '@testing-library/react'
import BountyCard from '../BountyCard'

const mockBounty = {
  id: '1',
  title: 'Test Bounty',
  description: 'This is a test bounty',
  reward: 100,
  status: 'open',
  createdAt: new Date().toISOString(),
}

describe('BountyCard', () => {
  it('renders the bounty title', () => {
    render(<BountyCard bounty={mockBounty} />)
    const title = screen.getByText('Test Bounty')
    expect(title).toBeInTheDocument()
  })

  it('renders the bounty description', () => {
    render(<BountyCard bounty={mockBounty} />)
    const description = screen.getByText('This is a test bounty')
    expect(description).toBeInTheDocument()
  })

  it('renders the bounty reward', () => {
    render(<BountyCard bounty={mockBounty} />)
    const reward = screen.getByText('100')
    expect(reward).toBeInTheDocument()
  })

  it('renders the bounty status', () => {
    render(<BountyCard bounty={mockBounty} />)
    const status = screen.getByText('open')
    expect(status).toBeInTheDocument()
  })
}) 