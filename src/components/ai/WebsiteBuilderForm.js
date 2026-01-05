"use client";

import { useState } from "react";
import { Plus, X, Sparkles, Coffee, Zap, Heart, Star, Rocket, Users, Award, TrendingUp } from "lucide-react";
import Image from "next/image";

const INDUSTRIES = [
  { id: 'content-creator', name: 'Content Creator', icon: '🎬' },
  { id: 'local-business', name: 'Local Business', icon: '🏪' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛍️' },
  { id: 'portfolio', name: 'Portfolio', icon: '💼' },
  { id: 'professional-services', name: 'Professional Services', icon: '⚖️' },
];

const TEMPLATES = [
  { id: 'modern-minimal', name: 'Modern Minimal', color: '#000000' },
  { id: 'creative-bold', name: 'Creative Bold', color: '#9333ea' },
  { id: 'warm-inviting', name: 'Warm & Inviting', color: '#ACD9D9' },
];

const COLOR_PRESETS = [
  { name: 'Purple & Pink', primary: '#9333ea', secondary: '#FFE5E5' },
  { name: 'Teal & Coral', primary: '#06b6d4', secondary: '#fb7185' },
  { name: 'Blue & Yellow', primary: '#3b82f6', secondary: '#fbbf24' },
  { name: 'Green & Orange', primary: '#10b981', secondary: '#f97316' },
  { name: 'Black & White', primary: '#000000', secondary: '#ffffff' },
  { name: 'Custom', primary: '#000000', secondary: '#ffffff' },
];

const ICON_OPTIONS = [
  { id: 'coffee', name: 'Coffee', icon: Coffee },
  { id: 'zap', name: 'Zap', icon: Zap },
  { id: 'heart', name: 'Heart', icon: Heart },
  { id: 'star', name: 'Star', icon: Star },
  { id: 'rocket', name: 'Rocket', icon: Rocket },
  { id: 'users', name: 'Users', icon: Users },
  { id: 'award', name: 'Award', icon: Award },
  { id: 'trending', name: 'Trending', icon: TrendingUp },
];

export default function WebsiteBuilderForm({ onGenerate, isGenerating, error }) {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    targetAudience: '',
    features: [''],
    style: 'modern-minimal',
    colorPreset: 'Purple & Pink',
    primaryColor: '#9333ea',
    secondaryColor: '#FFE5E5',
    iconStyle: 'star'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty features
    const cleanedData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== '')
    };

    if (cleanedData.features.length === 0) {
      alert('Please add at least one feature or service');
      return;
    }

    onGenerate(cleanedData);
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index, value) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const handleColorPresetChange = (preset) => {
    setFormData(prev => ({ 
      ...prev, 
      colorPreset: preset.name,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl space-y-8">
        
        {/* Business Name */}
        <div>
          <label className="block text-lg font-semibold text-black mb-3">
            What&apos;s your business name? *
          </label>
          <input
            type="text"
            required
            value={formData.businessName}
            onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
            placeholder="e.g., Acme Coffee Shop"
            className="w-full px-6 py-4 rounded-full bg-[#F6F6F6] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block text-lg font-semibold text-black mb-3">
            What industry are you in? *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {INDUSTRIES.map(industry => (
              <button
                key={industry.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, industry: industry.id }))}
                className={`p-4 rounded-3xl font-medium transition-all ${
                  formData.industry === industry.id
                    ? 'bg-black text-white shadow-lg scale-105'
                    : 'bg-[#F6F6F6] text-black hover:shadow-md'
                }`}
              >
                <span className="text-2xl mb-2 block">{industry.icon}</span>
                <span className="text-sm">{industry.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-lg font-semibold text-black mb-3">
            Who&apos;s your target audience?
          </label>
          <input
            type="text"
            value={formData.targetAudience}
            onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
            placeholder="e.g., Young professionals, Coffee enthusiasts"
            className="w-full px-6 py-4 rounded-full bg-[#F6F6F6] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition"
          />
        </div>

        {/* Features/Services */}
        <div>
          <label className="block text-lg font-semibold text-black mb-3">
            What are your key features or services? *
          </label>
          <div className="space-y-3">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/smallArrowDoodle.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                  className="flex-1 px-6 py-3 rounded-full bg-[#F6F6F6] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition"
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="flex-shrink-0 p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {formData.features.length < 5 && (
            <button
              type="button"
              onClick={addFeature}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E5D4FF] text-black font-medium hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Another Feature
            </button>
          )}
        </div>

        {/* Color Scheme */}
        <div>
          <label className="block text-lg font-semibold text-black mb-3">
            Choose your color scheme *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {COLOR_PRESETS.map(preset => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleColorPresetChange(preset)}
                className={`p-4 rounded-2xl font-medium transition-all ${
                  formData.colorPreset === preset.name
                    ? 'bg-black text-white shadow-lg scale-105'
                    : 'bg-[#F6F6F6] text-black hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 justify-center">
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: preset.secondary }}
                  />
                </div>
                <span className="text-sm">{preset.name}</span>
              </button>
            ))}
          </div>
          
          {/* Custom Color Pickers */}
          {formData.colorPreset === 'Custom' && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <input
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="w-full h-12 rounded-xl cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Color
                </label>
                <input
                  type="color"
                  value={formData.secondaryColor}
                  onChange={(e) => setFormData(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="w-full h-12 rounded-xl cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Icon Style */}
        <div>
          <label className="block text-lg font-semibold text-black mb-3">
            Choose icon style *
          </label>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {ICON_OPTIONS.map(iconOption => {
              const IconComponent = iconOption.icon;
              return (
                <button
                  key={iconOption.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, iconStyle: iconOption.id }))}
                  className={`p-4 rounded-2xl font-medium transition-all ${
                    formData.iconStyle === iconOption.id
                      ? 'bg-black text-white shadow-lg scale-110'
                      : 'bg-[#F6F6F6] text-black hover:shadow-md'
                  }`}
                  title={iconOption.name}
                >
                  <IconComponent className="w-6 h-6 mx-auto" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Template Style */}
        <div>
          <label className="block text-lg font-semibold text-black mb-3">
            Choose your layout *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TEMPLATES.map(template => (
              <button
                key={template.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, style: template.id }))}
                className={`p-6 rounded-3xl font-medium transition-all ${
                  formData.style === template.id
                    ? 'bg-black text-white shadow-lg scale-105'
                    : 'bg-[#F6F6F6] text-black hover:shadow-md'
                }`}
              >
                <div 
                  className="w-full h-24 rounded-2xl mb-3"
                  style={{ backgroundColor: template.color }}
                />
                <span className="text-sm">{template.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isGenerating || !formData.businessName || !formData.industry}
          className="w-full py-4 px-8 bg-black text-white rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          {isGenerating ? 'Generating...' : 'Generate My Website'}
        </button>

        <p className="text-sm text-gray-500 text-center">
          Free tier: 1 website per month • <a href="/pricing" className="text-[#9333ea] hover:underline">Upgrade for unlimited</a>
        </p>
      </div>
    </form>
  );
}
