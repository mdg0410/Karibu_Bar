import mongoose, { Document, Schema } from 'mongoose';

export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface ISongRequest {
  song: mongoose.Types.ObjectId;
  status: 'pending' | 'played' | 'cancelled';
  requestedAt: Date;
  playedAt?: Date;
}

export interface IEstadoCuentaOrder {
  pagado: boolean;
  fechaPago?: Date;
  metodo?: string;
  referenciaPago?: string;
}

export interface IOrder extends Document {
  table: mongoose.Types.ObjectId;
  items: IOrderItem[];
  songRequests: ISongRequest[];
  status: OrderStatus;
  total: number;
  startTime: Date;
  endTime?: Date;
  servedBy: mongoose.Types.ObjectId;
  estadoCuenta?: IEstadoCuentaOrder;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'La cantidad mínima es 1']
  },
  price: {
    type: Number,
    required: true
  }
});

const SongRequestSchema = new Schema({
  song: {
    type: Schema.Types.ObjectId,
    ref: 'Song',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'played', 'cancelled'],
    default: 'pending'
  },
  requestedAt: {
    type: Date,
    default: Date.now
  },
  playedAt: {
    type: Date
  }
});

const EstadoCuentaOrderSchema = new Schema({
  pagado: {
    type: Boolean,
    default: false
  },
  fechaPago: {
    type: Date
  },
  metodo: {
    type: String,
    enum: ['efectivo', 'tarjeta', 'transferencia', 'otro']
  },
  referenciaPago: {
    type: String
  }
});

const OrderSchema = new Schema<IOrder>(
  {
    table: {
      type: Schema.Types.ObjectId,
      ref: 'Table',
      required: [true, 'La mesa es obligatoria']
    },
    items: [OrderItemSchema],
    songRequests: [SongRequestSchema],
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING
    },
    total: {
      type: Number,
      default: 0
    },
    startTime: {
      type: Date,
      default: Date.now
    },
    endTime: {
      type: Date
    },
    servedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El usuario que atiende es obligatorio']
    },
    estadoCuenta: {
      type: EstadoCuentaOrderSchema
    }
  },
  {
    timestamps: true
  }
);

// Método pre-save para calcular el total automáticamente
OrderSchema.pre<IOrder>('save', function(next) {
  if (this.items && this.items.length > 0) {
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  next();
});

export default mongoose.model<IOrder>('Order', OrderSchema);
