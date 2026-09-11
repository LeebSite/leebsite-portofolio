import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations, experienceData, journeyData, projectTranslations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('appLanguage');
    if (saved === 'en' || saved === 'US') return 'en';
    return 'id';
  });

  const setLanguage = (lang) => {
    const normalized = (lang === 'US' || lang === 'en') ? 'en' : 'id';
    setLanguageState(normalized);
    localStorage.setItem('appLanguage', normalized);
  };

  const toggleLanguage = (lang) => {
    if (lang) {
      setLanguage(lang);
    } else {
      setLanguage(language === 'id' ? 'en' : 'id');
    }
  };

  // Helper for string lookup with fallback support
  const t = (key) => {
    if (!key) return "";
    const langDict = translations[language] || translations.id;
    
    // Check flat key
    if (langDict[key] !== undefined) return langDict[key];

    // Check nested key path: e.g. "nav.home"
    const parts = key.split('.');
    let curr = langDict;
    for (const p of parts) {
      if (curr && typeof curr === 'object' && curr[p] !== undefined) {
        curr = curr[p];
      } else {
        // Fallback to Indonesian if missing in English
        let fallback = translations.id;
        for (const fp of parts) {
          if (fallback && typeof fallback === 'object' && fallback[fp] !== undefined) {
            fallback = fallback[fp];
          } else {
            return key;
          }
        }
        return fallback;
      }
    }
    return curr;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      toggleLanguage, 
      t, 
      isEn: language === 'en',
      isId: language === 'id',
      experienceList: experienceData[language] || experienceData.id,
      journeyList: journeyData[language] || journeyData.id,
      projectTranslations
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      language: 'id',
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (k) => k,
      isEn: false,
      isId: true,
      experienceList: [],
      journeyList: [],
      projectTranslations: {}
    };
  }
  return ctx;
};
