import React from 'react';

interface GalleryItem {
  style: string;
  imageUrl: string;
}

interface Props {
  items: GalleryItem[];
  onSelectStyle: (style: string) => void;
}

const InspirationGallery: React.FC<Props> = ({ items, onSelectStyle }) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-zinc-800 dark:text-zinc-100">Get Inspired</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <div
            key={item.style}
            onClick={() => onSelectStyle(item.style)}
            className="relative rounded-lg overflow-hidden cursor-pointer group"
          >
            <img src={item.imageUrl} alt={item.style} className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-2 transition-opacity duration-300 group-hover:bg-opacity-50">
              <h3 className="text-white font-bold text-sm">{item.style}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InspirationGallery;