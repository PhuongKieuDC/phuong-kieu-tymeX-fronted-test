import { Suspense } from 'react';
import { Outlet, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <Layout>
                <Suspense>
                  <Outlet />
                </Suspense>
              </Layout>
            }
          >
            <Route path={'/'} element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
