import { render, screen } from '@testing-library/react'
import BountyDetail from '../BountyDetail'

const mockBounty = {
  id: '1',
  title: 'Test Bounty',
  description: 'Test Description',
  reward: 100,
  status: 'open',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  submissions: [
    {
      id: '1',
      description: 'Test Submission',
      status: 'pending',
      createdAt: '2024-01-02T00:00:00.000Z'
    }
  ]
}

describe('BountyDetail', () => {
  it('renders bounty details correctly', () => {
    render(<BountyDetail bounty={mockBounty} />)
    
    expect(screen.getByText('Test Bounty')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('open')).toBeInTheDocument()
  })

  it('renders submissions correctly', () => {
    render(<BountyDetail bounty={mockBounty} />)
    
    expect(screen.getByText('Test Submission')).toBeInTheDocument()
    expect(screen.getByText('pending')).toBeInTheDocument()
  })

  it('shows loading state when bounty is null', () => {
    render(<BountyDetail bounty={null} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
}) 