if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = require('./app');

app.listen(app.get('port'), () => {
    console.log('server online in port ', app.get('port'));
})