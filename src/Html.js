import React, {Component} from 'react'

const googleTagManagerId = '';

export default class extends Component {
    render() {
        const {
            styles,
            title,
            children,
            metadata: {
                socialImage,
                seoDescription: description = '',
                seoKeywords: keywords = '',
                favicon
            } = {},
            scripts
        } = this.props;

        return <html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
                <meta name="HandheldFriendly" content="true"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="apple-mobile-web-app-status-bar-style" content="white-translucent"/>

                <meta name="format-detection" content="telephone=no"/>
                <meta name="format-detection" content="address=no"/>

                {title && <title>{title}</title>}
                {description && <meta name="description" content={description}/>}
                {keywords && <meta name="keywords" content={keywords}/>}

                {title && <meta property="og:title" content={title}/>}
                {description && <meta property="og:description" content={description}/>}

                {socialImage && <meta property="og:image" content={`http:${socialImage.url}`}/>}
                {socialImage && <meta property="og:image:secure_url" content={`https:${socialImage.url}`}/>}
                {socialImage && <meta property="og:image:type" content={socialImage.contentType}/>}
                {socialImage && <meta property="og:image:width" content={socialImage.details.image.width}/>}
                {socialImage && <meta property="og:image:height" content={socialImage.details.image.height}/>}

                <meta name="twitter:card" content="summary_large_image"/>
                {title && <meta name="twitter:title" content={title}/>}
                {description && <meta name="twitter:description" content={description}/>}
                {socialImage && <meta name="twitter:image" content={socialImage.url}/>}

                {scripts && scripts.map(script => <link
                    key={script}
                    rel="preload"
                    href={script}
                    as="script"
                />)}

                {favicon && [
                    [57, 'apple-touch-icon'],
                    [60, 'apple-touch-icon'],
                    [72, 'apple-touch-icon'],
                    [76, 'apple-touch-icon'],
                    [114, 'apple-touch-icon'],
                    [120, 'apple-touch-icon'],
                    [144, 'apple-touch-icon'],
                    [152, 'apple-touch-icon'],
                    [180, 'apple-touch-icon'],
                    [32, 'icon', 'image/png'],
                    [194, 'icon', 'image/png'],
                    [96, 'icon', 'image/png'],
                    [192, 'icon', 'image/png'],
                    [16, 'icon', 'image/png']
                ].map(([size, rel, type]) =>
                    favicon[`x${size}`] &&
                        <link
                            key={size}
                            rel={rel}
                            sizes={`${size}x${size}`}
                            type={type}
                            href={favicon[`x${size}`].url}
                        />
                )}

                <style id="css" dangerouslySetInnerHTML={{__html: styles.join('')}}/>

                {googleTagManagerId && <script dangerouslySetInnerHTML={{__html:
                        `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${googleTagManagerId}');`
                }}/>}
            </head>
            <body >
                {googleTagManagerId && <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
                        style={{
                            display: 'none',
                            height: 0,
                            visibility: 'hidden',
                            width: 0
                        }}
                    />
                </noscript>}

                <div id="app" dangerouslySetInnerHTML={{__html: children}}/>

                {scripts && scripts.map(script => <script
                    key={script}
                    src={script}
                />)}
            </body>
        </html>
    }
}
