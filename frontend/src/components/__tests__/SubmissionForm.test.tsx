import { render, screen, fireEvent } from '@testing-library/react'
import SubmissionForm from '../SubmissionForm'

describe('SubmissionForm', () => {
  const mockOnSubmit = jest.fn()
  const bountyId = '123'

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders form fields correctly', () => {
    render(<SubmissionForm bountyId={bountyId} onSubmit={mockOnSubmit} />)
    
    expect(screen.getByLabelText('Solution Description')).toBeInTheDocument()
    expect(screen.getByLabelText('GitHub Repository URL')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit Solution' })).toBeInTheDocument()
  })

  it('submits form with correct data', () => {
    render(<SubmissionForm bountyId={bountyId} onSubmit={mockOnSubmit} />)
    
    fireEvent.change(screen.getByLabelText('Solution Description'), { 
      target: { value: 'Test Solution Description' } 
    })
    fireEvent.change(screen.getByLabelText('GitHub Repository URL'), { 
      target: { value: 'https://github.com/test/repo' } 
    })
    
    fireEvent.click(screen.getByRole('button', { name: 'Submit Solution' }))
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      bountyId,
      description: 'Test Solution Description',
      repositoryUrl: 'https://github.com/test/repo'
    })
  })

  it('shows validation errors for empty fields', () => {
    render(<SubmissionForm bountyId={bountyId} onSubmit={mockOnSubmit} />)
    
    fireEvent.click(screen.getByRole('button', { name: 'Submit Solution' }))
    
    expect(screen.getByText('Description is required')).toBeInTheDocument()
    expect(screen.getByText('Repository URL is required')).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('validates GitHub repository URL format', () => {
    render(<SubmissionForm bountyId={bountyId} onSubmit={mockOnSubmit} />)
    
    fireEvent.change(screen.getByLabelText('GitHub Repository URL'), { 
      target: { value: 'invalid-url' } 
    })
    
    fireEvent.click(screen.getByRole('button', { name: 'Submit Solution' }))
    
    expect(screen.getByText('Please enter a valid GitHub repository URL')).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
}) 