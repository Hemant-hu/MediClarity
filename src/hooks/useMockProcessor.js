import { useState } from 'react';

const medicalDictionary = {
  'metformin': 'A common medication used to treat type 2 diabetes by helping control blood sugar levels.',
  '500mg': 'A dosage of 500 milligrams.',
  'po': 'To be taken by mouth.',
  'bid': 'Twice a day.',
  'lisinopril': 'A medication used to treat high blood pressure and heart failure.',
  '10mg': 'A dosage of 10 milligrams.',
  'qd': 'Once a day.',
  'stat': 'Means "immediately".',
  'f/u': 'Stands for "Follow-up", meaning a future appointment to check on your progress.',
  'rx': 'Stands for "prescription".'
};

const actionKeywords = {
    'bid': { type: 'medication', details: 'Take twice a day' },
    'qd': { type: 'medication', details: 'Take once a day' },
    'f/u': { type: 'appointment', details: 'Schedule a follow-up appointment' }
};

export const useMockProcessor = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const processText = (text) => {
    setLoading(true);
    setResult(null);
    setError(null);

    setTimeout(() => {
      try {
        const lowerText = text.toLowerCase();
        const words = lowerText.split(/[\s,.]+/).filter(Boolean);
        let simplifiedText = text;
        const foundActions = new Set();
        
        words.forEach(word => {
          if (medicalDictionary[word]) {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            simplifiedText = simplifiedText.replace(regex, 
              `<mark title="${medicalDictionary[word]}">${word}</mark>`
            );
          }
          if(actionKeywords[word]) {
            const medicationRegex = new RegExp(`(\\w+)\\s*\\d*mg.*${word}`, 'i');
            const match = text.match(medicationRegex);
            const medicationName = match ? match[1] : 'Medication';
            foundActions.add(JSON.stringify({ 
                title: `Reminder for ${medicationName}`, 
                details: actionKeywords[word].details 
            }));
          }
        });

        const uniqueActions = Array.from(foundActions).map(item => JSON.parse(item));
        setResult({ simplifiedText, actions: uniqueActions });
      } catch (e) {
        console.error("Processing failed:", e);
        setError('An unexpected error occurred while analyzing the text. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return { result, loading, error, processText };
};
