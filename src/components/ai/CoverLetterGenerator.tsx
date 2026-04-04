// src/components/ai/CoverLetterGenerator.tsx (Version i përditësuar me CSS dhe letër më profesionale)
import React, { useState } from 'react';
import './CoverLetterGenerator.css';

const CoverLetterGenerator: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [userSkills, setUserSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [positionTitle, setPositionTitle] = useState('');
  const [tone, setTone] = useState('professional');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [loading, setLoading] = useState(false);

  const generateProfessionalLetter = () => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const skillsList = userSkills 
      ? userSkills.split(',').map(skill => skill.trim()).filter(skill => skill)
      : ['technical expertise', 'problem-solving abilities', 'team collaboration'];

    const skillPhrase = skillsList.length > 0 
      ? `proficient in ${skillsList.slice(0, 3).join(', ')}${skillsList.length > 3 ? ', among other skills' : ''}`
      : 'relevant technical and professional skills';

    const experiencePhrase = experience || 'substantial professional experience';
    const company = companyName || 'your esteemed organization';
    const position = positionTitle || 'the position';

    const tonePhrases: Record<string, string> = {
      professional: 'I was particularly impressed by',
      friendly: 'I was excited to see that',
      enthusiastic: 'I was thrilled to discover that',
      formal: 'I was particularly drawn to'
    };

    const closingPhrases: Record<string, string> = {
      professional: 'I look forward to discussing how my skills and experience align with your needs.',
      friendly: 'I\'m excited about the possibility of contributing to your team and would love to chat more!',
      enthusiastic: 'I\'m incredibly enthusiastic about this opportunity and would be thrilled to contribute!',
      formal: 'I am eager to further discuss how my qualifications may be of benefit to your organization.'
    };

    return `
${today}

Hiring Manager
${companyName ? companyName : '[Company Name]'}
${companyName ? '[Company Address]' : ''}

Dear Hiring Manager,

I am writing to express my enthusiastic interest in the ${position} position at ${company}, as advertised. ${tonePhrases[tone]} your organization's commitment to ${jobDescription.split(' ').slice(0, 5).join(' ') || 'innovation and excellence'} aligns perfectly with my professional values and career aspirations.

With ${experiencePhrase} in the field, I have developed ${skillPhrase} that I believe would enable me to contribute significantly to your team. Throughout my career, I have consistently demonstrated the ability to ${experience ? 'apply my expertise effectively' : 'deliver high-quality results'} while collaborating effectively with cross-functional teams.

${jobDescription}

What particularly excites me about this opportunity is the chance to ${jobDescription.split(' ').slice(0, 10).join(' ') || 'apply my skills in a dynamic environment'}. My background in ${experience || 'relevant fields'} has prepared me to tackle the challenges and responsibilities outlined in the position description. I am confident that my combination of technical proficiency and ${experience ? 'practical experience' : 'professional approach'} would make me a valuable asset to your organization.

${closingPhrases[tone]}

Thank you for considering my application. I have attached my resume for your review and would welcome the opportunity to discuss my qualifications further.

Sincerely,

[Your Full Name]
[Your Phone Number]
[Your Email Address]
[Your LinkedIn Profile URL]
[Your Portfolio/Website URL]
    `;
  };

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      const letter = generateProfessionalLetter();
      setGeneratedLetter(letter);
      setLoading(false);
    }, 1500);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter)
      .then(() => alert('Cover letter copied to clipboard!'))
      .catch(err => console.error('Failed to copy:', err));
  };

  const handleSaveToProfile = () => {
    // Here you would typically save to your backend/database
    const savedData = {
      jobDescription,
      companyName,
      positionTitle,
      generatedLetter,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('lastCoverLetter', JSON.stringify(savedData));
    alert('Cover letter saved to your profile!');
  };

  return (
    <div className="cover-letter-container">
      <h1>AI Cover Letter Generator</h1>
      <p className="subtitle">Create professional, tailored cover letters in minutes</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="form-container">
          <div className="space-y-6">
            <div className="form-group">
              <label className="form-label required">Position Title</label>
              <input
                type="text"
                value={positionTitle}
                onChange={(e) => setPositionTitle(e.target.value)}
                className="form-textarea"
                placeholder="e.g., Senior React Developer"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="form-textarea"
                placeholder="e.g., Tech Innovations Inc."
              />
            </div>
            
            <div className="form-group">
              <label className="form-label required">Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="form-textarea description"
                placeholder="Paste the complete job description here..."
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Your Skills</label>
              <textarea
                value={userSkills}
                onChange={(e) => setUserSkills(e.target.value)}
                className="form-textarea"
                placeholder="React, TypeScript, Node.js, Agile Methodology, Team Leadership"
              />
              <p className="text-sm text-gray-500 mt-1">Separate skills with commas</p>
            </div>
            
            <div className="form-group">
              <label className="form-label">Your Experience</label>
              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="form-textarea"
                placeholder="Describe your relevant experience, achievements, and background..."
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Tone & Style</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="form-select"
              >
                <option value="professional">Professional & Formal</option>
                <option value="friendly">Friendly & Approachable</option>
                <option value="enthusiastic">Enthusiastic & Energetic</option>
                <option value="formal">Very Formal & Traditional</option>
              </select>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={loading || !jobDescription.trim()}
              className="generate-btn"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Generating Professional Letter...
                </>
              ) : 'Generate Professional Cover Letter'}
            </button>
          </div>
        </div>
        
        {/* Output */}
        <div className="output-container">
          <label className="output-label">Generated Cover Letter</label>
          <div className={`letter-preview ${!generatedLetter ? 'placeholder' : ''}`}>
            {generatedLetter ? (
              <div className="generated-letter">
                {generatedLetter}
              </div>
            ) : (
              <div>
                <div className="text-4xl mb-4">📝</div>
                <p>Your professional cover letter will appear here</p>
                <p className="text-sm mt-2">Fill in the details and click "Generate"</p>
              </div>
            )}
          </div>
          
          {generatedLetter && (
            <div className="action-buttons">
              <button 
                onClick={handleSaveToProfile}
                className="action-btn save-btn"
              >
                💾 Save to Profile
              </button>
              <button 
                onClick={handleCopyToClipboard}
                className="action-btn copy-btn"
              >
                📋 Copy to Clipboard
              </button>
              <button 
                onClick={() => {
                  setGeneratedLetter('');
                  setCompanyName('');
                  setPositionTitle('');
                }}
                className="action-btn clear-btn"
              >
                🗑️ Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;