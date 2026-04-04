export const generateCoverLetter = async (
  jobDescription: string,
  userSkills: string[],
  userName: string = 'Candidate'
): Promise<string> => {
  try {
    const prompt = `Generate a professional cover letter for ${userName} applying to a job with this description: ${jobDescription}. Relevant skills: ${userSkills.join(', ')}.`;
    
    const response = await fetch(
      'https://api-inference.huggingface.co/models/gpt2',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer hf_free_token_for_demo',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 300,
            temperature: 0.7,
            top_p: 0.9
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error('AI service unavailable');
    }

    const data = await response.json();
    
    if (data[0]?.generated_text) {
      return data[0].generated_text;
    } else {
      return `Dear Hiring Manager,

I am writing to apply for the position. My skills include ${userSkills.slice(0, 3).join(', ')} which I believe make me a strong candidate.

Sincerely,
${userName}`;
    }
  } catch (error) {
    console.error('Error generating cover letter:', error);
    return 'Cover letter generation service is currently unavailable. Please try again later.';
  }
};

export const analyzeJobFit = async (
  jobDescription: string,
  userProfile: {
    skills: string[];
    experience: string;
    education: string;
  }
): Promise<string> => {
  try {
    const prompt = `Analyze why this candidate is suitable for the job. Job: ${jobDescription}. Candidate skills: ${userProfile.skills.join(', ')}. Experience: ${userProfile.experience}. Education: ${userProfile.education}.`;
    
    const response = await fetch(
      'https://api-inference.huggingface.co/models/distilgpt2',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer hf_free_token_for_demo',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_length: 200 }
        })
      }
    );

    const data = await response.json();
    return data[0]?.generated_text || 'Analysis unavailable';
  } catch (error) {
    return 'Unable to analyze job fit at this time.';
  }
};