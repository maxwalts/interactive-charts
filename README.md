# Interactive Charts

## What's this?
A work-in-progress module for creating interactive charts in the browser. It's built with [D3](https://d3js.org/).

## Why?
This is a research project for the Ford School of Public Policy at the University of Michigan under the guidance of Dr. Justin Wolfers. The goal is to create a library that will allow any user to create beautiful interactive charts with minimal effort and easily embed it in other applications.

https://observablehq.com/d/814c401d07f99a7f@3821

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
npx http-server
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@5
npm install https://api.observablehq.com/d/814c401d07f99a7f@3821.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "814c401d07f99a7f";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~
