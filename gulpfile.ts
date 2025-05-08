import { series, parallel, src, dest } from "gulp";
import fs from "fs";
import ts from "gulp-typescript";

function clean(cb: any) {
	if (fs.existsSync("build")) {
		fs.rmSync("build", { recursive: true, force: true });
	}

	fs.mkdirSync("build");
	cb();
}

function compileTypescript() {
	const tsProject = ts.createProject("tsconfig.json");
	return tsProject.src().pipe(tsProject()).pipe(dest("build/src"));
}

function copy(cb: any) {
	const files = ["LICENSE", "README.md", "package.json", "package-lock.json"];
	const folders = ["public", "src/views"];

	// Copy all files in the files array from the current directory to their location in the build directory
	files.forEach((file) => {
		src(file).pipe(dest("build"));
	});

	// Copy all folders in the folders array to their location in the build directory
	folders.forEach((folder) => {
		src(`${folder}/**/*`).pipe(dest(`build/${folder}`));
	});

	cb();
}

export { clean, compileTypescript, copy };
export default series(clean, parallel(compileTypescript, copy));
