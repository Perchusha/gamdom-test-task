import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Dashboard, Login, NotFound, Register } from './pages';
import { Header, Layout, ProtectedRoute, PublicRoute } from './components';
import { LayoutProvider } from './context';
import { SnackbarProvider } from 'notistack';

const App = observer(() => (
  <Router>
    <LayoutProvider>
      <SnackbarProvider>
        <Header />
        <Layout>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </SnackbarProvider>
    </LayoutProvider>
  </Router>
));

export default App;
