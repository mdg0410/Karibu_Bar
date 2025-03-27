import mongoose, { Document, Schema } from 'mongoose';

export interface IEstadoMesa {
  idEstadoMesa: number;
  nombreEstado: string;
}

export interface IEstadoCancion {
  idEstadoCancion: number;
  nombreEstado: string;
}

export interface ICancionMesa {
  cancion: string;
  estadoCancion: IEstadoCancion;
  fechaRegistro: Date;
  estadoEspecial: number;
}

export interface IProductoPedido {
  idProducto: number;
  nombre: string;
  categoria: string;
  precio: number;
  imagenURL: string;
}

export interface ITrabajador {
  idUsuario: number;
  nombre: string;
}

export interface IEstadoPedido {
  idEstadoPedido: number;
  nombreEstado: string;
}

export interface IPedidoMesa {
  producto: IProductoPedido;
  cantidad: number;
  estadoPedido: IEstadoPedido;
  trabajador: ITrabajador;
  detalleAdicional: string;
  fecha: Date;
  codigoPedido: string;
}

export interface ITotalAcumulado {
  total: number;
  fecha: Date;
}

export interface IEstadoCuenta {
  pagado: boolean;
  fechaPago?: Date;
  metodo?: string;
  montoTotal: number;
}

export interface ITable extends Document {
  numeroMesa: number;
  capacidad: number;
  estadoEspecial: boolean;
  estadoMesa: IEstadoMesa;
  fechaCreacion: Date;
  credencial: string;
  canciones: ICancionMesa[];
  pedidos: IPedidoMesa[];
  totalAcumulado: ITotalAcumulado;
  estadoCuenta?: IEstadoCuenta;
}

const EstadoMesaSchema = new Schema({
  idEstadoMesa: {
    type: Number,
    required: true
  },
  nombreEstado: {
    type: String,
    required: true
  }
});

const EstadoCancionSchema = new Schema({
  idEstadoCancion: {
    type: Number,
    required: true
  },
  nombreEstado: {
    type: String,
    required: true
  }
});

const CancionMesaSchema = new Schema({
  cancion: {
    type: String,
    required: true
  },
  estadoCancion: {
    type: EstadoCancionSchema,
    required: true
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  },
  estadoEspecial: {
    type: Number,
    default: 0
  }
});

const ProductoPedidoSchema = new Schema({
  idProducto: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  imagenURL: {
    type: String
  }
});

const TrabajadorSchema = new Schema({
  idUsuario: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  }
});

const EstadoPedidoSchema = new Schema({
  idEstadoPedido: {
    type: Number,
    required: true
  },
  nombreEstado: {
    type: String,
    required: true
  }
});

const PedidoMesaSchema = new Schema({
  producto: {
    type: ProductoPedidoSchema,
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1
  },
  estadoPedido: {
    type: EstadoPedidoSchema,
    required: true
  },
  trabajador: {
    type: TrabajadorSchema,
    required: true
  },
  detalleAdicional: {
    type: String
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  codigoPedido: {
    type: String,
    required: true
  }
});

const TotalAcumuladoSchema = new Schema({
  total: {
    type: Number,
    required: true,
    default: 0
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

const EstadoCuentaSchema = new Schema({
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
  montoTotal: {
    type: Number,
    required: true,
    default: 0
  }
});

const TableSchema = new Schema<ITable>(
  {
    numeroMesa: {
      type: Number,
      required: [true, 'El número de mesa es obligatorio'],
      unique: true
    },
    capacidad: {
      type: Number,
      required: [true, 'La capacidad de la mesa es obligatoria'],
      min: [1, 'La capacidad mínima es 1']
    },
    estadoEspecial: {
      type: Boolean,
      default: false
    },
    estadoMesa: {
      type: EstadoMesaSchema,
      required: true
    },
    fechaCreacion: {
      type: Date,
      default: Date.now
    },
    credencial: {
      type: String
    },
    canciones: {
      type: [CancionMesaSchema],
      default: []
    },
    pedidos: {
      type: [PedidoMesaSchema],
      default: []
    },
    totalAcumulado: {
      type: TotalAcumuladoSchema,
      default: () => ({})
    },
    estadoCuenta: {
      type: EstadoCuentaSchema
    }
  },
  {
    timestamps: false
  }
);

// Índices para búsqueda
TableSchema.index({ numeroMesa: 1 }, { unique: true });
TableSchema.index({ 'estadoMesa.nombreEstado': 1 });

export default mongoose.model<ITable>('Table', TableSchema);
