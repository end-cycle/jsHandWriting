module.exports = function (content) {
    const schema = {
        type: 'object',
        author: {
            type: 'string',
        },
        email: {
            type: 'string'
        }
    }

    const options = this.getOptions(schema) || {}
    const { author = 'null', email = 'null' } = options
    const newContent = `
    console.log("Author:${author},Email:${email}");
    ${content}
    `
    console.log('---------------------', content, '--------------------', newContent);

    return newContent;
}
