import mongoose from 'mongoose';
import { Song, ISong, Product, IProduct } from '../models';
import { PipelineStage } from 'mongoose';

export class AtlasSearchService {
  /**
   * Buscar canciones por texto usando Atlas Search
   */
  static async searchSongs(query: string, limit: number = 10, page: number = 1): Promise<{ songs: ISong[]; total: number; page: number; pages: number }> {
    const searchPipeline: PipelineStage[] = [
      {
        $search: {
          index: 'songs_search',
          text: {
            query,
            path: ['title', 'artist'],
            fuzzy: {
              maxEdits: 1,
              prefixLength: 2
            }
          }
        }
      } as PipelineStage,
      {
        $addFields: {
          score: { $meta: 'searchScore' }
        }
      } as PipelineStage,
      {
        $sort: { score: -1 }
      } as PipelineStage,
      {
        $facet: {
          metadata: [
            { $count: 'total' } as PipelineStage,
            { 
              $addFields: { 
                page, 
                pages: { $ceil: { $divide: ['$total', limit] } } 
              } 
            } as PipelineStage
          ],
          songs: [
            { $skip: (page - 1) * limit } as PipelineStage,
            { $limit: limit } as PipelineStage
          ]
        }
      } as PipelineStage
    ];

    const result = await Song.aggregate(searchPipeline).exec();
    
    const metadata = result[0]?.metadata[0] || { total: 0, page, pages: 0 };
    
    return {
      songs: result[0]?.songs || [],
      total: metadata.total,
      page: metadata.page,
      pages: metadata.pages
    };
  }

  /**
   * Filtrar canciones por género y/o idioma usando Atlas Search
   */
  static async filterSongs(filters: { genres?: string[]; languages?: string[] }, limit: number = 10, page: number = 1): Promise<{ songs: ISong[]; total: number; page: number; pages: number }> {
    const filterCriteria: any = {};

    if (filters.genres && filters.genres.length > 0) {
      filterCriteria.genre = { $in: filters.genres };
    }

    if (filters.languages && filters.languages.length > 0) {
      filterCriteria.language = { $in: filters.languages };
    }

    const totalSongs = await Song.countDocuments(filterCriteria);
    const totalPages = Math.ceil(totalSongs / limit);

    const songs = await Song.find(filterCriteria)
      .sort({ popularity: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      songs,
      total: totalSongs,
      page,
      pages: totalPages
    };
  }

  /**
   * Buscar productos por texto usando Atlas Search
   */
  static async searchProducts(query: string, limit: number = 10, page: number = 1): Promise<{ products: IProduct[]; total: number; page: number; pages: number }> {
    const searchPipeline: PipelineStage[] = [
      {
        $search: {
          index: 'products_search',
          text: {
            query,
            path: ['nombre', 'categoria'],
            fuzzy: {
              maxEdits: 1,
              prefixLength: 2
            }
          }
        }
      } as PipelineStage,
      {
        $match: { estado: 'disponible' }
      } as PipelineStage,
      {
        $addFields: {
          score: { $meta: 'searchScore' }
        }
      } as PipelineStage,
      {
        $sort: { score: -1 }
      } as PipelineStage,
      {
        $facet: {
          metadata: [
            { $count: 'total' } as PipelineStage,
            { 
              $addFields: { 
                page, 
                pages: { $ceil: { $divide: ['$total', limit] } } 
              } 
            } as PipelineStage
          ],
          products: [
            { $skip: (page - 1) * limit } as PipelineStage,
            { $limit: limit } as PipelineStage
          ]
        }
      } as PipelineStage
    ];

    const result = await Product.aggregate(searchPipeline).exec();
    
    const metadata = result[0]?.metadata[0] || { total: 0, page, pages: 0 };
    
    return {
      products: result[0]?.products || [],
      total: metadata.total,
      page: metadata.page,
      pages: metadata.pages
    };
  }
}
