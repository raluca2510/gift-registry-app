import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import { PrivateRoute } from './utils'
import { HomePage, GroupPage, AuthPage, JoinGroupPage, CreateGroupPage } from './pages'
import { SideBar } from './components'
import { AuthProvider } from './context/AuthContext';
import { GroupsProvider } from './context/GroupsContext';
import { GroupProvider } from './context/GroupContext';
import { WishlistProvider } from './context/WishlistContext';
import { WishlistItemProvider } from './context/WishlistItemContext';

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <GroupsProvider>
          
          <GroupProvider>

          <WishlistProvider>

          <WishlistItemProvider>
          <SideBar />
          
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route 
                path="/" 
                element={<HomePage />}
              />
            </Route>
            
            <Route path="/groups/:id" element={<GroupPage />} />
            <Route path="/auth/:authType" element={<AuthPage/>} />
            <Route path="/join" element={<JoinGroupPage />} />
            <Route path="/create" element={<CreateGroupPage />} />
          </Routes>
          </WishlistItemProvider>
          </WishlistProvider>
          </GroupProvider>
          </GroupsProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
