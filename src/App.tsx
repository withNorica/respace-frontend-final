import React, { useState, useCallback, useEffect } from "react";
import { generateDesign } from "./services/backendService";

// Am scos importurile componentelor pe care nu le folosim încă
// import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";
// import Spinner from "./components/Spinner";
// import ThemeToggle from "./components/ThemeToggle";

const DESIGN_STYLES = [
  "Modern", "Scandinavian", "Bohemian (Boho)", "Minimalist", "Industrial", 
  "Coastal", "Farmhouse", "Mid-Century Modern", "Japandi", "Traditional / Classic", 
  "Transitional", "Rustic", "Eclectic"
];

const App: React.FC = () => {
  const [roomImage, setRoomImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>(DESIGN_STYLES[0]);
  const [specificChanges, setSpecificChanges] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string | null>(null);

  useEffect(() => {
    if (!roomImage) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(roomImage);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [roomImage]);

  const handleImageUpload = useCallback((file: File) => {
    setError(null);
    setRoomImage(file);
    setResultImage(null);
    setResultText(null);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!roomImage) {
      setError("Please upload an image of your room first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResultImage(null);
    setResultText(null);

    try {
      const promptText = `Redesign this room in a ${selectedStyle} style. ${specificChanges}`;
      const res = await generateDesign(roomImage, promptText, selectedStyle);

      setResultImage(res.imageUrl);
      setResultText(res.suggestions);

      if (res.imageUrl) setPreviewUrl(null);
    } catch (err: any) {
      console.error(err);
      setError(`Failed to generate design. ${err?.message ?? "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  }, [roomImage, selectedStyle, specificChanges]);

  const handleReset = useCallback(() => {
    setRoomImage(null);
    setPreviewUrl(null);
    setSelectedStyle(DESIGN_STYLES[0]);
    setSpecificChanges("");
    setIsLoading(false);
    setError(null);
    setResultImage(null);
    setResultText(null);
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', textAlign: 'center' }}>
      <h1>ReSpace Design</h1>
      
      {!resultImage && (
        <div>
          <ImageUploader id="image-uploader" onFileSelect={handleImageUpload} imageUrl={previewUrl} />
          <select value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)}>
            {DESIGN_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <textarea value={specificChanges} onChange={(e) => setSpecificChanges(e.target.value)} placeholder="Specific changes..." />
          <button onClick={handleGenerate} disabled={!roomImage || isLoading}>
            {isLoading ? "Generating..." : "Generate Design"}
          </button>
        </div>
      )}

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {resultImage && (
        <div>
          <img src={resultImage} alt="Redesigned room" style={{ maxWidth: '100%' }} />
          <p>{resultText}</p>
          <button onClick={handleReset}>Start New Design</button>
        </div>
      )}
    </div>
  );
};

export default App;