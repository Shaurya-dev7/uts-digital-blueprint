import { catalogProducts } from './catalogProducts';
export const mockProducts = catalogProducts;
export function getProductBySlug(slug: string) {
  return mockProducts.find(product => product.slug === slug);
}
