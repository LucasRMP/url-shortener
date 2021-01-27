import { Router } from 'express'
import UrlController from './app/controllers/UrlController'

const router = Router()

router.get('/', UrlController.index)
router.post('/', UrlController.store)
router.get('/:slug', UrlController.redirect)

export default router
