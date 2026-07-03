import React from 'react';
import Hero from '../Hero/Hero';
import CategoryBar from '../CategoryBar/CategoryBar';
import SkillCardGrid from '../SkillCardGrid/SkillCardGrid';
import CtaBanner from '../CtaBanner/CtaBanner';

export default function HomePage({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedSort, 
  setSelectedSort, 
  onViewDetails 
}) {
  return (
    <>
      <Hero />
      <CategoryBar 
        onCategoryChange={setSelectedCategory} 
        onSortChange={setSelectedSort} 
      />
      <SkillCardGrid 
        selectedCategory={selectedCategory} 
        selectedSort={selectedSort} 
        onViewDetails={onViewDetails} 
      />
      <CtaBanner />
    </>
  );
}
