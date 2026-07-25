import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import postcss from "postcss";
import ts from "typescript";

const root = process.cwd();
const auditFile = path.resolve(process.argv[1]);
const allowedCss = path.normalize("apps/web/src/styles/global.css");
const ignoredDirectories = new Set([
	".alchemy",
	".codex-logs",
	".git",
	".output",
	".tanstack",
	".turbo",
	"dist",
	"node_modules",
]);
const sourceExtensions = new Set([
	".cjs",
	".html",
	".js",
	".jsx",
	".mjs",
	".ts",
	".tsx",
]);
const semanticClassPattern =
	/^(?:about-|article-|boot-seq$|btn-|cap-|capability-ribbon|chip$|contact-ghost$|cta-|decision-|decor-|drift-graph$|experience-item$|grain$|handoff-|hero-|hud-|human-loop|is-(?:active|dark|on-dark|visible)$|label-|link-saver-|live-dot|location-status$|marquee-|motion-|pill-|portfolio-shell$|preloader|product-|project-|reveal-grid$|section-(?:head|pad|tag|tag-num|tag-right)$|signal-|site-header$|status-dot$|story-tab|target-|tick(?:-blink)?$|tk-|uptime-|why-|workspace-|workstation$)/;
const cssInJsPattern =
	/(?:styled-components|@emotion\/|@stitches\/|linaria|vanilla-extract)/;
const embeddedStylePattern = /<sty[l]e(?:\s|>)/;
const cssModulePattern = /\.module\.css(?:\?|["'])/;
const failures = [];

function relative(file) {
	return path.relative(root, file).split(path.sep).join("/");
}

function walk(directory, files = []) {
	for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
		if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;

		const absolute = path.join(directory, entry.name);
		if (entry.isDirectory()) walk(absolute, files);
		else files.push(absolute);
	}

	return files;
}

function fail(file, message) {
	failures.push(`${relative(file)}: ${message}`);
}

function classTokens(value) {
	return value
		.split(/\s+/)
		.map((token) => token.trim())
		.filter(Boolean);
}

function inspectJsx(file, source) {
	const sourceFile = ts.createSourceFile(
		file,
		source,
		ts.ScriptTarget.Latest,
		true,
		file.endsWith(".tsx") || file.endsWith(".jsx")
			? ts.ScriptKind.TSX
			: ts.ScriptKind.TS,
	);

	function inspectClassExpression(expression) {
		if (ts.isTemplateExpression(expression)) {
			fail(
				file,
				"dynamic className template detected; map state to complete literal utilities",
			);
		}

		if (
			ts.isStringLiteral(expression) ||
			ts.isNoSubstitutionTemplateLiteral(expression)
		) {
			for (const token of classTokens(expression.text)) {
				if (!token.includes(":") && semanticClassPattern.test(token)) {
					fail(file, `semantic styling class remains: ${token}`);
				}
			}
		}
	}

	function visit(node) {
		if (
			ts.isJsxElement(node) &&
			node.openingElement.tagName.getText() === "style"
		) {
			fail(file, "embedded style element remains");
		}

		if (ts.isJsxAttribute(node)) {
			const attribute = node.name.getText();

			if (attribute === "className" && node.initializer) {
				if (ts.isStringLiteral(node.initializer)) {
					for (const token of classTokens(node.initializer.text)) {
						if (!token.includes(":") && semanticClassPattern.test(token)) {
							fail(file, `semantic styling class remains: ${token}`);
						}
					}
				} else if (
					ts.isJsxExpression(node.initializer) &&
					node.initializer.expression
				) {
					const expression = node.initializer.expression;
					inspectClassExpression(expression);

					function inspectNested(candidate) {
						if (
							ts.isStringLiteral(candidate) ||
							ts.isNoSubstitutionTemplateLiteral(candidate) ||
							ts.isTemplateExpression(candidate)
						) {
							inspectClassExpression(candidate);
						}
						ts.forEachChild(candidate, inspectNested);
					}

					ts.forEachChild(expression, inspectNested);
				}
			}

			if (
				attribute === "style" &&
				ts.isJsxExpression(node.initializer) &&
				node.initializer.expression
			) {
				const expression = node.initializer.expression;

				if (!ts.isObjectLiteralExpression(expression)) {
					fail(file, "style prop must be a documented CSS-variable object");
				} else {
					for (const property of expression.properties) {
						if (!ts.isPropertyAssignment(property)) {
							fail(file, "style prop contains a non-property assignment");
							continue;
						}

						const name = property.name;
						const propertyName =
							ts.isStringLiteral(name) ||
							ts.isNoSubstitutionTemplateLiteral(name)
								? name.text
								: ts.isIdentifier(name)
									? name.text
									: "";

						if (!propertyName.startsWith("--")) {
							fail(
								file,
								`static/non-variable style prop remains: ${propertyName || property.getText()}`,
							);
						}
					}
				}
			}
		}

		ts.forEachChild(node, visit);
	}

	visit(sourceFile);
}

const files = walk(root);
const cssFiles = files
	.filter((file) => path.extname(file).toLowerCase() === ".css")
	.map((file) => path.relative(root, file))
	.sort();

if (cssFiles.length !== 1 || path.normalize(cssFiles[0] ?? "") !== allowedCss) {
	failures.push(
		`repository: expected only ${allowedCss.split(path.sep).join("/")}; found ${
			cssFiles.map((file) => file.split(path.sep).join("/")).join(", ") ||
			"no CSS files"
		}`,
	);
}

for (const file of files) {
	if (path.resolve(file) === auditFile) continue;

	const projectPath = relative(file);
	if (
		projectPath.startsWith("public/") ||
		projectPath.startsWith("apps/web/public/")
	) {
		continue;
	}

	const extension = path.extname(file).toLowerCase();
	if (!sourceExtensions.has(extension)) continue;

	const source = fs.readFileSync(file, "utf8");
	if (embeddedStylePattern.test(source))
		fail(file, "embedded style block remains");
	if (cssModulePattern.test(source)) fail(file, "CSS module import remains");
	if (cssInJsPattern.test(source))
		fail(file, "CSS-in-JS dependency/import remains");

	if (extension === ".tsx" || extension === ".jsx") {
		inspectJsx(file, source);
	}
}

const globalCssPath = path.join(root, allowedCss);
if (fs.existsSync(globalCssPath)) {
	const css = fs.readFileSync(globalCssPath, "utf8");

	if (/@app[l]y\b/.test(css))
		fail(globalCssPath, "Tailwind apply directive remains");
	if (/@layer\s+components\b/.test(css)) {
		fail(globalCssPath, "component layer directive remains");
	}

	try {
		const ast = postcss.parse(css, { from: globalCssPath });
		for (const node of ast.nodes) {
			if (node.type === "rule") {
				fail(globalCssPath, `top-level selector remains: ${node.selector}`);
			}

			if (
				node.type === "atrule" &&
				!["custom-variant", "import", "keyframes", "theme", "utility"].includes(
					node.name,
				)
			) {
				fail(globalCssPath, `unsupported top-level directive: @${node.name}`);
			}
		}
	} catch (error) {
		fail(
			globalCssPath,
			`CSS parse failed: ${error instanceof Error ? error.message : String(error)}`,
		);
	}
}

if (failures.length > 0) {
	console.error("Tailwind-only audit failed:\n");
	for (const failure of [...new Set(failures)].sort()) {
		console.error(`- ${failure}`);
	}
	process.exit(1);
}

console.log("tailwind-only audit passed");
