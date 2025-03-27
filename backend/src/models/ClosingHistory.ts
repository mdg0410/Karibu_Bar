import mongoose, { Document, Schema } from 'mongoose';

export interface IUsuarioCierre {
  idUsuario: number;
  nombre: string;
}

export interface IClosingHistory extends Document {
  fechaCierre: Date;
  totalGeneral: number;
  comentarios: string;
  usuario: IUsuarioCierre;
}

const UsuarioCierreSchema = new Schema({
  idUsuario: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  }
});

const ClosingHistorySchema = new Schema<IClosingHistory>(
  {
    fechaCierre: {
      type: Date,
      required: true,
      default: Date.now
    },
    totalGeneral: {
      type: Number,
      required: true,
      min: 0
    },
    comentarios: {
      type: String
    },
    usuario: {
      type: UsuarioCierreSchema,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Índices para búsqueda por fechas
ClosingHistorySchema.index({ fechaCierre: -1 });

export default mongoose.model<IClosingHistory>('ClosingHistory', ClosingHistorySchema);
