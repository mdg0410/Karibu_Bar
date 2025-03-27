import fs from 'fs';
import csv from 'csv-parser';
import { Song, Product } from '../models';

export class CsvImportService {
  /**
   * Importar canciones desde un archivo CSV
   */
  static async importSongs(filePath: string): Promise<{ success: boolean; imported: number; errors: string[] }> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      const errors: string[] = [];
      let imported = 0;

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          try {
            for (const row of results) {
              try {
                // Validar y formatear los datos según el nuevo modelo
                const songData = {
                  title: row.title?.trim(),
                  artist: row.artist?.trim(),
                  code: parseInt(row.code) || 0,
                  genre: row.genre?.split(',').map((g: string) => g.trim()) || [],
                  language: row.language?.trim(),
                  indexed: row.indexed?.toLowerCase() === 'true',
                  popularity: parseInt(row.popularity) || 0
                };

                // Verificar datos obligatorios
                if (!songData.title || !songData.artist || !songData.code) {
                  errors.push(`Fila incompleta: ${JSON.stringify(row)}`);
                  continue;
                }

                // Crear o actualizar canción
                await Song.findOneAndUpdate(
                  { code: songData.code },
                  songData,
                  { upsert: true, new: true }
                );
                
                imported++;
              } catch (error) {
                errors.push(`Error al procesar fila ${JSON.stringify(row)}: ${error}`);
              }
            }

            // Eliminar el archivo temporal
            fs.unlink(filePath, (err) => {
              if (err) console.error(`Error al eliminar archivo temporal: ${err}`);
            });

            resolve({ success: true, imported, errors });
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  /**
   * Importar productos desde un archivo CSV
   */
  static async importProducts(filePath: string): Promise<{ success: boolean; imported: number; errors: string[] }> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      const errors: string[] = [];
      let imported = 0;

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          try {
            for (const row of results) {
              try {
                // Validar y formatear los datos según el nuevo modelo
                const productData = {
                  nombre: row.nombre?.trim(),
                  categoria: row.categoria?.trim(),
                  precio: parseFloat(row.precio) || 0,
                  imagenURL: row.imagenURL?.trim() || undefined,
                  cantidad: parseInt(row.cantidad) || 0,
                  estado: row.estado?.trim() || 'disponible'
                };

                // Verificar datos obligatorios
                if (!productData.nombre || !productData.precio || !productData.categoria) {
                  errors.push(`Fila incompleta: ${JSON.stringify(row)}`);
                  continue;
                }

                // Crear o actualizar producto
                await Product.findOneAndUpdate(
                  { nombre: productData.nombre },
                  productData,
                  { upsert: true, new: true }
                );
                
                imported++;
              } catch (error) {
                errors.push(`Error al procesar fila ${JSON.stringify(row)}: ${error}`);
              }
            }

            // Eliminar el archivo temporal
            fs.unlink(filePath, (err) => {
              if (err) console.error(`Error al eliminar archivo temporal: ${err}`);
            });

            resolve({ success: true, imported, errors });
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
