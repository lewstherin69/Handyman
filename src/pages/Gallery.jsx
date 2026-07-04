import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ImageIcon, Loader2 } from 'lucide-react';

const PLACEHOLDER_IMAGES = [
  {
    id: 1,
    title: 'Bathroom Renovation',
    description: 'Complete bathroom remodel with new tiling, modern vanity, and frameless glass shower enclosure. Customer was thrilled with the transformation.',
    image_url: '/gallery/bathroom-renovation.jpg',
    category: 'Renovation'
  },
  {
    id: 2,
    title: 'Kitchen Faucet Installation',
    description: 'Replaced old leaking faucet with a new premium pull-down model. Included supply line upgrades and under-sink organization.',
    image_url: '/gallery/kitchen-faucet.jpg',
    category: 'Plumbing'
  },
  {
    id: 3,
    title: 'TV Wall Mounting',
    description: 'Mounted a 65-inch OLED TV with hidden cable management system. Included stud-finding, leveling, and post-install calibration.',
    image_url: '/gallery/tv-mounting.jpg',
    category: 'Mounting'
  },
  {
    id: 4,
    title: 'Electrical Panel Upgrade',
    description: 'Upgraded outdated electrical panel to a 200-amp service with AFCI/GFCI breakers. Fully permitted and inspected.',
    image_url: '/gallery/electrical-panel.jpg',
    category: 'Electrical'
  },
  {
    id: 5,
    title: 'Deck Restoration',
    description: 'Full deck restoration including power washing, rotten board replacement, new stain/sealant application, and railing reinforcement.',
    image_url: '/gallery/deck-repair.jpg',
    category: 'Carpentry'
  }
];

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gallery');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setImages(data);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.log('Gallery API not available, using placeholder data');
    }
    // Fallback to placeholder data
    setImages(PLACEHOLDER_IMAGES);
    setLoading(false);
  };

  const categories = ['All', ...new Set(PLACEHOLDER_IMAGES.map(img => img.category).concat(images.map(img => img.category)))];
  const filtered = filter === 'All' ? images : images.filter(img => img.category === filter);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev === 0 ? filtered.length - 1 : prev - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev === filtered.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev === 0 ? filtered.length - 1 : prev - 1));
    if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev === filtered.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  if (loading) {
    return (
      <div className="py-20 bg-slate-900 min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
        <p className="text-slate-400">Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">Our Work</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Browse examples of our recent projects. From minor repairs to full renovations, 
            we take pride in delivering quality craftsmanship on every job.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                filter === cat
                  ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <ImageIcon className="w-16 h-16 text-slate-600 mb-6" />
            <h3 className="text-xl font-bold text-slate-400 mb-2">No images found</h3>
            <p className="text-slate-500">No gallery entries available for this category yet.</p>
          </div>
        )}

        {/* Gallery Grid */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={img.image_url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/600x400/1e293b/78716c?text=${encodeURIComponent(img.title)}`;
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">{img.category}</span>
                  <h3 className="text-lg font-bold text-white">{img.title}</h3>
                  <p className="text-sm text-slate-300 mt-1 line-clamp-2">{img.description}</p>
                </div>
                <div className="p-4">
                  <span className="text-xs font-bold text-amber-500/80 uppercase tracking-wider">{img.category}</span>
                  <h3 className="text-white font-bold mt-1">{img.title}</h3>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[70] bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Image */}
            <div className="relative flex-grow flex items-center justify-center bg-slate-900 rounded-3xl overflow-hidden border border-slate-700">
              <img
                src={filtered[lightboxIndex].image_url}
                alt={filtered[lightboxIndex].title}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Navigation */}
            {filtered.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-slate-900/80 hover:bg-slate-800 rounded-full text-white transition-all shadow-xl border border-slate-700"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-slate-900/80 hover:bg-slate-800 rounded-full text-white transition-all shadow-xl border border-slate-700"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Caption */}
            <div className="mt-4 text-center">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {filtered[lightboxIndex].category}
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">{filtered[lightboxIndex].title}</h2>
              <p className="text-slate-400 mt-2 max-w-2xl mx-auto">{filtered[lightboxIndex].description}</p>
              <p className="text-slate-600 text-xs mt-3">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;