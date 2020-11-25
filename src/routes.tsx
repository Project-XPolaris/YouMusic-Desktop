import Nav from './layout/Nav'
import React from 'react'
import HomePage from './pages/Home'

const routes = [
  {
    path: '/',
    exact: true,
    sidebar: <Nav />,
    main: <HomePage />
  }
]
