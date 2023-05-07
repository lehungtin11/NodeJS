const blogRouter = require('./blog')
const siteRouter = require('./site')
const coursesRouter = require('./courses')
const loginRouter = require('./login')
const logoutRouter = require('./logout')
const registerRouter = require('./register')
const settingRouter = require('./setting')
const groupRouter = require('./groupCourses')
const notFoundRouter = require('./notFound')
const paymentRouter = require('./payment')
const manageRouter = require('./manageUser')

function route (app) {
    // MiddleWare: Get username from session and assign to res.locals
    // Then use this to render username on partails
    app.use((req, res, next) => {
        res.locals.username = req.session.username;
        res.locals.avatar = req.session.avatar;
        next()
    })
    app.use('/manage', manageRouter)
    app.use('/payment', paymentRouter)
    app.use('/setting', settingRouter)
    app.use('/logout', logoutRouter)
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/blog',blogRouter)
    app.use('/group-courses',groupRouter)   
    app.use('/courses',coursesRouter)
    app.use('/not-found',notFoundRouter)
    app.use('/:slug', (req, res, next) => {
        res.redirect('not-found')
    })
    app.use('/', siteRouter)
}

module.exports = route