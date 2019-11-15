import React from 'react';
import Helment from 'react-helmet';
import PropTypes from 'prop-types';
import Document , { Main , NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class Mydocument extends Document {
    static getInitialProps(context){
        const sheet = new ServerStyleSheet();
        const page = context.renderPage( 
            (App) => (props) => sheet.collectStyles( <App {...props}/>));
        const styleTags = sheet.getStyleElement();
        return { ...page , helmet: Helment.renderStatic() , styleTags};
    }
    render() {
        const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
        const htmlAttrs = htmlAttributes.toComponent();
        const bodyAttrs = bodyAttributes.toComponent();

       return (
        <html {...htmlAttrs}>
        <head>
             {this.props.styleTags}
             {Object.values(helmet).map( el => el.toComponent())}
        </head>
        <body {...bodyAttrs}>
             <Main/>
             { process.env.NODE_ENV === 'production' &&
                <script crossorigin="anonymous" src="https://polyfill.io/v3/polyfill.min.js?features=es5%2Ces6%2Ces7%2CNodeList.prototype.%40%40iterator%2CNodeList.prototype.forEach"></script>
              }
             <NextScript/>
        </body>
    </html>
       )
    }
}
Mydocument.propTypes={
    helmet: PropTypes.object.isrequired,
    styleTags: PropTypes.string.isRequired,
}

export default Mydocument;