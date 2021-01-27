import mongoose, { model, Schema } from 'mongoose'

export interface IUrl extends mongoose.Document {
  slug: string
  target: string
  visits: number
}

const UrlSchema: Schema = new Schema({
  slug: { type: String, required: true },
  target: { type: String, required: true },
  visits: { type: Number, default: 0 },
})

export default model<IUrl>('Url', UrlSchema, 'url')
