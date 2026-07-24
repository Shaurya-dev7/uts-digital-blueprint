import { catalogBrands } from '../../data/catalogBrands';

export const mockBrands = catalogBrands;

export function getBrandBySlug(slug: string) {
  return mockBrands.find(brand => brand.slug === slug);
}
