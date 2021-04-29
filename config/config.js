const config = {
    'mongodbURL': 'mongodb+srv://admin:admin123@cobras.lb0ei.mongodb.net/sunny?retryWrites=true&w=majority',
    'corsWhiteList': [
        "http://localhost:3000",
        "https://my-portal-ui-prod.herokuapp.com",
        "https://my-portal-ui-dev.herokuapp.com"
    ]
};

module.exports = config;
