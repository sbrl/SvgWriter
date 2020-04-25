"use strict";

import XMLWriter from 'xml-writer';

import Rectangle from './primitives/Rectangle.mjs';
import Vector2 from './primitives/Vector2.mjs';


/*
 * Simplifies the process for creating an SVG dynamically.
 * Originally written for MusicBoxConverter, but lifted, reused, and extended for FloatingIslands.
 * Ported from C# to Javascript for AirQualityWeb.
 * @license MPL-2.0
 * @source https://gist.github.com/sbrl/ccd8fe4a2ccd97788fb37ee109a6642b
 */
class SvgWriter {
	/**
	 * @param	{String}	[widthspec="100%"]
	 * @param	{String}	[heightspec="100%"]
	 * @param	{Rectangle}	[viewBox=null]
	 */
	constructor(widthspec = "100%", heightspec = "100%", viewBox = null, pretty_print = false, unit_suffix =  "") {
		this.unit_suffix = unit_suffix;
		
		// ----------------------------------
		
		this.xml = new XMLWriter(pretty_print);
	
		this.xml.startDocument();
		this.xml.writeDocType("svg", "-//W3C//DTD SVG 1.1//EN", "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd", null);
		this.xml.writeComment("Generated by SVGWriter.js, which was written by Starbeamrainbowlabs & ported from SVGWriter.cs");
		this.xml.startElement("svg", "http://www.w3.org/2000/svg");
		this.xml.writeAttribute("version", "1.1");
		this.xml.writeAttribute("width", widthspec);
		this.xml.writeAttribute("height", heightspec);
		this.xml.writeAttribute("xmlns", "http://www.w3.org/2000/svg");

		if (viewBox != null) {
			this.xml.writeAttribute(
				"viewBox",
				`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
			);
		}
	}
	
	/**
	 * Completes the SVG image currently being generated and closes the underlying file stream.
	 * @return {this}
	 */
	complete() {
		this.xml.endElement();
		this.xml.endDocument();
		return this;
	}
	
	toString() {
		return this.xml.toString();
	}
	
	/**
	 * Adds some text to the image.
	 * @param	{Vector2}	position	The position to display the text at.
	 * @param	{string}	text		The text to display.
	 * @param	{string|string[]}	classes	A list of classes that the text element should have. Useful for applying CSS - see SvgWriter.addCSS(str)
	 * @return {this}
	 */
	addText(position, text, classes = []) {
		let class_str = typeof classes == "string" ? classes : classes.join(" ");
		this.xml.startElement("text");
		this.xml.writeAttribute("x", position.x);
		this.xml.writeAttribute("y", position.y);
		this.xml.writeAttribute("class", class_str);
		this.xml.text(text);
		this.xml.endElement();
		return this;
	}
	
	/**
	 * Adds some custom CSS.
	 * Useful for drawing text.
	 * @param {string} str The string of CSS to add.
	 * @return {this}
	 */
	writeCSS(str) {
		this.xml.startElement("style")
			.text(str)
			.endElement();
		return this;
	}
	
	/**
	 * Adds a line to the image.
	 * @param	{Vector2}	start						The start position of the line.
	 * @param	{Vector2}	end							The end position of the line.
	 * @param	{String}	[strokeStyle="darkgreen"]	The colour to draw the line.
	 * @param	{Number}	[strokeWidth=3]				The width to draw the line.
	 * @return {this}
	 */
	writeLine(start, end, strokeStyle = "darkgreen", strokeWidth = 3) {
		this.xml.startElement("line");
		this.xml.writeAttribute("x1", `${start.x}${this.unit_suffix}`);
		this.xml.writeAttribute("y1", `${start.y}${this.unit_suffix}`);
		this.xml.writeAttribute("x2", `${end.x}${this.unit_suffix}`);
		this.xml.writeAttribute("y2", `${end.y}${this.unit_suffix}`);
		this.xml.writeAttribute("stroke", strokeStyle);
		this.xml.writeAttribute("stroke-width", strokeWidth.toString());
		this.xml.endElement();
		return this;
	}
	
	/**
	 * Opens a new SVG group.
	 * @param  {string} [classes=null]   The class(es) to apply to the new group.
	 * @param  {string} [transform=null] The transform(s) to apply to the new group.
	 * @return {this}
	 */
	startGroup(classes = null, transform = null) {
		this.xml.startElement("g");
		if(classes != null)
			this.xml.writeAttribute("class", classes);
		if (transform != null)
			this.xml.writeAttribute("transform", transform);
		return this;
	}
	/**
	 * Ends the most recently created unclosed group.
	 * @return {this}
	 */
	endGroup() {
		this.xml.endElement();
		return this;
	}
	/// <summary>
	/// 
	/// </summary>
	/// <param name="scale"></param>
	/**
	 * Starts a scale transform.
	 * @param  {number} scale	The scale to enlarge (or shrink!) the next items by.
	 * @return {this}	
	 */
	startScaleTransform(scale)
	{
		this.xml.startElement("g");
		this.xml.writeAttribute("transform", `scale(${scale})`);
		return this;
	}
	
	/**
	 * Ends the most recently created scale transform.
	 * @return {this}
	 */
	endTransform() {
		this.xml.endElement();
		return this;
	}
	
	/**
	 * Adds a hollow rectangle to the image.
	 * @param	{Vector2}	position	The position of the rectangle.
	 * @param	{Vector2}	size		The size of the rectangle.
	 * @param	{string}	strokeStyle	The colour to use when drawing.
	 * @param	{float}		strokeWidth	The line width to use when drawing.
	 * @return	{this}
	 */
	writeRectangle(position, size, strokeStyle = "red", strokeWidth = 3, fill = "none") {
		this.xml.startElement("rect");
		this.xml.writeAttribute("x", `${position.x}${this.unit_suffix}`);
		this.xml.writeAttribute("y", `${position.y}${this.unit_suffix}`);
		this.xml.writeAttribute("width", `${size.x}${this.unit_suffix}`);
		this.xml.writeAttribute("height", `${size.y}${this.unit_suffix}`);
		this.xml.writeAttribute("fill", fill);
		this.xml.writeAttribute("stroke", strokeStyle);
		this.xml.writeAttribute("stroke-width", strokeWidth.toString());
		this.xml.endElement();
		return this;
	}
	/**
	 * Adds a circle to the image.
	 * @param	{Vector2}	centre				The position of the centre of the circle.
	 * @param	{Number}	radius				The radius of the circle.
	 * @param	{String}	[fillStyle="blue"]	The colour to fill the circle with.
	 * @return	{this}
	 */
	writeCircle(centre, radius, fillStyle = "blue") {
		this.xml.startElement("circle");
		this.xml.writeAttribute("cx", `${centre.x}${this.unit_suffix}`);
		this.xml.writeAttribute("cy", `${centre.y}${this.unit_suffix}`);
		this.xml.writeAttribute("r", `${radius}${this.unit_suffix}`);
		this.xml.writeAttribute("fill", fillStyle);
		this.xml.endElement();
		return this;
	}
	
	/**
	 * Adds a solid n-sided polygon to the image.
	 * @param	{string}	fillStyle	The colour to fill the polygon with.
	 * @param	{Vector2[]}	points		The co-ordinates that make up the polygon.
	 * @return	{this}
	 */
	writePolygon(fillStyle, points) {
		this.xml.startElement("polygon");
		this.xml.writeAttribute("fill", fillStyle);
		this.xml.writeAttribute(
			"points",
			points.map((point) => `${point.x},${point.y}`).join(" ")
		);
		this.xml.endElement();
		return this;
	}
	
	/**
	 * Adds an isosceles / equilateral triangle to the image.
	 * This is a shorthand method that calls AddPolygon() under-the-hood.
	 * @param	{Vector2}	position	The position to draw the triangle at.
	 * @param	{Number}	baseWidth	The width of the triangle's base.
	 * @param	{Number}	height		The height of the triangle.
	 * @param	{Boolean}	upsideDown	If set to true, then the triangle will point downwards instead of upwards.
	 * @param	{string}	fillStyle	The colour to fill the triangle with.
	 * @return	{this}
	 */
	writeTriangleRegular(position, baseWidth, height, upsideDown, fillStyle)
	{
		this.writePolygon(
			fillStyle,
			position.clone().subtract(new Vector2(baseWidth / 2, 0)),
			position.clone().add(new Vector2(baseWidth / 2, 0)),
			position.clone().subtract(new Vector2(0, upsideDown ? -height : height))
		);
		return this;
	}
}

SvgWriter.string2element = (svg_string) => {
	let temp = document.createElement("div");
	temp.innerHTML = svg_string;
	return temp.querySelector("svg");
}

export default SvgWriter;
