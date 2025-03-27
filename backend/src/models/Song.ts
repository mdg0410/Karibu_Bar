import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artist: string;
  code: number;
  genre: string[];
  language: string;
  indexed: boolean;
  popularity: number;
  createdAt: Date;
  updatedAt: Date;
}

const SongSchema = new Schema<ISong>(
  {
    title: {
      type: String,
      required: [true, 'El título de la canción es obligatorio'],
      trim: true,
      index: true
    },
    artist: {
      type: String,
      required: [true, 'El artista es obligatorio'],
      trim: true,
      index: true
    },
    code: {
      type: Number,
      required: [true, 'El código de la canción es obligatorio'],
      unique: true
    },
    genre: {
      type: [String],
      required: [true, 'Al menos un género es obligatorio'],
      index: true
    },
    language: {
      type: String,
      required: [true, 'El idioma es obligatorio'],
      index: true
    },
    indexed: {
      type: Boolean,
      default: true
    },
    popularity: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },
  {
    timestamps: true
  }
);

// Configurar índices para búsqueda por texto
SongSchema.index({ title: 'text', artist: 'text' });
SongSchema.index({ code: 1 }, { unique: true });

export default mongoose.model<ISong>('Song', SongSchema);
