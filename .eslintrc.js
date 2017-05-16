module.exports = {
	"extends": "google",
	"parserOptions": {
		"sourceType": "module",
    "ecmaVersion": 6,
		"ecmaFeatures": {
			"modules": true,
			"spread": true,
			"restParams": true,
			"jsx": true
		}
	},
	"rules": {
		"padded-blocks": [1, "never"],
		"require-jsdoc": ["error", {
			"require": {
				"FunctionDeclaration": false,
				"MethodDefinition": false,
				"ClassDeclaration": false,
				"ArrowFunctionExpression": false
			}
		}],
		"max-len": ["error", 90]
	}
}
