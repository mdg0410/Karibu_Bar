import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IRol {
  idRol: number;
  nombreRol: string;
}

export interface IUser extends Document {
  nombre: string;
  rol: IRol;
  username: string;
  email: string;
  passwordHash: string;
  numeroTelefono: string;
  direccion: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
}

const RolSchema = new Schema({
  idRol: {
    type: Number,
    required: true
  },
  nombreRol: {
    type: String,
    required: true
  }
});

const UserSchema = new Schema<IUser>(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      maxlength: [50, 'El nombre no puede tener más de 50 caracteres']
    },
    rol: {
      type: RolSchema,
      required: true
    },
    username: {
      type: String,
      required: [true, 'El nombre de usuario es obligatorio'],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Por favor ingrese un correo electrónico válido'
      ]
    },
    passwordHash: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
      select: false
    },
    numeroTelefono: {
      type: String
    },
    direccion: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Cifrar contraseña antes de guardar
UserSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('passwordHash')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

// Generar token JWT
UserSchema.methods.generateAuthToken = function(): string {
  return jwt.sign(
    { id: this._id, rol: this.rol },
    process.env.JWT_SECRET || 'jwt_secret',
    { expiresIn: process.env.JWT_EXPIRE || '30d' } as jwt.SignOptions
  );
};

// Índices para búsqueda
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ 'rol.nombreRol': 1 });

export default mongoose.model<IUser>('User', UserSchema);
