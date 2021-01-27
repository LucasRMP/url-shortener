import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
} from 'routing-controllers'

import Url from '../models/Url'

interface IUrlCreateInput {
  target: string
  slug?: string
}

@Controller()
class UrlController {
  @Get('/:slug')
  @Redirect(':url')
  async redirect(@Param('slug') slug: string) {
    const url = await Url.findOne({ slug })

    if (!url) {
      return { url: process.env.WEB_APP_URL || 'https://google.com' }
    }

    Url.findOneAndUpdate({ _id: url._id }, { $inc: { visits: 1 } })

    return { url: url.target }
  }

  @Post()
  async store(@Body() body: IUrlCreateInput) {
    const url = await Url.create(body)

    return { url: url.toObject() }
  }
}

export default UrlController
