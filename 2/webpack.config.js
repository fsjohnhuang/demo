var path = require("path")

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "src/core.ts"),
    output: {
	path: path.join(__dirname, "public"),
	filename: "bundle.js"
    },

    devtool: "eval-source-map",

    devServer: {
	contentBase: path.join(__dirname, "public")
    },
    
    module: {
	rules: [{
	    test: /\.tsx?$/,
	    use: "ts-loader",
	    exclude: /node_modules/
	}, {
	    test: /\.css$/,
	    use: [{
		loader: "style-loader"
	    }, {
		loader: "css-loader"
	    }, {
		loader: "postcss-loader",
		options: {
		    plugins: loader => [
			require("autoprefixer")()
		    ]
		}
	    }]
	}]
    },
    resolve: {
	extensions: [".ts", ".tsx", ".js"]
    }
}
