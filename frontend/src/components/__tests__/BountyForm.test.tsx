import { render, screen, fireEvent } from '@testing-library/react'
import BountyForm from '../BountyForm'

describe('BountyForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders form fields correctly', () => {
    render(<BountyForm onSubmit={mockOnSubmit} />)
    
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByLabelText('Reward')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create Bounty' })).toBeInTheDocument()
  })

  it('submits form with correct data', () => {
    render(<BountyForm onSubmit={mockOnSubmit} />)
    
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Bounty' } })
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test Description' } })
    fireEvent.change(screen.getByLabelText('Reward'), { target: { value: '100' } })
    
    fireEvent.click(screen.getByRole('button', { name: 'Create Bounty' }))
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Bounty',
      description: 'Test Description',
      reward: 100
    })
  })

  it('shows validation errors for empty fields', () => {
    render(<BountyForm onSubmit={mockOnSubmit} />)
    
    fireEvent.click(screen.getByRole('button', { name: 'Create Bounty' }))
    
    expect(screen.getByText('Title is required')).toBeInTheDocument()
    expect(screen.getByText('Description is required')).toBeInTheDocument()
    expect(screen.getByText('Reward is required')).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
}) 