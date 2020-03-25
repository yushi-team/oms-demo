import './less/index.less'
const req = require.context('./svgs', false, /\.svg$/)
req.keys().map(req)
