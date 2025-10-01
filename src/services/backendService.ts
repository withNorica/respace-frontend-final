// Adresa URL a backend-ului tău publicat pe Vercel
const API_BASE_URL = 'https://fastapi-python-boilerplate-fawn.vercel.app';
export const generateDesign = async (
  imageFile: File,
  prompt: string,
  style: string // Am păstrat 'style' pentru compatibilitate, chiar dacă nu e folosit în FormData
) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  // Trimitem prompt-ul complet, așa cum se așteaptă backend-ul
  formData.append('prompt', prompt); 
  formData.append('style', style); // Chiar dacă backend-ul nu-l folosește explicit, îl trimitem

  const response = await fetch(`${API_BASE_URL}/generate_design`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error from backend: ${errorText}`);
  }

  const data = await response.json();
  
  return {
    imageUrl: `data:image/png;base64,${data.image_base64}`,
    suggestions: data.design_suggestions,
  };
};