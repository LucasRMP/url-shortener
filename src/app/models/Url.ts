import { createSchema, Type, typedModel } from 'ts-mongoose'

const UrlSchema = createSchema(
  {
    slug: Type.string(),
    target: Type.string(),
    visits: Type.number({ default: 0 }),
  },
  { timestamps: { createdAt: true } }
)

const Url = typedModel('Url', UrlSchema, 'url')
export default Url
