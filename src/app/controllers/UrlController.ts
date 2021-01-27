import { RequestHandler } from 'express'
import Url from '../models/Url'

interface IUrlCreateInput {
  target: string
  slug?: string
}

class UrlController {
  index: RequestHandler = (_, res) => {
    return res.json({
      ok: true,
    })
  }

  redirect: RequestHandler = async (req, res) => {
    const { slug } = req.params

    const url = await Url.findOne({ slug })

    if (!url) {
      return { url: process.env.WEB_APP_URL || 'https://google.com' }
    }

    Url.findOneAndUpdate({ _id: url._id }, { $inc: { visits: 1 } })

    return res.redirect(url.target)
  }

  store: RequestHandler = async (req, res) => {
    const body: IUrlCreateInput = req.body
    const url = await Url.create(body as any)

    return res.status(201).json(url)
  }
}

export default new UrlController()
