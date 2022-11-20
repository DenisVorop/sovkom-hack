import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components/macro'

import PrivateRoute from './hocs/private-route'
import { useTheme } from './hooks/use-theme'

import { pages } from './pages/_index'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
`



const App = () => {
  const { theme } = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Routes>
          {pages.map((el, idx) => (
            <Route
              key={idx}
              path={el.path}
              element={<PrivateRoute>{el.element}</PrivateRoute>}
            />
          ))}
        </Routes>
      </Wrapper>
    </ThemeProvider>
  )
}

export default React.memo(App)
