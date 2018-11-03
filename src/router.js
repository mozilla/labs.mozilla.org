import React, {Component} from 'react'
import {createClient} from 'contentful'

export const {getEntries} = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.SPACE_API_KEY
});

const componentsList = Object.values(process.env.COMPONENTS_LIST);

function asyncComponent(module) {
    return class extends Component {
        state = {};

        async componentDidMount() {
            this.setState(await module)
        }

        render() {
            const {default: Component} = this.state;

            return Component ?
                <Component {...this.props}/> :
                null
        }
    }
}

async function collectData(data, pathname, query) {
    if(data instanceof Array) {
        return await Promise.all(data.map(data => collectData(data, pathname, query)))
    }

    if(!data || typeof data !== 'object' || !Reflect.has(data, 'fields')) {
        return data
    }

    const {
        fields,
        sys: {
            id,
            contentType: {
                sys: {
                    id: contentType
                }
            } = {
                sys: {}
            }
        }
    } = data;

    data = {id};

    await Object
        .keys(fields)
        .reduce(async(prev, key) => {
            let current;

            prev = await prev;

            if(key === 'file') {
                current = fields[key]
            } else {
                current = {
                    [key]: await collectData(fields[key], pathname, query)
                }
            }

            return Object.assign(prev, current)
        }, data);

    if(contentType) {
        try {
            if(componentsList.indexOf(contentType) < 0) {
                throw Error('component not available')
            }

            const module = await import(`./components/${contentType}`);
            const Component = process.env.BROWSER ?
                asyncComponent(module) :
                (await module).default;

            data.location = {
                pathname,
                query
            };

            data = [Component, data]
        } catch(err) {
            data.contentType = contentType
        }
    }

    return data
}

export default async(pathname, query) => {
    const {items: [data]} = await getEntries({
        content_type: 'page',
        limit: 1,
        include: 4,
        'fields.pathname': pathname
    });

    const Page = await collectData(data, pathname, query);

    if(!Page) {
        const error = new Error('Page not found');

        error.status = 404;

        throw error
    }

    return Page
}
