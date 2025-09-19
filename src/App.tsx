import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ClassesOverview from './components/ClassesOverview';
import StudyRoom from './components/StudyRoom';
import FlashcardMode from './components/FlashcardMode';
export function App() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout>
              <ClassesOverview />
            </Layout>} />
        <Route path="/study-room/:classId" element={<Layout>
              <StudyRoom />
            </Layout>} />
        <Route path="/flashcards/:setId" element={<Layout>
              <FlashcardMode />
            </Layout>} />
      </Routes>
    </BrowserRouter>;
}