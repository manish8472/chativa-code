
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import SignIn from './pages/SignIn'
import SignUpPage from './pages/SingUp'
import TermsOfUsePage from './pages/TermOfUse'
import ResetPassword from './pages/ResetPassword'
import ChatPage from './pages/ChatPage'
import { ThemeProvider } from './theme/ThemeContext'
import { Provider } from 'react-redux'
import store from './app/store';

function App() {

  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" index element={<ChatPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/terms-of-use" element={<TermsOfUsePage />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<SignIn />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App
