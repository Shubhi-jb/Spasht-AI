import React, { useState, useCallback } from 'react';
import FileUpload from './components/FileUpload';
import ResultDisplay from './components/ResultDisplay';
import HomePage from './components/HomePage'; // Import the new HomePage component
import { analyzeDocument } from './services/mockSpashtAIService'; // Changed to mock service
import { AnalysisResult } from './types';

type AppView = 'home' | 'analyzer';
type AnalyzerScreen = 'scanner' | 'report'; // New state for sub-screens in analyzer view

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [analyzerScreen, setAnalyzerScreen] = useState<AnalyzerScreen>('scanner'); // Default to scanner
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<'english' | 'hindi'>('english'); // New: Language state

  const handleStartAnalysis = useCallback(() => {
    setCurrentView('analyzer');
    setAnalyzerScreen('scanner'); // Ensure starting on scanner when entering analyzer view
  }, []);

  const handleBackToScan = useCallback(() => {
    setAnalyzerScreen('scanner');
    setAnalysisResult(null); // Clear previous results
    setSelectedFile(null); // Clear selected file
    setErrorMessage(null); // Clear error message
  }, []);

  const handleFileSelect = useCallback(async (file: File) => {
    setErrorMessage(null);
    setAnalysisResult(null); // Clear previous results
    setSelectedFile(file);

    if (!file) {
      setErrorMessage('No file selected.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrorMessage('File size exceeds 5MB limit.');
      setSelectedFile(null);
      return;
    }

    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      setErrorMessage('Only PNG, JPG, and JPEG images are supported.');
      setSelectedFile(null);
      return;
    }

    setIsLoading(true);
    try {
      const result = await analyzeDocument(file); // Uses the mock service
      setAnalysisResult(result);
      setAnalyzerScreen('report'); // Navigate to report screen after successful analysis
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(`Analysis failed: ${error.message}`);
      } else {
        setErrorMessage('An unknown error occurred during analysis.');
      }
      setAnalyzerScreen('scanner'); // Stay on scanner or return if error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isReportScreen = currentView === 'analyzer' && analyzerScreen === 'report';

  return (
    <>
      {currentView === 'home' ? (
        <HomePage onStartAnalysis={handleStartAnalysis} currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
      ) : (
        <div className="bg-light-surface text-gray-text flex flex-col items-center w-full min-h-screen relative">
          {/* Back button for Analyzer View */}
          <button
            onClick={isReportScreen ? handleBackToScan : () => setCurrentView('home')}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 p-3 rounded-full bg-light-surface shadow-md border border-google-border text-gray-text hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 z-10"
            aria-label={isReportScreen ? "Back to Scan" : "Back to Home"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
          </button>

          {/* New wrapper for content to apply max-w App.tsx / HomePage.tsx H1 stylesidth and padding */}
          <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 flex-grow flex flex-col items-center">
            <h1 className={`${currentLanguage === 'hindi' ? 'font-devanagari text-display-h1 sm:text-display-h1-sm' : 'text-4xl sm:text-5xl'} font-extrabold font-headings text-primary-blue pt-16 sm:pt-20 mb-6 sm:mb-8 text-center`} lang={currentLanguage === 'hindi' ? 'hi' : 'en'}> {/* Reduced pt and mb */}
              {isReportScreen
                ? (currentLanguage === 'english' ? 'Analysis Report' : 'विश्लेषण रिपोर्ट')
                : (currentLanguage === 'english' ? 'Legal Document Analyzer' : 'कानूनी दस्तावेज़ विश्लेषक')
              }
            </h1>

            <main className="w-full flex-grow flex items-start justify-center"> {/* main will now flex-grow within the new wrapper */}
              {analyzerScreen === 'scanner' && (
                <div key="scanner-screen" className="w-full motion-safe:animate-slideInFromRight">
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    selectedFile={selectedFile}
                    currentLanguage={currentLanguage} // Pass language prop
                  />
                </div>
              )}

              {analyzerScreen === 'report' && analysisResult && (
                <div key="report-screen" className="w-full motion-safe:animate-slideInFromRight">
                  <ResultDisplay
                    result={analysisResult}
                    onBackToScan={handleBackToScan} // Pass the callback, though the main back button is in App
                    currentLanguage={currentLanguage}
                    setCurrentLanguage={setCurrentLanguage}
                  />
                </div>
              )}
            </main>

            <footer className="mt-12 sm:mt-16 pb-4 sm:pb-8 text-center text-gray-subtle text-xs sm:text-sm w-full"> {/* Reduced mt */}
              <p className={`${currentLanguage === 'hindi' ? 'font-devanagari text-content-base' : 'text-base'} font-semibold mb-1`} lang={currentLanguage === 'hindi' ? 'hi' : 'en'}>
                {currentLanguage === 'english' ? 'Powered by Mock Data (AI functionality removed)' : 'मॉक डेटा द्वारा संचालित (एआई कार्यक्षमता हटा दी गई)'}
              </p>
              <p className={`${currentLanguage === 'hindi' ? 'font-devanagari text-text-fine-base' : 'text-xs'}`} lang={currentLanguage === 'hindi' ? 'hi' : 'en'}>
                {currentLanguage === 'english'
                  ? 'Spasht AI provides AI-generated summaries for literacy and is not a substitute for professional legal advice.'
                  : 'स्पष्ट एआई साक्षरता के लिए एआई-जनित सारांश प्रदान करता है और पेशेवर कानूनी सलाह का विकल्प नहीं है।'
                }
              </p>
              <p className={`${currentLanguage === 'hindi' ? 'font-devanagari text-text-fine-base' : 'text-xs'} mt-2`} lang={currentLanguage === 'hindi' ? 'hi' : 'en'}>
                &copy; {new Date().getFullYear()} {currentLanguage === 'english' ? 'Spasht AI. All rights reserved.' : 'स्पष्ट एआई। सर्वाधिकार सुरक्षित।'}
              </p>
            </footer>
          </div> {/* End of new content wrapper */}
        </div>
      )}
    </>
  );
}

export default App;