import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import MessageList from './features/containers/MessageList.tsx';
import MessageForm from './features/containers/MessageForm.tsx';

const App = () => {

  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<MessageList />} />
            <Route path="/messages" element={<MessageList />} />
            <Route path="/message/create" element={<MessageForm />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App
