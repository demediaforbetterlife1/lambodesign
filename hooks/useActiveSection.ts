'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseActiveSectionOptions {
  sectionIds: string[];
  threshold?: number; // Viewport percentage to consider "active" (0-1, default: 0.5)
  rootMargin?: string; // Intersection observer root margin
}

export interface ActiveSectionState {
  activeIndex: number;
  activeSectionId: string | null;
  visibleSections: Set<string>;
}

/**
 * Determine active section index from scroll position
 * Property 4: Active section detection returns valid index
 * @param sectionCount - Total number of sections
 * @param visibilityMap - Map of section indices to their visibility ratios
 * @returns Valid index between 0 and sectionCount - 1
 */
export function determineActiveSection(
  sectionCount: number,
  visibilityMap: Map<number, number>
): number {
  if (sectionCount <= 0) return 0;
  
  let maxVisibility = 0;
  let activeIndex = 0;
  
  visibilityMap.forEach((visibility, index) => {
    if (visibility > maxVisibility) {
      maxVisibility = visibility;
      activeIndex = index;
    }
  });
  
  // Ensure index is within bounds
  return Math.max(0, Math.min(sectionCount - 1, activeIndex));
}

/**
 * Hook to detect which section is currently most visible in the viewport
 * Requirements: 5.2 - Section indicator highlighting
 */
export function useActiveSection(options: UseActiveSectionOptions): ActiveSectionState {
  const { sectionIds, threshold = 0.5, rootMargin = '0px' } = options;
  
  const [state, setState] = useState<ActiveSectionState>({
    activeIndex: 0,
    activeSectionId: sectionIds[0] || null,
    visibleSections: new Set(),
  });
  
  const visibilityMapRef = useRef<Map<number, number>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const updateActiveSection = useCallback(() => {
    const activeIndex = determineActiveSection(sectionIds.length, visibilityMapRef.current);
    const visibleSections = new Set<string>();
    
    visibilityMapRef.current.forEach((visibility, index) => {
      if (visibility > 0 && sectionIds[index]) {
        visibleSections.add(sectionIds[index]);
      }
    });
    
    setState({
      activeIndex,
      activeSectionId: sectionIds[activeIndex] || null,
      visibleSections,
    });
  }, [sectionIds]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          const index = sectionIds.indexOf(sectionId);
          
          if (index !== -1) {
            visibilityMapRef.current.set(index, entry.intersectionRatio);
          }
        });
        
        updateActiveSection();
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin,
      }
    );
    
    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds, rootMargin, updateActiveSection]);

  return state;
}

export default useActiveSection;
