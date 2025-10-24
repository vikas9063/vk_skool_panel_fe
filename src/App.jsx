import React from 'react'
import SidebarLayout from './components/Sidebar'

const App = () => {
  return (
    <SidebarLayout>
      <div className="rounded-lg bg-white border p-6">
        <h1 className="text-2xl font-semibold mb-3">Welcome</h1>
        <p className="text-gray-600">
          This is your main content area. Replace this with your dashboard, tables, or pages.
        </p>
      </div>
    </SidebarLayout>
  )
}

export default App
