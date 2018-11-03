import MarkdownIt from 'markdown-it'
import implicitFigures from 'markdown-it-implicit-figures'

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typography: true
});

md.use(implicitFigures);

export default md
