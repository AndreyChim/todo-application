// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import { createRoot } from 'react-dom/client' // Modern React 18+ approach
import PropTypes from 'prop-types'

const Hello = props => (
  <div style={{ 
    padding: '20px', 
    backgroundColor: '#f0f8ff', 
    border: '2px solid #007bff',
    margin: '20px',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: 'bold'
  }}>
    Hello {props.name}!
  </div>
)

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}

// Function to initialize React
const initializeReact = () => {
  // Check if root already exists
  let container = document.getElementById('react-root')
  
  // If not, create it
  if (!container) {
    container = document.createElement('div')
    container.id = 'react-root'
    document.body.prepend(container) // Add at the top of body
  }
  
  // Clear any existing content
  container.innerHTML = ''
  
  // Use modern React 18 createRoot API
  const root = createRoot(container)
  root.render(<Hello name="React" />)
  
  console.log('React component mounted successfully!')
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeReact)
} else {
  initializeReact()
}

// Also handle Turbolinks navigation if present
document.addEventListener('turbolinks:load', initializeReact)