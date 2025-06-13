// src/pages/SurveyBuilder.jsx
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  GripVertical,
  Save,
  Eye,
  Settings,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const SurveyBuilder = ({ onBack }) => {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: 'How did you first hear about us?',
      type: 'first-touch',
      required: true,
      options: [
        'Google Search',
        'Facebook/Instagram',
        'TikTok',
        'Email',
        'Friend/Family',
        'Influencer',
        'Other'
      ]
    },
    {
      id: 2,
      text: 'What made you decide to purchase today?',
      type: 'last-touch',
      required: true,
      options: [
        'Product Quality',
        'Price/Discount',
        'Reviews',
        'Brand Trust',
        'Recommendation',
        'Limited Time Offer',
        'Other'
      ]
    }
  ]);
  const [expandedQuestion, setExpandedQuestion] = useState(1);
  
  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      text: '',
      type: 'custom',
      required: false,
      options: [
        { id: 1, text: 'Option 1' },
        { id: 2, text: 'Option 2' },
        { id: 3, text: 'Option 3' }
      ]
    };
    setQuestions([...questions, newQuestion]);
    setExpandedQuestion(newQuestion.id);
  };
  
  const updateQuestion = (id, updates) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, ...updates } : q
    ));
  };
  
  const deleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };
  
  const addOption = (questionId) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const newOptions = [
        ...question.options,
        { id: Date.now(), text: `Option ${question.options.length + 1}` }
      ];
      updateQuestion(questionId, { options: newOptions });
    }
  };
  
  const updateOption = (questionId, optionIndex, value) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = { ...newOptions[optionIndex], text: value };
      updateQuestion(questionId, { options: newOptions });
    }
  };
  
  const deleteOption = (questionId, optionIndex) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options.length > 1) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex);
      updateQuestion(questionId, { options: newOptions });
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-purple-50 text-gray-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Survey Builder</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Save Survey</span>
          </button>
        </div>
      </div>
      
      {/* Survey Title */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Survey Title
        </label>
        <input
          type="text"
          value={surveyTitle}
          onChange={(e) => setSurveyTitle(e.target.value)}
          placeholder="Post-Purchase Attribution Survey"
          className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      {/* Survey Info Box */}
      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <div className="flex items-start space-x-3">
          <Settings className="h-5 w-5 text-purple-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-purple-900">Attribution Survey Best Practices</p>
            <ul className="mt-1 space-y-1 text-purple-700">
              <li>• Keep surveys to 2-3 questions for optimal completion rates</li>
              <li>• First question should capture initial touchpoint</li>
              <li>• Second question should identify final conversion driver</li>
              <li>• Target completion time under 20 seconds</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Questions */}
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-xl shadow-sm border border-purple-100">
            <div className="p-4 border-b border-purple-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                  <span className="text-sm font-medium text-gray-600">Question {index + 1}</span>
                  {question.type === 'first-touch' && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">First Touch</span>
                  )}
                  {question.type === 'last-touch' && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Last Touch</span>
                  )}
                  {question.required && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Required</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    {expandedQuestion === question.id ? (
                      <ChevronUp className="h-4 w-4 text-gray-600" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                  {question.type === 'custom' && (
                    <button
                      onClick={() => deleteQuestion(question.id)}
                      className="p-1 rounded hover:bg-red-50 text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {expandedQuestion === question.id && (
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Text
                  </label>
                  <input
                    type="text"
                    value={question.text}
                    onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                    placeholder="Enter your question"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Answer Options
                    </label>
                    <button
                      onClick={() => addOption(question.id)}
                      className="text-sm text-purple-600 hover:text-purple-700"
                    >
                      + Add Option
                    </button>
                  </div>
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => updateOption(question.id, question.options.findIndex(o => o.id === option.id), e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {question.options.length > 1 && (
                          <button
                            onClick={() => deleteOption(question.id, question.options.findIndex(o => o.id === option.id))}
                            className="p-2 rounded hover:bg-red-50 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={question.required}
                      onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Required question</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Add Question Button */}
        <button
          onClick={addQuestion}
          className="w-full p-4 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2 text-purple-600"
        >
          <Plus className="h-5 w-5" />
          <span>Add Question</span>
        </button>
      </div>
      
      {/* Survey Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Survey Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thank You Message
            </label>
            <textarea
              placeholder="Thank you for your feedback!"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="mr-2 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">Enable for returning customers</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyBuilder;
