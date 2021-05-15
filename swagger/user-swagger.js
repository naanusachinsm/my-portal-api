

module.exports = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'My-Portal-Apis',
        description: ''
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'Local server'
        },
        {
            url: 'https://my-portal-apis-dev.herokuapp.com/api',
            description: 'Development server'
        },
        {
            url: 'https://my-portal-apis.herokuapp.com/api',
            description: 'Production server'
        }
    ],
    security: [
        {
            ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
            }
        }
    ],
    tags: [
        {
            name: 'Users'
        },
        {
            name: 'Todos'
        },
        {
            name: 'Organizations'
        },
        {
            name: 'Locations'
        }
    ],
    paths: {
        '/allUsers': {
            get: {
                tags: ['Users'],
                description: 'Get all users',
                operationId: 'getUsers',
                parameters: [],
                responses: {
                    '200': {
                        description: 'Users were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Success'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Bad request',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/users/{id}': {
            get: {
                tags: ['Users'],
                description: 'Get user by id',
                operationId: 'getUserById',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        schema: {
                          type: 'string'
                        },
                        required: true
                    }
                ],
                responses: {
                    '200': {
                        description: 'Users were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Success'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Bad request',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ['Users'],
                description: 'Delete user by id',
                operationId: 'deleteUser',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        schema: {
                          type: 'string'
                        },
                        required: true
                    }
                ],
                responses: {
                    '200': {
                        description: 'User deleted successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Success'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Bad request',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/users': {
            post: {
                tags: ['Users'],
                description: 'Create users',
                operationId: 'createUsers',
                parameters: [],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/createUser'
                            }
                        }
                    },
                    required: true
                },
                responses: {
                    '200': {
                        description: 'New users were created'
                    },
                    '400': {
                        description: 'Bad request',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                            }
                        }
                    }
                }
            },
            get: {
                tags: ['Users'],
                description: 'Get users by filter',
                operationId: 'getUsersFilter',
                parameters: [
                    {
                        name: 'page',
                        in: 'query',
                        schema: {
                          type: 'integer',
                          default: 1
                        },
                        required: true
                    },
                    {
                        name: 'limit',
                        in: 'query',
                        schema: {
                          type: 'integer',
                          default: 5
                        },
                        required: true
                    }
                ],
                responses: {
                    '200': {
                        description: 'Users were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Success'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Bad request',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            createUser: {
                type: 'object',
                properties: {
                    firstName: {
                        type: 'string'
                    },
                    lastName: {
                        type: 'string'
                    },
                    password: {
                        type: 'string',
                    },
                    email: {
                        type: 'string'
                    }
                }
            },
            Success: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    },
                    statusCode: {
                        type: 'integer'
                    },
                    data: {
                        type: 'object',
                    }
                }
            },
            Error: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    },
                    statusCode: {
                        type: 'integer'
                    }
                }
            }
        },
        securitySchemes: {
            ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization'
            }
        }
    }
};
