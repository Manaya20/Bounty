import { render, screen } from '@testing-library/react'
import BountyList from '../BountyList'

const mockBounties = [
  {
    id: '1',
    title: 'Test Bounty 1',
    description: 'Test Description 1',
    reward: 100,
    status: 'open',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    title: 'Test Bounty 2',
    description: 'Test Description 2',
    reward: 200,
    status: 'closed',
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z'
  }
]

describe('BountyList', () => {
  it('renders the list title', () => {
    render(<BountyList bounties={[]} />)
    const title = screen.getByText('Bounties')
    expect(title).toBeInTheDocument()
  })

  it('renders list of bounties correctly', () => {
    render(<BountyList bounties={mockBounties} />)
    
    expect(screen.getByText('Test Bounty 1')).toBeInTheDocument()
    expect(screen.getByText('Test Description 1')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('open')).toBeInTheDocument()
    
    expect(screen.getByText('Test Bounty 2')).toBeInTheDocument()
    expect(screen.getByText('Test Description 2')).toBeInTheDocument()
    expect(screen.getByText('200')).toBeInTheDocument()
    expect(screen.getByText('closed')).toBeInTheDocument()
  })

  it('shows empty state when no bounties are provided', () => {
    render(<BountyList bounties={[]} />)
    expect(screen.getByText('No bounties found')).toBeInTheDocument()
  })

  it('shows loading state when bounties are null', () => {
    render(<BountyList bounties={null} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
}) 