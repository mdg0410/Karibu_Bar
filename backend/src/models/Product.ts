import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  nombre: string;
  categoria: string;
  precio: number;
  imagenURL: string;
  cantidad: number;
  estado: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
      unique: true
    },
    categoria: {
      type: String,
      required: [true, 'La categoría es obligatoria']
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo']
    },
    imagenURL: {
      type: String
    },
    cantidad: {
      type: Number,
      default: 0,
      min: 0
    },
    estado: {
      type: String,
      default: 'disponible'
    }
  },
  {
    timestamps: true
  }
);

// Índices para búsqueda y filtrado
ProductSchema.index({ nombre: 'text' });
ProductSchema.index({ categoria: 1 });
ProductSchema.index({ estado: 1 });

export default mongoose.model<IProduct>('Product', ProductSchema);
