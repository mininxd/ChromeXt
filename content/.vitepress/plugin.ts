import markdownHook from '../../server/markdownHook'
import { VitePWA } from 'vite-plugin-pwa'
import { rssPlugin } from "vite-plugin-rss";
import blogList from '../../server/data/blog.json'
import writingList from '../../server/data/writing.json'
import essaiList from '../../server/data/essai.json'

const katex_tags = ['math', 'annotation', 'semantics', 'mtext', 'mn', 'mo', 'mi', 'mspace', 'mover', 'munder', 'munderover', 'msup', 'msub', 'msubsup', 'mfrac', 'mroot', 'msqrt', 'mtable', 'mtr', 'mtd', 'mlabeledtr', 'mrow', 'menclose', 'mstyle', 'mpadded', 'mphantom', 'mglyph', 'svg', 'line', 'path', 'eq', 'eqn'];

const vue = {
	"template": {
		compilerOptions: {
			isCustomElement:
				(tag) => katex_tags.includes(tag)
		}
	}
}

const pwa = () => {
	return VitePWA({
		outDir: '.vitepress/dist',
		registerType: 'autoUpdate',
		injectRegister: 'script',
		includeAssets: ['favicon.ico', 'img/icon-180.png', 'img/masked-icon.svg'],
		manifest: {
			name: "Jianyu MA's website",
			short_name: 'Jianyu',
			description: 'Hope you find me interesting',
			theme_color: '#ffffff',
			icons: [
				{
					src: 'img/icon-192x192.png',
					sizes: '192x192',
					type: 'image/png'
				},
				{
					src: 'img/icon-512x512.png',
					sizes: '512x512',
					type: 'image/png'
				}
			]
		}
	})
}

function rss(blog) {
	blog.title = blog.text;
	blog.link = 'https://jingmatrix.github.io' + blog.link;
	delete blog.text;
	return blog;
}

const vite = {
	plugins: [
		pwa(),
		rssPlugin({
			mode: "define",
			fileName: "feed-en.xml",
			channel: {
				title: "English RSS Feed for Jianyu MA's blog",
				link: "https://jingmatrix.github.io",
				description: "Update for blogs English",
			},
			items: writingList.map(rss)
		}),
		rssPlugin({
			mode: "define",
			fileName: "feed-fr.xml",
			channel: {
				title: "Flux RSS en Français pour le blog de Jianyu MA",
				link: "https://jingmatrix.github.io",
				description: "Mis à jour des blogs en Français",
			},
			items: essaiList.map(rss)
		}),
		rssPlugin({
			mode: "define",
			fileName: "feed-zh.xml",
			channel: {
				title: "马健宇中文博客 RSS",
				link: "https://jingmatrix.github.io",
				description: "中文博客的更新",
			},
			items: blogList.map(rss)
		}),
	]
}


const markdown = {
	theme: { dark: 'dark-plus', light: 'nord' },
	config: (md) => {
		md.use(markdownHook)
	}
}

export { blogList, writingList, essaiList, vue, vite, markdown }
